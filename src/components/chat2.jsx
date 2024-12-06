import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import Select from 'react-select';
import { FaPaperPlane, FaCommentDots, FaArrowCircleDown } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';

import apiClient, { apiEndpoints, Base_url } from './Apis';

// Socket.io client initialization
const socket = io('http://localhost:9000');

const GroupChat = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([
    { value: 'accommodation', label: 'Accommodation' },
    { value: 'groceries', label: 'Groceries' },
    { value: 'general', label: 'General' },
    { value: 'events', label: 'Events' },
  ]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newMessagesAvailable, setNewMessagesAvailable] = useState(false);
  const [emojiPickerVisible, setEmojiPickerVisible] = useState(false); // State to toggle emoji picker visibility
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (email) {
      fetchUserData(email);
    } else {
      setError('No email found in local storage.');
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (email) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`${apiEndpoints.getuser}/${email}`);
      const data = response.data;
      setUserDetails({
        name: data.name || 'Anonymous',
        email: data.email || '',
        profilePic: data.profilePic || 'demo.png',
      });
    } catch (err) {
      console.error('Error fetching user data:', err);
      setError('Failed to fetch user data.');
    } finally {
      setLoading(false);
    }
  };

  const fetchMessagesForRoom = async (roomName) => {
    try {
      const response = await apiClient.get(`/messages/${roomName}`);
      setMessages(response.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const handleRoomSelect = (selectedOption) => {
    setSelectedRoom(selectedOption);
    socket.emit('joinRoom', selectedOption.value);
    fetchMessagesForRoom(selectedOption.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedRoom) {
      const messageData = {
        text: newMessage,
        email: userDetails.email,
        userDetails,
      };
      socket.emit('sendMessage', messageData, selectedRoom.value);
      setNewMessage('');
    }
  };

  useEffect(() => {
    socket.on('newMessage', (message) => {
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages, message];
        if (chatContainerRef.current && chatContainerRef.current.scrollHeight > chatContainerRef.current.scrollTop + chatContainerRef.current.clientHeight) {
          setNewMessagesAvailable(true);
        }
        return updatedMessages;
      });
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setNewMessagesAvailable(false);
    }
  }, [messages]);

  const handleEmojiSelect = (emojiData) => {
    setNewMessage((prevMessage) => prevMessage + emojiData.emoji); // Append selected emoji to message
    setEmojiPickerVisible(false); // Close the emoji picker after selection
  };

  const renderMessage = (message, isMyMessage) => (
    <div className={`flex ${isMyMessage ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isMyMessage && (
        <img
          src={userDetails.profilePic ? Base_url + userDetails.profilePic : 'https://static.vecteezy.com/system/resources/previews/014/487/014/non_2x/best-female-avatar-icon-flat-vector.jpg'}
          alt="User profile"
          className="w-8 h-8 rounded-full mr-2"
        />
      )}
      <div className={`py-1 px-2 rounded-lg ${isMyMessage ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
        {!isMyMessage && (
          <div className="font-semibold text-xs text-yellow-600">{userDetails.name || 'Anonymous'}</div>
        )}
        <p>{message.text}</p>
      </div>
    </div>
  );

  const handleScrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      setNewMessagesAvailable(false);
    }
  };

  return (
    <div className="container mx-auto p-6 mt-6 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Group Chat</h2>
      <div className="mb-4">
        <Select
          options={rooms}
          onChange={handleRoomSelect}
          placeholder="Select a Room"
        />
      </div>

      {selectedRoom ? (
        <>
          <div ref={chatContainerRef} className="mb-4 h-[600px] overflow-y-scroll bg-gray-100 p-4 rounded-lg">
            {messages.map((message, index) => {
              const isMyMessage = message.email === userDetails.email;
              return (
                <div key={index}>
                  {renderMessage(message, isMyMessage)}
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {newMessagesAvailable && (
            <button
              className="fixed bottom-10 right-10 p-4 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-400"
              onClick={handleScrollToBottom}
            >
              <FaArrowCircleDown className="text-2xl" />
            </button>
          )}

          <div className="relative flex items-center gap-3 mt-4 px-4 py-2 bg-gray-100 rounded-lg shadow-lg">
            <input
              type="text"
              className="flex-1 p-3 border-2 border-gray-300 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-300 transition-all duration-300"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button
              onClick={() => setEmojiPickerVisible((prev) => !prev)} // Toggle emoji picker visibility
              className="p-3 bg-gray-300 rounded-lg hover:bg-gray-200"
            >
              😀
            </button>
            <button
              onClick={handleSendMessage}
              className="p-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-200 ease-in-out transform hover:scale-110"
            >
              <FaPaperPlane />
            </button>
            {emojiPickerVisible && (
              <div className="absolute bottom-14 left-0 z-10">
                <EmojiPicker onEmojiClick={handleEmojiSelect} />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-lg max-w-md mx-auto">
          <FaCommentDots className="text-blue-500 text-xl" />
          <p className="text-gray-500 text-lg">Please select a room to start chatting.</p>
        </div>
      )}
    </div>
  );
};

export default GroupChat;
