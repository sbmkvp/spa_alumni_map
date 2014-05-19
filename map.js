google.maps.visualRefresh = true;
var styles = getStyle();
var mapOptions= {
	zoom:2,
	center: new google.maps.LatLng(40,0),
	disableDefaultUI:true,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
	backgroundColor: "#000000",
	zoomControl: true,
	zoomControlOptions: {
		style: google.maps.ZoomControlStyle.SMALL,
		position: google.maps.ControlPosition.TOP_LEFT
	},
};
var map = new google.maps.Map(document.getElementById('map'),mapOptions);
var styledMap = new google.maps.StyledMapType(styles,{name: "custom"});
map.mapTypes.set('custom', styledMap);
map.setMapTypeId('custom');

var people;
var points;
var cluster;
var lines;
var image = {
	url: 'marker.png',
	size: new google.maps.Size(100,100),
	origin: new google.maps.Point(0,0),
	anchor: new google.maps.Point(9,9),
	scaledSize: new google.maps.Size(18,18)
	};
function plot() {
lines = [];
points = [];
people = [];
	$.getJSON("get.php",function(x) {
		people = x;
		var spa = new google.maps.LatLng(28.628593908901117,77.24562406539917);
		for (i in people) {
			var loc = new google.maps.LatLng(people[i].lat,people[i].lon);
			var marker = new google.maps.Marker({
				position: loc,
				map: map,
				title: people[i].name,
				icon: image,
				clickable:true,locat:people[i].loc,
			});
			var infowindow = new google.maps.InfoWindow({
				pixelOffset:new google.maps.Size(-42,0),
			});

			google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent(this.title+'<br>'+this.locat+'<br><hr><button style="font-size:xx-small;padding:0px;text-align:center;" onclick="del(\''+this.title+'\',\''+this.locat+'\');">Delete Record!</button>');
				infowindow.open(map,this);
			});

			points.push(marker);

			var gpoly = new google.maps.Polyline({
				strokeColor: '#DF0101',
				strokeOpacity: 0.2,
				strokeWeight: 1,
				map: map,
				geodesic: false,
				clickable: false,	
			});

			var path = [spa,loc]
			gpoly.setPath(path);
			lines.push(gpoly);
		}
		cluster = new MarkerClusterer(map, points,{
			maxZoom : 10,
			gridSize : 30
		});
                $("#num").text(people.length);
	});
}
plot();

var result;

function post() {
	var name = document.getElementById("name").value;
	var loc = document.getElementById("loc").value;
	var geocoder = new google.maps.Geocoder();

	geocoder.geocode( { 'address': loc}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var lat = results[0].geometry.location.lat()+(Math.random()/50);
			var lon = results[0].geometry.location.lng()+(Math.random()/50);
			result = results[0];
			var query = "post.php?"+"n="+name+"&l="+loc+"&lat="+lat+"&lon="+lon;
			$.getJSON(query);
 		}
		else {
			if (status = "ZERO_RESULTS") {
				alert("Could not find "+loc+" :(");
			}
			else {
				alert("Error :(");
			}
		}
	});

	$('#add').animate({opacity:"0"});
	setTimeout(function(){for (i = 0; i < points.length; i++) { points[i].setMap(null); } for (i = 0; i < lines.length; i++) { lines[i].setMap(null); } plot();cluster.redraw();},1000);
}

function del(x,y) {
//var q = "del.php?name="+x+"&loc="+y;
//$.getJSON(q);
//setTimeout(function(){for (i = 0; i < points.length; i++) { points[i].setMap(null); } for (i = 0; i < lines.length; i++) { lines[i].setMap(null); } plot();cluster.redraw();},1000);
}							