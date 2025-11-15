import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import toast, { Toaster } from 'react-hot-toast';

function AddNote({ onAdd }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!title || !content) {
      toast.error("Please fill in both fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/notes", { title, content });

      onAdd(res.data);

      setTitle("");
      setContent("");

      toast.success("Note added successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error adding note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative max-w-lg mx-auto mt-10 p-6 bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-green-200">
      {/* Toast Container */}
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center">
        Add a New Note
      </h2>

      {/* Title Input */}
      <div className="relative mb-5">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder=" "
          className="peer w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 shadow-sm hover:shadow-md transition placeholder-transparent"
        />
        <label className="absolute left-4 top-4 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all peer-focus:-top-2 peer-focus:text-green-500 peer-focus:text-sm">
          Title
        </label>
      </div>

      {/* Content Input */}
      <div className="relative mb-6">
        <textarea
          value={content}
          rows={5}
          onChange={(e) => setContent(e.target.value)}
          placeholder=" "
          className="peer w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1 shadow-sm hover:shadow-md transition placeholder-transparent resize-none"
        ></textarea>
        <label className="absolute left-4 top-4 text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base transition-all peer-focus:-top-2 peer-focus:text-green-500 peer-focus:text-sm">
          Content
        </label>
      </div>

      {/* Add Button */}
      <button
        onClick={handleAdd}
        disabled={loading}
        className={`w-full py-3 rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-lg shadow-lg hover:from-green-600 hover:to-green-700 hover:scale-105 active:scale-95 transition-all duration-300 ${
          loading && "opacity-50 cursor-not-allowed"
        }`}
      >
        {loading ? "Adding..." : "Add Note"}
      </button>
    </div>
  );
}

export default AddNote;
