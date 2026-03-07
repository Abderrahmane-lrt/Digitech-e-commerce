import Navbar from "./components/partials/Navbar";
import Footer from "./components/partials/Footer";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>

    )
}