import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CheckCircle, Target, Zap } from 'lucide-react';
export function AboutPage() {
  return <div className="min-h-screen bg-dark-bg text-text-primary">
      <Navbar />

      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            About Us
          </h1>
          <p className="text-text-secondary text-lg max-w-3xl mx-auto leading-relaxed">
            We are a premier digital agency in Kenya,
            dedicated to transforming businesses through innovative design and
            technology.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div className="bg-dark-cardAlt border border-dark-border p-8 rounded-2xl">
            <div className="w-12 h-12 bg-primary-blue/10 rounded-xl flex items-center justify-center text-primary-blue mb-6">
              <Target size={24} />
            </div>
            <h2 className="text-2xl font-display font-bold mb-4">
              Our Mission
            </h2>
            <p className="text-text-secondary leading-relaxed">
              To empower businesses with cutting-edge digital tools and creative
              strategies that drive growth, efficiency, and market leadership.
            </p>
          </div>
          <div className="bg-dark-cardAlt border border-dark-border p-8 rounded-2xl">
            <div className="w-12 h-12 bg-primary-cyan/10 rounded-xl flex items-center justify-center text-primary-cyan mb-6">
              <Zap size={24} />
            </div>
            <h2 className="text-2xl font-display font-bold mb-4">Our Vision</h2>
            <p className="text-text-secondary leading-relaxed">
              To be the leading provider of integrated digital solutions in East
              Africa, known for excellence, innovation, and customer
              satisfaction.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">
            Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
            title: 'Excellence',
            desc: 'We never compromise on quality.'
          }, {
            title: 'Innovation',
            desc: 'Constantly exploring new technologies.'
          }, {
            title: 'Integrity',
            desc: 'Honest and transparent partnerships.'
          }].map((value, i) => <div key={i} className="text-center p-6">
                <div className="w-16 h-16 mx-auto bg-dark-cardAlt rounded-full flex items-center justify-center border border-dark-border mb-4">
                  <CheckCircle className="text-success" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-text-secondary">{value.desc}</p>
              </div>)}
          </div>
        </div>
      </main>

      <Footer />
    </div>;
}