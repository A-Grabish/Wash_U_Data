from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_mars

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/mars_app"
mongo = PyMongo(app)

@app.route('/')
def index():
    weather = mongo.db.collection.find()
    return render_template('index.html', weather=weather)


@app.route('/scrape')
def scrape():

    weather = scrape_mars.scrape()

    # weather = {
    #     "title": nasa["nasa"],
    #     "news": nasa["paragraph_url_nasa"],
    #     "big_image" : featured['jpl_image'],
    #     "tweet": tweets['current_mars_weather'],
    #     'mars_table': facts['table_key'],
    #     'hemi_1_name': hemispheres[1],
    #     'hemi_1_url': hemispheres[10],
    #     'hemi_2_name': hemispheres[2],
    #     "hemi_2_url": hemispheres[20],
    #     "hemi_3_name": hemispheres[3],
    #     "hemi_3_url": hemispheres[30],
    #     "hemi_4_name": hemispheres[4],
    #     "hemi_4_url": hemispheres[40]
    # }
    mongo.db.collection.update(weather, upsert = true)

    return redirect("/", code=302)


if __name__ == "__main__":
    app.run(debug=True)
