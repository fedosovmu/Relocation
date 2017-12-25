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

function getScaleHdi() { return [1, 0.9, 0.85, 0.80, 0.75, 0.7, 0.65, 0.60, 0.55, 0.50, 0.45, 0.40]; };
function getColorHdi(d) {
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
        d > 0  ? '#a70000' : '#808080';
}

function getScaleGdp() { return [80000, 65000, 50000, 37000, 25000, 12000, 10000, 6000, 1000, 0]; };
function getColorGdp(d) {
    return d > 80000 ? '#660000' :
        d > 65000  ? '#7c0e50' :
        d > 50000  ? '#841d8b' :
        d > 37000  ? '#682d9d' :
        d > 25000  ? '#5148af' :
        d > 12000  ? '#597abf' :
        d > 10000  ? '#6eadcc' :
        d > 6000  ? '#8bdbcf' :
        d > 1000  ? '#abefc7' :
        d > 0  ? '#c9fdcb' :
            '#808080';
}

function setHdi() {
    getScale = getScaleHdi;
    getColor = getColorHdi;
    style = function (feature) {
        return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.7,
            fillColor: getColorHdi(feature.properties.hdi)
        };
    }
}

function setGdp() {
    getScale = getScaleGdp;
    getColor = getColorGdp;
    style = function (feature) {
        return {
            weight: 2,
            opacity: 1,
            color: 'white',
            dashArray: '3',
            fillOpacity: 0.85,
            fillColor: getColorGdp(feature.properties.gdp)
        };
    }
}


// <--- Обрабатываем GET запрос
var getRequest  = location.search;
if (getRequest != '') {
   var Mode = getRequest.split('?')[1].split('=')[1].toLowerCase();
   if (Mode == 'gdp')
       setGdp();
   else
       setHdi();
} else setHdi();



function style(feature) {}

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
    e.target.bind(show_info_page(e.target.feature.id)); // Информация о стране
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature,
    });
}

geojson = L.geoJson(countriesData, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(map);

map.attributionControl.addAttribution('Population data &copy; <a href="http://census.gov/">US Census Bureau</a>');


var legend = L.control({position: 'bottomright'});

function getScale() {
    return [1, 0.9, 0.85, 0.80, 0.75, 0.7, 0.65, 0.60, 0.55, 0.50, 0.45, 0.40];
}


legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = getScale(),
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