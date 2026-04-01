import { useState } from "react";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Upload, FileSpreadsheet, CheckCircle, X, Info } from "lucide-react";
import { toast } from "sonner";

export default function ExcelUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [columnMappings, setColumnMappings] = useState({
    col1: "",
    col2: "",
    col3: "",
    col4: "",
  });

  const previewData = [
    ["Rajesh Kumar", "9876543210", "3500", "2024-03-25"],
    ["Priya Sharma", "9876543211", "1200", "2024-03-26"],
    ["Amit Patel", "9876543212", "5800", "2024-03-27"],
    ["Sunita Devi", "9876543213", "2400", "2024-03-28"],
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
      setUploadedFile(file);
    } else {
      toast.error("Please upload a valid Excel file");
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleImport = () => {
    if (!columnMappings.col1 || !columnMappings.col2 || !columnMappings.col3 || !columnMappings.col4) {
      toast.error("Please map all columns before importing");
      return;
    }
    toast.success("Data imported successfully!");
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Data Intelligence</h1>
          <p className="text-slate-400 font-medium">Import large datasets via Excel with auto-mapping</p>
        </div>
        <div className="px-4 py-2 bg-indigo-50 rounded-2xl flex items-center gap-2 text-indigo-600 text-xs font-bold border border-indigo-100/50">
          <Info className="w-4 h-4" />
          Supports .xlsx and .csv
        </div>
      </div>

      {/* Upload Area */}
      <div className="glass p-1 rounded-[2.5rem] overflow-hidden">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-[2.25rem] transition-all duration-500 group ${
            isDragging
              ? "border-indigo-500 bg-indigo-50/50 scale-[0.99]"
              : uploadedFile
              ? "border-emerald-500 bg-emerald-50/20"
              : "border-slate-200 bg-white/50 hover:border-slate-400 hover:bg-white"
          }`}
        >
          <div className="p-16 text-center">
            {uploadedFile ? (
              <div className="space-y-6">
                <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center mx-auto text-emerald-600 animate-in zoom-in duration-300">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-xl font-black text-slate-800">{uploadedFile.name}</p>
                  <p className="text-sm font-bold text-slate-400 mt-1">
                    {(uploadedFile.size / 1024).toFixed(2)} KB • Ready to process
                  </p>
                </div>
                <div className="flex justify-center gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setUploadedFile(null)}
                    className="rounded-2xl border-slate-200 text-slate-600 hover:bg-slate-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Change File
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto text-slate-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
                  <FileSpreadsheet className="w-10 h-10" />
                </div>
                <div>
                  <p className="text-xl font-black text-slate-800">
                    Drop your spreadsheet here
                  </p>
                  <p className="text-sm font-bold text-slate-400 mt-1">or click to explore your files</p>
                </div>
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileInput}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  onClick={() => document.getElementById('file-upload')?.click()}
                  className="rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-xl shadow-slate-900/10 px-8 py-6"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Select File
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Data Preview and Column Mapping */}
      {uploadedFile && (
        <div className="glass p-8 rounded-[2.5rem] space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-800">Map your columns</h3>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Reviewing 4 Rows
            </div>
          </div>
          
          {/* Column Mapping Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-wider ml-1">Column {num}</label>
                <Select 
                  value={(columnMappings as any)[`col${num}`]} 
                  onValueChange={(value) => setColumnMappings({...columnMappings, [`col${num}`]: value})}
                >
                  <SelectTrigger className="rounded-2xl bg-slate-50 border-none h-12 font-bold text-slate-600 focus:ring-2 focus:ring-indigo-500/10">
                    <SelectValue placeholder="Select Data Type" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl border-none shadow-2xl">
                    <SelectItem value="name">Full Name</SelectItem>
                    <SelectItem value="phone">Phone Number</SelectItem>
                    <SelectItem value="amount">Credit Amount</SelectItem>
                    <SelectItem value="due_date">Due Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          {/* Data Preview Table */}
          <div className="rounded-[2rem] border border-slate-100 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/50 border-none">
                  <TableHead className="font-black text-slate-400 text-xs px-6">COL 1</TableHead>
                  <TableHead className="font-black text-slate-400 text-xs px-6">COL 2</TableHead>
                  <TableHead className="font-black text-slate-400 text-xs px-6">COL 3</TableHead>
                  <TableHead className="font-black text-slate-400 text-xs px-6">COL 4</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {previewData.map((row, index) => (
                  <TableRow key={index} className="border-none hover:bg-slate-50/30 transition-colors">
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex} className="px-6 py-4 font-bold text-slate-600 text-sm">
                        {cell}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setUploadedFile(null)} className="rounded-2xl font-bold text-slate-400">
              Clear All
            </Button>
            <Button
              onClick={handleImport}
              className="rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20 px-10 py-6"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Finalize Import
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}