<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "skill";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO register values('".$_POST["name"]."','".$_POST["mobile"]."','".$_POST["email"]."','".$_POST["add"]."','".$_POST["state"]."','".$_POST["city"]."','".$_POST["gender"]."','".$_POST["pass"]."','".$_POST["cpass"]."')";


if ($conn->query($sql) === TRUE) {
  echo "Registration
 successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>