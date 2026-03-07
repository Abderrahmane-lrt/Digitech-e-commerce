import Hero from "../Hero/Hero";
import ProductGrid from "../Products/ProductGrid";
import DotGrid from '../react-bits/DotGrid-JS-TW';
import Reviews from "../Home/Reviews";
import FAQ from "../Home/FAQ";

export default function Home() {
    return (
        <div className="bg-[#030014] min-h-screen flex flex-col font-geist relative">
            <div className="fixed inset-0 z-0">
                <DotGrid
                    dotSize={8}
                    gap={40}
                    baseColor="#1e1b4b"
                    activeColor="#000000"
                    proximity={180}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                />
            </div>
            <div className="relative z-10 w-full flex flex-col">
                <Hero />
                <div className="w-full pt-22 pb-32">
                    <ProductGrid />
                </div>
                <div className="w-full pb-32">
                    <Reviews />
                </div>
                <div className="w-full pb-32">
                    <FAQ />
                </div>
            </div>
        </div>
    );
}
