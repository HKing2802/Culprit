from flask import Flask
from flask_restful import Resource, Api

from api.db_utils import *
from api.Culprit_api import build_tables

app = Flask(__name__) #create Flask instance

api = Api(app) #api router

# api.add_resource(ExampleApi,'/example_api')

if __name__ == '__main__':
    print("Loading Database")
    build_tables()
    print("Starting Flask")
    app.run(debug=True), #starts Flask
