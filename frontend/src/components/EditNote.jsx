import React, { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import toast from "react-hot-toast";

function EditNote({ note, onSave, onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSave = async () => {
    if (!title || !content) {
      toast.error("Please fill in both fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.patch(`/notes/${note._id}`, { title, content });
      onSave(res.data); // update parent
      toast.success("Note updated successfully!");
      onClose(); // close modal
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error updating note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 bg-white shadow-2xl rounded-2xl w-full max-w-md mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
        Edit Note
      </h2>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Enter note title"
        />
      </div>

      <div className="mb-6">
        <label className="block font-medium text-gray-700 mb-2">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
          placeholder="Write your note content here..."
        ></textarea>
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3">
        <button
          onClick={onClose}
          className="w-full sm:w-auto bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          className={`w-full sm:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}

export default EditNote;
