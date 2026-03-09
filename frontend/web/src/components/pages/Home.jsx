import Hero from "../Hero/Hero";
import ProductGrid from "../Products/ProductGrid";
import DotGrid from '../react-bits/DotGrid-JS-TW';
import Reviews from "../Home/Reviews";
import FAQ from "../Home/FAQ";
import { useTheme } from "../../context/ThemeContext";

export default function Home() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="bg-background min-h-screen flex flex-col font-geist relative transition-colors duration-300">
            <div className="fixed inset-0 z-0">
                <DotGrid
                    dotSize={isDark ? 8 : 4}
                    gap={isDark ? 40 : 30}
                    baseColor={isDark ? "#1e1b4b" : "#e5e7eb"}
                    activeColor="var(--color-primary)"
                    proximity={isDark ? 180 : 120}
                    shockRadius={isDark ? 250 : 150}
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
