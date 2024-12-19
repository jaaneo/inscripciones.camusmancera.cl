import React, { useState } from "react";
import { supabase } from "../supabaseClient";

interface FormData {
  nombres: string;
  apellidos: string;
  email: string;
  rut: string;
  edad: number | "";
  direccion: string;
  ciudad_comuna: string;
  telefono_participante: string;
  telefono_apoderado: string;
  instrumento: string;
  anios_estudio: number | "";
  profesor: string;
  enlace_video: string;
}

const Formulario: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
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
    anios_estudio: "",
    profesor: "",
    enlace_video: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "edad" || name === "anios_estudio" ? parseInt(value) || "" : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { data, error } = await supabase.from("inscripciones").insert([formData]);

    if (error) {
      alert("Hubo un error al enviar la inscripción");
      console.error(error);
    } else {
      alert("Inscripción registrada con éxito!");
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
        anios_estudio: "",
        profesor: "",
        enlace_video: "",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-yellow-300 to-orange-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-center text-green-700 mb-6">Inscripciones 🎵</h1>
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
            <label className="block text-lg font-medium">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
              placeholder="trompetista@email.com"
            />
          </div>
          {/* Más campos aquí */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
          >
            Enviar inscripción 🚀
          </button>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
