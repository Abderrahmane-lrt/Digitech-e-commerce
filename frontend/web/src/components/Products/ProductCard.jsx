import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { addToCart } from '@shared/api/services';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function ProductCard({ id, title, category, price, image, rating }) {
    const { user } = useAuth();
    const [adding, setAdding] = useState(false);

    const handleAddToCart = async (e) => {
        e.preventDefault(); // prevent triggering the Link navigate
        e.stopPropagation();

        if (!user) {
            toast.error('Please login to add items to cart');
            return;
        }

        setAdding(true);
        try {
            await addToCart(id, 1);
            toast.success('Added to cart!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to add to cart');
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className="group relative flex flex-col justify-between rounded-3xl bg-card border border-border p-5 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 shadow-sm">
            {/* Image Container */}
            <Link to={`/products/${id}`} className="w-full h-52 rounded-2xl bg-muted mb-5 overflow-hidden relative block border border-border/50">
                {image ? (
                    <img src={image} alt={title} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out" />
                ) : (
                    <div className="w-24 h-24 bg-muted rounded-full blur-2xl absolute opacity-20" />
                )}
                
                {/* Visual Accent */}
                <div className="absolute top-3 right-3 bg-card/80 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-muted-foreground uppercase tracking-widest border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Quick View
                </div>
            </Link>

            <div className="flex flex-col gap-1 px-1">
                <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">{category}</span>
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-2.5 h-2.5 ${i < rating ? 'text-yellow-400' : 'text-muted'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                </div>
                
                <Link to={`/products/${id}`}>
                    <h3 className="text-foreground font-bold text-lg leading-tight hover:text-primary transition-colors line-clamp-1">{title}</h3>
                </Link>
                
                <div className="mt-3 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-muted-foreground font-medium uppercase">Price</span>
                        <span className="text-foreground font-black text-xl tracking-tight transition-colors duration-300">${price}</span>
                    </div>

                    <button 
                        onClick={handleAddToCart}
                        disabled={adding}
                        className="p-3 rounded-2xl bg-foreground text-background hover:bg-primary transition-all duration-300 cursor-pointer shadow-lg shadow-black/5 hover:shadow-primary/30 flex items-center justify-center group/btn"
                    >
                        {adding ? (
                            <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        ) : (
                            <ShoppingCart className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
