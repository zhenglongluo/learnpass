import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function HomeNavLogin() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [materials, setMaterials] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/materials`)
      .then(res => res.json())
      .then(setMaterials);
  }, []);

  const handleLogin = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) window.location.reload();
    else setError(data.error || "登录失败");
  };
  
  const handleRegister = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/api/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (res.ok) {
    alert("注册成功，请点击登录！");
  } else {
    setError(data.error || "注册失败");
  }
};

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <nav className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-green-700">Learn&Pass</h1>
        <div className="space-x-4">
          <button className="text-green-700" onClick={() => navigate("/upload")}>上传资料</button>
          <button className="text-green-700" onClick={() => setShowLogin(v => !v)}>
            {showLogin ? "关闭登录" : "登录 / 注册"}
          </button>
        </div>
      </nav>
      {showLogin && (
        <div className="bg-white shadow-md rounded p-4 border mb-6">
          <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border p-2 w-full mb-2"
            placeholder="邮箱"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 w-full mb-4"
            placeholder="密码"
          />
        <div className="flex gap-2">
          <button
            onClick={handleLogin}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >登录</button>
          <button
            onClick={handleRegister}
    className="bg-blue-500 hover:bg-blue-600 transition text-white font-medium px-4 py-2 rounded-xl shadow-sm"
          >注册</button>
        </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      )}
      <h2 className="text-xl font-bold mb-3">📚 最新资料</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {materials.map((m) => (
          <div
            key={m.id}
            onClick={() => navigate(`/material/${m.id}`)}
            className="cursor-pointer border rounded p-4 shadow-sm bg-white hover:shadow-md"
          >
            <h3 className="font-semibold text-green-800 mb-1">{m.title}</h3>
            <p className="text-sm text-gray-500">由 {m.uploader} 上传</p>
          </div>
        ))}
      </div>
    </div>
  );
}
