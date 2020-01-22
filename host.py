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
    tab = request.args.get('tab').replace('_', '')
    if tab:
        res = push_name(tab)
        if res == "200":
            return jsonify(status="200")


@app.route('/extension')
def extension():
    extension = request.args.get('ext').replace(
        ',', '').replace('.', '').replace(" ", "").lower()
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


@app.route('/edit_extension')
def edit_extension():
    button_id = request.args.get('button_id').split("_")[1].upper()
    extensions = edit_extensions(button_id)
    if not extensions == "304":
        return jsonify(data=extensions)
    else:
        return jsonify(status="304")


@app.route('/edit_done')
def edit_done():
    tab = request.args.get('tab')
    print(f"tab = {tab}")
    extensions = request.args.get('extensions').split(',')
    print(f"extensions = {extensions}")
    res = edit_push(tab, extensions)
    if res == "200":
        return jsonify(status="200")
    else:
        return jsonify(status="304")
