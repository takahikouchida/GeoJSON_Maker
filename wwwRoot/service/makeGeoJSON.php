<?php
$pointNum = $_POST["pointNum"];
if(!is_numeric($pointNum)) {
	exit;
}
if($pointNum>1000001) {
	exit;
}

$json["type"] = "FeatureCollection";
for($i = 0;$i<$pointNum;$i++) {
	$json["features"][] = mkaeGeoJSON([ "id"=>$i,"coordinates"=>[randomFloat(125, 145), randomFloat(25, 45)] ]);
}
echo json_encode($json);

function mkaeGeoJSON($props) {
	$feature["type"] = "Feature";
	$feature["properties"]["id"] = $props["id"];
	$feature["geometry"]["type"] = "Point";
	$feature["geometry"]["coordinates"] = $props["coordinates"];
	return $feature;
}
// ランダムな少数値を返す
function randomFloat($min = 0, $max = 1) {
	return $min + mt_rand() / mt_getrandmax() * ($max - $min);
}
?>