function get_data() {
    fetch("http://127.0.0.1:5000/tabs").then(data => data.json()).then(res => {

        for (let tab in res.data) {
            for (let list in res.data[tab]) {
                let name = document.getElementById(list);
                let element = document.createElement('li');
                element.classList.add('list-group-item');
                element.textContent = res.data[tab][list];
                name.appendChild(element);
            };
        };

        let input_extension = document.getElementById("input_extension");
        for (let tab in res.data) {
            let element = document.createElement('li');
            let input = document.createElement('input');
            element.classList.add('list-group-item');
            input.classList.add("input_extension")
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
            if (res == "200") {
                clean();
                get_data();
            };
        });
        event.srcElement.value = "";
    };
};

function clean() {
    document.getElementById("names").innerHTML = "<li>NAME TAB</li>";
    document.getElementById("extensions").innerHTML = "<li>EXTENSIONS IT FILTERS</li>";
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
                clean();
                get_data();
            };
        });
        document.getElementById("input_tabs").value = "";
    }
}

clean();
get_data();

