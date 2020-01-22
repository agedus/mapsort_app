function get_data() {
    fetch("http://127.0.0.1:5000/tabs").then(data => data.json()).then(res => {

        for (let tab in res.data) {
            for (let list in res.data[tab]) {
                let element = document.createElement('li');
                let name = document.getElementById(list);
                element.classList.add('list-group-item');
                element.textContent = res.data[tab][list];
                name.appendChild(element);
            };
        };

        let extension_edit = document.getElementById("extension_edit");
        for (let tab in res.data) {
            let element = document.createElement('li');
            let button = document.createElement('button');
            element.classList.add('list-group-item');
            element.id = 'btn_li';
            button.id = "button_" + tab;
            button.classList.add('btn');
            button.classList.add('btn-primary');
            button.innerHTML = 'Edit ' + 'extensions';
            button.setAttribute('data-toggle', 'modal');
            button.setAttribute('data-target', '#exampleModal');
            button.setAttribute('onclick', 'edit_extension(id)');
            element.innerHTML += button.outerHTML
            extension_edit.appendChild(element);
        };


        let input_extension = document.getElementById("input_extension");
        for (let tab in res.data) {
            let element = document.createElement('li');
            let input = document.createElement('input');
            element.classList.add('list-group-item');
            input.classList.add("input_extension");
            input.id = "input_" + tab;
            input.placeholder = "Press enter to sent extension";
            input.style.width = "250px";
            input.style.textAlign = "center";
            element.innerHTML += input.outerHTML;
            input_extension.appendChild(element);
        };

        let press = document.querySelectorAll(".input_extension");
        press.forEach(element => {
            element.addEventListener("keypress", extension_push);
        });
    });
};

function extension_push(event) {
    if (event.keyCode == 13) {
        fetch("http://127.0.0.1:5000/extension?ext=" + event.srcElement.value + "&tab=" + event.srcElement.id).then(data => data.json()).then(res => {
            if (res) {
                reset();
                // document.getElementById("input_downloads").focus()
            };
        });
    };
};

function clean() {
    document.getElementById("names").innerHTML = "<li>NAME TAB</li>";
    document.getElementById("extensions").innerHTML = "<li>EXTENSIONS IT FILTERS</li>";
    document.getElementById("extension_edit").innerHTML = "<li>EDIT EXTENSIONS</li>";
    document.getElementById("path_sort").innerHTML = "<li>FOLDER IT WIL SORT</li>";
    document.getElementById("path_place").innerHTML = "<li>FOLDER IT WIL PLACE THE FILES IN</li>";
    document.getElementById("input_extension").innerHTML = "<li>EXTENSIONS IT WIL FILTER</li>";
};

function push_tab() {
    let input = document.getElementById("input_tabs").value;
    if (input) {
        fetch("http://127.0.0.1:5000/pushdata?tab=" + input).then(data => data.json()).then(res => {
            console.log(res);
            if (res) {
                reset();
            };
        });
        document.getElementById("input_tabs").value = "";
    }
}
let selected_ext = []
function selected_extension(id) {
    if (selected_ext.includes(id)) {
        let index = selected_ext.indexOf(id);
        document.getElementById(id).style.backgroundColor = "#007BFF";
        document.getElementById(id).style.borderColor = "#007BFF";
        selected_ext.splice(index, 1);
    } else {
        selected_ext.push(id);
        document.getElementById(id).style.backgroundColor = "red";
        document.getElementById(id).style.borderColor = "red";
    };
};

function push_selected_extension() {
    if (selected_ext) {
        console.log(selected_ext)
        tab = selected_ext[0].split("_")[0].toString();
        console.log(tab)
        for (let extension in selected_ext) {
            new_ext = selected_ext[extension].split("_")[2];
            selected_ext.splice(extension, 1, new_ext)
        };
        let push = selected_ext.toString()
        fetch("http://127.0.0.1:5000/edit_done?tab=" + tab + "&extensions=" + push).then(data => data.json()).then(res => {
            reset()
        });
    };
};


function edit_extension(button_id) {
    document.getElementById('popup_extensions').innerHTML = "";
    fetch("http://127.0.0.1:5000/edit_extension?button_id=" + button_id).then(data => data.json()).then(res => {
        let popup_extensions = document.getElementById("popup_extensions");
        for (let extension in res.data["ext"]) {
            let ext = res.data["ext"][extension];
            let element = document.createElement('li');
            let button = document.createElement('button');
            element.classList.add('extension_button');
            element.classList.add('list-group-item');
            element.classList.add('col');
            element.classList.add('col-lg-auto');
            element.classList.add('select_token');
            element.style.margin = "5px";
            button.id = res.data["tab"] + "_button_" + ext;
            button.setAttribute('onclick', 'selected_extension(id)');
            button.classList.add('btn');
            button.classList.add('btn-primary');
            button.innerHTML = ext;
            element.innerHTML += button.outerHTML
            popup_extensions.appendChild(element);
        };
    });
};

function reset() {
    selected_ext = []
    clean();
    get_data();

};

reset();
