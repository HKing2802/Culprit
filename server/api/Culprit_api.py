from flask_restful import Resource, reqparse
from api.db_utils import exec_sql_file, exec_get_all

# Data Loading
def build_tables():
    exec_sql_file("src/schema.sql")

def load_game_data():
    exec_sql_file("src/data.sql")

# Resource Classes

class example(Resource):
    def get(self):
        return exec_get_all("SELECT * FROM weapons;")