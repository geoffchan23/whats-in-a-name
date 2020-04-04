from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
  currentName = request.args.get('name', None)
  age = requests.get('https://api.agify.io?name=' + currentName).json();
  nationality = requests.get('https://api.nationalize.io?name=' + currentName).json();
  gender = requests.get('https://api.genderize.io?name=' + currentName).json();
  meaning = requests.get('https://www.behindthename.com/api/lookup.json?name=' + currentName + '&key=ge067545671').json();
  related = requests.get('https://www.behindthename.com/api/related.json?name=' + currentName + '&key=ge067545671').json();
  return jsonify({
    'name' : currentName,
    'age' : age,
    'nationality' : nationality,
    'gender' : gender,
    'meaning': meaning,
    'related': related
  })

