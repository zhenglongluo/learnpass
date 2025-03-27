
import os
from flask import Flask

app = Flask(__name__)

@app.route("/api/me")
def me():
    return {"msg": "你好，后端正常运行！"}



