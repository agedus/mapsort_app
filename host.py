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


@app.route('/extension')
def extension():
    extension = request.args.get('ext').replace(',', '').replace('.', '').lower()
    name = request.args.get('tab')
    print(extension, name)
    if extension and name:
        res = push_extension(extension, name)
        if res == "200":
            print("200")
            return jsonify(status="200")
        if res == "304":
            print("304")
            return jsonify(status="304")
