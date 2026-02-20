import React, { useState, useRef } from 'react';
import { User, Phone, Mail, Globe, Upload, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const ConsultationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        nationality: '',
        message: ''
    });
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('idle'); // idle | loading | success | error
    const fileInputRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            // 1. Save to Firestore
            const docRef = await addDoc(collection(db, "consultations"), {
                ...formData,
                hasAttachment: !!file,
                fileName: file ? file.name : null,
                createdAt: serverTimestamp(),
                status: 'new'
            });

            console.log("Consultation saved with ID: ", docRef.id);

            // 2. Send to Make.com Webhook for Email Notification
            const WEBHOOK_URL = 'https://hook.eu1.make.com/2jtlxg7vgm5zjwypzaijy0yn5il1sdkn';
            try {
                console.log("Sending data to Webhook:", WEBHOOK_URL);
                const response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id: docRef.id,
                        ...formData,
                        hasAttachment: !!file,
                        fileName: file ? file.name : null,
                        timestamp: new Date().toISOString()
                    })
                });

                if (response.ok) {
                    console.log("Make.com Webhook reported SUCCESS");
                } else {
                    console.error("Make.com Webhook reported ERROR:", response.status);
                }
            } catch (webhookError) {
                console.error("Webhook network error:", webhookError);
                // Note: We don't fail the UI state just because the notification failed
            }

            // 3. Update UI state
            setStatus('success');
            setFormData({ name: '', mobile: '', email: '', nationality: '', message: '' });
            setFile(null);

            // Auto-reset success message after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error("Error adding document: ", error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="consultation" className="relative pt-12 pb-20 px-6 md:px-12 bg-[#0B0C15] overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#FBBF24]/5 rounded-full blur-[100px]"></div>
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-[#7C3AED]/5 rounded-full blur-[100px]"></div>

            <div className="max-w-2xl mx-auto relative z-10">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white tracking-tight">
                        Visa <span className="text-[#FBBF24]">Consulting</span>
                    </h2>
                    <p className="text-slate-400 text-base max-w-xl mx-auto leading-relaxed">
                        Expert guidance for your Korean journey. Fill out the form below, and our specialists will get back to you within 24 hours.
                    </p>
                </div>

                <div className="bg-[#13141C] p-6 md:p-8 rounded-2xl border border-white/5 shadow-2xl">
                    {status === 'success' ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
                            <CheckCircle size={80} className="text-[#FBBF24] mb-6 animate-bounce" />
                            <h3 className="text-3xl font-bold text-white mb-4">Request Submitted!</h3>
                            <p className="text-slate-400 text-lg">
                                Thank you for your interest. We will review your details and contact you via email or phone shortly.
                            </p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="mt-8 px-8 py-3 bg-white/5 hover:bg-white/10 text-white rounded-full transition-all"
                            >
                                Send another request
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Name Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400 block ml-1">Full Name *</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#FBBF24] transition-colors">
                                            <User size={20} />
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="w-full bg-[#0B0C15] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#FBBF24]/50 focus:ring-1 focus:ring-[#FBBF24]/50 transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                {/* Mobile Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400 block ml-1">Mobile Number *</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#FBBF24] transition-colors">
                                            <Phone size={20} />
                                        </div>
                                        <input
                                            required
                                            type="tel"
                                            name="mobile"
                                            value={formData.mobile}
                                            onChange={handleChange}
                                            placeholder="+82 10-XXXX-XXXX"
                                            className="w-full bg-[#0B0C15] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#FBBF24]/50 focus:ring-1 focus:ring-[#FBBF24]/50 transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                {/* Email Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400 block ml-1">Email Address *</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#FBBF24] transition-colors">
                                            <Mail size={20} />
                                        </div>
                                        <input
                                            required
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            className="w-full bg-[#0B0C15] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#FBBF24]/50 focus:ring-1 focus:ring-[#FBBF24]/50 transition-all shadow-inner"
                                        />
                                    </div>
                                </div>

                                {/* Nationality Field */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-400 block ml-1">Nationality *</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#FBBF24] transition-colors">
                                            <Globe size={20} />
                                        </div>
                                        <input
                                            required
                                            type="text"
                                            name="nationality"
                                            value={formData.nationality}
                                            onChange={handleChange}
                                            placeholder="e.g. Nepal, USA, Vietnam"
                                            className="w-full bg-[#0B0C15] border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#FBBF24]/50 focus:ring-1 focus:ring-[#FBBF24]/50 transition-all shadow-inner"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Optional Message */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400 block ml-1">Additional Message (Optional)</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    placeholder="Briefly describe your visa requirements..."
                                    className="w-full bg-[#0B0C15] border border-white/10 rounded-xl py-3 px-4 text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-[#FBBF24]/50 focus:ring-1 focus:ring-[#FBBF24]/50 transition-all shadow-inner resize-none"
                                ></textarea>
                            </div>

                            {/* File Upload */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-400 block ml-1">Upload Documents (Optional)</label>
                                <div
                                    onClick={() => fileInputRef.current.click()}
                                    className="w-full border-2 border-dashed border-white/10 rounded-xl py-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#FBBF24]/40 hover:bg-white/[0.02] transition-all group"
                                >
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-[#FBBF24] group-hover:bg-[#FBBF24]/10 transition-all">
                                        <Upload size={24} />
                                    </div>
                                    <div className="text-center px-4">
                                        <p className="text-white font-medium">
                                            {file ? file.name : "Click to upload passport or documents"}
                                        </p>
                                        <p className="text-slate-500 text-xs mt-1">
                                            Max file size: 5MB (PDF, JPG, PNG)
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-[#FBBF24] hover:bg-[#FBBF24]/90 disabled:bg-slate-700 disabled:cursor-not-allowed text-[#080812] font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-[0_0_30px_rgba(251,191,36,0.2)] mt-6 text-base"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-[#080812]/20 border-t-[#080812] rounded-full animate-spin"></div>
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Send size={22} />
                                        Submit Consultation Request
                                    </>
                                )}
                            </button>

                            {status === 'error' && (
                                <div className="flex items-center gap-2 text-red-500 justify-center animate-shake mt-4 bg-red-500/10 py-3 rounded-xl border border-red-500/20">
                                    <AlertCircle size={20} />
                                    <span>Failed to send. Please try again or check your connection.</span>
                                </div>
                            )}
                        </form>
                    )}
                </div>

                {/* Trust Indicators */}
                <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all">
                    {/* Add any mini trust badges or text here if needed */}
                    <p className="text-slate-500 text-sm italic">
                        * Your data is encrypted and handled by Korean certified visa consultants.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ConsultationForm;
