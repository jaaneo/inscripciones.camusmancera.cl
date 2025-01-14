import React from "react";
import Formulario from "./components/Formulario";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Formulario />
      <Analytics /> {/* Agrega Vercel Analytics aquí */}
    </>
  );
}

export default App;
