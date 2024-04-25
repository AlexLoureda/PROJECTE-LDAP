<?php
// Verifica si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifica si se han enviado el nombre de usuario y contraseña
    if (isset($_POST["username"]) && isset($_POST["password"])) {
        $username = $_POST["username"];
        $password = $_POST["password"];

        // Ejemplo básico: usuario y contraseña hardcoded
        $usuario_correcto = "usuario";
        $contrasena_correcta = "contrasena";

        if ($username === $usuario_correcto && $password === $contrasena_correcta) {
            // Inicio de sesión exitoso, redirige al usuario a la página de aventura
            header("Location: Aventura.html");
            exit;
        } else {
            // Las credenciales son incorrectas, redirige al usuario de nuevo al formulario de inicio de sesión con un mensaje de error
            header("Location: index.html?error=incorrect_credentials");
            exit;
        }
    } else {
        // Si no se han enviado ambos campos, redirige al usuario de nuevo al formulario de inicio de sesión con un mensaje de error
        header("Location: index.html?error=missing_fields");
        exit;
    }
} else {
    // Si se intenta acceder directamente a este script sin enviar el formulario, redirige al usuario de nuevo al formulario de inicio de sesión
    header("Location: index.html");
    exit;
}
?>
