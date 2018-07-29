import requests
import calendar
import json
import time
import hashlib
from flask import Flask, render_template, request
from flask_frozen import Freezer

app = Flask(__name__)
app.config.from_pyfile('settings.py')

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/char_search")
def char_search():
    search_term = request.args.get('query')
    results = query_marvel(search_term, "characters", "nameStartsWith", "name")
    return results

@app.route("/series_search")
def series_search():
    search_term = request.args.get('query')
    results = query_marvel(search_term, "series", "titleStartsWith", "title")
    return results

def query_marvel(query, api, search_param, c_id):
    ts, apikey, hash_key = get_token()
    result = requests.get("https://gateway.marvel.com/v1/public/{}?ts={}&apikey={}&hash={}&{}={}".format(
        api,
        ts,
        apikey,
        hash_key,
        search_param,
        query
    ))
    
    chars = json.loads(result.content)
    char_names = [c[c_id] for c in chars['data']['results']]
    result_string = ", ".join(char_names)
    return json.dumps(result_string)

def get_token():
    ts = calendar.timegm(time.gmtime())
    public = '8d95b8d5c0e8583432080e8c8c06af7a'
    private = '2cd9dc8bb8c8ded4134748ed29ef80029fb59108'
    s = str(ts) + private + public
    m = hashlib.md5()
    m.update(s.encode('utf-8'))
    h = m.hexdigest()
    return ts, public, h

if __name__ == "__main__":
    # query_marvel("Spi", "characters", "nameStartsWith")
    app.run()