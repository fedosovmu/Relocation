


// <--- Обрабатываем GET запрос
window.onload = function ready() {
    var getRequest = location.search;

    if (getRequest != '') {
        var name = getRequest.split('?')[1].split('=')[1].toUpperCase();
        if (name == 'ALL') {
            document.getElementById("extend-content").style.display = 'block';
        } else {
            document.getElementById("search-head").innerHTML = 'Поиск [' + name + ']';
        }
    }
}

function startTyping(input) {
    document.getElementById("main-content_search-button").style.display = 'block';
}

function quryEnter() {
    var text = document.getElementById("main-content_search").value;
    document.getElementById("search-head").innerHTML = text;
}