import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, X, ShoppingCart } from 'lucide-react';
import { getProducts, addToCart } from '../../api/services';
import { STORAGE_URL } from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const PRICE_RANGES = [
    { label: 'Under $50', min: 0, max: 50 },
    { label: '$50 - $100', min: 50, max: 100 },
    { label: '$100 - $200', min: 100, max: 200 },
    { label: '$200 - $500', min: 200, max: 500 },
    { label: 'Over $500', min: 500, max: Infinity },
];

export default function ProductsPage() {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [sortBy, setSortBy] = useState('latest');
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await getProducts();
            setProducts(res.data);
        } catch (err) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (productId) => {
        if (!user) {
            toast.error('Please login to add items to cart');
            return;
        }
        try {
            await addToCart(productId, 1);
            toast.success('Added to cart!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to add to cart');
        }
    };

    // Filtering & sorting
    let filtered = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
    );

    if (selectedPriceRange !== null) {
        const range = PRICE_RANGES[selectedPriceRange];
        filtered = filtered.filter((p) => p.price >= range.min && p.price < range.max);
    }

    if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    else if (sortBy === 'name') filtered.sort((a, b) => a.name.localeCompare(b.name));

    const clearFilters = () => {
        setSearch('');
        setSelectedPriceRange(null);
        setSortBy('latest');
    };

    const hasActiveFilters = search || selectedPriceRange !== null || sortBy !== 'latest';

    const FilterSidebar = () => (
        <div className="space-y-8">
            {/* Search */}
            <div>
                <h3 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-3">Search</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search products..."
                        className="w-full bg-muted border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h3 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-3">Price Range</h3>
                <div className="space-y-1.5">
                    {PRICE_RANGES.map((range, i) => (
                        <label
                            key={i}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors text-sm ${selectedPriceRange === i
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }`}
                        >
                            <input
                                type="radio"
                                name="price"
                                checked={selectedPriceRange === i}
                                onChange={() => setSelectedPriceRange(selectedPriceRange === i ? null : i)}
                                className="accent-primary w-3.5 h-3.5"
                            />
                            {range.label}
                        </label>
                    ))}
                </div>
            </div>

            {/* Sort By */}
            <div>
                <h3 className="text-foreground font-semibold text-sm uppercase tracking-wider mb-3">Sort By</h3>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-muted border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-colors"
                >
                    <option value="latest">Latest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                </select>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
                <button
                    onClick={clearFilters}
                    className="w-full py-2.5 rounded-xl border border-border bg-muted text-muted-foreground text-sm hover:bg-muted/80 hover:text-foreground transition-colors"
                >
                    Clear All Filters
                </button>
            )}
        </div>
    );

    return (
        <div className="bg-background min-h-screen font-geist pt-28 pb-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Page Header */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-wide">Products</h1>
                    <div className="w-full h-px bg-gradient-to-r from-primary/50 via-border to-transparent mt-4" />
                </div>

                {/* Active Filters Bar */}
                {hasActiveFilters && (
                    <div className="flex items-center gap-3 mb-6 flex-wrap">
                        <span className="text-muted-foreground text-sm uppercase tracking-widest font-bold opacity-60">Selections:</span>
                        {search && (
                            <span className="inline-flex items-center gap-1.5 bg-muted border border-border text-foreground text-xs px-3 py-1.5 rounded-full">
                                "{search}" <X className="w-3 h-3 cursor-pointer hover:text-primary" onClick={() => setSearch('')} />
                            </span>
                        )}
                        {selectedPriceRange !== null && (
                            <span className="inline-flex items-center gap-1.5 bg-muted border border-border text-foreground text-xs px-3 py-1.5 rounded-full">
                                {PRICE_RANGES[selectedPriceRange].label}
                                <X className="w-3 h-3 cursor-pointer hover:text-primary" onClick={() => setSelectedPriceRange(null)} />
                            </span>
                        )}
                        <button onClick={clearFilters} className="text-primary text-xs hover:underline ml-auto font-bold uppercase tracking-wider">
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Mobile Filter Button */}
                <button
                    onClick={() => setShowMobileFilters(!showMobileFilters)}
                    className="lg:hidden flex items-center gap-2 mb-6 px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-sm hover:bg-muted/80 transition-colors shadow-sm"
                >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                </button>

                <div className="flex gap-8">
                    {/* Sidebar - Desktop */}
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-28 bg-card border border-border rounded-2xl p-6 backdrop-blur-md shadow-sm">
                            <h2 className="text-foreground font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                                <SlidersHorizontal className="w-4 h-4 text-primary" />
                                Filter
                            </h2>
                            <FilterSidebar />
                        </div>
                    </aside>

                    {/* Mobile Filters Drawer */}
                    {showMobileFilters && (
                        <div className="fixed inset-0 z-[200] lg:hidden">
                            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowMobileFilters(false)} />
                            <div className="absolute left-0 top-0 h-full w-80 bg-card border-r border-border p-6 overflow-y-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-foreground font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                                        <SlidersHorizontal className="w-4 h-4 text-primary" />
                                        Filter
                                    </h2>
                                    <button onClick={() => setShowMobileFilters(false)} className="text-muted-foreground hover:text-foreground">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <FilterSidebar />
                            </div>
                        </div>
                    )}

                    {/* Product Grid */}
                    <div className="flex-1 min-w-0">
                        <p className="text-muted-foreground text-sm mb-6">{filtered.length} results</p>

                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="rounded-2xl bg-card border border-border p-5 animate-pulse shadow-sm">
                                        <div className="w-full h-48 rounded-xl bg-muted mb-4" />
                                        <div className="h-4 bg-muted rounded w-1/3 mb-2" />
                                        <div className="h-5 bg-muted rounded w-2/3 mb-3" />
                                        <div className="h-4 bg-muted rounded w-1/4" />
                                    </div>
                                ))}
                            </div>
                        ) : filtered.length === 0 ? (
                            <div className="text-center py-20">
                                <p className="text-muted-foreground text-lg">No products found</p>
                                <p className="text-muted-foreground/60 text-sm mt-2">Try adjusting your filters</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filtered.map((product) => (
                                    <div
                                        key={product.id}
                                        className="group relative flex flex-col justify-between rounded-3xl bg-card border border-border p-5 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 shadow-sm"
                                    >
                                        {/* Image */}
                                        <Link to={`/products/${product.id}`}>
                                            <div className="w-full h-48 rounded-2xl bg-muted mb-4 overflow-hidden relative border border-border/50">
                                                {product.image ? (
                                                    <img
                                                        src={`${STORAGE_URL}/${product.image}`}
                                                        alt={product.name}
                                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
                                                    />
                                                ) : (
                                                    <div className="flex flex-col items-center gap-2">
                                                        <div className="w-20 h-20 bg-muted rounded-full blur-2xl absolute opacity-20" />
                                                        <span className="relative text-muted-foreground text-xs font-bold uppercase tracking-widest">No Image</span>
                                                    </div>
                                                )}
                                            </div>
                                        </Link>

                                        {/* Info */}
                                        <div className="flex flex-col gap-1 px-1">
                                            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Desktop Accessory</span>
                                            <Link to={`/products/${product.id}`}>
                                                <h3 className="text-foreground font-bold text-lg leading-tight hover:text-primary transition-colors line-clamp-1">
                                                    {product.name}
                                                </h3>
                                            </Link>
                                            <div className="flex items-center justify-between mt-4">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-muted-foreground font-medium uppercase">Price</span>
                                                    <span className="text-foreground font-black text-xl tracking-tight">${product.price}</span>
                                                </div>
                                                {product.stock > 0 ? (
                                                    <span className="inline-flex items-center gap-1.5 text-green-500 text-[10px] font-bold uppercase tracking-wider">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                                        In Stock
                                                    </span>
                                                ) : (
                                                    <span className="text-red-500 text-[10px] font-bold uppercase tracking-wider">Out of Stock</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Add to Cart */}
                                        <button
                                            onClick={() => handleAddToCart(product.id)}
                                            disabled={product.stock === 0}
                                            className="w-full mt-6 py-3 rounded-full bg-foreground text-background font-bold text-xs uppercase tracking-widest hover:bg-primary transition-all duration-300 shadow-lg shadow-black/5 hover:shadow-primary/30 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            Add to Cart
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) }
                    </div>
                </div>
            </div>
        </div>
    );
}
