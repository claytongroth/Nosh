import React from "react";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Geocode from "react-geocode";
import 'leaflet-easybutton';
import 'leaflet-ajax';
import '../node_modules/leaflet-easybutton/src/easy-button.css';
import e3 from './json/e3.geojson';
import gsn from './json/GSN.geojson';
Geocode.setApiKey("AIzaSyCEsvEY5TsylaZu9oJLxAidDE2gbgpf2_I");

//default icon
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25,41],
    iconAnchor: [12.5 ,41],
    popupAnchor: [0, -41]
});
L.Marker.prototype.options.icon = DefaultIcon;


class Map extends React.Component {
  componentDidMount() {
    //baselayer setup
    var light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHNteXRoMiIsImEiOiJjaXNmNGV0bGcwMG56MnludnhyN3Y5OHN4In0.xsZgj8hsNPzjb91F31-rYA', {
			id: 'mapbox.streets',
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
		}),
		dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHNteXRoMiIsImEiOiJjaXNmNGV0bGcwMG56MnludnhyN3Y5OHN4In0.xsZgj8hsNPzjb91F31-rYA', {
			id: 'mapbox.dark',
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
		}),
		streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoicHNteXRoMiIsImEiOiJjaXNmNGV0bGcwMG56MnludnhyN3Y5OHN4In0.xsZgj8hsNPzjb91F31-rYA', {
			id: 'mapbox.streets',
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>'
		}),
		imagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
			attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
		});;
	//create the map
      Window.map = L.map('map', {
		center: [36.9510, -99.3444],
		zoom: 4,
		minZoom: 3,
		maxZoom: 18,
		layers: [light]
	});
	//create basylayers
	var baseLayers = {
		"Light": light,
		"Dark": dark,
		"Streets": streets,
		"Imagery": imagery
	};
	//add the base layers control to the map
	L.control.layers(baseLayers).addTo(Window.map);
    //create button to get user location and draw marker on map
    L.easyButton('fa-location-arrow', function(btn, map){
    navigator.geolocation.getCurrentPosition((position)=>{
        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
  response => {
    const address = response.results[0].formatted_address;
    L.marker([position.coords.latitude, position.coords.longitude]).addTo(Window.map).bindPopup(address);
  },
  error => {
    console.error(error);
  }
);
    });
}).addTo(Window.map);

//geojson data import via leaflet-ajax lib
var e3Layer = new L.GeoJSON.AJAX(e3, {
		pointToLayer: pointToLayer
	}).addTo(Window.map);
var gsnLayer = new L.GeoJSON.AJAX(gsn, {
		pointToLayer: pointToLayer
	}).addTo(Window.map);

 function pointToLayer(feature, latlng) {
		var geojsonMarkerOptions = {
			radius: 13,
			fillColor: "red",
			color: "#000000",
			weight: 1,
			opacity: 1,
			fillOpacity: 0.5
		}
        return L.circleMarker(latlng, geojsonMarkerOptions);
    } 
  }
componentDidUpdate() {
    //geocode and draw queried item from item id passed in from the frontend.js component
    Geocode.fromAddress(this.props.markerPosition).then(
  response => {
    const { lat, lng } = response.results[0].geometry.location;
    if(this.props.markerPosition != "places here"){
    L.marker([lat, lng]).addTo(Window.map).bindPopup("Item ID: "+JSON.stringify(this.props.test[0]._id)+"<br>"+"Proudct Name:  "+JSON.stringify(this.props.test[0].product_name)+"<br>"+"Brands: "+JSON.stringify(this.props.test[0].brands)+"<br>"+"Purchase Places: "+JSON.stringify(this.props.test[0].purchase_places));
    }
  },
  error => {
    console.error(error);
  }
);
}
  render() {
    return <div id="map" />;
  }
}

export default Map;
