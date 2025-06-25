import React from 'react';

interface Brand {
  name: string;
  logo: string;
}

const brands: Brand[] = [
  { name: 'Microsoft', logo: 'https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
  { name: 'Amazon', logo: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
  { name: 'Tesla', logo: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
  { name: 'Netflix', logo: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
  { name: 'Spotify', logo: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
  { name: 'Adobe', logo: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
  { name: 'Twitter', logo: 'https://images.pexels.com/photos/267371/pexels-photo-267371.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop' },
];

function BrandLogo({ brand }: { brand: Brand }) {
  return (
    <div className="flex-shrink-0 mx-6 group cursor-pointer">
      <div className="relative overflow-hidden rounded-2xl p-1">
        <img 
          src={brand.logo}
          alt={brand.name}
          className="w-20 h-20 object-cover rounded-xl transition-all duration-300 group-hover:scale-110"
        />
        <span className="absolute bottom-0 left-0 right-0 text-xs font-medium text-white bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {brand.name}
        </span>
      </div>
    </div>
  );
}

function App() {
  // Duplicate arrays for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(to bottom, #FFFEEB, #FFFDE1)' }}>
      {/* Header */}
      <div className="text-center py-16">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-900 via-amber-800 to-yellow-900 bg-clip-text text-transparent mb-4">
          Trusted by Industry Leaders
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Join thousands of companies that rely on our platform to power their business forward
        </p>
      </div>

      {/* Two-Line Brand Animation Container */}
      <div className="relative space-y-8 py-8">
        {/* Top Row - Left to Right */}
        <div className="relative overflow-hidden">
          {/* Gradient Fade Effects */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-yellow-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-yellow-50 to-transparent z-10"></div>
          
          <div className="flex animate-scroll-left">
            {duplicatedBrands.map((brand, index) => (
              <BrandLogo key={`top-${brand.name}-${index}`} brand={brand} />
            ))}
          </div>
        </div>

        {/* Bottom Row - Right to Left */}
        <div className="relative overflow-hidden">
          {/* Gradient Fade Effects */}
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-yellow-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-yellow-50 to-transparent z-10"></div>
          
          <div className="flex animate-scroll-right">
            {duplicatedBrands.map((brand, index) => (
              <BrandLogo key={`bottom-${brand.name}-${index}`} brand={brand} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-yellow-200">
              <div className="text-3xl font-bold text-amber-600 mb-2">10M+</div>
              <div className="text-gray-700">Active Users</div>
            </div>
            <div className="p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-yellow-200">
              <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
              <div className="text-gray-700">Uptime</div>
            </div>
            <div className="p-6 rounded-xl bg-white/60 backdrop-blur-sm border border-yellow-200">
              <div className="text-3xl font-bold text-orange-600 mb-2">150+</div>
              <div className="text-gray-700">Countries</div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for horizontal animations */}
      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        
        @keyframes scroll-right {
          0% {
            transform: translateX(-33.33%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right 20s linear infinite;
        }
        
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}

export default App;