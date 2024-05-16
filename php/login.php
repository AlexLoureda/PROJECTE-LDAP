<?php
// Configuración de conexión LDAP
$ldap_servidor = "ldap://192.168.10.15";
$ldap_puerto = 389;
$ldap_basedn = "dc=dominiaza,dc=com";

// Verifica si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifica si se han enviado el nombre de usuario y contraseña
    if (!empty($_POST["username"]) && !empty($_POST["password"])) {
        $username = $_POST["username"];
        $password = $_POST["password"];

        // Conexión al servidor LDAP
        $ldap_conexion = ldap_connect($ldap_servidor, $ldap_puerto);
        ldap_set_option($ldap_conexion, LDAP_OPT_PROTOCOL_VERSION, 3);

        if ($ldap_conexion) {
            // Intenta autenticar al usuario
            $ldap_bind = @ldap_bind($ldap_conexion, "cn=$username,$ldap_basedn", $password);

            if ($ldap_bind) {
                // Autenticación exitosa, redirige al usuario a la página de aventura
                header("Location: ../Aventura.html");
                exit;
            } else {
                // Las credenciales son incorrectas, redirige al usuario de nuevo al formulario de inicio de sesión con un mensaje de error
                header("Location: ../index.html?error=incorrect_credentials");
                exit;
            }
        } else {
            // Error de conexión LDAP, redirige al usuario de nuevo al formulario de inicio de sesión con un mensaje de error
            header("Location: ../index.html?error=ldap_connection_error");
            exit;
        }
    } else {
        // Si no se han enviado ambos campos, redirige al usuario de nuevo al formulario de inicio de sesión con un mensaje de error
        header("Location: ../index.html?error=missing_fields");
        exit;
    }
} else {
    // Si se intenta acceder directamente a este script sin enviar el formulario, redirige al usuario de nuevo al formulario de inicio de sesión
    header("Location: ../index.html");
    exit;
}
?>
