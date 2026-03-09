import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Filter, Eye, Clock, CheckCircle, Truck, XCircle, Calendar, DollarSign, Package } from 'lucide-react';
import { getAdminOrders } from '@shared/api/services';
import { toast } from 'react-toastify';

export default function AdminOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getAdminOrders();
                setOrders(res.data);
            } catch (err) {
                toast.error("Failed to load orders");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'processing': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'shipped': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
            case 'delivered': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'cancelled': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-muted text-muted-foreground border-border';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock className="w-3.5 h-3.5" />;
            case 'processing': return <Package className="w-3.5 h-3.5" />;
            case 'shipped': return <Truck className="w-3.5 h-3.5" />;
            case 'delivered': return <CheckCircle className="w-3.5 h-3.5" />;
            case 'cancelled': return <XCircle className="w-3.5 h-3.5" />;
            default: return null;
        }
    };

    const filteredOrders = orders.filter(order => 
        order.id.toString().includes(searchTerm) || 
        order.user?.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.user?.last_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-background min-h-screen font-geist pt-28 pb-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <ShoppingBag className="w-8 h-8 text-primary" />
                            <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tighter uppercase italic">Global Orders</h1>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-60">Manage across all customers</p>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input 
                                type="text"
                                placeholder="Search by ID or customer..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-card border border-border pl-12 pr-4 py-3 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                            />
                        </div>
                        <button className="bg-card border border-border rounded-2xl p-3 hover:bg-muted transition-all">
                            <Filter className="w-4 h-4 text-foreground" />
                        </button>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-[40px] overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-muted/30 border-b border-border">
                                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Order ID</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Customer</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Date</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Total</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {loading ? (
                                    [1, 2, 3, 4, 5].map(i => (
                                        <tr key={i} className="animate-pulse">
                                            <td colSpan="6" className="px-8 py-6"><div className="h-4 bg-muted rounded w-3/4 mx-auto" /></td>
                                        </tr>
                                    ))
                                ) : filteredOrders.length > 0 ? (
                                    filteredOrders.map((order) => (
                                        <tr key={order.id} className="hover:bg-muted/20 transition-all duration-300 group">
                                            <td className="px-8 py-6">
                                                <span className="text-sm font-black text-foreground font-mono">#{order.id.toString().padStart(6, '0')}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-xs uppercase tracking-tighter">
                                                        {order.user?.first_name?.[0]}{order.user?.last_name?.[0]}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-foreground">{order.user?.first_name} {order.user?.last_name}</p>
                                                        <p className="text-[10px] text-muted-foreground font-medium">{order.user?.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-2 text-muted-foreground font-medium text-xs">
                                                    <Calendar className="w-3.5 h-3.5" />
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6 font-geist">
                                                <div className="flex items-center gap-1 text-sm font-black text-foreground">
                                                    <DollarSign className="w-3.5 h-3.5 opacity-40" />
                                                    {parseFloat(order.total_price).toFixed(2)}
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(order.status)}`}>
                                                    {getStatusIcon(order.status)}
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <button className="flex items-center gap-2 text-primary font-black text-[10px] uppercase tracking-widest hover:translate-x-1 transition-transform">
                                                    View Details
                                                    <Eye className="w-3.5 h-3.5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-20 text-center">
                                            <div className="w-16 h-16 rounded-3xl bg-muted flex items-center justify-center mx-auto mb-4">
                                                <ShoppingBag className="w-8 h-8 text-muted-foreground/30" />
                                            </div>
                                            <p className="text-muted-foreground font-bold uppercase tracking-widest text-xs">No orders found</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
