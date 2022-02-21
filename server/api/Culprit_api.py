from flask_restful import Resource, reqparse
from api.db_utils import exec_sql_file

# Data Loading
def build_tables():
    exec_sql_file("src/schema.sql")

# Resource Classes
