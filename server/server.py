from flask import Flask
from flask_restful import Resource, Api
from flask_cors import CORS

from api.db_utils import *
from api.Culprit_api import *

app = Flask(__name__) #create Flask instance
CORS(app)

api = Api(app) #api router

api.add_resource(CaseSetup,'/case-setup')
api.add_resource(Session, '/key')
api.add_resource(PlayerName, '/name')

if __name__ == '__main__':
    print("Building Database")
    build_tables()
    print("Loading Data")
    load_game_data()
    print("Starting Flask")
    app.run(debug=True), #starts Flask
