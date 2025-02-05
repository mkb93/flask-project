from flask import Flask, request

app = Flask(__name__)


@app.route("/")
def hello_world():
    return "Hello, World!"

@app.route("/fancy")
def hello_world_fancy():
    greetings = """
    <html>
    <body>

    <h1>Greetings!</h1>
    <p>Hello, world!</p>

    </body>
    </html>
    """
    return greetings
@app.route("/personalized")
def hello_personalized():
    name = request.args.get('name')
    return f"Hello, {name}!"