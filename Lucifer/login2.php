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
<div class="container">
      <h2>SKILL MATCH</h2>
      <form method="post" action="login.php">
        <div class="form-group">
          <label style=color:#FF6347;for="name">Name:</label>
          <input type="text" id="name" name="t1">
          <span class="error">* </span>
        </div>

               <div class="form-group">
          <label style=color:#FF6347;for="pass">Password:</label>
          <input type="password" id="pass" name="t2" >
          <span class="error">*</span>
        </div>
        
        <div class="form-group">
          <button type="submit" value="submit" class="submitbtn"><b>Login</b></button>
          <p style=color:#FF6347;>Don't have an Account? <a href="register.php">Sign Up </a></p>
        </div>
      </form>
    </div>
  </body>
</html>

