from flask import Flask
from flask_restful import Resource, Api

from api.db_utils import *
from api.Culprit_api import *

app = Flask(__name__) #create Flask instance

api = Api(app) #api router

api.add_resource(example,'/example_api')

if __name__ == '__main__':
    print("Building Database")
    build_tables()
    print("Loading Data")
    load_game_data()
    print("Starting Flask")
    app.run(debug=True), #starts Flask
