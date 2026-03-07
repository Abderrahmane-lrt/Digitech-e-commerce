import DotGrid from '../react-bits/DotGrid-JS-TW';

export default function Hero() {
    return (
        <div className="relative w-full h-[600px] md:h-[800px] bg-[#030014] overflow-hidden flex flex-col items-center justify-center font-geist">
            <div className="absolute inset-0 z-0">
                <DotGrid
                    dotSize={6}
                    gap={40}
                    baseColor="#1e1b4b"
                    activeColor="oklch(0.58 0.23 277.12)"
                    proximity={180}
                    shockRadius={250}
                    shockStrength={5}
                    resistance={750}
                    returnDuration={1.5}
                />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-start pt-55 text-center px-4 w-full h-full">
                <h1 className="text-5xl md:text-7xl lg:text-[96px] font-bold text-white tracking-widest mb-4 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                    DIGITECH
                </h1>

                <p className="text-sm md:text-lg text-white/70 tracking-[0.2em] font-medium mb-10">
                    INNOVATE. ELEVATE. EXPERIENCE.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button className="px-8 py-3.5 rounded-full bg-[oklch(0.58_0.23_277.12)] hover:bg-[oklch(0.50_0.23_277.12)] text-white font-semibold transition-colors w-full sm:w-auto cursor-pointer">
                        Shop Now
                    </button>
                    <button className="px-8 py-3.5 rounded-full border border-white/10 bg-white/5 text-white/80 font-medium hover:bg-white/10 transition-colors w-full sm:w-auto cursor-pointer">
                        Explore
                    </button>
                </div>
            </div>
        </div>
    );
}