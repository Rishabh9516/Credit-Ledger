import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { 
  User, 
  Mail, 
  Phone, 
  Building2, 
  MapPin, 
  Calendar,
  Camera,
  ShieldCheck,
  CreditCard,
  Settings,
  Store,
  ChevronRight
} from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="max-w-6xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Avatar & Quick Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-8 rounded-[2.5rem] text-center relative overflow-hidden border-white/40 shadow-xl shadow-slate-200/40">
             <div className="relative inline-block group">
                <div className="w-32 h-32 rounded-[2.5rem] bg-indigo-600 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-indigo-500/30 relative overflow-hidden ring-8 ring-indigo-50/50">
                   RK
                </div>
             </div>

             <div className="mt-8">
                <h3 className="text-2xl font-black text-slate-800 tracking-tight">Rajesh Kumar</h3>
                <div className="inline-flex items-center px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full mt-2">
                   <span className="text-[10px] font-black uppercase tracking-wider">Shop Owner</span>
                </div>
             </div>

             <div className="mt-10 space-y-3">
                <div className="flex items-center gap-3 p-4 bg-slate-50/40 rounded-2xl text-left border border-slate-100/50">
                   <Building2 className="w-4 h-4 text-slate-400" />
                   <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Business</p>
                      <p className="text-sm font-bold text-slate-800">Rajesh General Store</p>
                   </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50/40 rounded-2xl text-left border border-slate-100/50">
                   <Calendar className="w-4 h-4 text-slate-400" />
                   <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Member Since</p>
                      <p className="text-sm font-bold text-slate-800">Joined Oct 2023</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* Right: Detailed Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-8 rounded-[2.5rem] border-white/40 shadow-xl shadow-slate-200/40">
            <form onSubmit={handleUpdate} className="space-y-8">
              <div className="flex items-center justify-between mb-2">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center">
                       <User className="w-5 h-5 text-indigo-500" />
                    </div>
                    <h4 className="text-xl font-black text-slate-800 tracking-tight">Personal Information</h4>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</Label>
                  <Input 
                    value="Rajesh Kumar" 
                    className="h-14 rounded-2xl bg-slate-50/50 border border-slate-100 font-bold text-slate-800 px-6 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all"
                    readOnly={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</Label>
                  <Input 
                    value="+91 98765 43210" 
                    className="h-14 rounded-2xl bg-slate-50/50 border border-slate-100 font-bold text-slate-800 px-6 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all"
                    readOnly={!isEditing}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Business Address</Label>
                  <Input 
                    value="123, Market Road, Bengaluru, KA - 560001" 
                    className="h-14 rounded-2xl bg-slate-50/50 border border-slate-100 font-bold text-slate-800 px-6 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all"
                    readOnly={!isEditing}
                  />
                </div>
              </div>

              <div className="pt-4">
                 {isEditing ? (
                   <div className="flex gap-4">
                      <Button type="submit" className="flex-1 h-14 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">Save Changes</Button>
                      <Button type="button" variant="ghost" onClick={() => setIsEditing(false)} className="px-8 h-14 rounded-2xl font-bold text-slate-400">Cancel</Button>
                   </div>
                 ) : (
                   <Button 
                    type="button" 
                    onClick={() => setIsEditing(true)}
                    className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20"
                   >
                     Update Account Profile
                   </Button>
                 )}
              </div>
            </form>
          </div>

          {/* Premium Plan & Preferences - COMMENTED OUT as per user request */}
          {/* 
          <div className="glass p-8 rounded-[2.5rem] bg-indigo-600 text-white relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-700">
                <ShieldCheck className="w-24 h-24" />
             </div>
             <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Premium Active</p>
                <div className="flex items-center justify-between mt-1">
                   <h4 className="text-2xl font-black tracking-tight">Enterprise Edition</h4>
                   <Button variant="ghost" className="bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold text-xs">
                      Manage Plan
                   </Button>
                </div>
                <div className="flex items-center gap-2 mt-4 text-[10px] font-black text-indigo-100 tracking-wide uppercase">
                   <div className="w-1 h-1 rounded-full bg-white animate-pulse"></div>
                   Everything is secure & automated
                </div>
             </div>
          </div>
          */}

          {/* Business Preferences - COMMENTED OUT as per user request */}
          {/*
          <div className="glass p-10 rounded-[3rem]">
             <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-slate-100 rounded-2xl flex items-center justify-center">
                   <Settings className="w-5 h-5 text-indigo-500" />
                </div>
                <h4 className="text-xl font-black text-slate-800 tracking-tight">Business Preferences</h4>
             </div>
             <div className="space-y-2">
                {[
                  "Automatic SMS Reminders",
                  "Monthly Ledger Backup",
                  "Inventory Sync",
                  "Tax Reports"
                ].map((pref) => (
                   <div key={pref} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-2xl hover:bg-white hover:ring-4 hover:ring-indigo-500/5 transition-all cursor-pointer group">
                      <span className="font-bold text-slate-700">{pref}</span>
                      <div className="w-10 h-6 bg-emerald-500 rounded-full relative p-1 transition-all">
                         <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
          */}
        </div>
      </div>
    </div>
  );
}
