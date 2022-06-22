import { useCallback, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import mapboxgl from "mapbox-gl";


mapboxgl.accessToken =
    "pk.eyJ1IjoiaXNtYWEyIiwiYSI6ImNsNG9wZXQyMjA3ZHgzZmxuN2JrZTB6ajcifQ.rfa_uXPm27iQLgO8ynbWaQ";

export const useMapbox = (puntoInicial) => {
    const mapDiv = useRef();
    const mapa = useRef();
    const setRef = useCallback((node) => {
        mapDiv.current = node;
    }, []);

    const [coords, setCoords] = useState(puntoInicial);

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapDiv.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [puntoInicial.lng, puntoInicial.lat],
            zoom: puntoInicial.zoom,
        });

        mapa.current = map;

        return () => {
            
        }
    }, [puntoInicial]);

    // cuando se mueva el mapa
    useEffect(() => {
        mapa.current.on("move", () => {
            const { lng, lat } = mapa.current.getCenter();
            setCoords({
                lng: lng.toFixed(4),
                lat: lat.toFixed(4),
                zoom: mapa.current.getZoom().toFixed(2),
            });
        });

        return () => {
            
        }
    }, []);

    useEffect(() => {
        
        mapa.current.on("click", (ev) => {
            const { lng, lat } = ev.lngLat;

            const marker = new mapboxgl.Marker();
            console.log(marker);
            marker.id = v4(); //TODO: si el marcador ya tiene ID

            marker
                .setLngLat([lng, lat])
                .addTo(mapa.current)
                .setDraggable(true);
        });

        return () => {

        }
    }, []);

    return {
        coords,
        setRef,
    }
};
