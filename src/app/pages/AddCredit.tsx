import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { 
  CalendarIcon, 
  Save, 
  User, 
  IndianRupee, 
  FileText, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  AlertCircle
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

export default function AddCredit() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState<Date>();
  const [note, setNote] = useState("");

  const customers = [
    { name: "Rajesh Kumar", balance: "₹12,750", limit: "₹25,000", risk: "Low" },
    { name: "Priya Sharma", balance: "₹550", limit: "₹10,000", risk: "Low" },
    { name: "Amit Patel", balance: "₹18,200", limit: "₹20,000", risk: "High" },
    { name: "Sunita Devi", balance: "₹3,400", limit: "₹15,000", risk: "Medium" },
  ];

  const selectedCustomerData = customers.find(c => c.name === customer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Credit transaction recorded successfully!");
    setTimeout(() => {
      navigate("/customers");
    }, 1000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-10 rounded-[2.5rem]">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Customer Search</Label>
                  <Select value={customer} onValueChange={setCustomer} required>
                    <SelectTrigger className="h-14 rounded-2xl bg-slate-50 border-none px-6 font-bold text-slate-600 focus:ring-4 focus:ring-indigo-500/5 transition-all">
                      <div className="flex items-center gap-3">
                         <User className="w-4 h-4 text-indigo-500" />
                         <SelectValue placeholder="Search or select a customer" />
                      </div>
                    </SelectTrigger>
                    <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
                      {customers.map((c) => (
                        <SelectItem key={c.name} value={c.name} className="py-3 px-4 focus:bg-indigo-50 rounded-xl">
                          <div className="flex items-center justify-between w-full">
                             <span className="font-bold">{c.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Credit Amount</Label>
                  <div className="relative group">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center text-emerald-500 bg-emerald-50 rounded-lg group-focus-within:bg-emerald-500 group-focus-within:text-white transition-all">
                      <IndianRupee className="w-3.5 h-3.5" />
                    </div>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="h-14 rounded-2xl bg-slate-50 border-none pl-16 pr-6 font-black text-slate-800 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Repayment Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-14 w-full rounded-2xl bg-slate-50 border-none px-6 justify-start font-bold text-slate-600 hover:bg-white hover:ring-4 hover:ring-indigo-500/5 transition-all"
                      >
                        <CalendarIcon className="mr-3 h-4 w-4 text-indigo-500" />
                        {dueDate ? format(dueDate, "PPP") : "Select due date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 rounded-[2rem] border-slate-100 shadow-2xl overflow-hidden" align="start">
                      <Calendar
                        mode="single"
                        selected={dueDate}
                        onSelect={setDueDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Transaction Note (Optional)</Label>
                  <div className="relative group">
                    <FileText className="absolute left-6 top-6 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                    <textarea
                      placeholder="e.g., Grocery monthly bill, Mobile recharge..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full min-h-[120px] rounded-2xl bg-slate-50 border-none p-6 pl-14 font-bold text-slate-600 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Button
                  type="submit"
                  className="flex-1 h-16 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-2xl shadow-slate-900/20 font-black text-sm tracking-wide gap-3 group"
                >
                  <Save className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
                  Confirm & Secure Record
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Customer Insights */}
        <div className="space-y-8">
          {customer ? (
            <>
            <div className="p-8 rounded-[2.5rem] bg-white border border-indigo-50 relative overflow-hidden animate-in zoom-in-95 duration-500 shadow-xl shadow-indigo-500/5">
               <div className="absolute top-0 right-0 p-8 opacity-5 text-indigo-100">
                  <ShieldCheck className="w-32 h-32 rotate-12" />
               </div>
               <div className="relative z-10">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Customer Credit Health</p>
                  <h3 className="text-xl font-black mb-8 text-slate-800 tracking-tight">{customer}</h3>
                  
                  <div className="space-y-6">
                     <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                           <div className="w-1 h-1 rounded-full bg-indigo-500"></div>
                           Current Unpaid Balance
                        </p>
                        <p className="text-3xl font-black text-slate-800 tracking-tight">{selectedCustomerData?.balance}</p>
                     </div>
                     
                     <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                         <div className="flex items-center justify-between mb-3">
                            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                               <div className="w-1 h-1 rounded-full bg-amber-500"></div>
                               Credit Limit Usage
                            </p>
                            <span className="text-[11px] font-black text-slate-800">65%</span>
                         </div>
                         <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-400 w-2/3 rounded-full"></div>
                         </div>
                     </div>

                     <div className="flex items-center gap-4 p-6 bg-slate-50/50 rounded-2xl border border-slate-100/50">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-sm font-black shadow-lg ${selectedCustomerData?.risk === 'High' ? 'bg-rose-500 text-white shadow-rose-100' : 'bg-emerald-500 text-white shadow-emerald-100'}`}>
                           {selectedCustomerData?.risk[0]}
                        </div>
                        <div>
                           <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5 underline decoration-indigo-200 underline-offset-2">Reliability Status</p>
                           <p className="text-sm font-black text-slate-800 tracking-tight">{selectedCustomerData?.risk} Risk Profile</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {amount && (
               <div className="glass p-8 rounded-[2.5rem] bg-slate-900 text-white animate-in slide-in-from-right-8 duration-700 shadow-2xl shadow-slate-900/40">
                  <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-5 h-5 text-indigo-400" />
                     </div>
                     <div>
                        <p className="text-sm font-black tracking-tight">Projected Impact</p>
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">New Ledger Balance</p>
                     </div>
                  </div>
                  
                  <div className="space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400">Current Balance</span>
                        <span className="text-xs font-black">{selectedCustomerData?.balance}</span>
                     </div>
                     <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-slate-400">New Credit</span>
                        <span className="text-xs font-black text-indigo-400">+ ₹{Number(amount).toLocaleString()}</span>
                     </div>
                     <div className="pt-6 mt-2 border-t border-slate-800 flex justify-between items-end">
                        <div className="flex flex-col">
                           <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest mb-1">Target Total</span>
                           <span className="text-sm font-bold text-slate-400">Ledger Entry</span>
                        </div>
                        <span className="text-3xl font-black tracking-tighter text-white">
                           ₹{(Number(selectedCustomerData?.balance.replace(/[₹,]/g, '')) + Number(amount)).toLocaleString()}
                        </span>
                     </div>
                  </div>
               </div>
            )}
            </>
          ) : (
            <div className="glass p-10 rounded-[2.5rem] border-dashed border-slate-200 bg-white/40 flex flex-col items-center justify-center text-center space-y-4 min-h-[400px]">
               <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 border border-slate-100">
                  <User className="w-10 h-10" />
               </div>
               <div>
                  <p className="text-lg font-black text-slate-800 tracking-tight">Customer Not Identified</p>
                  <p className="text-[10px] font-bold text-slate-400 mt-2 max-w-[200px] mx-auto leading-relaxed uppercase tracking-wider">Select a customer to view health metrics and balance projections</p>
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
