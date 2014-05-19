<?php
	mysql_connect('your-host','your-username','your-password') or die(mysql_error()); 
	mysql_select_db("your-databse") or die(mysql_error());
	$data = mysql_query("SELECT * FROM mem") or die();
	$arr = array();
	while ($row = mysql_fetch_assoc($data)) {
		$arr[]=$row;
	}
	mysql_close();
	echo json_encode($arr);
?>