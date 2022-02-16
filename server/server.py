from flask import Flask
from flask_restful import Resource, Api

from api.db_utils import *


app = Flask(__name__) #create Flask instance

api = Api(app) #api router

# api.add_resource(ExampleApi,'/example_api')

if __name__ == '__main__':
    print("Starting Flask");
    app.run(debug=True), #starts Flask
