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
        <section className="w-full max-w-4xl mx-auto px-4 py-16 text-foreground">
            <div className="text-center mb-12">
                <h2 className="text-xl md:text-2xl font-bold tracking-wider uppercase mb-4">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">Got questions? We've got answers. If you can't find what you're looking for, feel free to contact our support team.</p>
            </div>

            <div className="space-y-4">
                {FAQS.map((faq) => (
                    <div
                        key={faq.id}
                        className={`rounded-2xl border transition-all duration-300 overflow-hidden ${openId === faq.id ? 'bg-primary/5 border-primary' : 'bg-card border-border hover:border-border/80'}`}
                    >
                        <button
                            className="w-full flex items-center justify-between p-6 text-left cursor-pointer transition-colors"
                            onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                        >
                            <span className="font-bold text-foreground">{faq.question}</span>
                            <span className={`transform transition-all duration-300 w-8 h-8 flex items-center justify-center rounded-full ${openId === faq.id ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-muted text-muted-foreground'}`}>
                                {openId === faq.id ? '-' : '+'}
                            </span>
                        </button>
                        <div
                            className={`px-6 overflow-hidden transition-all duration-300 ${openId === faq.id ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <p className="text-muted-foreground text-sm leading-relaxed border-t border-border pt-4">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
