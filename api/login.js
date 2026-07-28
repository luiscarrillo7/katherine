export default function handler(req, res) {
  // Solo permitimos peticiones POST (envío de datos seguros)
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  const { usuario, password } = req.body;

  // AQUÍ DEFINES TUS CREDENCIALES SECRETAS (Puedes agregar más a un array si quieres)
  const usuarioCorrecto = "admin";
  const passwordCorrecto = "saep2026";

  // Validamos
  if (usuario === usuarioCorrecto && password === passwordCorrecto) {
    // Login exitoso: Devolvemos un token simulado
    return res.status(200).json({
      success: true,
      token: "token-secreto-saep-12345",
    });
  } else {
    // Login fallido
    return res.status(401).json({
      success: false,
      message: "Usuario o contraseña incorrectos",
    });
  }
}
