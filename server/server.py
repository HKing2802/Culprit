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
api.add_resource(Tokens, '/token')
api.add_resource(TokenRemove, '/token-remove')
api.add_resource(Poll, '/poll')
api.add_resource(PollExclude, '/poll-exclude')
api.add_resource(Accuse, '/accuse')
api.add_resource(CheckEndGame, '/check-end')
api.add_resource(EndGameData, '/end')
api.add_resource(LoadGame, '/load')

if __name__ == '__main__':
    print("Building Database")
    build_tables()
    print("Loading Data")
    load_game_data()
    print("Starting Flask")
    app.run(debug=True), #starts Flask
