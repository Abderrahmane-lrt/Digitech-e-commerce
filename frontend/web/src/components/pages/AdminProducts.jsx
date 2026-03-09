import { useState, useEffect } from 'react';
import { Package, Plus, Search, Edit, Trash2, SlidersHorizontal, X, Upload, Save, Loader2 } from 'lucide-react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '@shared/api/services';
import { STORAGE_URL } from '@shared/api/axios';
import { toast } from 'react-toastify';

export default function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await getProducts();
            setProducts(res.data);
        } catch (err) {
            toast.error("Failed to load products");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (product = null) => {
        if (product) {
            setEditingProduct(product);
            setFormData({
                name: product.name,
                description: product.description || '',
                price: product.price,
                stock: product.stock,
            });
            setImagePreview(product.image ? `${STORAGE_URL}/${product.image}` : null);
        } else {
            setEditingProduct(null);
            setFormData({
                name: '',
                description: '',
                price: '',
                stock: '',
            });
            setImagePreview(null);
        }
        setImageFile(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        setImagePreview(null);
        setImageFile(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitLoading(true);
        
        const data = new FormData();
        data.append('name', formData.name);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('stock', formData.stock);
        if (imageFile) {
            data.append('image', imageFile);
        }

        try {
            if (editingProduct) {
                await updateProduct(editingProduct.id, data);
                toast.success("Product updated successfully");
            } else {
                await createProduct(data);
                toast.success("Product created successfully");
            }
            fetchProducts();
            handleCloseModal();
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to save product");
        } finally {
            setSubmitLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        
        try {
            await deleteProduct(id);
            toast.success("Product deleted successfully");
            setProducts(products.filter(p => p.id !== id));
        } catch (err) {
            toast.error("Failed to delete product");
        }
    };

    return (
        <div className="bg-background min-h-screen font-geist pt-28 pb-20 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Package className="w-8 h-8 text-primary" />
                            <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tighter uppercase italic">Inventory</h1>
                        </div>
                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-60">Manage your product catalog</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => handleOpenModal()}
                            className="bg-primary hover:opacity-90 text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-95"
                        >
                            <Plus className="w-4 h-4" />
                            Add Product
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {loading ? (
                        [1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="bg-card border border-border rounded-[32px] p-4 h-[380px] animate-pulse">
                                <div className="w-full aspect-square bg-muted rounded-2xl mb-4" />
                                <div className="h-4 bg-muted rounded w-2/3 mb-2" />
                                <div className="h-3 bg-muted rounded w-1/2" />
                            </div>
                        ))
                    ) : products.map((product) => (
                        <div key={product.id} className="bg-card border border-border rounded-[32px] p-4 group hover:border-primary/50 transition-all duration-500 shadow-xl relative overflow-hidden">
                            <div className="w-full aspect-square rounded-2xl bg-muted mb-4 relative overflow-hidden border border-border/50">
                                {product.image ? (
                                    <img src={`${STORAGE_URL}/${product.image}`} alt={product.name} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
                                ) : (
                                    <Package className="w-12 h-12 text-muted-foreground/20" />
                                )}
                                <div className="absolute top-2 right-2 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500">
                                    <button 
                                        onClick={() => handleOpenModal(product)}
                                        className="p-2 bg-card border border-border rounded-xl text-foreground hover:bg-primary hover:text-white transition-all shadow-lg"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(product.id)}
                                        className="p-2 bg-card border border-border rounded-xl text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="px-2">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] font-black text-primary uppercase tracking-widest opacity-60">Category</span>
                                    <span className="text-xs font-black text-foreground">${product.price}</span>
                                </div>
                                <h3 className="text-sm font-black text-foreground truncate uppercase italic tracking-tight mb-2">{product.name}</h3>
                                <div className="flex items-center justify-between">
                                    <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest ${product.stock > 10 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                        Stock: {product.stock}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Product Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-card border border-border w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="px-8 py-6 border-b border-border flex items-center justify-between bg-muted/30">
                            <div>
                                <h2 className="text-2xl font-black text-foreground uppercase italic tracking-tighter">
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h2>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1 opacity-60">
                                    {editingProduct ? `Editing: ${editingProduct.name}` : 'Fill in the details below'}
                                </p>
                            </div>
                            <button onClick={handleCloseModal} className="p-3 hover:bg-muted rounded-2xl transition-colors">
                                <X className="w-6 h-6 text-foreground" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Product Name</label>
                                        <input 
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full bg-muted/50 border border-border px-5 py-4 rounded-2xl text-foreground font-medium focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                            placeholder="e.g. Ultra Thin Monitor"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Price ($)</label>
                                            <input 
                                                type="number"
                                                step="0.01"
                                                value={formData.price}
                                                onChange={(e) => setFormData({...formData, price: e.target.value})}
                                                className="w-full bg-muted/50 border border-border px-5 py-4 rounded-2xl text-foreground font-medium focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                                placeholder="0.00"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Stock</label>
                                            <input 
                                                type="number"
                                                value={formData.stock}
                                                onChange={(e) => setFormData({...formData, stock: e.target.value})}
                                                className="w-full bg-muted/50 border border-border px-5 py-4 rounded-2xl text-foreground font-medium focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                                                placeholder="0"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Description</label>
                                        <textarea 
                                            value={formData.description}
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            className="w-full bg-muted/50 border border-border px-5 py-4 rounded-2xl text-foreground font-medium focus:ring-4 focus:ring-primary/10 outline-none transition-all min-h-[120px] resize-none"
                                            placeholder="Product details..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 ml-1">Product Image</label>
                                    <div className="relative group">
                                        <input 
                                            type="file"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                            accept="image/*"
                                        />
                                        <div className={`w-full aspect-square rounded-[32px] border-2 border-dashed transition-all flex flex-col items-center justify-center overflow-hidden text-center ${imagePreview ? 'border-primary/50 bg-primary/5' : 'border-border bg-muted/30 group-hover:border-primary/30 group-hover:bg-primary/5 p-8'}`}>
                                            {imagePreview ? (
                                                <div className="relative w-full h-full group/preview">
                                                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-[30px]" />
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center">
                                                        <p className="text-white text-xs font-black uppercase tracking-widest">Change Image</p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center mb-4">
                                                        <Upload className="w-8 h-8 text-primary" />
                                                    </div>
                                                    <p className="text-xs font-bold text-foreground mb-1 uppercase tracking-wider">Upload Product Image</p>
                                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest opacity-60">PNG, JPG or WebP (Max 2MB)</p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 flex items-center gap-4">
                                <button 
                                    type="submit"
                                    disabled={submitLoading}
                                    className="flex-1 bg-primary hover:opacity-90 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    {submitLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Save className="w-5 h-5" />
                                    )}
                                    {editingProduct ? 'Update Product' : 'Create Product'}
                                </button>
                                <button 
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="bg-muted hover:bg-muted/80 text-foreground px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border border-border"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
