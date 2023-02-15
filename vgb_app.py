import numpy as np
import pandas as pd
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask


##database
engine = create_engine(f'postgresql://postgres_username:postgres_password@localhost:5432/DB_name')
connection = engine.connect()

pg = pd.read_sql('select * from fireball', connection)

##existing database
Base = automap_base()
Base.prepare(engine, reflect=True)

session = Session(engine)
##reference


session.close()
###########################
##app
app = Flask(__name__)

##########################
# @app.route ("/")
# def welcome():
#     """List all available api routes"""
#     return(
        
#     )




# if __name__ == "__main__":
#     app.run(debug=True)