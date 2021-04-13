//Create scale line
var scaleLineControl = new ol.control.ScaleLine();
scaleLineControl.setUnits('us');

//Set Extent
let extent = ol.proj.transformExtent(
  [-83.61,33.84,-66.65,43.49],
  'EPSG:4326', 'EPSG:3857'
);
// Build main map 
var map = new ol.Map({
	target: 'map',
	controls: ol.control.defaults({
		attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
      		collapsible: false
    	})
  	}).extend([
    	scaleLineControl
  	]),
	//interactions: [],
	layers: [
	  	Counties = new ol.layer.Vector({
	  		title: 'Tight View Counties',
	  		source: new ol.source.Vector({
	  			url: 'https://raw.githubusercontent.com/EFisher828/InitWX-GeoJSONs/main/Counties-Wide.geojson',
	  			format: new ol.format.GeoJSON()
	  		}),
	  		style: new ol.style.Style({
	  			fill: new ol.style.Fill({
	  				color: '#ebebeb'
	  			}),
	  			stroke: new ol.style.Stroke({
	  				color: '#a6a6a6'
	  			})
	  		}),
	  		zIndex: 0,
	  	}),
		BigCities = new ol.layer.Vector({
			title: 'Big Cities',
			source: new ol.source.Vector({
				url: 'https://raw.githubusercontent.com/EFisher828/InitWX-GeoJSONs/main/Cities-Big.geojson',
		  		format: new ol.format.GeoJSON()
		  	}),
		  	style: bigCitiesStyle,
		  	zIndex: 11,
		  	name: 'bigCities'
		}),
		MediumCities = new ol.layer.Vector({
			title: 'Medium Cities',
			source: new ol.source.Vector({
				url: 'https://raw.githubusercontent.com/EFisher828/InitWX-GeoJSONs/main/Cities-Medium.geojson',
		  		format: new ol.format.GeoJSON()
		  	}),
		  	style: mediumCitiesStyle,
		  	zIndex: 11,
		  	name: 'mediumCities'
		}),
			],
	view: new ol.View({
		center: ol.proj.fromLonLat([-75.57536712067095,38.47390543860912]),
		zoom: 7,
		pixelRatio: 1,
		extent: extent,
	})
});
map.on('postcompose',function(e){
    document.querySelector('canvas').style.backgroundImage="linear-gradient(to bottom right, #0276BF , #7CD7F8)";
});

let bodyCount = 0
const changeMode = () => {
	bodyCount++
	if(bodyCount % 2  == 0){
		document.body.style.background = '#575757';
		let text = document.getElementsByClassName('textColor')
		for(let i=0;i<text.length;i++){
			text[i].style.color = 'white'
		}
	}else if(bodyCount % 2 == 1){
		document.body.style.background = 'white';
		let text = document.getElementsByClassName('textColor')
		for(let i=0;i<text.length;i++){
			text[i].style.color = 'black'
		}
	}
}
