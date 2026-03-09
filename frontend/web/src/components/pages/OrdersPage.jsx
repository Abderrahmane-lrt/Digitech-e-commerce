import { useState, useEffect } from 'react';
import { Package, Calendar, DollarSign, PackageOpen } from 'lucide-react';
import { getOrders } from '@shared/api/services';
import { STORAGE_URL } from '@shared/api/axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function OrdersPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await getOrders();
            setOrders(res.data);
        } catch (err) {
            toast.error('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-400/10 text-green-400 border border-green-400/20';
            case 'cancelled':
                return 'bg-red-400/10 text-red-400 border border-red-400/20';
            default: // pending
                return 'bg-yellow-400/10 text-yellow-500 border border-yellow-400/20';
        }
    };

    return (
        <div className="bg-background min-h-screen font-geist pt-40 pb-20 transition-colors duration-300">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <div className="mb-10 flex items-center gap-3">
                    <Package className="w-8 h-8 text-primary" />
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-wide">Your Orders</h1>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-muted border border-border rounded-3xl p-16 text-center shadow-sm">
                        <PackageOpen className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-foreground mb-4">No orders found</h2>
                        <p className="text-muted-foreground mb-8">You haven't placed any orders yet.</p>
                        <Link
                            to="/products"
                            className="inline-flex py-3 px-8 rounded-full bg-primary hover:opacity-90 text-white font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/20"
                        >
                            Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div key={order.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:border-border/80 transition-colors shadow-sm">
                                {/* Order Header */}
                                <div className="bg-muted/50 p-4 sm:p-6 border-b border-border flex flex-wrap gap-6 items-center justify-between">
                                    <div className="flex flex-wrap gap-8 items-center">
                                        <div>
                                            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">Order Placed</p>
                                            <div className="flex items-center gap-2 text-foreground text-sm font-bold">
                                                <Calendar className="w-4 h-4 text-primary" />
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">Total</p>
                                            <div className="flex items-center gap-1 text-foreground text-sm font-black">
                                                <DollarSign className="w-4 h-4 text-primary" />
                                                {order.total_price}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest mb-1 opacity-60">Order #</p>
                                            <div className="text-foreground text-sm font-mono font-bold">
                                                ORD-{order.id.toString().padStart(5, '0')}
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${getStatusStyle(order.status)}`}>
                                        {order.status}
                                    </span>
                                </div>

                                {/* Order Items */}
                                <div className="p-4 sm:p-6 divide-y divide-border">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex items-center gap-6">
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-muted border border-border relative overflow-hidden flex-shrink-0">
                                                {item.product?.image ? (
                                                    <img src={`${STORAGE_URL}/${item.product.image}`} alt={item.product?.name} className="object-cover w-full h-full" />
                                                ) : (
                                                    <div className="w-10 h-10 bg-muted rounded-full blur-xl absolute opacity-20" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <Link to={`/products/${item.product_id}`} className="hover:text-primary transition-colors inline-block text-foreground font-bold mb-1 truncate">
                                                    {item.product?.name || 'Unknown Product'}
                                                </Link>
                                                <div className="text-muted-foreground text-xs font-medium">
                                                    Quantity: {item.quantity} × <span className="text-foreground font-bold">${item.price}</span>
                                                </div>
                                            </div>
                                            <div className="hidden sm:block text-right">
                                                <button className="py-2 px-4 rounded-lg bg-muted hover:bg-muted/80 text-foreground text-[10px] font-bold uppercase tracking-widest transition-all border border-border">
                                                    Write Review
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
