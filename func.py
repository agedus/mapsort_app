import subprocess
import configparser

config = configparser.ConfigParser()
config.read('settings.ini')

e_extension = ""


def tabs_list():
    print(config['SORT_DIRECTORY'])


tabs_list()
