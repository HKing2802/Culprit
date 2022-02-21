from flask_restful import Resource, reqparse

# Data Loading
def build_tables():
    exec_sql_file("src/schema.sql")

# Resource Classes