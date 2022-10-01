from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
from pymongo import MongoClient
import json
from bson import json_util
from bson.json_util import dumps
import flask

app = flask.Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'nfl_db'
COLLECTION_NAME = 'season_data'
FIELDS = {'Date': True, 'HomeTeam': True, 'AwayTeam': True,
          'AwayScore': True, 'HomeScore': True, 'StadiumID': True, '_id': False}


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/nfl_db/season_data")
def test_nfl():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS, limit=10000)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    json_projects = json.dumps(json_projects, default=json_util.default)
    connection.close()

    return jsonify(json_projects)


# if __name__ == "__main__":
#     app.run(host='0.0.0.0', port=5000, debug=True)
