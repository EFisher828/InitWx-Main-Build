//SPC Style

let outlookStyle = (feature, resolution) => {
	let color = ol.color.asArray(feature.get('fill'))
	color = color.slice()
	color[3] = 0.6
	
	style = new ol.style.Style({
		fill: new ol.style.Fill({
			color: color
		}),
		stroke: new ol.style.Stroke({
			color: feature.get('stroke')
		}),
		text: new ol.style.Text({
			text: feature.get('LABEL'),
			font: '12px Calibri,sans-serif',
			fill: new ol.style.Fill({
				color: 'black'
			}),
			stroke: new ol.style.Stroke({
				color: 'white',
				width: 3
			})
		})
	})
	return style
}

//Cities Style

let bigCitiesStyle = (feature, resolution) => {
	style = new ol.style.Style({
		text: new ol.style.Text({
			text: feature.get('Name'),
			font: '24px Calibri, sans-serif',
			fill: new ol.style.Fill({
				color: 'black'
			}),
			stroke: new ol.style.Stroke({
				color: 'white',
				width: 3
			}),
			overflow: true,
		})
	})
	return style
}

let mediumCitiesStyle = (feature, resolution) => {
	style = new ol.style.Style({
		text: new ol.style.Text({
			text: feature.get('Name'),
			font: '18px Calibri, sans-serif',
			fill: new ol.style.Fill({
				color: 'black'
			}),
			stroke: new ol.style.Stroke({
				color: 'white',
				width: 3
			}),
			overflow: true,
		})
	})
	return style
}