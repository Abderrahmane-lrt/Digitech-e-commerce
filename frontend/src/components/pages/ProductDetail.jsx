import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { getProduct, addToCart } from '../../api/services';
import { STORAGE_URL } from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export default function ProductDetail() {
    const { id } = useParams();
    const { user } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const res = await getProduct(id);
            setProduct(res.data);
        } catch (err) {
            toast.error('Failed to load product details');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async () => {
        if (!user) {
            toast.error('Please login to add items to cart');
            return;
        }
        setAdding(true);
        try {
            await addToCart(product.id, quantity);
            toast.success('Added to cart!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to add to cart');
        } finally {
            setAdding(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-background min-h-screen py-32 flex justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!product) return null;

    return (
        <div className="bg-background min-h-screen font-geist pt-28 pb-20 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <Link to="/products" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors font-bold text-xs uppercase tracking-widest">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Products
                </Link>

                <div className="bg-card border border-border rounded-[32px] p-6 md:p-10 flex flex-col md:flex-row gap-10 md:gap-16 shadow-2xl transition-all duration-300">
                    {/* Left: Image */}
                    <div className="w-full md:w-1/2">
                        <div className="w-full aspect-square rounded-3xl bg-muted relative overflow-hidden group border border-border/50">
                            {product.image ? (
                                <img
                                    src={`${STORAGE_URL}/${product.image}`}
                                    alt={product.name}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            ) : (
                                <div className="w-32 h-32 bg-muted rounded-full blur-3xl absolute opacity-20" />
                            )}
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div className="w-full md:w-1/2 flex flex-col pt-4">
                        <div className="mb-4">
                            <span className="text-primary text-xs font-black tracking-[0.2em] uppercase opacity-70">
                                Premium Technology
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-foreground mb-6 leading-tight tracking-tighter uppercase italic">
                            {product.name}
                        </h1>

                        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border transition-colors duration-300">
                            <span className="text-4xl font-black text-foreground">${product.price}</span>
                            {product.stock > 0 ? (
                                <span className="text-green-500 font-black bg-green-500/10 px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] border border-green-500/20">
                                    In Stock ({product.stock})
                                </span>
                            ) : (
                                <span className="text-red-500 font-black bg-red-500/10 px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] border border-red-500/20">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        <p className="text-muted-foreground mb-10 leading-relaxed text-base font-medium">
                            {product.description || 'Experience cutting-edge technology with the ' + product.name + '. Designed for performance and built for reliability.'}
                        </p>

                        <div className="flex gap-4 mb-10">
                            <div className="h-14 flex items-center bg-muted border border-border rounded-2xl px-2 shadow-sm">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors text-xl font-black"
                                >
                                    -
                                </button>
                                <span className="w-12 text-center text-foreground font-black">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors text-xl font-black"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={product.stock === 0 || adding}
                                className="flex-1 h-14 bg-primary hover:opacity-90 text-white font-black rounded-2xl flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 active:scale-[0.98]"
                            >
                                {adding ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <ShoppingCart className="w-5 h-5" />
                                        Add to Cart
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Features List */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-border transition-colors duration-300">
                            <div className="flex items-center gap-4 transition-transform hover:translate-x-1 duration-300">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                    <Truck className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-foreground font-black text-[10px] uppercase tracking-widest">Free Shipping</p>
                                    <p className="text-muted-foreground text-[10px] uppercase tracking-tighter font-medium opacity-60">Orders over $50</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 transition-transform hover:translate-x-1 duration-300">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                    <ShieldCheck className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-foreground font-black text-[10px] uppercase tracking-widest">1 Year Warranty</p>
                                    <p className="text-muted-foreground text-[10px] uppercase tracking-tighter font-medium opacity-60">Full protection</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 transition-transform hover:translate-x-1 duration-300">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                                    <RefreshCcw className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <p className="text-foreground font-black text-[10px] uppercase tracking-widest">30 Day Returns</p>
                                    <p className="text-muted-foreground text-[10px] uppercase tracking-tighter font-medium opacity-60">Hassle-free</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
