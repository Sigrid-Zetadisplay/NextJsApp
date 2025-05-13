"use client";

export default function BlogPostForm({
  mode,
  formData,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form className="mb-6 border p-4" onSubmit={onSubmit}>
      <h2 className="text-xl font-semibold mb-2">
        {mode === "edit" ? "Edit Post" : "Create a New Post"}
      </h2>

      <label className="block mb-1">Title</label>
      <input
        name="title"
        value={formData.title}
        onChange={onChange}
        className="border w-full p-1 mb-2"
        required
      />

      <label className="block mb-1">Category</label>
      <input
        name="category"
        value={formData.category}
        onChange={onChange}
        className="border w-full p-1 mb-2"
        required
      />

      <label className="block mb-1">Content</label>
      <textarea
        name="content"
        value={formData.content}
        onChange={onChange}
        className="border w-full p-1 mb-2"
        required
      />

<label className="block mb-1">Image URL</label>
      <input
        name="image"
        value={formData.image}
        onChange={onChange}
        className="border w-full p-1 mb-2"
      />
      {formData.image && (
        <img
          src={formData.image}
          alt="Preview"
          className="w-32 h-auto mb-2 border"
        />
      )}

      <label className="block mb-1">Author</label>
      <input
        name="author"
        value={formData.author}
        onChange={onChange}
        className="border w-full p-1 mb-2"
        required
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className={`${
            mode === "edit"
              ? "bg-green-500 hover:bg-green-600"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white px-4 py-2 rounded`}
        >
          {mode === "edit" ? "Save" : "Create Post"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
