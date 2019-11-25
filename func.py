import subprocess
import configparser

config = configparser.ConfigParser()
config.read('settings.ini')

e_extension = ""


def tabs_list():
    for tab in config['SORT_DIRECTORY']['directorys'].split(","):
        pass    
