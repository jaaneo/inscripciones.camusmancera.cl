import React, { useState, useEffect } from "react";
import axios from "axios";

interface FormData {
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  nombrePapas: string;
  telefonoPapas: string;
  instrumento: string;
  aniosAprendizaje: number | "";
}

const Formulario: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    nombres: "",
    apellidos: "",
    email: "",
    telefono: "",
    nombrePapas: "",
    telefonoPapas: "",
    instrumento: "",
    aniosAprendizaje: "",
  });

  const [inscripciones, setInscripciones] = useState<FormData[]>([]);

  // Cargar inscripciones desde el backend
  useEffect(() => {
    axios.get("http://localhost:5000/inscripciones").then((response) => {
      setInscripciones(response.data);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "aniosAprendizaje" ? parseInt(value) || "" : value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Enviar inscripción al backend
    axios.post("http://localhost:5000/inscripciones", formData).then(() => {
      alert("Inscripción registrada con éxito!");
      setFormData({
        nombres: "",
        apellidos: "",
        email: "",
        telefono: "",
        nombrePapas: "",
        telefonoPapas: "",
        instrumento: "",
        aniosAprendizaje: "",
      });

      // Actualizar la lista de inscripciones
      axios.get("http://localhost:5000/inscripciones").then((response) => {
        setInscripciones(response.data);
      });
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-yellow-300 to-green-400 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border-4 border-yellow-500">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-4">
          Inscripciones 🎵
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Formulario */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Nombres</label>
            <input
              type="text"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              required
              className="mt-1 w-full p-3 border rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="Escribe tu nombre"
            />
          </div>
          {/* Más campos */}
          <button
            type="submit"
            className="w-full py-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 shadow-lg transition duration-300"
          >
            Enviar 🚀
          </button>
        </form>

        {/* Lista de inscripciones */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Lista de Inscripciones</h2>
          <ul className="space-y-2">
            {inscripciones.map((inscripcion, index) => (
              <li key={index} className="bg-yellow-100 p-3 rounded-lg shadow-md border">
                <p>
                  <b>Nombre:</b> {inscripcion.nombres} {inscripcion.apellidos}
                </p>
                <p>
                  <b>Email:</b> {inscripcion.email}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Formulario;
