import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Search, UserPlus, MoreVertical, Phone, CreditCard, ChevronRight, Users, AlertCircle, Clock } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function Customers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    phone: "",
    initialDue: "",
  });

  const [customers, setCustomers] = useState([
    { id: 1, name: "Rajesh Kumar", phone: "+91 98765 43210", totalDue: "₹3,500", rawDue: 3500, status: "overdue", avatar: "RK", color: "bg-rose-100 text-rose-600" },
    { id: 2, name: "Priya Sharma", phone: "+91 98765 43211", totalDue: "₹1,200", rawDue: 1200, status: "pending", avatar: "PS", color: "bg-amber-100 text-amber-600" },
    { id: 3, name: "Amit Patel", phone: "+91 98765 43212", totalDue: "₹5,800", rawDue: 5800, status: "overdue", avatar: "AP", color: "bg-indigo-100 text-indigo-600" },
    { id: 4, name: "Sunita Devi", phone: "+91 98765 43213", totalDue: "₹0", rawDue: 0, status: "paid", avatar: "SD", color: "bg-emerald-100 text-emerald-600" },
    { id: 5, name: "Vikram Singh", phone: "+91 98765 43214", totalDue: "₹2,400", rawDue: 2400, status: "pending", avatar: "VS", color: "bg-blue-100 text-blue-600" },
    { id: 6, name: "Meena Gupta", phone: "+91 98765 43215", totalDue: "₹4,100", rawDue: 4100, status: "overdue", avatar: "MG", color: "bg-purple-100 text-purple-600" },
    { id: 7, name: "Ravi Verma", phone: "+91 98765 43216", totalDue: "₹1,750", rawDue: 1750, status: "pending", avatar: "RV", color: "bg-orange-100 text-orange-600" },
    { id: 8, name: "Anjali Reddy", phone: "+91 98765 43217", totalDue: "₹3,200", rawDue: 3200, status: "pending", avatar: "AR", color: "bg-pink-100 text-pink-600" },
    { id: 9, name: "Karan Malhotra", phone: "+91 98765 43218", totalDue: "₹950", rawDue: 950, status: "pending", avatar: "KM", color: "bg-cyan-100 text-cyan-600" },
    { id: 10, name: "Deepa Rao", phone: "+91 98765 43219", totalDue: "₹6,500", rawDue: 6500, status: "overdue", avatar: "DR", color: "bg-violet-100 text-violet-600" },
  ]);

  const stats = [
    { label: "Total Network", value: customers.length, sub: "Customers", icon: Users, color: "text-indigo-600", bg: "bg-indigo-50" },
    { label: "Total Overdue", value: customers.filter(c => c.status === 'overdue').length, sub: "High Risk", icon: AlertCircle, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Active Pending", value: customers.filter(c => c.rawDue > 0).length, sub: "With Balance", icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery)
  );

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = Math.max(...customers.map(c => c.id)) + 1;
    const rawVal = parseInt(newCustomer.initialDue) || 0;
    const dueAmount = `₹${rawVal.toLocaleString('en-IN')}`;
    setCustomers([
      ...customers,
      {
        id: newId,
        name: newCustomer.name,
        phone: newCustomer.phone,
        totalDue: dueAmount,
        rawDue: rawVal,
        status: rawVal > 0 ? "pending" : "paid",
        avatar: newCustomer.name.split(" ").map(n => n[0]).join("").toUpperCase(),
        color: "bg-slate-100 text-slate-600"
      }
    ]);
    toast.success(`Customer "${newCustomer.name}" added successfully!`);
    setNewCustomer({ name: "", phone: "", initialDue: "" });
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Customer Network</h1>
          <p className="text-slate-400 font-medium">Manage and monitor lender credit profiles</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/10 px-6">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md rounded-[2.5rem] glass border-none shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-slate-800">New Relationship</DialogTitle>
              <DialogDescription className="font-bold text-slate-400">
                Onboard a new customer to start tracking credits.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddCustomer} className="space-y-6 pt-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Customer Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. John Doe"
                  className="rounded-2xl bg-slate-100/50 border-none h-12 font-bold text-slate-600 focus:ring-2 focus:ring-indigo-500/10"
                  value={newCustomer.name}
                  onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="rounded-2xl bg-slate-100/50 border-none h-12 font-bold text-slate-600 focus:ring-2 focus:ring-indigo-500/10"
                  value={newCustomer.phone}
                  onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="initialDue" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Initial Opening Balance</Label>
                <Input
                  id="initialDue"
                  type="number"
                  placeholder="0.00"
                  className="rounded-2xl bg-slate-100/50 border-none h-12 font-bold text-slate-600 focus:ring-2 focus:ring-indigo-500/10"
                  value={newCustomer.initialDue}
                  onChange={(e) => setNewCustomer({ ...newCustomer, initialDue: e.target.value })}
                  min="0"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsDialogOpen(false)}
                  className="flex-1 rounded-2xl font-bold text-slate-400"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20"
                >
                  Create Profile
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {stats.map((stat, i) => (
           <div key={i} className="glass p-6 rounded-[2rem] flex items-center gap-4 group hover:bg-slate-50 transition-all duration-300">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                 <stat.icon className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                 <div className="flex items-baseline gap-1">
                    <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                    <p className="text-[10px] font-bold text-slate-400">{stat.sub}</p>
                 </div>
              </div>
           </div>
         ))}
      </div>

      <div className="glass p-8 rounded-[2.5rem]">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-lg font-black text-slate-800">Directory</h3>
          <div className="relative w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-2xl bg-slate-100/50 border-none pl-11 h-11 text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all"
            />
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-100 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50/50 border-none">
                <TableHead className="font-black text-slate-400 text-[10px] uppercase tracking-widest px-6 h-12">Customer Profile</TableHead>
                <TableHead className="font-black text-slate-400 text-[10px] uppercase tracking-widest px-6 h-12">Contact & Tags</TableHead>
                <TableHead className="font-black text-slate-400 text-[10px] uppercase tracking-widest px-6 h-12">Status</TableHead>
                <TableHead className="font-black text-slate-400 text-[10px] uppercase tracking-widest px-6 h-12">Total Balance</TableHead>
                <TableHead className="font-black text-slate-400 text-[10px] uppercase tracking-widest px-6 h-12 text-right">View Profile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow 
                  key={customer.id} 
                  className="border-none hover:bg-slate-50/30 transition-colors group cursor-pointer"
                  onClick={() => navigate(`/customer/${customer.id}`)}
                >
                  <TableCell className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                        {customer.avatar}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 tracking-tight">{customer.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-slate-500 font-bold text-xs">
                        <Phone className="w-3 h-3" />
                        {customer.phone}
                      </div>
                      <div className="flex gap-1">
                        <span className="text-[8px] font-black uppercase bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded-full">Primary</span>
                        {customer.rawDue > 5000 && <span className="text-[8px] font-black uppercase bg-rose-50 text-rose-400 px-1.5 py-0.5 rounded-full">High Val</span>}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      customer.status === "paid" 
                        ? "text-emerald-700 bg-emerald-50" 
                        : customer.status === "overdue"
                        ? "text-rose-700 bg-rose-50"
                        : "text-amber-700 bg-amber-50"
                    }`}>
                      {customer.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-5">
                    <div className="flex items-center gap-2">
                       <CreditCard className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                       <span className="font-bold text-slate-800 text-sm tracking-tight">
                        {customer.totalDue}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-5 text-right">
                    <span className="text-indigo-600 font-bold text-[10px] uppercase tracking-wider group-hover:underline">
                      View Profile
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {filteredCustomers.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-200">
              <Search className="w-10 h-10" />
            </div>
            <p className="font-black text-slate-400">No customers match your search filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}