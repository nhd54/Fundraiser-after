<?php
$email=$_GET['email'];
$title=$_GET['title'];
$message=$_GET['message'];
$headers = 'From: nhd@nicklasdegnebolig.dk' . "\r\n" .
    'Reply-To: nhd@nicklasdegnebolig.dk' . "\r\n" .
    'X-Mailer: PHP/' . phpversion();
					if (mail($email, $title, $message, $headers)){
						
						echo "besked sendt";
					} else {
						echo "kunne ikke sende";
					}
?>


<script>

setTimeout(function(){window.location.href = "index.html" }, 100);


</script>