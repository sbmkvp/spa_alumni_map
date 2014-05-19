<?php
	$name = "'".$_REQUEST["name"]."'";
	$loc = "'".$_REQUEST["loc"]."'";

	mysql_connect('your-host','your-username','your-password') or die("Error :("); 
	mysql_select_db("your-database") or die("Error :(");

	mysql_query("DELETE FROM `mem` WHERE CONVERT(`mem`.`name` USING utf8) = $name AND CONVERT(`mem`.`loc` USING utf8) = $loc LIMIT 1") or die("error");
	mysql_close();
?>
	