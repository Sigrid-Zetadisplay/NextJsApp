"use client"; // for hooks and fetch calls

import { useState } from "react";
import useCrud from "@/hooks/useCrud"; // optional custom hook for CRUD
// If you don't have a custom hook, you can do manual fetch calls inside this component.

export default function CalendarPage() {
  // If you're using a custom `useCrud` hook, do:
  // const { items: appointments, createItem, editItem, deleteItem } = useCrud("/api/calendar");
  // If not, you can manually replicate the logic as in your blog page.

  // For demonstration, let's do the manual approach:
  const [appointments, setAppointments] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAppt, setNewAppt] = useState({ title: "", date: "", description: "" });

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: "", date: "", description: "" });

  // Fetch appointments on mount
  // Here, we'll do a simple approach, but typically you'd use useEffect + fetch
  // For brevity, let's do everything inline:
  React.useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const res = await fetch("/api/calendar");
      const data = await res.json();
      if (data.success) {
        setAppointments(data.data);
      } else {
        console.error("Error fetching appointments:", data.error);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // Handle new appointment form
  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewAppt((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/calendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAppt),
      });
      const data = await res.json();
      if (data.success) {
        setShowForm(false);
        setNewAppt({ title: "", date: "", description: "" });
        fetchAll(); // re-fetch updated list
      } else {
        console.error("Error creating appointment:", data.error);
      }
    } catch (err) {
      console.error("Request error:", err);
    }
  };

  // Handle edit
  const startEdit = (appt) => {
    setEditId(appt._id);
    setEditData({ title: appt.title, date: appt.date?.slice(0, 10), description: appt.description });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/calendar/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      const data = await res.json();
      if (data.success) {
        setEditId(null);
        fetchAll();
      } else {
        console.error("Error editing appointment:", data.error);
      }
    } catch (err) {
      console.error("Request error:", err);
    }
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/calendar/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        fetchAll();
      } else {
        console.error("Error deleting appointment:", data.error);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>

      <div className="flex justify-between mb-4">
        <p className="text-gray-600">View and manage your appointments.</p>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-blue-600 text-white px-3 py-1 rounded"
        >
          {showForm ? "Cancel" : "Add Appointment"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleNewSubmit} className="border p-4 mb-4">
          <h2 className="text-lg font-semibold mb-2">New Appointment</h2>
          <div className="mb-2">
            <label className="block">Title</label>
            <input
              type="text"
              name="title"
              value={newAppt.title}
              onChange={handleNewChange}
              className="border w-full p-1"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block">Date</label>
            <input
              type="date"
              name="date"
              value={newAppt.date}
              onChange={handleNewChange}
              className="border w-full p-1"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block">Description</label>
            <textarea
              name="description"
              value={newAppt.description}
              onChange={handleNewChange}
              className="border w-full p-1"
            />
          </div>
          <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">
            Save
          </button>
        </form>
      )}

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments yet.</p>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => (
            <div key={appt._id} className="border p-3">
              {editId === appt._id ? (
                <form onSubmit={handleEditSubmit}>
                  <h2 className="font-semibold mb-1">Editing Appointment</h2>
                  <div className="mb-2">
                    <label className="block">Title</label>
                    <input
                      name="title"
                      value={editData.title}
                      onChange={handleEditChange}
                      className="border w-full p-1"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={editData.date}
                      onChange={handleEditChange}
                      className="border w-full p-1"
                      required
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block">Description</label>
                    <textarea
                      name="description"
                      value={editData.description}
                      onChange={handleEditChange}
                      className="border w-full p-1"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <h2 className="text-lg font-semibold">{appt.title}</h2>
                  <p className="text-sm text-gray-700">{new Date(appt.date).toDateString()}</p>
                  {appt.description && <p className="mt-1">{appt.description}</p>}
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => startEdit(appt)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(appt._id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
