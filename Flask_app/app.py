from readline import insert_text
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
          'AwayScore': True, 'HomeScore': True, 'StadiumID': True, 'Channel': True,
          'ForecastTempLow': True, 'ForecastTempHigh': True, 'PrimaryColor': True, 'SecondaryColor': True, 'WikipediaLogoUrl': True, 'WikipediaWordMarkUrl': True, 'Capacity': True,
          'Attendance': True, 'PlayingSurface': True, 'Type': True, 'Name_y': True, 'City_y': True, 'State': True, '_id': False}


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/data")
def nfl_data():
    connection = MongoClient(MONGODB_HOST, MONGODB_PORT)
    collection = connection[DBS_NAME][COLLECTION_NAME]
    projects = collection.find(projection=FIELDS, limit=10000)
    json_projects = []
    for project in projects:
        json_projects.append(project)
    result = collection.find_one()
    # values = [row[0] for row in result]
    return json_projects


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
