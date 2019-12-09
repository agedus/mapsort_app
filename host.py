from flask import Flask, request, jsonify
from func import *

app = Flask(__name__)


@app.route('/tabs')
def tabs():
    tabs = tabs_list()
    if tabs:
        return jsonify(data=tabs)


@app.route('/pushdata')
def name():
    tab = request.args.get('tab')
    if tab:
        res = push_name(tab)
        if res == "200":
            return jsonify(status="200")
