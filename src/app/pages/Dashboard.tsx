import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { IndianRupee, Clock, AlertCircle, Plus, Upload, TrendingUp, MoreVertical, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import CountUp from 'react-countup';

export default function Dashboard() {
  const navigate = useNavigate();

  const data = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
  ];

  const summaryCards = [
    {
      title: "Total Credit",
      amount: "45250",
      prefix: "₹",
      trend: "+12.5%",
      isPositive: true,
      icon: IndianRupee,
      border: "border-indigo-100",
      iconColor: "text-indigo-600",
      iconBg: "bg-indigo-50",
    },
    {
      title: "Pending Amount",
      amount: "28500",
      prefix: "₹",
      trend: "+4.2%",
      isPositive: false,
      icon: Clock,
      border: "border-amber-100",
      iconColor: "text-amber-600",
      iconBg: "bg-amber-50",
    },
    {
      title: "Overdue Amount",
      amount: "12750",
      prefix: "₹",
      trend: "-2.1%",
      isPositive: true,
      icon: AlertCircle,
      border: "border-rose-100",
      iconColor: "text-rose-600",
      iconBg: "bg-rose-50",
    },
  ];

  const recentActivity = [
    { customer: "Rajesh Kumar", amount: "₹500", date: "2024-03-20", status: "paid", avatar: "RK" },
    { customer: "Priya Sharma", amount: "₹1,200", date: "2024-03-19", status: "pending", avatar: "PS" },
    { customer: "Amit Patel", amount: "₹800", date: "2024-03-18", status: "overdue", avatar: "AP" },
    { customer: "Sunita Devi", amount: "₹650", date: "2024-03-17", status: "paid", avatar: "SD" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Financial Overview</h2>
          <p className="text-sm text-slate-400 font-medium">Keep track of your shop's credit health</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => navigate("/add-credit")}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm px-6"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Credit
          </Button>
          <Button
            onClick={() => navigate("/upload-excel")}
            variant="outline"
            className="rounded-xl bg-white border-slate-200 text-slate-600 hover:bg-slate-50 px-6"
          >
            <Upload className="w-4 h-4 mr-2" />
            Import Excel
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryCards.map((card) => (
          <div 
            key={card.title} 
            className={`glass p-6 rounded-[2rem] border ${card.border} hover:bg-slate-50 transition-all duration-300 group`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${card.iconBg} ${card.iconColor} transition-colors group-hover:scale-105`}>
                <card.icon className="w-6 h-6" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg ${card.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {card.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {card.trend}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{card.title}</p>
              <div className="text-2xl font-black text-slate-800 tracking-tight">
                {card.prefix}<CountUp end={parseInt(card.amount)} duration={2.5} separator="," />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2 glass p-8 rounded-[2.5rem]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-slate-800">Credit Growth</h3>
              <p className="text-xs text-slate-400">Total credit collection trend</p>
            </div>
            <select className="bg-slate-100/50 border-none rounded-xl px-3 py-1.5 text-xs font-bold text-slate-600 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="value" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass p-8 rounded-[2.5rem]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800">Recent Transactions</h3>
            <button className="text-xs font-bold text-indigo-600 hover:text-indigo-700 transition-colors">See all</button>
          </div>
          <div className="space-y-6">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between group cursor-pointer"
                onClick={() => navigate(`/customer/${index + 1}`)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                    {activity.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">{activity.customer}</p>
                    <p className="text-[10px] font-bold text-slate-400">{activity.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-slate-800 text-sm">{activity.amount}</p>
                  <span 
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                      activity.status === "paid"
                        ? "text-emerald-700 bg-emerald-50"
                        : activity.status === "pending"
                        ? "text-amber-700 bg-amber-50"
                        : "text-rose-700 bg-rose-50"
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 bg-indigo-50/50 rounded-3xl border border-indigo-100/50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">Top Collector</p>
                <p className="text-xs font-bold text-indigo-900">Rajesh collected ₹12k today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
