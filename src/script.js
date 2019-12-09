function get_data() {
    fetch("http://127.0.0.1:5000/tabs").then(data => data.json()).then(res => {
        let name_place = document.getElementById("names");
        res.data.forEach(function (tab) {
            let element = document.createElement('li');
            element.classList.add('list-group-item');
            element.textContent = tab[0].toUpperCase();
            name_place.appendChild(element);
        });
        let extensions_place = document.getElementById("extensions");
        res.data.forEach(function (tab) {
            let element = document.createElement('li');
            element.classList.add('list-group-item');
            element.textContent = tab[3][1];
            extensions_place.appendChild(element);
        });
        let path_sort_place = document.getElementById("path_sort");
        res.data.forEach(function (tab) {
            let element = document.createElement('li');
            element.classList.add('list-group-item');
            element.textContent = tab[1][1];
            path_sort_place.appendChild(element);
        });
        let path_place_place = document.getElementById("path_place");
        res.data.forEach(function (tab) {
            let element = document.createElement('li');
            element.classList.add('list-group-item');
            element.textContent = tab[2][1];
            path_place_place.appendChild(element);
        });
        let input_extension = document.getElementById("input_extension");
        res.data.forEach(function (tab) {
            let element = document.createElement('li');
            let input = document.createElement('input');
            element.classList.add('list-group-item');
            input.id = "input_" + tab[0];
            input.placeholder = "Press enter to sent extension";
            input.style.width = "250px";
            input.style.textAlign = "center";
            element.innerHTML += input.outerHTML;
            input_extension.appendChild(element);
        });
    });
}

function clean() {
    document.getElementById("names").innerHTML = "<li>NAME TAB</li>";
    document.getElementById("extensions").innerHTML = "<li>EXTENSIONS IT FILTERS</li>";
    document.getElementById("path_sort").innerHTML = "<li>FOLDER IT WIL SORT</li>";
    document.getElementById("path_place").innerHTML = "<li>FOLDER IT WIL PLACE THE FILES IN</li>";
    document.getElementById("input_extension").innerHTML = "<li>EXTENSIONS IT WIL FILTER</li>";
}

function push_tab() {
    let input = document.getElementById("input_tabs").value;
    if (input) {
        fetch("http://127.0.0.1:5000/pushdata?extension=" + input).then(data => data.json()).then(res => {
            console.log(res)
            if (res) {
                clean();
                get_data();
            }
        });
        document.getElementById("input_tabs").value = "";
    }
}

clean()
get_data()
