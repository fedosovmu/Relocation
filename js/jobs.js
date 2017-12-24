


// <--- Обрабатываем GET запрос
window.onload = function ready() {
    var getRequest = location.search;

    if (getRequest != '') {
        var name = getRequest.split('?')[1].split('=')[1].toUpperCase();
        if (name == 'ALL') {
            document.getElementById("extend-content").style.display = 'block';
        } else {
            document.getElementById("search-head").innerHTML = 'Поиск ' + name + '';
        }
    }
}

function startTyping(input) {
    document.getElementById("main-content_search-button").style.display = 'block';
}

function quearyEnter() {
    document.getElementById("main-content_search-button").style.display = 'none';
    var text = document.getElementById("main-content_search").value;
    document.getElementById("main-content_search").value = '';
    addTag(text);
}

var tags = [];
function addTag(name) {
    name = name[0].toUpperCase() + name.substr(1).toLowerCase();
    tags = tags.filter(function (t) { return (t != name) });
    tags.unshift(name);
    printTags();
}

function deleteTag(input) {
    var name = String(input.innerHTML);
    name = name.replace(' <button class="tag_close">x</button>', '');
    tags = tags.filter(function (t) { return (t != name) });
    printTags();
}

function printTags() {
    var line = '';
    tags.forEach(function (item) {
        line += '<div class="tag" onclick="deleteTag(this)">' + item + ' <button class="tag_close">x</button></div> ';
    })
    document.getElementById("main-content_tags").innerHTML = line;
}