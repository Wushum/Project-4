<?php
session_start();
//include 'login.php';
$recepient = $_POST["recipient"];
$subject = $_POST["subject"];
$body = $_POST["body"];
$connect = mysql_connect("0.0.0.0",
"jackson12");
if (!$connect) {
	echo "Connection failed";
	return false;
}
if(isset($_SESSION['username'])){
    $useridquery =  "SELECT id FROM User WHERE name = '$_SESSION[username]'; ";
    $recidquery =  "SELECT id FROM User WHERE name = '$recipient'; ";
    $userres = mysqli_query($connect,$useridquery);
    $recres = mysqli_query($connect,$recidquery);
    if(mysql_fetch_array($recres)==0){
        echo "Not a Valid CheapoMail user";
        
    }else{
    
        while($row=mysql_fetch_array($userres)){
            while($row2=mysql_fetch_array($recres)){
                $sql = "INSERT INTO message (body,subject,user_id,recipient_id) VALUES ($body,$subject,'$row[id]','$row2[id]');";
            
                if (!mysqli_query($connect,$sql))
  				    {
  					    die('Error: ' . mysqli_error($connect));
  				    }else{
				        echo "1 record added";
  				    }
            }
        }
    }
}else{
    echo "Session not set";
}
  
?>