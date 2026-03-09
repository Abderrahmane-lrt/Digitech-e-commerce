import { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingBag, Users, DollarSign, Package, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
    // Mock statistics for now
    const stats = [
        { label: 'Total Revenue', value: '$12,845', icon: DollarSign, color: 'text-green-500', bg: 'bg-green-500/10' },
        { label: 'Total Orders', value: '156', icon: ShoppingBag, color: 'text-primary', bg: 'bg-primary/10' },
        { label: 'Total Products', value: '48', icon: Package, color: 'text-orange-500', bg: 'bg-orange-500/10' },
        { label: 'Active Users', value: '892', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    ];

    return (
        <div className="bg-background min-h-screen font-geist pt-28 pb-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="mb-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                            <LayoutDashboard className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-black text-foreground tracking-tighter uppercase italic">Admin Console</h1>
                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-60">Management Overview</p>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="bg-card border border-border rounded-[24px] p-6 shadow-xl hover:scale-[1.02] transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-2xl ${stat.bg} flex items-center justify-center`}>
                                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <div className="bg-muted px-3 py-1 rounded-full flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3 text-green-500" />
                                    <span className="text-[10px] font-black text-foreground">+12%</span>
                                </div>
                            </div>
                            <h3 className="text-2xl font-black text-foreground mb-1">{stat.value}</h3>
                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] opacity-60">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-card border border-border rounded-[32px] p-8 shadow-2xl">
                        <h2 className="text-xl font-black text-foreground mb-6 uppercase italic tracking-tight">Recent Activity</h2>
                        <div className="space-y-6">
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} className="flex items-center gap-4 py-2 border-b border-border/50 last:border-0">
                                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-black text-xs text-muted-foreground">
                                        {i + 1}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-foreground">New order placed by Ahmed R.</p>
                                        <p className="text-[10px] text-muted-foreground font-medium">2 minutes ago</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-black text-primary">$120.00</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex flex-col gap-3">
                            <Link to="/admin/orders" className="block w-full py-4 bg-primary text-white font-black text-[10px] uppercase tracking-widest rounded-2xl text-center transition-all shadow-lg shadow-primary/20 hover:opacity-90">
                                View All Orders
                            </Link>
                            <Link to="/admin/products" className="block w-full py-4 bg-muted hover:bg-muted/80 text-foreground font-black text-[10px] uppercase tracking-widest rounded-2xl text-center transition-all">
                                Manage Products
                            </Link>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-[32px] p-8 shadow-2xl">
                        <h2 className="text-xl font-black text-foreground mb-6 uppercase italic tracking-tight">System Status</h2>
                        <div className="space-y-6">
                            <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                    <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">API Services Operational</p>
                                </div>
                                <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">All systems are performing within optimal parameters. No issues detected in the last 24 hours.</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                    <p className="text-[10px] font-black text-primary uppercase tracking-widest">Database Sync Active</p>
                                </div>
                                <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">Real-time database synchronization is fully active and maintaining 0ms latency across regions.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
