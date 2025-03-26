import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MaterialDetailPage() {
  const { id } = useParams();
  const [material, setMaterial] = useState(null);
  const [message, setMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/materials/${id}`)
      .then(res => res.json())
      .then(setMaterial);

    fetch(`${import.meta.env.VITE_API_BASE}/api/materials/${id}/comments`)
      .then(res => res.json())
      .then(setComments);
  }, [id]);

  const handleComment = async () => {
    if (!newComment) return;
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/materials/${id}/comments`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: newComment })
    });
    if (res.ok) {
      const data = await res.json();
      setComments([...comments, data]);
      setNewComment("");
    } else {
      setMessage("评论失败");
    }
  };

  if (!material) return <div className="p-6">加载中...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2 text-green-700">{material.title}</h1>
      <p className="text-sm mb-4 text-gray-500">由 {material.uploader} 上传</p>
      <a
        className="text-blue-600 underline"
        href={material.download_url}
        target="_blank"
        rel="noopener noreferrer"
      >📎 下载资料</a>

      <hr className="my-6" />
      <h2 className="text-xl font-semibold mb-2">💬 评论区</h2>
      <div className="space-y-3 mb-4">
        {comments.map((c) => (
          <div key={c.id} className="bg-gray-50 p-2 rounded border">
            <p className="text-sm">{c.content}</p>
            <p className="text-xs text-gray-400 mt-1">—— {c.user}</p>
          </div>
        ))}
      </div>
      <textarea
        value={newComment}
        onChange={e => setNewComment(e.target.value)}
        placeholder="写下你的评论"
        className="w-full border p-2 rounded mb-2"
      />
      <button
        onClick={handleComment}
        className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700"
      >
	发表评论
      </button>
    </div>
);

