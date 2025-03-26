import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [materials, setMaterials] = useState([]);

  const fetchMaterials = () => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/admin/materials`, { credentials: "include" })
      .then(res => res.json())
      .then(setMaterials);
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/admin/materials/${id}`, {
      method: "DELETE", credentials: "include"
    });
    if (res.ok) fetchMaterials();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-red-700">🛠 管理后台</h1>
      <ul className="space-y-3">
        {materials.map((m) => (
          <li key={m.id} className="border p-3 bg-white rounded flex justify-between items-center">
            <span>{m.title} · by {m.uploader}</span>
            <button
              onClick={() => handleDelete(m.id)}
              className="text-sm bg-red-600 text-white px-2 py-1 rounded"
            >删除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}