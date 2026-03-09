import DotGrid from '../react-bits/DotGrid-JS-TW';
import TrueFocus from '../react-bits/TrueFocus';
import { useTheme } from "@/context/ThemeContext";
import { Link } from 'react-router-dom';

export default function Hero() {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className="relative w-full h-[600px] md:h-[800px] bg-background overflow-hidden flex flex-col items-center justify-center font-geist transition-colors duration-300">
            <div className="absolute inset-0 z-0">
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

            <div className="relative z-10 flex flex-col items-center justify-start pt-52 text-center gap-4 px-4 w-full h-full">
                <h1 className="text-5xl md:text-7xl lg:text-[96px] font-bold text-foreground tracking-widest mb-8 drop-shadow-sm transition-colors duration-300">
                    DIGITECH
                </h1>



                <div className="text-primary mb-10">
                    <TrueFocus
                        sentence="INNOVATE ELEVATE EXPERIENCE"
                        manualMode={false}
                        blurAmount={5}
                        borderColor="var(--color-primary)"
                        glowColor="var(--color-primary-foreground) / 60%)"
                        animationDuration={0.5}
                        pauseBetweenAnimations={1}
                    />
                </div>


                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Link to="/products"     className="px-8 py-3.5 rounded-full bg-primary hover:opacity-90 text-white font-semibold transition-all w-full sm:w-auto cursor-pointer shadow-lg shadow-primary/20">
                        Shop Now
                    </Link>
                       <Link to="/products" className="px-8 py-3.5 rounded-full border border-border bg-card text-foreground font-medium hover:bg-muted transition-all w-full sm:w-auto cursor-pointer shadow-sm">
                        Explore
                    </Link  >
                </div>
            </div>
        </div>
    );
}