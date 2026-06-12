import React from 'react';
import { AlertCircle } from 'lucide-react';

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm Action', danger = true }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      {/* Dynamic Overlay Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={onCancel} />
      
      {/* Modal Dialog Card */}
      <div className="relative bg-[#09090b] border border-zinc-900 rounded-2xl p-6 max-w-sm w-full shadow-2xl shadow-black/40 text-center animate-in fade-in zoom-in-95 duration-200">
        
        {/* Decorative alert state icon wrapper */}
        <div className={`mx-auto mb-4 p-3 rounded-full w-fit ${danger ? 'bg-red-500/10 text-red-400' : 'bg-zinc-900 text-zinc-400'}`}>
          <AlertCircle className="w-5 h-5 stroke-[2]" />
        </div>

        <h3 className="text-white font-bold text-base tracking-tight mb-1">{title}</h3>
        <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed mb-6">{message}</p>
        
        {/* Buttons distribution grids */}
        <div className="flex gap-2.5">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 active:scale-[0.98] rounded-xl text-xs font-semibold transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-4 py-2.5 rounded-xl text-xs font-bold active:scale-[0.98] transition-all ${
              danger
                ? 'bg-red-600 text-white hover:bg-red-500 shadow-md shadow-red-600/10'
                : 'bg-white text-black hover:bg-zinc-200'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;