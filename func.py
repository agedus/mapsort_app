import subprocess
import configparser

config = configparser.ConfigParser()
config.read('settings.ini')


def write():
    with open('settings.ini', 'w') as f:
        config.write(f)


def tabs_list():
    tabs = config['SORT_DIRECTORY']['directorys'].split(",")
    data = {}
    if tabs:
        for tab in tabs:
            data[tab] = {
                "names": tab.upper(),
                "path_sort": config[tab.upper()]['path_sort'],
                "path_place": config[tab.upper()]['path_place'],
                "extensions": config[tab.upper()]['extensions'].split(",")
            }
    return data


def tabs_check():
    for tab in config['SORT_DIRECTORY']['directorys'].split(","):
        if tab:
            if not config.has_section(tab.upper()):
                config.add_section(tab.upper())
                config[tab.upper()]['path_sort'] = "None"
                config[tab.upper()]['path_place'] = "None"
                config[tab.upper()]['extensions'] = "None"


def push_name(name):
    new_tab = name.lower().replace(" ", "")
    print(f"new tab === {new_tab}")
    tabs = config['SORT_DIRECTORY']['directorys'].split(",")
    if not new_tab in tabs:
        tabs.append(new_tab)
        push_tab = ""
        for tab in tabs:
            push_tab += tab + ","
        push_tab = push_tab[:-1]
        print(f"dit pusht ie: {push_tab}")
        config['SORT_DIRECTORY']['directorys'] = push_tab
    tabs_check()
    write()
    return "200"


def push_extension(extension, name):
    id = name.split("_", 1)[1].upper()
    extension_row = config[id]['extensions'].split(",")
    if extension_row[0] == "None":
        config[id]['extensions'] = extension
        write()
        return "200"
    else:
        if not extension in extension_row:
            extension_row.append(extension)
            ext_push = ""
            for ext in extension_row:
                ext_push += ext + ","
            config[id]['extensions'] = ext_push[:-1]
            write()
            return "200"
        else:
            return "304"


def edit_extensions(id):
    data = {}
    extensions = config[id]['extensions'].split(",")
    if not extensions[0] == "None":
        data = {
            "tab": id,
            "ext": extensions
        }
        return data
    else:
        return "304"


def edit_push(tab, extensions):
    old_extensions = config[tab]['extensions'].split(",")
    new_extensions = ""
    for extension in old_extensions:
        if not extension in extensions:
            new_extensions += extension + ","
    if new_extensions == "":
        config[tab]['extensions'] = "None"
    else:
        config[tab]['extensions'] = new_extensions[:-1]
    write()
    return "200"
