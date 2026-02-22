import React, { useEffect, useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Login = () => {
    const navigate = useNavigate();
    const { signInWithEmail, signUpWithEmail, user } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    const handleGoogleSignIn = async () => {
        try {
            setError(null);
            setLoading(true);
            const result = await signInWithPopup(auth, googleProvider);
            if (result.user) {
                navigate('/dashboard');
            }
        } catch (err) {
            console.error("Login Error:", err);
            // Handle common popup errors (like user closing the window)
            if (err.code === 'auth/popup-closed-by-user') {
                setError("로그인 창이 닫혔습니다. 다시 시도해 주세요.");
            } else {
                setError(err.message || "구글 로그인을 완료할 수 없습니다.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            if (isSignUp) {
                await signUpWithEmail(email, password, displayName);
            } else {
                await signInWithEmail(email, password);
            }
            navigate('/dashboard');
        } catch (err) {
            console.error("Auth Error:", err);
            let message = "인증 중 오류가 발생했습니다.";
            if (err.code === 'auth/user-not-found') message = "가입되지 않은 이메일입니다.";
            if (err.code === 'auth/wrong-password') message = "비밀번호가 올바르지 않습니다.";
            if (err.code === 'auth/email-already-in-use') message = "이미 사용 중인 이메일입니다.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-screen bg-[#080812] text-white flex flex-col font-['Inter']">
            <Navbar />
            <div className="flex-1 flex items-center justify-center px-6 pt-[120px] pb-[60px]">
                <div className="max-w-md w-full bg-[#12121A] border border-white/5 rounded-3xl p-10 shadow-2xl relative overflow-hidden group">
                    {/* Decorative Gradient Background */}
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-purple/10 rounded-full blur-3xl group-hover:bg-brand-purple/20 transition-all duration-700"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-blue/10 rounded-full blur-3xl group-hover:bg-brand-blue/20 transition-all duration-700"></div>

                    <div className="relative z-10 space-y-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                                <svg className="w-8 h-8 text-brand-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h2 className="text-3xl font-black uppercase tracking-tighter mb-2">
                                {isSignUp ? "Create Account" : "Welcome Back"}
                            </h2>
                            <p className="text-white/40 font-medium leading-relaxed">
                                {isSignUp
                                    ? "OK KOREA의 새로운 회원이 되어보세요."
                                    : "회원님의 학습 현황을 확인하려면 로그인하세요."}
                            </p>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-[11px] font-bold text-center">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                            {isSignUp && (
                                <div className="space-y-1">
                                    <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest pl-1">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-brand-purple/50 outline-none transition-colors"
                                        placeholder="홍길동"
                                    />
                                </div>
                            )}
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest pl-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-brand-purple/50 outline-none transition-colors"
                                    placeholder="name@email.com"
                                />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest pl-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm focus:border-brand-purple/50 outline-none transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 bg-gradient-to-r from-brand-purple to-brand-blue text-white rounded-xl font-black text-lg shadow-lg hover:scale-[1.02] transition-all active:scale-[0.98] disabled:opacity-50 mt-4"
                            >
                                {loading ? "Processing..." : (isSignUp ? "Join Now" : "Sign In")}
                            </button>
                        </form>

                        <div className="relative py-2">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/5"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                                <span className="bg-[#12121A] px-4 text-white/20">or continue with</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="w-full h-14 bg-white text-[#080812] rounded-xl font-black text-lg flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform shadow-[0_0_30px_rgba(255,255,255,0.05)] active:scale-[0.98]"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" />
                            </svg>
                            Google
                        </button>

                        <div className="text-center">
                            <button
                                onClick={() => setIsSignUp(!isSignUp)}
                                className="text-white/40 text-xs font-bold hover:text-white transition-colors"
                            >
                                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Create One"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;

