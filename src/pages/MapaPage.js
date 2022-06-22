import React from "react";
import { useMapbox } from "../hooks/useMapbox";

const puntoInicial = {
  lng: 5,
  lat: 34,
  zoom: 2,
};

export const MapaPage = () => {
    
  const { coords, setRef } = useMapbox(puntoInicial);

  return (
    <>
      <div className="info">
        Lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}
      </div>
      <div ref={setRef} className="mapContainer"></div>
    </>
  );
};
