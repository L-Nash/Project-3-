import numpy as np
import pandas as pd
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, render_template, redirect



#################################################
# Database Setup
#################################################
engine = create_engine('sqlite:///project3.sqlite')
connection = engine.connect()

df = pd.read_sql('select * from fireball', connection)
df.to_csv('static/data/fireball.csv', index=False)


# # Reflect an existing database into a new model
# base = automap_base()
# # Reflect the tables
# base.prepare(engine, reflect=True)

# session = Session(engine)

# textheader = "Fireballs"

# Save references to the tables from database
# fireball = base.classes.fireball

# session.close()

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

# Route that calls index.html template
@app.route ("/")
def welcome():
     """List all available api routes"""
     return render_template("test.html")

# Route that calls maps.html
@app.route("/maps")
def maps():
    return render_template("maps.html")

# Route that calls visualizations.html
@app.route("/visualizations")
def visuals():
    return render_template("visualizations.html")


if __name__ == "__main__":
    app.run(debug=True)