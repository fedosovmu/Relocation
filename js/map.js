var map = L.map('map').setView([60, 100], 3);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.emerald'
}).addTo(map);


// control that shows state info on hover
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info');
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Индекс человеческого развития</h4>' + (props ?
        '<b>' + props.name + '</b> - ' + props.hdi : 'Наведите курсор на страну');
};

info.addTo(map);


// get color depending on Human Development Index value
function getColorOld(d) {
    return d > 0.8 ? '#003399' :
        d > 0.5  ? '#3072d9' :
            d > 0  ? '#a8c3ff' :
                '#808080';
}

function getColor(d) {
    return d > 0.9 ? '#003c00' :
        d > 0.85  ? '#007f00' :
        d > 0.80  ? '#00c400' :
        d > 0.75  ? '#00f900' :
        d > 0.70  ? '#d3ff00' :
        d > 0.65  ? '#ffff00' :
        d > 0.60  ? '#ffd215' :
        d > 0.55  ? '#ffa83c' :
        d > 0.50  ? '#ff852f' :
        d > 0.45  ? '#ff5b00' :
        d > 0.40  ? '#ff0000' :
        d > 0.35  ? '#a70000' :
        d > 0  ? '#a70000' :
            '#808080';
}

function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.hdi)
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
    //e.target.bindPopup("<b>" + e.target.feature.properties.name + "</b> <br> " + e.target.feature.properties.hdi).openPopup();
    e.target.bind(show_info_page(e)); // Информация о стране
}

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




function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
        moveend: info.update(layer.feature.properties) // <-----------------
    });
}

geojson = L.geoJson(countriesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [1, 0.9, 0.85, 0.80, 0.75, 0.7, 0.65, 0.60, 0.55, 0.50, 0.45, 0.40],
        labels = [],
        from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades[i];
        to = grades[i + 1];

        labels.push(
            '<i style="background:' + getColor(from ) + '"></i> ' +
            from + (to ? '&ndash;' + to : '-0'));
    }

    div.innerHTML = labels.join('<br>');
    return div;
};

legend.addTo(map);

map.CreatePane('labels');
