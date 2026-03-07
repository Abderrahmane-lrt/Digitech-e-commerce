export default function Footer() {
    return (
        <footer className="w-full bg-[#030014] border-t border-white/10 pt-16 pb-8 px-4 text-white/70 font-geist relative z-10">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-2xl font-bold tracking-tight text-white mb-4">DigiTech</h2>
                    <p className="max-w-sm mb-6">
                        INNOVATE. ELEVATE. EXPERIENCE. <br />
                        Your premium destination for the latest in digital and electronic gadgets.
                    </p>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4">Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Products</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-white font-semibold mb-4">Newsletter</h3>
                    <p className="text-sm mb-4">Subscribe to get special offers, free giveaways, and updates.</p>
                    <div className="flex gap-2">
                        <input type="email" placeholder="Email address" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 w-full text-sm focus:outline-none focus:border-[oklch(0.58_0.23_277.12)]/50 text-white placeholder:text-white/30" />
                        <button className="bg-[oklch(0.58_0.23_277.12)] hover:bg-[oklch(0.50_0.23_277.12)] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-white/40">
                <p>&copy; {new Date().getFullYear()} DigiTech. All rights reserved.</p>
                <div className="flex gap-4 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
                </div>
            </div>
        </footer>
    );
}