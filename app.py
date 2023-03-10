import numpy as np
import pandas as pd
import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask import Flask, render_template, redirect

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Database Setup
#################################################
engine = create_engine('sqlite:///fireball_project3.sqlite')
connection = engine.connect()

df = pd.read_sql('select * from fireball', connection)
df.to_csv('Resources/fireball_sqlite.csv', index=False)


#################################################
# Flask Routes
#################################################

# Route that calls index.html template
@app.route ("/")
def welcome():
     return render_template("index.html")

# Route that calls maps.html
@app.route("/maps")
def maps():
    return render_template("maps.html")

# Route that calls visualizations.html
@app.route("/visualizations")
def visuals():
    return render_template("visualizations.html")

# Route that calls staticVisuals.html
@app.route("/staticvisual")
def staticvisual():
    return render_template("staticVisuals.html")


if __name__ == "__main__":
    app.run(debug=True)