<?php
	$n = $_REQUEST["n"];
	$l = $_REQUEST["l"];
	$lat = $_REQUEST["lat"];
	$lon = $_REQUEST["lon"];
	
	mysql_connect('your-host','your-username','your-password') or die("Error :("); 
	mysql_select_db("your-database") or die("Error :(");
	if(mysql_query("INSERT INTO mem (`name`,`loc`,`lat`,`lon`) VALUES ('$n','$l','$lat','$lon')") or die("Error :(")) {
		echo "Success";
	}
	mysql_close();
?>