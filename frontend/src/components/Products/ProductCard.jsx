export default function ProductCard({ title, category, price, image, rating }) {
    return (
        <div className="group relative flex flex-col justify-between rounded-2xl bg-white/5 border border-white/10 p-5 hover:border-[oklch(0.58_0.23_277.12)]/50 hover:shadow-[0_0_15px_oklch(0.58_0.23_277.12_/_30%)] hover:-translate-y-1 transition-all duration-300 backdrop-blur-md">
            {/* Image Container */}
            <div className="w-full h-48 rounded-xl bg-black/20 mb-4 overflow-hidden flex items-center justify-center relative inner-shadow">
                {image ? (
                    <img src={image} alt={title} className="object-cover w-full h-full mix-blend-screen opacity-90 group-hover:scale-105 transition-transform duration-500" />
                ) : (
                    <div className="w-24 h-24 bg-white/10 rounded-full blur-2xl absolute" />
                )}
            </div>

            <div className="flex flex-col gap-1">
                <span className="text-xs text-white/50">{category}</span>
                <h3 className="text-white font-medium text-lg leading-tight">{title}</h3>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-[oklch(0.58_0.23_277.12)] font-bold">${price}</span>
                    <div className="flex gap-1">
                        {/* Simple rating stars */}
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-3 h-3 ${i < rating ? 'text-yellow-400' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                </div>
            </div>

            <button className="w-full mt-5 py-2.5 rounded-full border border-white/10 bg-white/5 text-white/80 text-sm font-medium hover:bg-[oklch(0.58_0.23_277.12)] hover:border-[oklch(0.58_0.23_277.12)] hover:text-white transition-all duration-300 cursor-pointer">
                Add to Cart
            </button>
        </div>
    );
}
