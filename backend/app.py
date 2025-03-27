
import os
from flask import Flask

app = Flask(__name__)

@app.route("/api/me")
def me():
    return {"msg": "你好，后端正常运行！"}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int(os.environ.get("PORT", 5000)))

