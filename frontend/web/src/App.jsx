import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./layout";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ProductsPage from "./components/pages/ProductsPage";
import ProductDetail from "./components/pages/ProductDetail";
import CartPage from "./components/pages/CartPage";
import OrdersPage from "./components/pages/OrdersPage";
import ProfilePage from "./components/pages/ProfilePage";
import AdminDashboard from "./components/pages/AdminDashboard";
import AdminOrders from "./components/pages/AdminOrders";
import AdminProducts from "./components/pages/AdminProducts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastContainer position="top-right" autoClose={5000} />
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            
            {/* Protected Routes */}
            <Route path="/cart" element={
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            } />
            <Route path="/orders" element={
              <ProtectedRoute>
                <OrdersPage />
              </ProtectedRoute>
            } />
            
            <Route path="/profile" element={
               <ProtectedRoute>
                  <ProfilePage />
               </ProtectedRoute>
            } />

            {/* Admin Routes */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/orders" element={
              <ProtectedRoute adminOnly>
                <AdminOrders />
              </ProtectedRoute>
            } />
            <Route path="/admin/products" element={
              <ProtectedRoute adminOnly>
                <AdminProducts />
              </ProtectedRoute>
            } />
          </Routes>
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App;
