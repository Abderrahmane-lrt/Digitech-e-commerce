import React, { useState } from 'react';

const FAQS = [
    {
        id: 1,
        question: "What is your return policy?",
        answer: "We offer a 30-day money-back guarantee on all our products. If you are not completely satisfied, you can return the item in its original condition for a full refund."
    },
    {
        id: 2,
        question: "How long does shipping take?",
        answer: "Standard shipping typically takes 3-5 business days within the continental US. We also offer expedited 2-day and overnight shipping options at checkout."
    },
    {
        id: 3,
        question: "Do your products come with a warranty?",
        answer: "Yes, all our electronics come with a standard 1-year manufacturer's warranty. You can also purchase extended warranty plans ranging from 2 to 3 years."
    },
    {
        id: 4,
        question: "Do you ship internationally?",
        answer: "Currently, we ship to over 50 countries worldwide. International shipping times vary depending on the destination and customs processing."
    },
    {
        id: 5,
        question: "How can I track my order?",
        answer: "Once your order has shipped, you will receive an email containing your tracking number and a link to track your package's progress."
    }
];

export default function FAQ() {
    const [openId, setOpenId] = useState(1);

    return (
        <section className="w-full max-w-4xl mx-auto px-4 py-16 text-white">
            <div className="text-center mb-12">
                <h2 className="text-xl md:text-2xl font-bold tracking-wider uppercase mb-4">Frequently Asked Questions</h2>
                <p className="text-white/60">Got questions? We've got answers. If you can't find what you're looking for, feel free to contact our support team.</p>
            </div>

            <div className="space-y-4">
                {FAQS.map((faq) => (
                    <div
                        key={faq.id}
                        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openId === faq.id ? 'bg-[oklch(0.58_0.23_277.12)]/10 border-[oklch(0.58_0.23_277.12)]' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
                    >
                        <button
                            className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                        >
                            <span className="font-medium">{faq.question}</span>
                            <span className={`transform transition-transform duration-300 w-8 h-8 flex items-center justify-center rounded-full ${openId === faq.id ? 'bg-[oklch(0.58_0.23_277.12)] text-white' : 'bg-white/10 text-white/50'}`}>
                                {openId === faq.id ? '-' : '+'}
                            </span>
                        </button>
                        <div
                            className={`px-6 overflow-hidden transition-all duration-300 ${openId === faq.id ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <p className="text-white/70 text-sm leading-relaxed border-t border-white/10 pt-4">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
