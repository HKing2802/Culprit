from flask_restful import Resource, reqparse
from api.db_utils import exec_sql_file, exec_get_all
from src.Culprit import *
import string

# arg parsers
caseSetupParser = reqparse.RequestParser()
caseSetupParser.add_argument('name', type=string)
caseSetupParser.add_argument('id', type=int)
caseSetupParser.add_argument('session', type=string)
caseSetupParser.add_argument('color', type=string)
caseSetupParser.add_argument('weapon', type=string)
caseSetupParser.add_argument('location', type=string)
caseSetupParser.add_argument('victim', type=string)


# Data Loading

def build_tables():
    exec_sql_file("src/schema.sql")

def load_game_data():
    exec_sql_file("src/data.sql")


# Resource Classes

class CaseSetup(Resource):
    def put(self):
        args = caseSetupParser.parse_args()
        createNewCase(args['name'], args['id'], args['session'], args['color'], args['weapon'], args['location'], args['victim'])
        return {}, 201, {'Access-Control-Allow-Origin': '*'}