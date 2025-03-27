from flask import Flask

app = Flask(__name__)
CORS(app, supports_credentials=True)  # ✅ 添加这行代码

@app.route("/api/me")
def me():
    return {"msg": "你好，后端正常运行！"}




