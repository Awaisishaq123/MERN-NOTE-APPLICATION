import React from "react";

function NotesList({ notes, onEdit, onDelete }) {
  return (
    <div className="p-4 sm:p-6">
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 text-gray-900 text-center tracking-tight drop-shadow-lg">
        Your Notes
      </h2>

      {notes.length === 0 ? (
        <p className="text-gray-600 text-lg text-center py-16">
          No notes available. Start adding your first note!
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div
              key={note._id}
              className="relative backdrop-blur-md bg-white/70 border border-white/30 shadow-lg rounded-3xl p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {note.title}
              </h3>

              {/* Content */}
              <p className="text-gray-700 leading-relaxed mb-12">
                {note.content}
              </p>

              {/* Buttons */}
              <div className="absolute top-4 right-4 flex space-x-3">

                {/* Edit Button */}
                <button
                  onClick={() => onEdit(note)}
                  className="px-4 py-1 text-sm bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white rounded-full font-semibold shadow-md hover:scale-105 transition-all duration-300"
                >
                  Edit
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => onDelete(note._id)}
                  className="px-4 py-1 text-sm bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white rounded-full font-semibold shadow-md hover:scale-105 transition-all duration-300"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NotesList;
