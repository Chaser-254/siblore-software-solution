import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ShoppingCart, Search, Filter, Star, Package, Laptop, Shirt } from 'lucide-react';
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
}

export function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'clothing' | 'electronics'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating'>('name');

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

  const filteredProducts = products
    .filter(product => selectedCategory === 'all' || product.category === selectedCategory)
    .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return a.name.localeCompare(b.name);
    });

  const ProductCard = ({ product }: { product: Product }) => (
    <div className="bg-dark-card border border-dark-border rounded-xl overflow-hidden hover:border-primary-cyan transition-all group">
      <div className="aspect-square bg-dark-bg relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          onError={(e) => {
            // Handle broken image links
            e.currentTarget.src = '/placeholder-product.jpg';
          }}
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
            <span className="text-red-400 font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-text-primary group-hover:text-primary-cyan transition-colors">
            {product.name}
          </h3>
          <span className="text-xs px-2 py-1 rounded-full bg-dark-border text-text-secondary">
            {product.category}
          </span>
        </div>
        <p className="text-sm text-text-secondary mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-text-secondary">{product.rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary-cyan">
            ${product.price}
          </span>
          <button 
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              product.inStock 
                ? 'bg-primary-cyan text-dark-bg hover:bg-primary-blue' 
                : 'bg-dark-border text-text-secondary cursor-not-allowed'
            }`}
            disabled={!product.inStock}
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Siblore Store
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Premium clothing and electronics for your lifestyle
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-dark-card border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'rating')}
              className="px-4 py-3 bg-dark-card border border-dark-border rounded-lg focus:outline-none focus:border-primary-cyan text-text-primary"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="rating">Sort by Rating</option>
            </select>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                selectedCategory === 'all'
                  ? 'bg-primary-cyan text-dark-bg'
                  : 'bg-dark-card text-text-secondary hover:text-primary-cyan'
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => setSelectedCategory('electronics')}
              className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedCategory === 'electronics'
                  ? 'bg-primary-cyan text-dark-bg'
                  : 'bg-dark-card text-text-secondary hover:text-primary-cyan'
              }`}
            >
              <Laptop className="w-4 h-4" />
              Electronics
            </button>
            <button
              onClick={() => setSelectedCategory('clothing')}
              className={`px-6 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                selectedCategory === 'clothing'
                  ? 'bg-primary-cyan text-dark-bg'
                  : 'bg-dark-card text-text-secondary hover:text-primary-cyan'
              }`}
            >
              <Shirt className="w-4 h-4" />
              Clothing
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-dark-card border border-dark-border rounded-xl overflow-hidden animate-pulse">
                <div className="aspect-square bg-dark-bg"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-dark-border rounded"></div>
                  <div className="h-3 bg-dark-border rounded w-3/4"></div>
                  <div className="h-6 bg-dark-border rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary text-lg mb-4">
              {searchTerm || selectedCategory !== 'all' 
                ? 'No products found matching your criteria.' 
                : 'No products available yet.'}
            </p>
            {products.length === 0 && !searchTerm && selectedCategory === 'all' && (
              <p className="text-text-secondary text-sm">
                Products will be available soon. Check back later!
              </p>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
