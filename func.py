import subprocess
import configparser

config = configparser.ConfigParser()
config.read('settings.ini')

e_extension = ""


def tabs_list():
    tabs = config['SORT_DIRECTORY']['directorys'].split(",")
    data = []
    for tab in tabs:
        path_sort = ["path_sort", config[tab.upper()]['path_sort']]
        path_place = ["path_place", config[tab.upper()]['path_place']]
        extensions = ["extensions",
                      config[tab.upper()]['extensions'].split(",")]
        tab_data = [tab, path_sort, path_place, extensions]
        data.append(tab_data)
    return data
    
