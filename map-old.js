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
var image = {
	url: 'https://googledrive.com/host/0ByYCURUtdmKEZm5RZXgxV1pzR1U',
	size: new google.maps.Size(100,100),
	origin: new google.maps.Point(0,0),
	anchor: new google.maps.Point(9,9),
	scaledSize: new google.maps.Size(18,18)
	};
function plot() {
	points =[];
	people = [];
	$.getJSON("get.php",function(x) {
		people = x;
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
				infowindow.setContent(this.title+'<br>'+this.locat);
				infowindow.open(map,this);
			});

			points.push(marker);
		}
		cluster = new MarkerClusterer(map, points,{
			maxZoom : 10,
			gridSize : 35
		});
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
	setTimeout(function(){plot();cluster.redraw();},1000);
}