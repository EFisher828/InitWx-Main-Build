//Clear Map

const clearMap = () => {
	for(i=0;i<10;i++){
		try{
			map.getLayers().forEach(layer => {
				if (layer && layer.get('name') === 'ID') {
					map.removeLayer(layer);
				} else if (layer && layer.get('name') === 'smallCities') {
					map.removeLayer(layer);
				} else if (layer && layer.get('name') === 'Warning') {
					map.removeLayer(layer);
				} else if (layer && layer.get('name') === 'Radar') {
					map.removeLayer(layer);
				} else if (layer && layer.get('name') === 'Mesh') {
					map.removeLayer(layer);
				} else if (layer && layer.get('name') === 'Lightning') {
					map.removeLayer(layer);
				} else if (layer && layer.get('name') === 'Interstates') {
					map.removeLayer(layer);
				} else if (layer && layer.get('name') === 'RTMA') {
					map.removeLayer(layer);
				} else if (layer && layer.get('name') === 'Hazards') {
					map.removeLayer(layer);
				}
			});
		}catch{}
	}
}

//Cities

const bigCitiesOn = () => {
	Cities = new ol.layer.Vector({
		title: 'Big Cities',
		source: new ol.source.Vector({
			url: 'https://raw.githubusercontent.com/EFisher828/InitWX-GeoJSONs/main/Cities-Big.geojson',
	  		format: new ol.format.GeoJSON()
	  	}),
	  	style: bigCitiesStyle,
	  	zIndex: 12,
	  	name: 'bigCities'
	})
	map.addLayer(Cities)
}
const bigCitiesOff = () => {
	for(i=0;i<10;i++){
		try{
			map.getLayers().forEach(layer => {
				if (layer && layer.get('name') === 'bigCities') {
					map.removeLayer(layer);
				}
			});
		}catch{}
	}
}

const mediumCitiesOn = () => {
	Cities = new ol.layer.Vector({
		title: 'Medium Cities',
		source: new ol.source.Vector({
			url: 'https://raw.githubusercontent.com/EFisher828/InitWX-GeoJSONs/main/Cities-Medium.geojson',
	  		format: new ol.format.GeoJSON()
	  	}),
	  	style: mediumCitiesStyle,
	  	zIndex: 11,
	  	name: 'mediumCities'
	})
	map.addLayer(Cities)
}
const mediumCitiesOff = () => {
	for(i=0;i<10;i++){
		try{
			map.getLayers().forEach(layer => {
				if (layer && layer.get('name') === 'mediumCities') {
					map.removeLayer(layer);
				}
			});
		}catch{}
	}
}

//SPC

const categorical = (value) => {
	for(i=0;i<10;i++){
		try{
			map.getLayers().forEach(layer => {
				if (layer && layer.get('name') === 'ID') {
					map.removeLayer(layer);
				}
			});
		}catch{}
	}
	let SPC = new ol.layer.Vector({
		title: 'SPC Outlook',
	    source: new ol.source.Vector({
	         url: `https://www.spc.noaa.gov/products/outlook/day${value}otlk_cat.nolyr.geojson`,
	         format: new ol.format.GeoJSON()
	    }),
		style: outlookStyle,
		zIndex: 1,
		name: 'ID'	
	})
	map.addLayer(SPC)
	
	const overlayContainerElement = document.querySelector('.overlay-container');
	const overlayLayer = new ol.Overlay({
		element: overlayContainerElement
	})
	map.addOverlay(overlayLayer)
	const overlayFeatureName = document.getElementById('feature-name')
	
	map.on('click', function(e){
		map.forEachFeatureAtPixel(e.pixel, function(feature,layer){
			overlayLayer.setPosition(undefined)
			let clickedCoordinate = e.coordinate;
			let clickedFeatureName = feature.get('LABEL2');
			overlayLayer.setPosition(clickedCoordinate)
			overlayFeatureName.innerHTML = clickedFeatureName;
			
		},
		{
			layerFilter: function(layerCandidate){
				return layerCandidate.get('title') === 'SPC Outlook'
			}
		})
	})
}

const hazardProb = (value,type) => {
	for(i=0;i<10;i++){
		try{
			map.getLayers().forEach(layer => {
				if (layer && layer.get('name') === 'ID') {
					map.removeLayer(layer);
				}
			});
		}catch{}
	}
	let SPC = new ol.layer.Vector({
		title: 'SPC Outlook',
	    source: new ol.source.Vector({
	         url: `https://www.spc.noaa.gov/products/outlook/day${value}otlk_${type}.nolyr.geojson`,
	         format: new ol.format.GeoJSON()
	    }),
		style: outlookStyle,
		zIndex: 1,
		name: 'ID'	
	})
	map.addLayer(SPC)
}

//Radar

const radarOn = () => {
	let source = new ol.source.ImageWMS({
	    attributions: ['NOAA'],
		url: 'https://nowcoast.noaa.gov/arcgis/services/nowcoast/radar_meteo_imagery_nexrad_time/MapServer/WMSServer',
		params: {'LAYERS': '1'},
	});
	
	let layer = new ol.layer.Image({
	    title: 'NOAA Radar',
	    zIndex: 2,
	    visible: true,
	    source: source,
	    opacity: 0.7,
	    name: 'Radar'
	});
	
	map.addLayer(layer);
}

const radarOff = () => {
	for(i=0;i<10;i++){
		try{
			map.getLayers().forEach(layer => {
				if (layer && layer.get('name') === 'Radar') {
					map.removeLayer(layer);
				}
			});
		}catch{}
	}
}
