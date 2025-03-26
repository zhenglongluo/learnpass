import { useEffect, useState } from "react";

export default function UserProfilePage() {
  const [me, setMe] = useState(null);
  const [myUploads, setMyUploads] = useState([]);
  const [myCollections, setMyCollections] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/me`, { credentials: "include" })
      .then(res => res.json())
      .then(setMe);
    fetch(`${import.meta.env.VITE_API_BASE}/api/me/uploads`, { credentials: "include" })
      .then(res => res.json())
      .then(setMyUploads);
    fetch(`${import.meta.env.VITE_API_BASE}/api/me/collections`, { credentials: "include" })
      .then(res => res.json())
      .then(setMyCollections);
  }, []);

  if (!me) return <div className="p-6">加载中...</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-green-700 mb-4">👤 我的主页</h1>
      <p className="mb-6 text-sm text-gray-600">当前登录：{me.email}</p>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-2">📤 我上传的资料</h2>
        {myUploads.length === 0 ? <p className="text-gray-500 text-sm">暂无上传</p> : (
          <ul className="space-y-2">
            {myUploads.map((m) => (
              <li key={m.id} className="border p-3 rounded bg-white">
                <strong>{m.title}</strong> · 上传时间 {new Date(m.time).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">⭐ 我的收藏</h2>
        {myCollections.length === 0 ? <p className="text-gray-500 text-sm">暂无收藏</p> : (
          <ul className="space-y-2">
            {myCollections.map((m) => (
              <li key={m.id} className="border p-3 rounded bg-white">
                <strong>{m.title}</strong> · 上传者 {m.uploader}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}