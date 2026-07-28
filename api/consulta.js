export default async function handler(req, res) {
  const { dni } = req.query;

  if (!dni) {
    return res.status(400).json({ success: false, message: "Falta DNI" });
  }

  try {
    const onpeUrl = `https://resultadohistorico-eg2026.onpe.gob.pe/presentacion-backend/padron/mesa/${dni}`;

    // Hacemos la consulta desde el Servidor de Vercel (Igual que haría Python)
    // Agregamos un 'User-Agent' para que la ONPE crea que somos un navegador normal
    const response = await fetch(onpeUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error de ONPE: ${response.status}`);
    }

    const data = await response.json();

    // Devolvemos la data a tu página web
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor Vercel" });
  }
}
