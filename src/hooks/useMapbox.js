import { useCallback, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import mapboxgl from "mapbox-gl";


mapboxgl.accessToken =
    "pk.eyJ1IjoiaXNtYWEyIiwiYSI6ImNsNG9wZXQyMjA3ZHgzZmxuN2JrZTB6ajcifQ.rfa_uXPm27iQLgO8ynbWaQ";

export const useMapbox = (puntoInicial) => {

    const mapDiv = useRef();
    const marcadores = useRef({});
    
    const setRef = useCallback((node) => {
        mapDiv.current = node;
    }, []);
    
    const mapa = useRef();
    const [coords, setCoords] = useState(puntoInicial);

    const agregarMarcador = useCallback( (ev) => {

        const { lng, lat } = ev.lngLat;

        const marker = new mapboxgl.Marker();
        marker.id = v4(); //TODO: si el marcador ya tiene ID

        marker
            .setLngLat([lng, lat])
            .addTo(mapa.current)
            .setDraggable(true); 

        marcadores.current[marker.id] = marker;

        marker.on('drag', ({ target }) => {
            const { id } = target;
            const { lng, lat } = target.getLngLat();
            
            //TODO: emitir los cambios del marcador
        })
    }, []) 

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
            mapa.current.on("click", agregarMarcador);
            return() => {}
    }, [agregarMarcador]);

    return {
        agregarMarcador,
        coords,
        marcadores,
        setRef,
    }
};
