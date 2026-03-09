import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { getProducts } from '@shared/api/services';
import { STORAGE_URL } from '@shared/api/axios';

export default function ProductGrid() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLatestProducts = async () => {
            try {
                const res = await getProducts();
                // Show only first 6 on home page
                setProducts(res.data.slice(0, 6));
            } catch (err) {
                console.error("Failed to fetch featured products", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLatestProducts();
    }, []);

    return (
        <div className="w-full max-w-6xl mx-auto px-4 text-foreground">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl md:text-2xl font-bold tracking-wider uppercase">FEATURED ARRIVALS</h2>
                <div className="flex gap-4">
                    <Link to="/products" className="text-primary hover:opacity-80 font-semibold text-sm transition-colors flex items-center gap-1">
                        View All <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="rounded-2xl bg-card border border-border p-5 animate-pulse shadow-sm">
                            <div className="w-full h-48 rounded-xl bg-muted mb-4" />
                            <div className="h-4 bg-muted rounded w-1/3 mb-2" />
                            <div className="h-5 bg-muted rounded w-2/3 mb-3" />
                            <div className="h-4 bg-muted rounded w-1/4" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.name}
                            category="Desktop Accessory"
                            price={product.price}
                            image={product.image ? `${STORAGE_URL}/${product.image}` : null}
                            rating={Math.floor(Math.random() * 2) + 4} // Random 4-5 stars for visual
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
