var countreies = ['Algir', 'Afganistan', 'Japan'];


function search_keyup(search) {
    var result = "";
    countreies.forEach(function(item) {
        if (item.toUpperCase().indexOf(search.value.toUpperCase()) != -1) {
            result += '<a class="search_link" href="\/' + item + '">' + item +'</a><br>';
        }
    });

    document.getElementById("search_result").innerHTML = result;
    if (result == "" || search.value.length == 0)
        document.getElementById("search_result").style.display = 'none';
    else
        document.getElementById("search_result").style.display = 'block';
}