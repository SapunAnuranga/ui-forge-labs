import React, { useState, createContext, useContext, useCallback } from 'react';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';

// 1. Context එක නිර්මාණය කිරීම (Internal භාවිතය සඳහා පමණි, export කරන්නේ නැත)
const ToastContext = createContext(null);

// 2. Main Provider Component එක (Default Export එක ලෙස)
export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const icons = {
    success: <CheckCircle className="w-4 h-4 text-emerald-400" />,
    error: <XCircle className="w-4 h-4 text-red-400" />,
    info: <Info className="w-4 h-4 text-blue-400" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-400" />,
  };

  const colors = {
    success: 'border-emerald-500/20 bg-emerald-500/[0.04] text-emerald-300',
    error: 'border-red-500/20 bg-red-500/[0.04] text-red-300',
    info: 'border-blue-500/20 bg-blue-500/[0.04] text-blue-300',
    warning: 'border-yellow-500/20 bg-yellow-500/[0.04] text-yellow-300',
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2.5 max-w-sm w-full sm:w-[350px] pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 px-4 py-3.5 rounded-xl border backdrop-blur-md shadow-xl transition-all duration-300 ${
              colors[toast.type] || colors.success
            }`}
          >
            <div className="shrink-0 mt-0.5">{icons[toast.type] || icons.success}</div>
            <p className="text-xs font-medium leading-relaxed flex-1">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-zinc-500 hover:text-white shrink-0 transition-colors p-0.5 rounded-md hover:bg-zinc-900/30"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

// 3. Custom Hook එක (Named Export එකක් ලෙස - uppercase component එකක් නොවන නිසා Vite එකට ගැටලුවක් නැත)
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
};