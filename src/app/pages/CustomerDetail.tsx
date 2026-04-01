import { useParams, useNavigate } from "react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import CountUp from 'react-countup';
import {
  IndianRupee,
  Phone,
  Calendar,
  ArrowLeft,
  TrendingUp,
  Clock,
  AlertCircle,
  Plus,
  Send,
  Download,
  ShieldCheck,
  Zap
} from "lucide-react";

export default function CustomerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock customer data
  const customer = {
    id: id,
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    since: "Oct 2023",
    cibil: 785,
    totalCredit: 45250,
    paid: 32500,
    pending: 12750,
    risk: "Low",
    history: [
      { id: 1, date: "2024-03-20", description: "Grocery Purchase", amount: "₹500", type: "Credit", status: "Paid" },
      { id: 2, date: "2024-03-15", description: "Monthly Supplies", amount: "₹2,500", type: "Credit", status: "Pending" },
      { id: 3, date: "2024-03-10", description: "Late Fee", amount: "₹50", type: "Fee", status: "Pending" },
      { id: 4, date: "2024-03-01", description: "Payment Received", amount: "₹1,500", type: "Payment", status: "Success" },
    ]
  };

  const getCibilColor = (score: number) => {
    if (score >= 750) return "text-emerald-500";
    if (score >= 650) return "text-amber-500";
    return "text-rose-500";
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="rounded-2xl hover:bg-white hover:shadow-sm gap-2 text-slate-500 font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to List
        </Button>
        <div className="flex gap-3">
          <Button className="rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20 px-6">
            <Plus className="w-4 h-4 mr-2" />
            New Credit
          </Button>
          <Button variant="outline" className="rounded-2xl bg-white border-slate-200 text-slate-600 px-6">
            <Send className="w-4 h-4 mr-2" />
            Send Reminder
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-8 rounded-[2.5rem] relative overflow-hidden">
            <div className="relative z-10 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-[2.5rem] flex items-center justify-center text-3xl font-black text-white mx-auto shadow-2xl mb-4 group hover:scale-105 transition-transform duration-500">
                RK
              </div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">{customer.name}</h2>
              <div className="flex items-center justify-center gap-2 text-slate-400 font-bold text-sm mt-1">
                <Phone className="w-3 h-3" />
                {customer.phone}
              </div>
              <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div className="text-left">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Member Since</p>
                  <p className="text-sm font-bold text-slate-800">{customer.since}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Risk Profile</p>
                  <span className="text-xs font-black text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-lg border border-emerald-100">
                    {customer.risk}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CIBIL Score Card */}
          <div className="glass p-8 rounded-[2.5rem] relative bg-slate-900 overflow-hidden text-white">
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <ShieldCheck className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-amber-400" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Financial Health Score</p>
              </div>
              <div className="flex items-end gap-3 mb-6">
                <div className={`text-5xl font-black tracking-tight ${getCibilColor(customer.cibil)}`}>
                  <CountUp end={customer.cibil} duration={2} />
                </div>
                <div className="text-sm font-bold text-slate-500 mb-2">/ 900</div>
              </div>

              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-8">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-emerald-500 transition-all duration-1000"
                  style={{ width: `${(customer.cibil / 900) * 100}%` }}
                ></div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold">Timely Payments</span>
                  <span className="text-emerald-400 font-black">98%</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold">Credit Utilization</span>
                  <span className="text-amber-400 font-black">42%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-6 rounded-[2rem]">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Credit Given</p>
              <p className="text-2xl font-black text-slate-800 tracking-tight">₹<CountUp end={customer.totalCredit} duration={2} separator="," /></p>
            </div>
            <div className="glass p-6 rounded-[2rem]">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 text-emerald-500">Amount Recovered</p>
              <p className="text-2xl font-black text-slate-800 tracking-tight">₹<CountUp end={customer.paid} duration={2} separator="," /></p>
            </div>
            <div className="glass p-6 rounded-[2rem] border-rose-100 bg-rose-50/20">
              <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Pending Balance</p>
              <p className="text-2xl font-black text-rose-600 tracking-tight">₹<CountUp end={customer.pending} duration={2} separator="," /></p>
            </div>
          </div>

          <div className="glass p-8 rounded-[2.5rem]">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-black text-slate-800">Transaction History</h3>
              <Button variant="ghost" size="sm" className="rounded-xl font-bold text-slate-400">
                <Download className="w-4 h-4 mr-2" />
                Statement
              </Button>
            </div>
            <div className="rounded-[1.5rem] border border-slate-100 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50/50 border-none">
                    <TableHead className="font-black text-slate-400 text-[10px] uppercase tracking-widest px-6 h-12">Date</TableHead>
                    <TableHead className="font-black text-slate-400 text-[10px] uppercase tracking-widest px-6 h-12">Description</TableHead>
                    <TableHead className="font-black text-slate-400 text-[10px] uppercase tracking-widest px-6 h-12">Amount</TableHead>
                    <TableHead className="font-black text-slate-400 text-[10px] uppercase tracking-widest px-6 h-12">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customer.history.map((tx) => (
                    <TableRow key={tx.id} className="border-none hover:bg-slate-50/30 transition-colors group">
                      <TableCell className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                            <Clock className="w-4 h-4" />
                          </div>
                          <span className="text-sm font-bold text-slate-600">{tx.date}</span>
                        </div>
                      </TableCell>
                      <TableCell className="px-6 py-4 font-bold text-slate-800 text-sm">{tx.description}</TableCell>
                      <TableCell className="px-6 py-4 font-black text-slate-800 text-sm">{tx.amount}</TableCell>
                      <TableCell className="px-6 py-4">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${tx.status === "Paid" || tx.status === "Success"
                            ? "text-emerald-500 bg-emerald-50 border border-emerald-100"
                            : "text-amber-500 bg-amber-50 border border-amber-100"
                          }`}>
                          {tx.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
