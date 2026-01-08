import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Filter, Package, DollarSign, Star, Eye, EyeOff } from 'lucide-react';
import { apiService } from '../services/api';

interface Product {
  _id: string;
  name: string;
  category: 'clothing' | 'electronics';
  price: number;
  image: string;
  description: string;
  rating: number;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProductFormData {
  name: string;
  category: 'clothing' | 'electronics';
  price: string;
  image: string;
  imageFile?: File;
  description: string;
  rating: string;
  inStock: boolean;
}

export function AdminProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'clothing' | 'electronics'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: 'electronics',
    price: '',
    image: '',
    description: '',
    rating: '0',
    inStock: true
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getProducts();
      setProducts(response);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const submissionData = new FormData();
      
      // Append all form fields
      submissionData.append('name', formData.name);
      submissionData.append('category', formData.category);
      submissionData.append('price', formData.price);
      submissionData.append('description', formData.description);
      submissionData.append('rating', formData.rating);
      submissionData.append('inStock', formData.inStock.toString());
      
      // Append image file if exists
      if (formData.imageFile) {
        submissionData.append('image', formData.imageFile);
      } else if (formData.image) {
        submissionData.append('image', formData.image);
      }

      if (editingProduct) {
        const response = await apiService.updateProduct(editingProduct._id, submissionData);
        setProducts(products.map(p => 
          p._id === editingProduct._id 
            ? { ...p, ...response }
            : p
        ));
      } else {
        const response = await apiService.createProduct(submissionData);
        setProducts([...products, response]);
      }

      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await apiService.deleteProduct(id);
        setProducts(products.filter(p => p._id !== id));
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      image: product.image,
      description: product.description,
      rating: product.rating.toString(),
      inStock: product.inStock
    });
    setShowAddModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'electronics',
      price: '',
      image: '',
      description: '',
      rating: '0',
      inStock: true
    });
    setEditingProduct(null);
    setShowAddModal(false);
  };

  const filteredProducts = products
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const ProductModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-dark-card border border-dark-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-6">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as 'clothing' | 'electronics'})}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                >
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Rating (0-5)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  required
                  value={formData.rating}
                  onChange={(e) => setFormData({...formData, rating: e.target.value})}
                  className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Product Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData({...formData, imageFile: file, image: file.name});
                  }
                }}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
                required
              />
              {formData.image && !formData.imageFile && (
                <p className="mt-2 text-sm text-text-secondary">Current: {formData.image}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                required
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-2 bg-dark-bg border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
              />
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="inStock"
                checked={formData.inStock}
                onChange={(e) => setFormData({...formData, inStock: e.target.checked})}
                className="w-4 h-4 text-primary-cyan bg-dark-bg border-dark-border rounded focus:ring-primary-cyan"
              />
              <label htmlFor="inStock" className="text-sm font-medium">
                In Stock
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 py-2 bg-primary-cyan text-dark-bg rounded-lg font-semibold hover:bg-primary-blue transition-all"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-dark-border text-text-secondary rounded-lg font-semibold hover:text-primary-cyan transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Product Management</h2>
          <p className="text-text-secondary">Manage your store inventory</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary-cyan text-dark-bg rounded-lg font-semibold hover:bg-primary-blue transition-all"
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-dark-card border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
          />
        </div>
        
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value as 'all' | 'clothing' | 'electronics')}
          className="px-4 py-2 bg-dark-card border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
        </select>
      </div>

      {/* Products Table */}
      <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary-cyan border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-8 text-center">
            <Package className="w-16 h-16 text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary mb-4">No products found</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-primary-cyan text-dark-bg rounded-lg font-semibold hover:bg-primary-blue transition-all"
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-dark-bg border-b border-dark-border">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-border">
                {filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-dark-bg/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-white">{product.name}</p>
                          <p className="text-sm text-text-secondary line-clamp-1">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.category === 'electronics' 
                          ? 'bg-blue-500/10 text-blue-400' 
                          : 'bg-purple-500/10 text-purple-400'
                      }`}>
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-primary-cyan" />
                        <span className="font-medium">{product.price}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{product.rating}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`flex items-center gap-1 text-sm ${
                        product.inStock ? 'text-success' : 'text-red-400'
                      }`}>
                        {product.inStock ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="p-2 text-text-secondary hover:text-primary-cyan transition-colors"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-text-secondary hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {showAddModal && <ProductModal />}
    </div>
  );
}
