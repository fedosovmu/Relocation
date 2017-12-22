
var currentCountryProperties = "";
var currentCountryId = "";
function show_info_page(e) {
    currentCountryProperties = e.target.feature.properties;
    currentCountryId = e.target.feature.id;
    showContent();

    this.document.getElementById("info-page-name").innerHTML = '| ' + currentCountryProperties.name.toUpperCase(); // Присваеваем заголовку имя страны
    this.document.getElementById("info-page").style.display = 'block'; // Делаем окно с информацией видимым
}

function hide_info_page () {
    this.document.getElementById("info-page").style.display = 'none';
}

function showContent() {
    var properties = currentCountryProperties;
    if (infoPageMode == 'info') {
        // ------------- ОСНОВНАЯ ИНФОРМАЦИЯ О СТРАНЕ ---------------
        this.document.getElementById("info-page_content").innerHTML =
            "<h1>" + properties.name + "</h1>" +
            "<p><b>Индекс человеческого развития:</b> " + properties.hdi + "</p>" +
            "<p><b>Описание страны:</b> ?<br></p>" +
            "<b>Параметры:</b> id: " + currentCountryId + ", properties: " + JSON.stringify(properties);
    } else if (infoPageMode == 'works') {
        // ------------- РАБОТА В СТРАНЕ -----------------------------
        this.document.getElementById("info-page_content").innerHTML = "Работа в стране, " + properties.name + " [" + currentCountryId + "]";
    } else if (infoPageMode == 'homes') {
        // ------------- ЖИЛЬЕ В СТРАНЕ ------------------------------
        this.document.getElementById("info-page_content").innerHTML = "Жилье в стране, " + properties.name + " [" + currentCountryId + "]";
    } else alert("ОШИБКА!");
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
            result += '<a class="search_link" href="?country=' + item.id + '">' + name +'</a><br>';
        }
    });

    document.getElementById("search_result").innerHTML = result;
    if (result == "" || search.value.length == 0)
        document.getElementById("search_result").style.display = 'none';
    else
        document.getElementById("search_result").style.display = 'block';
}




var infoPageMode = 'info';
function resetSelection() {
    document.getElementById("info-item").className="";
    document.getElementById("works-item").className="";
    document.getElementById("homes-item").className="";
    showContent();
}

function infoItemClick() {
    infoPageMode = 'info';
    resetSelection();
    document.getElementById("info-item").className='menu_selected';
}

function worksItemClick() {
    infoPageMode = 'works';
    resetSelection();
    document.getElementById("works-item").className='menu_selected';
}

function homesItemClick() {
    infoPageMode = 'homes';
    resetSelection();
    document.getElementById("homes-item").className='menu_selected';
}
