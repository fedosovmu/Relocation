
function show_info_page(properties) {
    this.document.getElementById("info-page_content").innerHTML=
        "<h1>" + properties.name + "</h1>" +
        "<p><b>Индекс человеческого развития:</b> " + properties.hdi + "</p>" +
        "<p><b>Описание страны:</b> ?<br></p>";

    this.document.getElementById("info-page-name").innerHTML= '| ' + properties.name.toUpperCase();

    this.document.getElementById("info-page").style.display = 'block';
}

function hide_info_page () {
    this.document.getElementById("info-page").style.display = 'none';
}



// <--- Обрабатываем гет
//var get = location.search;
//document.title='lol';
//show_info_page()
//countriesData[0].features.forEach(function(item) {
//    var name = item.properties.name;
//    if (name = 'Russia') {
//       alert(name);
//    }
//});



function search_keyup(search) {
    var result = "";
    countriesData[0].features.forEach(function(item) {
        var name = item.properties.name;
        var num = name.toUpperCase().indexOf(search.value.toUpperCase());
        if (num == 0) {
            result += '<a class="search_link" href="?country=' + name + '">' + name +'</a><br>';
        }
    });

    document.getElementById("search_result").innerHTML = result;
    if (result == "" || search.value.length == 0)
        document.getElementById("search_result").style.display = 'none';
    else
        document.getElementById("search_result").style.display = 'block';
}


function resetSelection() {
    document.getElementById("info-item").className="";
    document.getElementById("works-item").className="";
    document.getElementById("homes-item").className="";
}

function infoItemClick() {
    resetSelection();
    document.getElementById("info-item").setAttribute('class', 'menu_selected');
}

function worksItemClick() {
    resetSelection();
    document.getElementById("works-item").setAttribute('class', 'menu_selected');
}

function homesItemClick() {
    resetSelection();
    document.getElementById("homes-item").setAttribute('class', 'menu_selected');
}
