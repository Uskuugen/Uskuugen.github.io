<?php
// Database connection
$servername = "localhost"; // Change if needed
$username = "root"; // Change if you have a different MySQL user
$password = ""; // Change if you have a password set
$dbname = "contact_form"; // Your database name

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$subject = $_POST['subject'];

// Insert into database
$sql = "INSERT INTO messages (subject) VALUES ('$subject')";
if ($conn->query($sql) === TRUE) {
    echo "Message saved successfully!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Send email notification
$to = "your-email@example.com"; // Change to your email
$subject_email = "New Contact Form Message";
$message = "Message: " . $subject;
$headers = "From: webmaster@example.com"; // Change this

mail($to, $subject_email, $message, $headers);

$conn->close();
?>
