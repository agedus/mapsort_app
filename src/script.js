fetch("http://127.0.0.1:5000/tabs").then(data => data.json()).then(res => {
    console.log(res)
    // let tab_place = document.getElementById("tabs");
    // res.tabs_list.forEach(function (tab) {
    //     let element = document.createElement('li');
    //     element.classList.add('list-group-item');
    //     element.textContent = tab;
    //     tab_place.appendChild(element);
    // });
});

