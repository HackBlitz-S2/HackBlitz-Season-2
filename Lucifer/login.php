<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "skill";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}
$a=$_POST["t1"];
$b=$_POST["t2"];
$x = "SELECT *  FROM register where Name='".$a."' and Password='".$b."'"; 
$r= $conn->query($x);

if ($r->num_rows>0) 
{
   echo "Login Successful";
}
else 
 {
   echo "Wrong Username or Password!";
 }
$conn->close();
?>