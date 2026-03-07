import ProductCard from './ProductCard';

const FEATURED_PRODUCTS = [
    {
        id: 1,
        title: "Razorblade Nebula X",
        category: "Sleek Laptop",
        price: "2,199",
        rating: 4,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400&h=300&auto=format&fit=crop"
    },
    {
        id: 2,
        title: "AstroShift K900",
        category: "Mechanical Keyboard",
        price: "199",
        rating: 5,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=400&h=300&auto=format&fit=crop"
    },
    {
        id: 3,
        title: "SonarPro X1",
        category: "High-End Headphones",
        price: "349",
        rating: 4,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=400&h=300&auto=format&fit=crop"
    },
    {
        id: 4,
        title: "Quantum C50",
        category: "Gaming Mouse",
        price: "89",
        rating: 4,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=400&h=300&auto=format&fit=crop"
    },
    {
        id: 5,
        title: "NovaWatch S4",
        category: "Smart Watch",
        price: "329",
        rating: 5,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&h=300&auto=format&fit=crop"
    },
    {
        id: 6,
        title: "Aether 32",
        category: "4K Monitor",
        price: "649",
        rating: 4,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=400&h=300&auto=format&fit=crop"
    }
];

export default function ProductGrid() {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 text-white">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl md:text-2xl font-bold tracking-wider">FEATURED ARRIVALS</h2>
                <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                    </button>
                    <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {FEATURED_PRODUCTS.map((product) => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
}
