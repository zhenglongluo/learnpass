from flask import Flask
from flask_cors import CORS  # ✅ 你缺了这行

app = Flask(__name__)
CORS(app, supports_credentials=True)  # ✅ 这行是对的

@app.route("/api/me")
def me():
    return {"msg": "你好，后端正常运行！"}

@app.route("/api/materials")
def materials():
    return [
        {"id": 1, "title": "示例资料 A", "uploader": "系统"},
        {"id": 2, "title": "示例资料 B", "uploader": "系统"}
    ]



