import mapboxgl from "mapbox-gl";
import { useCallback, useEffect, useRef, useState } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaXNtYWEyIiwiYSI6ImNsNG9wZXQyMjA3ZHgzZmxuN2JrZTB6ajcifQ.rfa_uXPm27iQLgO8ynbWaQ";

export const useMapbox = (puntoInicial) => {
  const mapDiv = useRef();
  const setRef = useCallback((node) => {
    mapDiv.current = node;
  }, []);

  const mapa = useRef();
  const [coords, setCoords] = useState(puntoInicial);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapDiv.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [puntoInicial.lng, puntoInicial.lat],
      zoom: puntoInicial.zoom,
    });

    mapa.current = map;
  }, [puntoInicial]);

  // cuando se mueva el mapa
  useEffect(() => {
    mapa.current?.on("move", () => {
      const { lng, lat } = mapa.current?.getCenter();
      setCoords({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: mapa.current?.getZoom().toFixed(2),
      });
    });

    //!NUNCA SE DESTRUYE
    //return mapa?.off('move');
  }, []);

  return {
    coords,
    setRef,
  };
};
