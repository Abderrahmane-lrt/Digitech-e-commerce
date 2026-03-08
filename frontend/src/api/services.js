import api from './axios';

// ─── Products ───
export const getProducts = () => api.get('/api/products');
export const getProduct = (id) => api.get(`/api/products/${id}`);
export const createProduct = (data) => api.post('/api/products', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateProduct = (id, data) => api.post(`/api/products/${id}?_method=PUT`, data, {
    headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteProduct = (id) => api.delete(`/api/products/${id}`);

// ─── Cart ───
export const getCart = () => api.get('/api/cart');
export const addToCart = (product_id, quantity = 1) =>
    api.post('/api/cart', { product_id, quantity });
export const updateCartItem = (id, quantity) =>
    api.put(`/api/cart/${id}`, { quantity });
export const removeCartItem = (id) => api.delete(`/api/cart/${id}`);

// ─── Orders ───
export const getOrders = () => api.get('/api/orders');
export const getAdminOrders = () => api.get('/api/admin/orders');
export const createOrder = () => api.post('/api/orders');
export const getOrder = (id) => api.get(`/api/orders/${id}`);

// ─── User Profile ───
export const updateProfile = (data) => api.put('/api/user', data);
export const deleteAccount = () => api.delete('/api/user');
