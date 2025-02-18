import React, { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { useChatStore } from '../store/chatStore';
import { Send } from 'lucide-react';
import { format } from 'date-fns';

export function Chat() {
  const { user } = useAuthStore();
  const { messages, addMessage } = useChatStore();
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser] = useState({ id: '2', name: 'Jane Smith' }); // Mock user for demo

  const conversation = messages.filter(
    (m) => (m.senderId === user?.id && m.receiverId === selectedUser.id) ||
           (m.senderId === selectedUser.id && m.receiverId === user?.id)
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    addMessage({
      id: Math.random().toString(36).substr(2, 9),
      senderId: user.id,
      receiverId: selectedUser.id,
      content: newMessage,
      timestamp: new Date().toISOString(),
    });

    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col">
      <div className="bg-white shadow rounded-lg flex-1 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Chat with {selectedUser.name}</h2>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {conversation.map((message) => {
            const isOwn = message.senderId === user?.id;
            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    isOwn
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${isOwn ? 'text-indigo-200' : 'text-gray-500'}`}>
                    {format(new Date(message.timestamp), 'p')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <form onSubmit={handleSendMessage} className="p-4 border-t">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}