import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { 
  Store, 
  ShieldCheck, 
  TrendingUp, 
  ArrowRight, 
  Phone, 
  Lock,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [shopName, setShopName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    // Mock authentication
    toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white selection:bg-indigo-100">
      {/* Left Column: Brand & Moto (Industry Standard Split Layout) */}
      <div className="hidden lg:flex flex-col justify-between p-16 bg-slate-950 relative overflow-hidden">
        {/* Abstract Background Design */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -mr-64 -mt-64 text-indigo-500"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>
        
        {/* Top Logo Part */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-white/5 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/10">
             <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white tracking-widest uppercase">CreditLedger</h1>
            <p className="text-[10px] text-slate-500 font-black tracking-[0.3em] uppercase">The Digital Standard</p>
          </div>
        </div>

        {/* Middle: Moto Lines & Features */}
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/5 rounded-full mb-8">
             <Sparkles className="w-3 h-3 text-indigo-400" />
             <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest italic">V2.4 Architecture Now Live</span>
          </div>
          
          <h2 className="text-6xl font-black text-white tracking-tighter leading-[0.9] mb-8">
            {isLogin ? "Master your " : "Scale your "}
            <span className="block text-indigo-500 italic mt-2 underline decoration-indigo-400/20 underline-offset-8 decoration-8 font-black">
               {isLogin ? "cashflow." : "legacy."}
            </span>
          </h2>
          
          <p className="text-xl text-slate-400 font-bold leading-relaxed mb-12 max-w-sm">
             {isLogin 
               ? "The most sophisticated digital ledger for modern Indian merchants."
               : "Join 10,000+ merchants and upgrade your business with our military-grade ledger."
             }
          </p>

          <div className="grid grid-cols-1 gap-6">
             <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-indigo-600/20 transition-all">
                   <ShieldCheck className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                   <p className="text-sm font-black text-white">Military Grade Security</p>
                   <p className="text-xs font-bold text-slate-500">Every transaction is end-to-end encrypted.</p>
                </div>
             </div>
             <div className="flex items-center gap-5 group">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-indigo-600/20 transition-all">
                   <TrendingUp className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                   <p className="text-sm font-black text-white">Real-time Insights</p>
                   <p className="text-xs font-bold text-slate-500">Auto-calculate credit risks & CIBIL scores.</p>
                </div>
             </div>
          </div>
        </div>

        {/* Bottom Metrics/Trust */}
        <div className="relative z-10 flex items-center gap-12">
           <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                 <div key={i} className={`w-10 h-10 rounded-full border-4 border-slate-950 bg-slate-800 bg-[url('https://api.dicebear.com/7.x/avataaars/svg?seed=${i}')] bg-cover shadow-2xl`}></div>
              ))}
           </div>
           <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-relaxed">
              Trusted by <span className="text-white">10,000+</span> <br/>
              Merchants across India
           </p>
        </div>
      </div>

      {/* Right Column: Premium Form */}
      <div className="flex flex-col items-center justify-center p-8 lg:p-20 relative bg-[#F8FAFC]">
        <div className="w-full max-w-md animate-in fade-in slide-in-from-right-10 duration-1000">
          <div className="mb-12 text-center lg:text-left">
            <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-2">
               {isLogin ? "Welcome Back" : "Join the Standard"}
            </h2>
            <p className="text-slate-400 font-bold">
               {isLogin ? "Secure login to your professional records" : "Create your professional ledger in seconds"}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-5">
              {!isLogin && (
                <div className="space-y-3 animate-in fade-in zoom-in-95 duration-500">
                   <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Official Shop Name</Label>
                   <div className="relative group">
                     <Store className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                     <Input
                       placeholder="e.g., Rajesh General Store"
                       className="h-16 rounded-2xl bg-white border border-slate-100 pl-14 pr-6 font-bold text-slate-800 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-sm"
                       value={shopName}
                       onChange={(e) => setShopName(e.target.value)}
                       required
                     />
                   </div>
                </div>
              )}

              <div className="space-y-3">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Merchant Identity (Mobile)</Label>
                <div className="relative group">
                  <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <Input
                    type="tel"
                    placeholder="Enter your mobile number"
                    className="h-16 rounded-2xl bg-white border border-slate-100 pl-14 pr-6 font-bold text-slate-800 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-sm"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between px-1">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Access Key (Password)</Label>
                  {isLogin && <button type="button" className="text-[9px] font-black text-indigo-500 uppercase tracking-widest hover:underline">Forgot Key?</button>}
                </div>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="h-16 rounded-2xl bg-white border border-slate-100 pl-14 pr-6 font-bold text-slate-800 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-sm"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-3 animate-in fade-in zoom-in-95 duration-700">
                   <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Verify Access Key</Label>
                   <div className="relative group">
                     <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                     <Input
                       type="password"
                       placeholder="Re-enter your password"
                       className="h-16 rounded-2xl bg-white border border-slate-100 pl-14 pr-6 font-bold text-slate-800 focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-sm"
                       value={confirmPassword}
                       onChange={(e) => setConfirmPassword(e.target.value)}
                       required
                     />
                   </div>
                </div>
              )}
            </div>

            <Button 
                type="submit" 
                className="w-full h-16 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-2xl shadow-slate-900/20 group"
            >
              {isLogin ? "Authenticate & Enter" : "Establish Professional Account"}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </form>

          <div className="mt-12 pt-8 border-t border-slate-100 text-center">
             <p className="text-slate-400 font-bold text-sm">
                {isLogin ? "New merchant?" : "Already have an account?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-indigo-600 font-black ml-2 hover:underline"
                >
                   {isLogin ? "Get Certified Access" : "Secure Login"}
                </button>
             </p>
          </div>
        </div>

        {/* Support Link */}
        <div className="absolute bottom-10 flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-100 shadow-sm text-[10px] font-black text-slate-400 uppercase tracking-widest cursor-pointer hover:bg-slate-50 transition-colors">
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
           System Online: Server-31
        </div>
      </div>
    </div>
  );
}
