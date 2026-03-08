import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { getCart, updateCartItem, removeCartItem, createOrder } from '../../api/services';
import { STORAGE_URL } from '../../api/axios';
import { toast } from 'react-toastify';

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const res = await getCart();
            setCartItems(res.data);
        } catch (err) {
            toast.error('Failed to load cart');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateQuantity = async (id, currentQty, delta, maxStock) => {
        const newQty = currentQty + delta;
        if (newQty < 1 || newQty > maxStock) return;

        try {
            await updateCartItem(id, newQty);
            fetchCart();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to update quantity');
        }
    };

    const handleRemove = async (id) => {
        try {
            await removeCartItem(id);
            setCartItems(cartItems.filter(item => item.id !== id));
            toast.success('Item removed');
        } catch (err) {
            toast.error('Failed to remove item');
        }
    };

    const handleCheckout = async () => {
        try {
            await createOrder();
            toast.success('Order placed successfully!');
            navigate('/orders');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Checkout failed');
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

    return (
        <div className="bg-background min-h-screen font-geist pt-28 pb-20 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="mb-10 flex items-center gap-3">
                    <ShoppingBag className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-wide">Your Cart</h1>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : cartItems.length === 0 ? (
                    <div className="bg-muted border border-border rounded-3xl p-16 text-center shadow-sm">
                        <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h2>
                        <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
                        <Link
                            to="/products"
                            className="inline-flex py-3 px-8 rounded-full bg-primary hover:opacity-90 text-white font-bold text-sm uppercase tracking-widest transition-all shadow-lg shadow-primary/20"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items List */}
                        <div className="flex-1 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-card border border-border rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6 relative group hover:border-border/80 transition-colors shadow-sm">
                                    {/* Image */}
                                    <Link to={`/products/${item.product_id}`} className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl bg-muted relative overflow-hidden border border-border">
                                        {item.product.image ? (
                                            <img src={`${STORAGE_URL}/${item.product.image}`} alt={item.product.name} className="object-cover w-full h-full" />
                                        ) : (
                                            <div className="w-16 h-16 bg-muted rounded-full blur-xl absolute opacity-20" />
                                        )}
                                    </Link>

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <Link to={`/products/${item.product_id}`} className="hover:text-primary transition-colors inline-block">
                                            <h3 className="text-lg md:text-xl font-bold text-foreground mb-1 truncate">{item.product.name}</h3>
                                        </Link>
                                        <div className="text-primary font-bold text-lg mb-4 sm:mb-6">${item.product.price}</div>
                                        
                                        {/* Controls */}
                                        <div className="flex items-center gap-6">
                                            <div className="h-10 flex items-center bg-muted border border-border rounded-lg px-1 shadow-sm">
                                                <button onClick={() => handleUpdateQuantity(item.id, item.quantity, -1, item.product.stock)} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">-</button>
                                                <span className="w-8 text-center text-foreground text-sm font-bold">{item.quantity}</span>
                                                <button onClick={() => handleUpdateQuantity(item.id, item.quantity, 1, item.product.stock)} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">+</button>
                                            </div>
                                            
                                            <button 
                                                onClick={() => handleRemove(item.id)}
                                                className="text-muted-foreground hover:text-red-500 p-2 rounded-full hover:bg-red-500/10 transition-colors"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Line Total */}
                                    <div className="hidden sm:block text-right self-stretch pt-2">
                                        <div className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">Total</div>
                                        <div className="text-foreground font-black text-xl transition-colors duration-300">${(item.product.price * item.quantity).toFixed(2)}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="w-full lg:w-[380px] flex-shrink-0">
                            <div className="bg-card border border-border rounded-3xl p-6 md:p-8 sticky top-28 shadow-sm">
                                <h3 className="text-xl font-bold text-foreground mb-6">Order Summary</h3>
                                
                                <div className="space-y-4 mb-6 pb-6 border-b border-border text-sm">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal ({cartItems.length} items)</span>
                                        <span className="text-foreground font-bold">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Shipping</span>
                                        <span className="text-green-500 font-bold uppercase tracking-widest text-[10px]">Free</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Tax</span>
                                        <span className="text-foreground font-bold">$0.00</span>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mb-8">
                                    <span className="text-muted-foreground font-medium">Total</span>
                                    <span className="text-3xl font-black text-primary transition-colors duration-300">${subtotal.toFixed(2)}</span>
                                </div>

                                <button 
                                    onClick={handleCheckout}
                                    className="w-full py-4 rounded-xl bg-primary hover:opacity-90 text-white font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
                                >
                                    Proceed to Checkout
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                                
                                <div className="mt-4 text-center">
                                    <Link to="/products" className="text-muted-foreground hover:text-foreground text-xs font-bold uppercase tracking-widest transition-colors">
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
