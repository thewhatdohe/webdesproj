from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/subjects/webdesign")
def webdesign():
    return render_template("subjects/webdesign.html")

@app.route("/subjects/robotics")
def robotics():
    return render_template("subjects/robotics.html")

@app.route("/subjects/math")
def math():
    return render_template("subjects/math.html")

@app.route("/subjects/chemistry")
def chemistry():
    return render_template("subjects/chemistry.html")

@app.route("/survey")
def survey():
    return render_template("/survey.html")
