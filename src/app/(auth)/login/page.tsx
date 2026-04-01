'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart, Eye, EyeOff, ArrowRight, Shield, BarChart2, Zap } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Simulate auth
    await new Promise(r => setTimeout(r, 1200));
    if (email && password) {
      router.push('/dashboard');
    } else {
      setError('Please enter your email and password.');
      setLoading(false);
    }
  };

  const handleDemo = () => {
    setEmail('demo@renewher.ng');
    setPassword('demo2026');
  };

  return (
    <div className="min-h-screen bg-[#080616] flex">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-col w-1/2 bg-gradient-to-br from-[#0d0b1a] via-[#130e2b] to-[#1a0e2e] relative overflow-hidden p-12">
        {/* Glows */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-600/15 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none" />

        {/* Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-rose-500 flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold">Women&apos;s Health Pulse</p>
            <p className="text-rose-400 text-xs font-semibold tracking-widest uppercase">Nigeria · RenewHER</p>
          </div>
        </div>

        {/* Hero Text */}
        <div className="flex-1 flex flex-col justify-center relative z-10">
          <h1 className="text-4xl font-bold text-white leading-tight mb-6">
            Intelligence Platform for<br />
            <span className="bg-gradient-to-r from-purple-400 to-rose-400 bg-clip-text text-transparent">
              Women&apos;s Health in Nigeria
            </span>
          </h1>
          <p className="text-white/55 text-lg leading-relaxed mb-10">
            Monitor conversations, detect misinformation, surface content opportunities,
            and respond to what Nigerian women are saying — in real time.
          </p>

          {/* Features */}
          <div className="space-y-4">
            {[
              { icon: BarChart2, title: 'Real-time Social Listening', desc: 'Track millions of conversations across all platforms' },
              { icon: Shield, title: 'Misinformation Detection', desc: 'AI-powered alerts for harmful health myths' },
              { icon: Zap, title: 'Content Opportunity Engine', desc: 'Auto-generate Reels, threads, and campaigns' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{title}</p>
                  <p className="text-white/45 text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex gap-6 relative z-10 pt-8 border-t border-white/8">
          {[
            { value: '142K+', label: 'Mentions This Week' },
            { value: '12', label: 'Platforms Monitored' },
            { value: '34', label: 'Health Topics Tracked' },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-white font-bold text-xl">{value}</p>
              <p className="text-white/40 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="flex items-center gap-3 mb-10 lg:hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-rose-500 flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">Women&apos;s Health Pulse Nigeria</p>
              <p className="text-rose-400 text-xs font-semibold tracking-widest uppercase">RenewHER</p>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">Sign in to your account</h2>
          <p className="text-white/45 text-sm mb-8">
            Access your intelligence dashboard →{' '}
            <button onClick={handleDemo} className="text-purple-400 hover:text-purple-300 underline underline-offset-2">
              Use demo credentials
            </button>
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-white/60 text-sm font-medium">Email address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@renewher.ng"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/25 text-sm outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-white/60 text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-white placeholder:text-white/25 text-sm outline-none focus:border-purple-500/50 focus:bg-purple-500/5 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-white/50 cursor-pointer">
                <input type="checkbox" className="rounded" />
                Remember me
              </label>
              <a href="#" className="text-purple-400 hover:text-purple-300">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-white/30 text-xs text-center mt-8">
            © 2026 RenewHER · Women&apos;s Health Pulse Nigeria · Secure & Encrypted
          </p>
        </div>
      </div>
    </div>
  );
}
