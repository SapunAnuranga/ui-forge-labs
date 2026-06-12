import React, { useState, useEffect } from 'react';
import { useToast } from '../../components/Toast';
import ConfirmDialog from '../../components/ConfirmDialog';
import { getAdminMessages, deleteMessage } from '../../api';

const Messages = () => {
  const toast = useToast();
  const [messages, setMessages] = useState([]);
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const data = await getAdminMessages();
      setMessages(data);
    } catch (err) {
      toast(err.message || 'Failed to load messages.', 'error');
    }
  };

  return (
    <div>
      <ConfirmDialog
        isOpen={confirm.open}
        title="Delete Message"
        message="Are you sure you want to delete this message? This cannot be undone."
        onConfirm={async () => {
          try {
            await deleteMessage(confirm.id);
            setMessages((prev) => prev.filter((m) => m.id !== confirm.id));
            toast('Message deleted.', 'error');
          } catch (err) {
            toast(err.message || 'Failed to delete message.', 'error');
          } finally {
            setConfirm({ open: false, id: null });
          }
        }}
        onCancel={() => setConfirm({ open: false, id: null })}
        confirmText="Delete"
        danger
      />

      <h2 className="text-2xl font-bold text-white mb-6">Contact Messages ({messages.length})</h2>

      <div className="space-y-3">
        {[...messages].reverse().map((msg) => (
          <div key={msg.id} className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
            <div className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-800/30 transition" onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {msg.name?.charAt(0)?.toUpperCase() || '?'}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">{msg.name}</p>
                  <p className="text-gray-400 text-xs">{msg.email}</p>
                </div>
              </div>
              <span className="text-gray-500 text-xs">{expanded === msg.id ? '▲' : '▼'}</span>
            </div>

            {expanded === msg.id && (
              <div className="border-t border-gray-800 p-4 space-y-3 bg-gray-900/20">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Subject</span>
                  <p className="text-gray-200 text-sm mt-1">{msg.subject || 'No Subject'}</p>
                </div>
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">Message</span>
                  <p className="text-gray-300 text-sm mt-1 whitespace-pre-wrap">{msg.message}</p>
                </div>
                <div className="flex justify-end pt-2 border-t border-gray-800/50">
                  <button onClick={(e) => { e.stopPropagation(); setConfirm({ open: true, id: msg.id }); }} className="px-3 py-1 bg-red-600/20 text-red-400 border border-red-600/30 rounded-lg text-xs hover:bg-red-600/30 transition">
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
        {messages.length === 0 && <p className="text-gray-500 text-center py-8">No messages yet.</p>}
      </div>
    </div>
  );
};

export default Messages;