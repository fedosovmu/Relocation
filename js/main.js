
var currentCountryProperties = "";
var currentCountryId = "";
function show_info_page(id) {
    history.replaceState(null,null,'?country='+ id); // меняем айдишник в адресной строке
    currentCountryProperties = getCountryProperties(id);
    currentCountryId = id;
    showContent();

    this.document.getElementById("info-page-name").innerHTML = '| ' + currentCountryProperties.name.toUpperCase(); // Присваеваем заголовку имя страны
    this.document.getElementById("info-page").style.display = 'block'; // Делаем окно с информацией видимым
}

function hide_info_page () {
    history.replaceState(null,null,'?country=ALL');
    this.document.getElementById("info-page").style.display = 'none';
}

// <--- Обновляет контент на окне с информацией, при переключении менюшки
function showContent() {
    // <--- Скрываем все панели с информацией
    this.document.getElementById("info-page_info-content").style.display = 'none';
    this.document.getElementById("info-page_jobs-content").style.display = 'none';
    this.document.getElementById("info-page_homes-content").style.display = 'none';
    this.document.getElementById("info-page_visas-content").style.display = 'none';

    var properties = currentCountryProperties;
    if (infoPageMode == 'info') {
        // --------------------------------------------------------------------
        // ------------------- ОСНОВНАЯ ИНФОРМАЦИЯ О СТРАНЕ -------------------
        // --------------------------------------------------------------------
        this.document.getElementById("info-page_info-content").style.display = 'block';
        this.document.getElementById("info-page_info-content").innerHTML =
            "<h1>" + properties.name + "</h1>" +
            "<p><b>Индекс человеческого развития:</b> " + properties.hdi + "</p>" +
            "<p><b>Описание страны:</b> ?<br></p>" +
            "<b>Параметры:</b> id: " + currentCountryId + "<br>properties: " + JSON.stringify(properties);
    } else if (infoPageMode == 'jobs') {
        // <------ РАБОТА В СТРАНЕ ------
        this.document.getElementById("info-page_jobs-content").style.display = 'block';
        this.document.getElementById("info-page_jobs-content").contentWindow.location.href = 'Jobs.html?country=' + currentCountryId;

    } else if (infoPageMode == 'homes') {
        // <------ ЖИЛЬЕ В СТРАНЕ ------
        this.document.getElementById("info-page_homes-content").style.display = 'block';
        this.document.getElementById("info-page_homes-content").innerHTML =
            "<div style='background-color: white; height: 100%; width: 100%'>" +
            "<img src='images/homes-stub.png' style='width: 100%'>" +
            "</div>";
    } else if (infoPageMode == 'visas') {
        // <------ ВИЗЫ В СТРАНЕ -------
        this.document.getElementById("info-page_visas-content").style.display = 'block';
        this.document.getElementById("info-page_visas-content").innerHTML =
            "<div style='background-color: #33251a; height: 100%; width: 100%'>" +
            "<img src='images/visas-stub.png' style='width: 100%'>" +
            "</div>";
    } else alert("ОШИБКА!");
}


function getCountryProperties(id) {
    var result = "";
    countriesData[0].features.forEach(function(item) {
        if (item.id == id.toUpperCase()) {
            result = item.properties;
        }
    });
    return result;
}



// <--- Поиск по странам
function search_keyup(search) {
    var result = "";
    countriesData[0].features.forEach(function(item) {
        var name = item.properties.name;
        var num = name.toUpperCase().indexOf(search.value.toUpperCase());
        if (num == 0) {
            result += '<a class="search_link" href="?country=' + item.id + '">' + name +'</a><br>';
        }
    });

    document.getElementById("search_results").innerHTML = result;
    if (result == "" || search.value.length == 0)
        document.getElementById("search_results").style.display = 'none';
    else
        document.getElementById("search_results").style.display = 'block';
}



// <--- Обработка событий менюшки окна с информацией
var infoPageMode = 'info';
function resetInfoPageSelection() {
    document.getElementById("info-page_info-item").className="";
    document.getElementById("info-page_jobs-item").className="";
    document.getElementById("info-page_homes-item").className="";
    document.getElementById("info-page_visas-item").className="";
    showContent();
}

function infoItemClick() {
    infoPageMode = 'info';
    resetInfoPageSelection();
    document.getElementById("info-page_info-item").className='menu_selected';
}

function jobsItemClick() {
    infoPageMode = 'jobs';
    resetInfoPageSelection();
    document.getElementById("info-page_jobs-item").className='menu_selected';
}

function homesItemClick() {
    infoPageMode = 'homes';
    resetInfoPageSelection();
    document.getElementById("info-page_homes-item").className='menu_selected';
}

function visasItemClick() {
    infoPageMode = 'visas';
    resetInfoPageSelection();
    document.getElementById("info-page_visas-item").className='menu_selected';
}


// <--- Обрабатываем GET запрос
window.onload = function ready() {
    var getRequest  = location.search;
    if (getRequest != '') {
        var id = getRequest.split('?')[1].split('=')[1].toUpperCase();
        currentCountryProperties = getCountryProperties(id);
        currentCountryId = id;
        var infoPageMode = 'info';
        show_info_page(id);
    }
}

// <--- Обработка событий из МЕНЮ слева
function resetMenuSelection() {
    document.getElementById("map").style.display='none';
    document.getElementById("jobs").style.display='none';
    hide_info_page();
}

function openMap() {
    resetMenuSelection();
    document.getElementById("map").style.display='block';
}

function openJobs() {
    resetMenuSelection();
    document.getElementById("jobs").style.display='block';
}