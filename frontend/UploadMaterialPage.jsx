import { useState } from "react";

export default function UploadMaterialPage() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !file) {
      setMessage("请填写标题并选择文件");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/materials`, {
      method: "POST",
      credentials: "include",
      body: formData
    });

    if (res.ok) {
      setMessage("✅ 上传成功！");
      setTitle("");
      setFile(null);
    } else {
      const data = await res.json();
      setMessage(data.error || "上传失败");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-green-700 mb-4">📤 上传资料</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="资料标题"
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >上传</button>
      </form>
      {message && <p className="mt-4 text-sm text-center text-green-700">{message}</p>}
    </div>
  );
}
