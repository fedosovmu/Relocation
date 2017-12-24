



// <--- Обрабатываем GET запрос
window.onload = function ready() {
    var getRequest = location.search;
    if (getRequest != '') {
        var name = getRequest.split('?')[1].split('=')[1].toUpperCase();
        document.getElementById("text").innerHTML = 'Поиск [' + name + ']';
    }
}