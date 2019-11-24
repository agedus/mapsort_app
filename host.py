from flask import Flask, request, jsonify
from func import *

app = Flask(__name__)


@app.route('/tabs')
def tabs():
    tabs = tabs_list()
    return jsonify(tabs_list=tabs)
