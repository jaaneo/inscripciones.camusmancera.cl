import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import logo from "../assets/logo_camusmancera.jpg";
import emailjs from "emailjs-com";

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
const emojisFlotantes = ["🎻", "🎷", "🎺", "🥁", "🎸", "🎵", "🎶", "😍", "❤️"];

const Formulario: React.FC = () => {
  const [formData, setFormData] = useState({
    nombre: "",
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

  const [rutError, setRutError] = useState(""); // Mensaje de error para el RUT
  const [modalVisible, setModalVisible] = useState(false);

  const [emojiStyles] = useState(
    Array.from({ length: 30 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${5 + Math.random() * 5}s`,
    }))
  );

  // Función para validar RUT
  const validarRut = (rut: string): boolean => {
    const cleanRut = rut.replace(/\./g, "").replace("-", "");
    if (cleanRut.length < 8 || cleanRut.length > 9) return false;

    const cuerpo = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1).toUpperCase();

    let suma = 0;
    let multiplo = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
      suma += parseInt(cuerpo[i], 10) * multiplo;
      multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const dvEsperado = 11 - (suma % 11);
    if (dvEsperado === 11) return dv === "0";
    if (dvEsperado === 10) return dv === "K";
    return dv === dvEsperado.toString();
  };

  // Función para formatear RUT automáticamente
  const formatearRut = (rut: string): string => {
    const cleanRut = rut.replace(/\./g, "").replace("-", "");
    if (cleanRut.length <= 1) return cleanRut;

    const cuerpo = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1);
    return cuerpo.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "-" + dv;
  };

  // Actualizar campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Formatear y validar RUT
    if (name === "rut") {
      const rutFormateado = formatearRut(value);
      setFormData({ ...formData, [name]: rutFormateado });

      if (!validarRut(rutFormateado)) {
        setRutError("RUT inválido. Por favor, verifica.");
      } else {
        setRutError("");
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Enviar formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar si el RUT es válido
    if (rutError) {
      alert("Por favor, corrige el RUT antes de enviar.");
      return;
    }

    // Guardar datos en la base de datos
    const { error } = await supabase.from("inscripciones").insert([formData]);
    if (error) {
      console.error("Error al guardar en la base de datos:", error);
      return;
    }

    // Enviar correo de confirmación con EmailJS
    emailjs
      .send(
        "service_1uwva1g", // Reemplaza con tu Service ID
        "template_4idald3", // Reemplaza con tu Template ID
        {
          to_name: formData.nombre,
          to_email: formData.email,
          message: `Hola ${formData.nombre}, tu inscripción al Campamento Musical ha sido recibida correctamente.`,
        },
        "F6aNFV9s2jLy1roD1" // Tu Public Key
      )
      .then(() => {
        console.log("Correo enviado correctamente.");
      })
      .catch((err) => {
        console.error("Error al enviar el correo:", err);
      });

    // Mostrar modal de confirmación
    setModalVisible(true);

    // Resetear formulario
    setFormData({
      nombre: "",
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
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-green-400 via-yellow-300 to-orange-400 p-4 flex items-center justify-center overflow-hidden">
      {/* Emojis flotantes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        {emojiStyles.map((style, i) => (
          <div
            key={i}
            className="absolute text-4xl animate-float"
            style={{
              ...style,
              fontSize: "2rem",
            }}
          >
            {emojisFlotantes[i % emojisFlotantes.length]}
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          style={{ zIndex: 9999 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold text-green-700 mb-4">¡Inscripción Enviada!</h2>
            <p className="text-gray-700">
              Gracias por inscribirte al Campamento Musical. Te hemos enviado un correo de confirmación.
            </p>
            <button
              className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              onClick={() => setModalVisible(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Formulario */}
      <div className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-4xl">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Campamento Musical" className="w-32 h-auto" />
        </div>

        <h1 className="text-4xl font-bold text-center text-green-700 mb-4">
          ¿QUÉ ES EL CAMPAMENTO MUSICAL?
        </h1>
        <p className="text-gray-700 text-lg leading-7 mb-8 text-justify">
          El <b>Campamento Musical Marqués de Mancera</b> es un espacio formativo para niños, niñas y adolescentes.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Campos del formulario */}
          <div>
            <label className="block text-lg font-medium">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
              placeholder="Nombre"
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Apellidos</label>
            <input
              type="text"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
              placeholder="Apellidos"
            />
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
              className={`w-full p-3 border rounded-lg ${
                rutError ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Ej: 11.111.111-1"
            />
            {rutError && <p className="text-red-500 text-sm mt-1">{rutError}</p>}
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
              placeholder="Teléfono Participante"
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
              placeholder="Teléfono Apoderado"
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
            <label className="block text-lg font-medium">Nivel</label>
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
              placeholder="Profesor"
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
