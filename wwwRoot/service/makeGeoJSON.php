<?php
$pointNum = $_POST["pointNum"];
if(!is_numeric($pointNum)) {
	exit;
}
if($pointNum>1000001) {
	exit;
}


$json["type"] = "FeatureCollection";
//$json["features"][] = mkaeGeoJSON();

for($i = 0;$i<$pointNum;$i++) {
	$json["features"][] = mkaeGeoJSON([ "id"=>$i,"coordinates"=>[139.749999, 35.705393] ]);
}

echo json_encode($json);

function mkaeGeoJSON($props) {

	$feature["type"] = "Feature";
	$feature["properties"]["id"] = $props["id"];
	$feature["geometry"]["type"] = "Point";
	$feature["geometry"]["coordinates"] = $props["coordinates"];

	return $feature;
}



?>