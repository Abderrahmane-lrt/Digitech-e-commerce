import React from 'react';

const REVIEWS = [
    {
        id: 1,
        name: "Sarah Jenkins",
        role: "Tech Enthusiast",
        rating: 5,
        review: "The Razorblade Nebula X completely blew me away. The build quality and the display are out of this world. Highly recommend!",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
        id: 2,
        name: "Michael Chen",
        role: "Gamer",
        rating: 5,
        review: "AstroShift K900 is the best mechanical keyboard I've ever owned. The tactile feel and the custom RGB sync perfectly with my rig.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        role: "Content Creator",
        rating: 4,
        review: "SonarPro X1 has incredible sound clarity. It's a bit heavy for long sessions, but the audio quality more than makes up for it.",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150"
    }
];

export default function Reviews() {
    return (
        <section className="w-full max-w-6xl mx-auto px-4 py-16 text-white">
            <div className="flex items-center justify-between mb-10">
                <h2 className="text-xl md:text-2xl font-bold tracking-wider uppercase">What Our Customers Say</h2>
                <div className="hidden sm:flex items-center gap-2 text-sm text-[oklch(0.58_0.23_277.12)] cursor-pointer hover:underline">
                    View all reviews &rarr;
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {REVIEWS.map((review) => (
                    <div key={review.id} className="relative group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[oklch(0.58_0.23_277.12)]/50 hover:shadow-[0_0_15px_oklch(0.58_0.23_277.12_/_30%)] transition-all duration-300 backdrop-blur-md flex flex-col">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover border-2 border-[oklch(0.58_0.23_277.12)]" />
                            <div>
                                <h3 className="font-semibold text-lg">{review.name}</h3>
                                <p className="text-xs text-[oklch(0.58_0.23_277.12)]">{review.role}</p>
                            </div>
                        </div>
                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-white/20'}`} fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed flex-grow">
                            "{review.review}"
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
