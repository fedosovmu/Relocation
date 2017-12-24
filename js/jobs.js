


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