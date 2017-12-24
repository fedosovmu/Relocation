

// <--- Обрабатываем GET запрос
var currentCountryId = "";
window.onload = function ready() {
    var getRequest = location.search;

    if (getRequest != '') {
        var id = getRequest.split('?')[1].split('=')[1].toUpperCase();
        if (id == 'ALL') {
            document.getElementById("extend-content").style.display = 'block';
        } else {
            currentCountryId = id;
            document.getElementById("search-head").innerHTML = 'Поиск ' + id + '';
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
    getResults();
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
    getResults();
}

function printTags() {
    var line = '';
    tags.forEach(function (item) {
        line += '<div class="tag" onclick="deleteTag(this)">' + item + ' <button class="tag_close">x</button></div> ';
    })
    document.getElementById("main-content_tags").innerHTML = line;
}

function getResults() {
    document.getElementById("main-content_results").innerHTML = '';

    if (tags.length == 0) return;

    var vacancies = vacanciesData;
    tags.forEach(function (tag, i) {
        vacancies = vacancies.filter(function (item) { return item.name.toUpperCase().indexOf(tags[i].toUpperCase()) != -1 });
    });

    vacancies.sort((function(a,b){
            return (a.salary < b.salary) ? 1:-1;
        }));


    vacancies.forEach(function (t) {
        document.getElementById("main-content_results").innerHTML +=
        '<div class="result">' +
        '    <div><a class="result_caption" href="' + t.href + '#">' + t.name + '</a></div>\n' +
        '    <div class="result-info-block">\n' +
        '        <div class="result_info1" style="max-width: 50%;">\n' +
        '            ' + t.id + ', ' + t.city +
        '        </div>\n' +
        '        <div class="result_info2" style="max-width: 50%;">\n' +
        '            '+ t.company + ', ' + t.salary +
        '        </div>\n' +
        '    </div>' +
        '    <div class="result_text">' +
        '        ' + t.desc +
        '    </div>' +
        '</div>';
    });
}