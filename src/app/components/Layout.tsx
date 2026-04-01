import { Outlet, NavLink, useNavigate, useLocation } from "react-router";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Upload, 
  User, 
  Bell, 
  Search, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
} from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import { Button } from "./ui/button";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/customers", icon: Users, label: "Customers" },
    { path: "/add-credit", icon: CreditCard, label: "Credits" },
    { path: "/upload-excel", icon: Upload, label: "Upload Excel" },
    { path: "/profile", icon: User, label: "My Profile" },
  ];

  const notifications = [
    {
      id: 1,
      title: "Payment Overdue",
      description: "Amit Patel's balance of ₹5,800 is overdue by 5 days.",
      time: "2 mins ago",
      type: "alert",
      color: "text-rose-500",
      bg: "bg-rose-50",
      icon: AlertCircle
    },
    {
      id: 2,
      title: "Payment Received",
      description: "Priya Sharma made a payment of ₹1,200 via UPI.",
      time: "1 hour ago",
      type: "success",
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      icon: CheckCircle2
    },
    {
      id: 3,
      title: "Network Update",
      description: "Rajesh Kumar was successfully added to your records.",
      time: "3 hours ago",
      type: "info",
      color: "text-indigo-500",
      bg: "bg-indigo-50",
      icon: User
    },
    {
      id: 4,
      title: "System Upgrade",
      description: "Cloud synchronization optimized for better performance.",
      time: "5 hours ago",
      type: "system",
      color: "text-amber-500",
      bg: "bg-amber-50",
      icon: Clock
    }
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/profile") return "Account Settings";
    if (path === "/customers") return "Customer Directory";
    if (path === "/add-credit") return "Credit Ledger";
    if (path === "/upload-excel") return "Data Import";
    return "My Shop";
  };

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === "/profile") return "Home / User Profile";
    if (path === "/customers") return "Home / Customers";
    if (path === "/add-credit") return "Home / Record Credit";
    return "Welcome back, Rajesh!";
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="fixed left-4 top-4 bottom-4 w-68 glass rounded-[2.5rem] overflow-hidden z-50 border-white/40 shadow-2xl shadow-slate-200/50 flex flex-col">
        <div className="p-10 pb-6">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-2xl shadow-indigo-500/10 group-hover:scale-105 transition-all duration-500 border border-slate-100">
              <img src="/logo.png" alt="CreditLedger Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="font-black text-slate-800 text-lg tracking-tighter leading-none mb-1">Credit-Ledger</h1>
              <p className="text-[9px] uppercase font-bold text-slate-400 tracking-[0.2em] leading-none">Udhar Tracking</p>
            </div>
          </div>
        </div>

        <nav className="px-5 py-4 space-y-1 flex-1">
          <p className="px-6 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Main Menu</p>
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }: { isActive: boolean }) =>
                `flex items-center gap-4 px-6 py-3.5 rounded-2xl transition-all duration-300 group relative ${isActive
                  ? "bg-slate-100/80 text-indigo-600 font-bold"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-700"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-6">
           <Button 
            variant="ghost" 
            onClick={() => navigate("/login")}
            className="w-full h-12 rounded-2xl flex items-center gap-4 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all duration-300 group border border-transparent"
           >
              <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-bold text-sm">Sign Out</span>
           </Button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="pl-80 pr-10 pt-10 pb-12">
        {/* Command Center (Header) */}
        <header className="glass rounded-3xl border-white/20 shadow-lg mb-8">
          <div className="px-10 py-4 flex items-center justify-between">
            <div className="flex items-center gap-12 flex-1">
              <div>
                <h2 className="text-lg font-black text-slate-800 tracking-tight leading-none mb-1">{getPageTitle()}</h2>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em]">{getBreadcrumb()}</p>
              </div>
              
              {location.pathname !== "/profile" && (
                <div className="relative flex-1 max-w-md hidden lg:block group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-indigo-500 transition-all duration-300" />
                  <input
                    type="text"
                    placeholder="Quick search ledger..."
                    className="w-full bg-slate-50/50 border-none rounded-xl py-2.5 pl-14 pr-6 text-xs font-bold text-slate-600 placeholder:text-slate-300 focus:bg-white transition-all outline-none"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-4 ml-8">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 transition-all relative group">
                    <Bell className="w-5 h-5 text-slate-400 group-hover:text-slate-600 group-hover:scale-105 transition-all" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                  </button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-md border-none p-0 bg-transparent shadow-none" side="right">
                   <div className="h-full bg-white/95 backdrop-blur-2xl border-l border-white/20 shadow-[-20px_0_50px_rgba(0,0,0,0.1)] flex flex-col animate-sheet-in">
                    <SheetHeader className="p-10 pb-8 border-b border-slate-100/50 backdrop-blur-3xl bg-white/50">
                      <div className="flex items-center justify-between mb-4">
                        <SheetTitle className="text-3xl font-black text-slate-800 tracking-tight">Activity Center</SheetTitle>
                        <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                           4 New Alerts
                        </div>
                      </div>
                      <p className="text-slate-400 font-bold text-sm">Stay updated with your shop's latest events</p>
                    </SheetHeader>
                    
                    <ScrollArea className="flex-1">
                      <div className="divide-y divide-slate-100/50">
                        {notifications.map((note, index) => (
                          <div 
                            key={note.id} 
                            style={{ animationDelay: `${index * 100}ms` }}
                            className="p-8 hover:bg-slate-50/50 transition-colors group cursor-pointer relative overflow-hidden animate-slide-right"
                          >
                             <div className={`absolute left-0 top-0 bottom-0 w-1 ${note.color.replace('text-', 'bg-')} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
                             <div className="flex gap-5">
                                <div className={`w-12 h-12 rounded-2xl ${note.bg} ${note.color} flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-500 shadow-sm border border-white`}>
                                   <note.icon className="w-6 h-6" />
                                </div>
                                <div className="flex-1 space-y-1">
                                   <div className="flex items-center justify-between">
                                      <p className="text-sm font-black text-slate-800">{note.title}</p>
                                      <span className="text-[10px] font-bold text-slate-400">{note.time}</span>
                                   </div>
                                   <p className="text-sm font-bold text-slate-500 leading-relaxed pr-8">{note.description}</p>
                                   <div className="flex gap-4 pt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                                      <button className="text-[10px] font-black text-indigo-500 uppercase tracking-widest hover:underline">View Detail</button>
                                      <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:underline">Dismiss</button>
                                   </div>
                                </div>
                             </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    <div className="p-8 border-t border-slate-100 bg-white/50 backdrop-blur-3xl">
                       <Button className="w-full h-14 rounded-2xl bg-slate-900 text-white font-black text-xs uppercase tracking-widest hover:shadow-2xl shadow-slate-900/20 transition-all">
                          Mark All Notifications as Read
                       </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>

              <div 
                onClick={() => navigate("/profile")}
                className="flex items-center gap-4 p-1.5 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-[10px] font-black shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform duration-500">
                  RK
                </div>
                <div className="pr-3 hidden md:block">
                  <p className="text-[11px] font-black text-slate-800 leading-none">Rajesh Kumar</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Global Animation Wrapper for Page Content */}
        <main className="animate-in fade-in duration-1000">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
