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
caseSetupParser.add_argument('tokens')

playerNameParser = reqparse.RequestParser()
playerNameParser.add_argument('session')
playerNameParser.add_argument('id')

tokenParser = reqparse.RequestParser()
tokenParser.add_argument('session')
tokenParser.add_argument('id')

pollParser = reqparse.RequestParser()
pollParser.add_argument('session')
pollParser.add_argument('id')
pollParser.add_argument('type')
pollParser.add_argument('tag')

excludeParser = reqparse.RequestParser()
excludeParser.add_argument('session')
excludeParser.add_argument('selected')

accuseParser = reqparse.RequestParser()
accuseParser.add_argument('session')
accuseParser.add_argument('id')
accuseParser.add_argument('player')
accuseParser.add_argument('color')

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
        createNewCase(args['name'], args['id'], args['session'], args['color'], args['weapon'], args['location'], args['victim'], args['tokens'])
        return {}, 201

class PlayerName(Resource):
    def post(self):
        args = playerNameParser.parse_args()
        return getPlayerNameFromId(args['session'], args['id']), 200

class Tokens(Resource):
    def post(self):
        args = tokenParser.parse_args()
        return getPlayerTokenCount(args['session'], args['id']), 200

class TokenRemove(Resource):
    def post(self):
        args = tokenParser.parse_args()
        removePlayerToken(args['session'], args['id'])
        return {}, 200

class Poll(Resource):
    def post(self):
        args = pollParser.parse_args()
        return getPollData(args['session'], args['id'], args['type'], args['tag']), 200

class PollExclude(Resource):
    def post(self):
        args = excludeParser.parse_args()
        setPollExcludes(args['session'], args['selected'])
        return {}, 200

class Accuse(Resource):
    def post(self):
        args = accuseParser.parse_args()
        return getAccusationResults(args["session"], args["id"], args["player"], args["color"]), 200