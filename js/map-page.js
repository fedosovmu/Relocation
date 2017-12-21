
function show_info_page(e) {
    this.document.getElementById("info-page_content").innerHTML=
        "<h1>" + e.target.feature.properties.name + "</h1>" +
        "<p><b>Индекс человеческого развития:</b> " + e.target.feature.properties.hdi + "</p>" +
        "<p><b>Описание страны:</b> ?<br></p>";
    this.document.getElementById("info-page").style.display = 'block';
}

function hide_info_page () {
    this.document.getElementById("info-page").style.display = 'none';
}



// <--- Обрабатываем гет
//var get = location.search;
//alert(get);



var countreies = ['Algir', 'Afganistan', 'Japan'];



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
