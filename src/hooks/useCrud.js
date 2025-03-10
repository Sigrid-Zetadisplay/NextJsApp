"use client";
import { useState, useEffect } from "react";

/**
 * A reusable CRUD hook for any endpoint
 */
export default function useCrud(endpoint) {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  // 1. Fetch all items
  const fetchItems = async () => {
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      } else {
        setError(data.error || "Failed to fetch items.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // On mount, fetch items
  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  // 2. Add new item
  const createItem = async (newData) => {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      const data = await res.json();
      if (data.success) {
        // Re-fetch or update local state
        fetchItems();
      } else {
        setError(data.error || "Failed to create item.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // 3. Edit item
  const editItem = async (id, updatedData) => {
    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      const data = await res.json();
      if (data.success) {
        fetchItems();
      } else {
        setError(data.error || "Failed to edit item.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // 4. Delete item
  const deleteItem = async (id) => {
    try {
      const res = await fetch(`${endpoint}/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        fetchItems();
      } else {
        setError(data.error || "Failed to delete item.");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return {
    items,
    error,
    createItem,
    editItem,
    deleteItem,
  };
}
