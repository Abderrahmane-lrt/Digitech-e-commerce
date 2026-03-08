import { Monitor } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full bg-card border-t border-border pt-16 pb-8 px-4 text-muted-foreground font-geist relative z-10 transition-colors duration-300">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div className="col-span-1 md:col-span-2">
                    <h2 className="text-2xl font-black tracking-tighter text-foreground mb-4 font-geist uppercase tracking-[0.2em] flex items-center gap-2">
                        <Monitor className="w-6 h-6 text-primary" />
                        DIGITECH
                    </h2>
                    <p className="max-w-sm mb-6 text-sm font-medium leading-relaxed">
                        INNOVATE. ELEVATE. EXPERIENCE. <br />
                        Your premium destination for the latest in digital and electronic gadgets.
                    </p>
                </div>

                <div>
                    <h3 className="text-foreground font-black text-[10px] uppercase tracking-[0.2em] mb-6">Links</h3>
                    <ul className="space-y-3 text-xs font-bold uppercase tracking-widest">
                        <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                        <li><a href="/products" className="hover:text-primary transition-colors">Products</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-foreground font-black text-[10px] uppercase tracking-[0.2em] mb-6">Newsletter</h3>
                    <p className="text-xs font-medium mb-6 leading-relaxed">Subscribe to get special offers, free giveaways, and updates.</p>
                    <div className="flex gap-2">
                        <input type="email" placeholder="Email address" className="bg-muted border border-border rounded-xl px-4 py-3 w-full text-xs font-bold focus:outline-none focus:border-primary/50 text-foreground placeholder:text-muted-foreground transition-all" />
                        <button className="bg-primary hover:opacity-90 text-white px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20">
                            Join
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
                <p>&copy; {new Date().getFullYear()} DigiTech. All rights reserved.</p>
                <div className="flex gap-8 mt-4 md:mt-0">
                    <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a>
                </div>
            </div>
        </footer>
    );
}