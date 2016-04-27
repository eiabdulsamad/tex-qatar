<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Save</title>
</head>
<body>


<?php

if(isset($_POST["name"])){
	$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
$txt = $_POST["name"]."\n";
fwrite($myfile, $txt);
fclose($myfile);
}
// $myfile = fopen("newfile.txt", "w") or die("Unable to open file!");
// $txt = "John Doe\n";
// fwrite($myfile, $txt);
// $txt = "Jane Doe\n";
// fwrite($myfile, $txt);
// fclose($myfile);
?>
<form action="" method="POST">
<input name="name" value="nithin" type="text" />
<input type="submit" value="Submit" />
</form>




</body>
</html>