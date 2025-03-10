"use client";

export default function CrudForm({ formData, setFormData, onSubmit, isEdit }) {
  return (
    <form onSubmit={onSubmit} className="border p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">
        {isEdit ? "Edit Post" : "Create New Post"}
      </h2>
      {/* Title */}
      <label>Title</label>
      <input
        name="title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="border w-full p-1 mb-2"
        required
      />
      {/* Category */}
      {/* Content */}
      {/* Author */}
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        {isEdit ? "Save" : "Create"}
      </button>
    </form>
  );
}
