import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import NotesList from "../components/NotesList";
import AddNote from "../components/AddNote";
import EditNote from "../components/EditNote";

function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth & fetch notes
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    fetchNotes();
  }, [navigate]);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/notes");
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching notes");
    } finally {
      setLoading(false);
    }
  };

  // Add new note
  const handleAddNote = async (noteData) => {
    try {
      const res = await axiosInstance.post("/notes", noteData);
      setNotes([res.data, ...notes]);
    } catch (error) {
      console.error(error);
      alert("Note add error");
    }
  };

  // Edit note
  const handleSaveNote = async (updatedNote) => {
    try {
      const res = await axiosInstance.patch(
        `/notes/${updatedNote._id}`,
        updatedNote
      );

      setNotes(
        notes.map((n) => (n._id === updatedNote._id ? res.data : n))
      );
      setEditingNote(null);
    } catch (error) {
      console.error(error);
      alert("Update error");
    }
  };

  // Start editing
  const handleEditNote = (note) => {
    setEditingNote(note);
  };

  // Delete note
  const handleDeleteNote = async (noteId) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await axiosInstance.delete(`/notes/${noteId}`);
      setNotes(notes.filter((n) => n._id !== noteId));
    } catch (err) {
      console.error(err);
      alert("Error deleting note");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 p-6">

      {/* HEADER */}
      <div className="backdrop-blur-xl bg-white/40 shadow-lg border border-white/20 rounded-2xl p-5 flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wide drop-shadow">
          My Notes Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-full shadow hover:bg-red-600 transition font-medium"
        >
          Logout
        </button>
      </div>

      {/* Add Note */}
      <div className="backdrop-blur-xl bg-white/40 shadow-lg border border-white/20 rounded-2xl p-6">
        <AddNote onAdd={handleAddNote} />
      </div>

      {/* Notes */}
      <div className="mt-8 backdrop-blur-xl bg-white/40 shadow-lg border border-white/20 rounded-2xl p-6">
        {loading ? (
          <p className="text-center text-lg font-medium text-gray-600">
            Loading notes...
          </p>
        ) : (
          <NotesList
            notes={notes}
            onEdit={handleEditNote}
            onDelete={handleDeleteNote}
          />
        )}
      </div>

      {/* Edit Note Modal */}
      {editingNote && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white shadow-lg p-6 rounded-2xl max-w-md w-full border border-gray-200">
            <EditNote
              note={editingNote}
              onSave={handleSaveNote}
              onClose={() => setEditingNote(null)}
            />
            <button
              onClick={() => setEditingNote(null)}
              className="mt-4 bg-gray-300 text-black px-4 py-2 rounded-xl hover:bg-gray-400 transition w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
