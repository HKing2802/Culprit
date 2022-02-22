from flask_restful import Resource, reqparse
from api.db_utils import exec_sql_file, exec_get_all
from src.Culprit import *
import string

# arg parsers
caseSetupParser = reqparse.RequestParser()
caseSetupParser.add_argument('name')
caseSetupParser.add_argument('id')
caseSetupParser.add_argument('session')
caseSetupParser.add_argument('color')
caseSetupParser.add_argument('weapon')
caseSetupParser.add_argument('location')
caseSetupParser.add_argument('victim')

playerNameParser = reqparse.RequestParser()
playerNameParser.add_argument('session')
playerNameParser.add_argument('id')

# Data Loading

def build_tables():
    exec_sql_file("src/schema.sql")

def load_game_data():
    exec_sql_file("src/data.sql")


# Resource Classes

class Session(Resource):
    def get(self):
        return generateSessionKey(), 200

class CaseSetup(Resource):
    def post(self):
        args = caseSetupParser.parse_args()
        createNewCase(args['name'], args['id'], args['session'], args['color'], args['weapon'], args['location'], args['victim'])
        return {}, 201

class PlayerName(Resource):
    def post(self):
        args = playerNameParser.parse_args()
        return getPlayerNameFromId(args['session'], args['id']), 200