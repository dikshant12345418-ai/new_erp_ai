
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { MOCK_STUDENTS } from '../../services/mockData';
import { Printer, Download, ArrowLeft, CheckCircle } from 'lucide-react';

const StudentReceipt: React.FC = () => {
  const location = useLocation();
  const state = location.state as { transactionId: string; amount: number; date: string; method: string } | null;
  const student = MOCK_STUDENTS[0];

  const handlePrint = () => {
      window.print();
  };

  if (!state) {
      return (
          <div className="p-8 max-w-7xl mx-auto text-center">
              <h2 className="text-xl font-bold text-slate-800 mb-4">No Receipt Found</h2>
              <p className="text-slate-500 mb-6">Please go back to fees and make a payment first.</p>
              <Link to="/student/fees" className="text-blue-600 font-medium hover:underline">Back to Fees</Link>
          </div>
      );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between print:hidden">
          <Link to="/student/fees" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium">
              <ArrowLeft size={18} /> Back to Fees
          </Link>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
              <Printer size={18} /> Print Receipt
          </button>
      </div>

      <div className="bg-white p-12 rounded-2xl shadow-lg border border-slate-200 print:shadow-none print:border-0" id="receipt-area">
          <div className="flex justify-between items-start border-b border-slate-200 pb-8 mb-8">
              <div>
                  <h1 className="text-3xl font-bold text-slate-900 tracking-tight">CloudEduSync</h1>
                  <p className="text-slate-500 mt-1">Payment Receipt</p>
              </div>
              <div className="text-right">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-2">
                      <CheckCircle size={14} /> Paid Successfully
                  </div>
                  <p className="text-slate-500 text-sm">Date: {state.date}</p>
                  <p className="text-slate-500 text-sm">Txn ID: {state.transactionId}</p>
              </div>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-8">
              <div>
                  <p className="text-sm text-slate-500 uppercase font-semibold tracking-wider mb-1">Student Details</p>
                  <h3 className="font-bold text-slate-800 text-lg">{student.name}</h3>
                  <p className="text-slate-600">{student.rollNumber}</p>
                  <p className="text-slate-600">{student.program}, {student.department}</p>
              </div>
              <div className="text-right">
                  <p className="text-sm text-slate-500 uppercase font-semibold tracking-wider mb-1">Payment Method</p>
                  <p className="font-medium text-slate-800">{state.method}</p>
              </div>
          </div>

          <div className="bg-slate-50 rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-600 font-medium">Tuition Fee Amount</span>
                  <span className="text-slate-900 font-bold">₹ {state.amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-600 font-medium">Transaction Charges</span>
                  <span className="text-slate-900 font-bold">₹ 0</span>
              </div>
              <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-800">Total Paid</span>
                  <span className="text-2xl font-bold text-blue-600">₹ {state.amount.toLocaleString()}</span>
              </div>
          </div>

          <div className="text-center pt-8 border-t border-slate-200">
              <p className="text-slate-400 text-sm">This is a computer-generated receipt and does not require a physical signature.</p>
              <p className="text-slate-400 text-sm mt-1">CloudEduSync Systems • contact@cloudedu.com</p>
          </div>
      </div>
    </div>
  );
};

export default StudentReceipt;
