import React from "react";
import Anuncio from "./components/Anuncio";
import { Analytics } from "@vercel/analytics/react";

function App() {
  return (
    <>
      <Anuncio />
      <Analytics /> {/* Agrega Vercel Analytics aquí */}
    </>
  );
}

export default App;
