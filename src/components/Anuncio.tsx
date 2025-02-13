import React, { useEffect, useState } from "react";
import logo from "../assets/logo_camusmancera.jpg";

const emojisFlotantes = ["🎻", "🎷", "🎺", "🥁", "🎵", "🎶", "😍", "❤️"];

const Anuncio: React.FC = () => {
  const [emojiPositions, setEmojiPositions] = useState<{ top: string; left: string }[]>([]);

  // Generar posiciones iniciales para los emojis al cargar el componente
  useEffect(() => {
    const posiciones = Array.from({ length: 30 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
    setEmojiPositions(posiciones);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-400 via-yellow-300 to-orange-400 p-4 flex items-center justify-center overflow-hidden">
      {/* Emojis flotantes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {emojiPositions.map((pos, index) => (
          <div
            key={index}
            className="absolute text-4xl animate-float"
            style={{
              top: pos.top,
              left: pos.left,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          >
            {emojisFlotantes[index % emojisFlotantes.length]}
          </div>
        ))}
      </div>

      {/* Anuncio */}
      <div className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl text-center">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Campamento Musical" className="w-32 h-auto" />
        </div>
        <h1 className="text-4xl font-bold text-green-700 mb-4">📢 IMPORTANTE: Postergación de la Semana Sinfónica 📢</h1>
        <p className="text-gray-700 text-lg leading-7 mb-6">
          😢Con aflicción y desconsuelo, les informamos que, por motivos de fuerza mayor, la <strong>Semana Sinfónica del XXX° Campamento Musical Marqués de Mancera</strong>, programada para la semana del 17 de febrero, deberá ser postergada. Esta parte del campamento se reprogramará para las <strong>vacaciones de invierno</strong>.
        </p>
        <p className="text-gray-700 text-lg leading-7 mb-6">
          🎶Lamentamos los inconvenientes que esto pueda causar y agradecemos su comprensión. Queremos que este encuentro siga siendo un espacio de aprendizaje, música y amistad para todos, por lo que seguimos trabajando con mucho cariño para reencontrarnos pronto.
        </p>
        <p className="text-gray-700 text-lg leading-7 mb-6">
          ℹ Estaremos informando sobre nuevas fechas y detalles próximamente. ¡Gracias por su apoyo y entusiasmo!
        </p>
      </div>
    </div>
  );
};

export default Anuncio;
