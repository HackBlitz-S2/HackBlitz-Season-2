<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SKILL MATCH</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        width: 50%;
        margin: 50px auto;
        padding: 20px;
        background-color: #333;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
      }
      h2 {
        text-align: center;
        color: #FF6347;
      }
      table {
        width: 100%;
        margin: 20px 0;
        font-color:#FF6347;
      }
      label{
        font-color:#FF6347;
       }
      td {
        padding: 10px;
        font-size: 16px;
        
        font-color:#FF6347;
      }
      input[type="text" style=color:#FF6347], input[type="password"], textarea {
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
        color:#FF6347;
      }
      input[type="radio"] {
        margin-right: 5px;
      }
      .error {
        color: #FF0000;
        font-size: 14px;
      }
     .submitbtn{
      background-color: #FF6347;
      color: bkack;
      padding: 16px 20px;
      margin: 8px 0;
      border: none;
      cursor: pointer;
      width:100%;
      opacity:0.9;
}
      input[type="submit"] {
        width: 100%;
        padding: 12px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      input[type="submit"]:hover {
        background-color: #FF6347;
      }
      .form-group {
        margin-bottom: 20px;
      }
      .form-group label {
        font-weight: bold;
        display: block;
        margin-bottom: 5px;
        font-color:#FF6347;
      }
      .form-group input[type="text"],
      .form-group input[type="password"],
      .form-group textarea {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 16px;
        box-sizing: border-box;
      }
      .form-group input[type="radio"] {
        margin: 0 10px 0 0;
      }
      .form-group .error {
        font-size: 14px;
        color: #FF0000;
      }
      .form-group input[type="submit"] {
        width: auto;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
<?php
$nameErr = $mobileErr= $emailErr=$addErr=$cityErr=$genderErr = $stateErr =$passErr=$cpass= "";
$name =$mobile= $email =$add=$city= $gender= $state =$pass =$cpass="";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  if (empty($_POST["name"])) {
    $nameErr = "Name is required";
  } else {
    $name = test_input($_POST["name"]);
    if (!preg_match("/^[a-zA-Z-' ]*$/",$name)) {
      $nameErr = "Only letters and white space allowed";
    }
  }
  if (empty($_POST["mobile"])) {
    $mobileErr = "Mobile No is required";
  } else {
    $mobile = test_input($_POST["mobile"]);
    // check if name only contains letters and whitespace
    if (!preg_match("/^[0-9]+$/",$mobile)) {
      $nameErr = "Only Numbers are allowed";
    }
  }
  
  if (empty($_POST["email"])) {
    $emailErr = "Email is required";
  } else {
    $email = test_input($_POST["email"]);
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $emailErr = "Invalid email format";
    }
  }
  if (empty($_POST["add"])) {
    $addErr = "Address is required";
  } else {
    $add = test_input($_POST["add"]);
  }

  if (empty($_POST["state"])) {
    $state = "";
  } else {
    $state = test_input($_POST["state"]);
            if (!preg_match("/^[a-zA-Z-' ]*$/",$state)) {
      $stateErr = "Only letters and white space allowed";
    }
 }
   if (empty($_POST["city"])) {
    $cityErr = "City is required";
  } else {
    $city = test_input($_POST["city"]);
    if (!preg_match("/^[a-zA-Z-' ]*$/",$city)) {
      $cityErr = "Only letters and white space allowed";
    }
  }


  if (empty($_POST["gender"])) {
    $genderErr = "Gender is required";
  } else {
    $gender = test_input($_POST["gender"]);
  }
  if (empty($_POST["qualif"])) {
    $qualif = "";
  } else {
    $qualif = test_input($_POST["qualif"]);
  }
  if (empty($_POST["pass"])) {
    $passErr = "Password is required";
  } else {
    $pass= test_input($_POST["pass"]);
    if (!preg_match("/^[?=\S{8,}][?=\S*[a-z]][?=\S*[A-Z]][?=\S*[0-9]]*$/")) {
      $passErr = "Password must contain eight characters including lowercase,uppercase,number";
    }
  }
}
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}
?>
    <div class="container">
      <h2>SKILL MATCH</h2>
      <form method="post" action="server.php">
        <div class="form-group">
          <label style=color:#FF6347;for="name">Full Name:</label>
          <input type="text" id="name" name="name">
          <span class="error">* <?php echo $nameErr;?></span>
        </div>

        <div class="form-group">
          <label style=color:#FF6347;for="mobile">Mobile No:</label>
          <input type="text" id="mobile" name="mobile">
          <span class="error">* <?php echo $mobileErr;?></span>
        </div>

        <div class="form-group">
          <label style=color:#FF6347;for="email">E-mail:</label>
          <input type="text" id="email" name="email">
          <span class="error">* <?php echo $emailErr;?></span>
        </div>

        <div class="form-group">
          <label style=color:#FF6347;for="add">Address:</label>
          <input type="text" id="add" name="add">
          <span class="error">* <?php echo $addErr;?></span>
        </div>
 <div class="form-group">
          <label style=color:#FF6347;for="state">State:</label>
          <input type="text" id="state" name="state">
          <span class="error"><?php echo $stateErr;?> </span>
        </div>

        <div class="form-group">
          <label style=color:#FF6347; for="city">City:</label>
          <input type="text" id="city" name="city" >
          <span class="error">* <?php echo $cityErr;?></span>
        </div>

        <div class="form-group">
          <label style=color:#FF6347;>Gender:</label>
          <input type="radio" name="gender" value="Female" <?php if (isset($gender) && $gender=="female") echo "checked";?> <label style=color:#FF6347;>Female</label>
          <input type="radio" name="gender" value="Male"<?php if (isset($gender) && $gender=="male") echo "checked";?> 
<label style=color:#FF6347;>Male</label>
          <input type="radio" name="gender" value="Other" <?php if (isset($gender) && $gender=="other") echo "checked";?>
<label style=color:#FF6347;>Other</label>
          <span class="error">* <?php echo $genderErr;?></span>
        </div>

        <div class="form-group">
          <label style=color:#FF6347;for="pass">Password:</label>
          <input type="password" id="pass" name="pass" >
          <span class="error">* <?php echo $passErr;?></span>
        </div>
         <div class="form-group">
          <label style=color:#FF6347;for="confirmpass">Confirm Password:</label>
          <input type="password" id="cpass" name="cpass" >
          <span class="error">* <?php echo $passErr;?></span>
        </div>
        <div class="form-group">
          <button type="submit" value="submit" class="submitbtn"><b>Submit</b></button>
          <p style=color:#FF6347;>Already have an Account? <a href="y.html">Sign In </a></p>
        </div>
      </form>
    </div>
  </body>
</html>

