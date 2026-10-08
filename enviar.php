<?php
// Configuración
$destinatario = "info@climatizacionalbacete.es"; // PON AQUÍ TU CORREO
$asunto = "Nuevo presupuesto desde la web de Climatización";

// Recoger los datos del formulario
$nombre = $_POST['nombre'];
$telefono = $_POST['telefono'];
$email = $_POST['email'];
$servicio = $_POST['servicio'];
$mensaje = $_POST['mensaje'];

// Preparar el cuerpo del correo
$cuerpo = "Has recibido una nueva solicitud de presupuesto:\n\n";
$cuerpo .= "Nombre: " . $nombre . "\n";
$cuerpo .= "Teléfono: " . $telefono . "\n";
$cuerpo .= "Email: " . $email . "\n";
$cuerpo .= "Servicio de interés: " . $servicio . "\n\n";
$cuerpo .= "Mensaje:\n" . $mensaje . "\n";

// Cabeceras para que no vaya a Spam
$headers = "From: web@tudominio.com" . "\r\n" .
           "Reply-To: " . $email . "\r\n" .
           "X-Mailer: PHP/" . phpversion();

// Enviar el correo y redirigir
if(mail($destinatario, $asunto, $cuerpo, $headers)) {
    echo "<script>alert('Mensaje enviado correctamente. Te contactaremos pronto.'); window.location.href='index.html';</script>";
} else {
    echo "<script>alert('Hubo un error al enviar el mensaje. Por favor, llámanos por teléfono.'); window.location.href='index.html';</script>";
}
?>