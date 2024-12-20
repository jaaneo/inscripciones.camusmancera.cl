import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import logo from "../assets/logo_camusmancera.jpg";

const instrumentos = [
  "Violín",
  "Viola",
  "Violonchelo",
  "Contra bajo",
  "Guitarra Clásica",
  "Flauta",
  "Clarinete",
  "Oboe",
  "Fagot",
  "Corno Francés",
  "Trompeta",
  "Trombón",
  "Percusión",
  "Batería",
  "Saxofón",
  "Sección Ritmica de Jazz",
];

const niveles = ["Inicial - Básico", "Intermedio - Avanzado"];

const emojisFlotantes = ["🎻", "🎷", "🎺", "🥁", "🎸", "🎵", "👦", "👩", "🎶", "😍", "❤️"];


const Formulario: React.FC = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    email: "",
    rut: "",
    edad: "",
    direccion: "",
    ciudad_comuna: "",
    telefono_participante: "",
    telefono_apoderado: "",
    instrumento: "",
    nivel: "",
    anios_estudio: "",
    profesor: "",
    enlace_video: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from("inscripciones").insert([formData]);
    if (error) {
      alert("Error al enviar la inscripción. Intenta nuevamente.");
      console.error(error);
    } else {
      alert("¡Inscripción enviada con éxito!");
      setFormData({
        nombres: "",
        apellidos: "",
        email: "",
        rut: "",
        edad: "",
        direccion: "",
        ciudad_comuna: "",
        telefono_participante: "",
        telefono_apoderado: "",
        instrumento: "",
        nivel: "",
        anios_estudio: "",
        profesor: "",
        enlace_video: "",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-400 via-yellow-300 to-orange-400 p-4 flex items-center justify-center overflow-hidden">
      {/* Emojis flotantes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className={`absolute text-4xl ${
              i % 2 === 0 ? "text-purple-500" : "text-pink-500"
            } animate-float`}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          >
            {emojisFlotantes[i % emojisFlotantes.length]}
          </div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Campamento Musical" className="w-32 h-auto" />
        </div>

        {/* Título */}
        <h1 className="text-4xl font-bold text-center text-green-700 mb-4">
          ¿QUÉ ES EL CAMPAMENTO MUSICAL?
        </h1>

        {/* Descripción */}
        <p className="text-gray-700 text-lg leading-7 mb-8 text-justify">
          El <b>Campamento Musical Marqués de Mancera</b> es un espacio formativo para niños, niñas y adolescentes. 
          Fue creado bajo la premisa de reunir en un mismo lugar a todos quienes buscan mejorar sus conocimientos y habilidades en la interpretación de diversos instrumentos.
        </p>
        <p className="text-gray-700 text-lg leading-7 mb-8 text-justify">
          La actividad se realizó durante sus primeros años en la Isla Mancera, no obstante su crecimiento obligó a buscar 
          nuevas dependencias en Niebla y Valdivia. De esta forma se ha proyectado como el campamento más importante del sur de Chile 
          al ser escenario para la instrucción de miles de músicos de todo el país y el lugar escogido por profesionales nacionales y extranjeros invitados a compartir sus conocimientos.
        </p>
        <p className="text-gray-700 text-lg leading-7 mb-8 text-justify">
          Somos una gran comunidad que cada año suma nuevos integrantes y que se mantiene activa en el compromiso de la generación 
          de espacios seguros para el desarrollo de habilidades artísticas que sabemos contribuyen a tener una mejor sociedad.
        </p>
        <p className="text-gray-800 text-lg font-bold text-center mb-8">¡Te esperamos!</p>

        {/* Formulario */}
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Formulario de Inscripción 🎵</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-lg font-medium">Nombre</label>
            <div className="flex gap-4">
              <input
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                required
                className="w-1/2 p-3 border rounded-lg"
                placeholder="Nombre"
              />
              <input
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                required
                className="w-1/2 p-3 border rounded-lg"
                placeholder="Apellidos"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-medium">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
              placeholder="Correo Electrónico"
            />
          </div>

          <div>
            <label className="block text-lg font-medium">RUT</label>
            <input
              type="text"
              name="rut"
              value={formData.rut}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
              placeholder="Ej: 21.234.567-8"
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Edad</label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
              placeholder="Edad"
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
              placeholder="Dirección"
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Ciudad o Comuna</label>
            <input
              type="text"
              name="ciudad_comuna"
              value={formData.ciudad_comuna}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
              placeholder="Ciudad o Comuna"
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Teléfono Participante</label>
            <input
              type="tel"
              name="telefono_participante"
              value={formData.telefono_participante}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
              placeholder="Ej: 9-87654321"
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Teléfono Apoderado</label>
            <input
              type="tel"
              name="telefono_apoderado"
              value={formData.telefono_apoderado}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
              placeholder="Ej: 9-87654321"
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Instrumento</label>
            <select
              name="instrumento"
              value={formData.instrumento}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Seleccione un Instrumento</option>
              {instrumentos.map((instrumento, index) => (
                <option key={index} value={instrumento}>
                  {instrumento}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium">Nivel de Manejo</label>
            <select
              name="nivel"
              value={formData.nivel}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Seleccione un Nivel</option>
              {niveles.map((nivel, index) => (
                <option key={index} value={nivel}>
                  {nivel}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-medium">Años de Estudio</label>
            <input
              type="number"
              name="anios_estudio"
              value={formData.anios_estudio}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
              placeholder="Años de Estudio"
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Profesor</label>
            <input
              type="text"
              name="profesor"
              value={formData.profesor}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
              placeholder="Profesor de Instrumento"
            />
          </div>

          <div>
            <label className="block text-lg font-medium">Enlace de Video</label>
            <input
              type="url"
              name="enlace_video"
              value={formData.enlace_video}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg"
              placeholder="https://youtube.com/..."
            />
            <p className="text-sm text-gray-600 mt-2">
              Te sugerimos que nos adjuntes un video a modo de audición (Repertorio libre; ej. escala, estudio u obra), pero si no lo tienes igualmente serás bienvenido.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
          >
            Enviar Inscripción 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
