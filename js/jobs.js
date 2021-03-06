

// <--- Обрабатываем GET запрос
var currentCountryId = "";
window.onload = function ready() {
    var getRequest = location.search;

    if (getRequest != '') {
        var id = getRequest.split('?')[1].split('=')[1].toUpperCase();
        if (id == 'ALL') {
            document.getElementById("extend-content").style.display = 'block';
        } else {
            currentCountryId = id.toUpperCase();
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
    name = name.trim();
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

    if (tags.length == 0) {
        document.getElementById("extend-content").innerHTML = '<div class="extend-content_panel"></div>';
        return;
    }

    var vacancies = vacanciesData;

    if (currentCountryId != "") {
        vacancies = vacancies.filter(function (t) { return t.id.toUpperCase() == currentCountryId; });
    }


    tags.forEach(function (tag, i) {
        vacancies = vacancies.filter(function (item) { return item.name.toUpperCase().indexOf(tags[i].toUpperCase()) != -1 });
    });

    vacancies.sort((function(a,b){
            return (a.salary < b.salary) ? 1:-1;
        }));

    var sum = 0;
    vacancies.forEach(function (t) { sum += t.salary });
    var avg = sum / vacancies.length;


    var result =
        '<div class="extend-content_panel">' +
        '    <div class="result_caption">Количество предложений</div>' +
        '    <div>' + vacancies.length + '</div><br>' +
        '    <div class="result_caption">Средняя зарплата</div>' +
        '    <div>' + avg + '</div><br>' +
        '    <div class="result_caption">Распределение по странам</div>' +
        '    <div>';

    var codes = [];
    vacancies.forEach(function (t) { codes.push(t.id.toUpperCase())});
    codes = codes.filter(function(item) {
        return codes.hasOwnProperty(item) ? false : (codes[item] = true);
    });
    codes.sort();
    codes.forEach(function (id) {
        var count = 0;
        var sum = 0;
        vacancies.forEach( function (t) {
            if (t.id.toUpperCase() == id) {
                count += 1;
                sum += t.salary;
            }
        });
        result += '<b>' + id + '</b> (' + count + ') ' + sum / count + '<br>';
    })

    result += '</div>'
              '</div>';

    document.getElementById("extend-content").innerHTML = result;


    vacancies = vacancies.filter(function (t, i) { return i < 30; });

    vacancies.forEach(function (t) {
        var href =  t.href;
        if (href == undefined) href = '';

        document.getElementById("main-content_results").innerHTML +=
            '<div class="result">' +
            '    <div><a class="result_caption" href="' + (t.href != undefined ? t.href :'#') + '">' + t.name + '</a></div>\n' +
            '    <div class="result-info-block">\n' +
            '        <div class="result_info1" style="max-width: 50%;">\n' +
            '            ' + t.id + ', ' + (t.city != undefined ? t.city : 'unknown city')+
            '        </div>\n' +
            '        <div class="result_info2" style="max-width: 50%;">\n' +
            '            ' + (t.company != undefined ? t.company : 'unknown company') + ', ' + t.salary +
            '        </div>\n' +
            '    </div>' +
            '    <div class="result_text">' +
            '        ' + t.desc +
            '    </div>' +
            '</div>';
    });
}