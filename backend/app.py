from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

users = {}  # 临时存储用户，格式：{email: password}

@app.route("/api/me")
def me():
    return {"msg": "你好，后端正常运行！"}

@app.route("/api/materials")
def materials():
    return [
        {"id": 1, "title": "示例资料 A", "uploader": "系统"},
        {"id": 2, "title": "示例资料 B", "uploader": "系统"}
    ]

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    if users.get(email) == password:
        return {"msg": "登录成功"}
    return jsonify({"error": "账号或密码错误"}), 403

@app.route("/api/register", methods=["POST"])
def register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    if email in users:
        return jsonify({"error": "用户已存在"}), 400
    users[email] = password
    return {"msg": "注册成功"}
