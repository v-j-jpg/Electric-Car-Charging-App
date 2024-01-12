'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMapsLibrary, useMap, useMarkerRef, useAdvancedMarkerRef } from '@vis.gl/react-google-maps'
import Axios from 'axios'
import Places from './places'

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;

function Markers() { }


export default function MapComponent() {
    const position = useMemo<LatLngLiteral>(() => ({ lat: 45.267136, lng: 19.833549 }), []); //Set the position of Novi Sad 
    const [currentPosition, setCurrentPosition] = useState<LatLngLiteral>();
    const [directions, setDirections] = useState<DirectionsResult>();
    const [open, setOpen] = useState(false);
    const [markerRef, marker] = useAdvancedMarkerRef();
    
    //const mapRef = useRef();
    //const onLoad = useCallback((map) => (mapRef.current = map), []);

    //ImportChargers
    const _chargers: Array<LatLngLiteral> = [];
    const [listOfChargers, setListOfChargers] = useState([] as any);


    /*useEffect(() => {
        Axios.get('http://localhost:3001/chargers').then((res) => {
            setListOfChargers(res.data);
        });
    }, []);*/
    //return _chargers;

    

    useEffect(() => {
        if (!marker) {
            return;
        }

        // do something with marker instance here  ref={markerRef}
    }, [marker]);


    return (<>
        <APIProvider apiKey = {process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} libraries={['places']}>
            <div style={{height: "50vh", width:"150vh"}}>
                <Map zoom ={11} center={position} mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}>

                    {/** Sets the marker on your current position*/} 
                    <AdvancedMarker ref={markerRef}  position={currentPosition} onClick={()=>setOpen(true)}>
                        <Pin background={"green"} borderColor={"green"} glyphColor={"red"}></Pin>
                    </AdvancedMarker>
                    {open && 
                    <InfoWindow anchor={marker} onCloseClick={() =>setOpen(false)}>
                        Your current position.
                    </InfoWindow>}
 

                </Map> 
                <h2 className={`mb-4 text-xl md:text-2xl`}>
                     Charging Options
                </h2>
                <div className="flex w-full md:col-span-4">
                     <div className="flex-1 w-1/6 rounded-xl bg-gray-50 p-2 mb-2">
                        <Places setCurrentPosition={(position) => {
                                setCurrentPosition(position);}}
                        />
                    </div>
                    <div className="flex-1 w-1/2 justify-between rounded-xl bg-gray-50 p-4">
                        <Directions />
                    </div>
                </div>
            </div>
        </APIProvider>
        </>
    );


    function Directions() {
        const map = useMap();
        const routesLibrary = useMapsLibrary("routes");
        const [directionsService, setDirectionService] = useState<google.maps.DirectionsService>();
        const [directionsRenderer, setDirectionRenderer] = useState<google.maps.DirectionsRenderer>();
        const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
        const [routeIndex, setRouteIndex] = useState(0);
        const selected = routes[routeIndex];
        const leg = selected?.legs[0];

        //Initialization of the Services
        useEffect(() => {
            if (!routesLibrary || !map) return;
            setDirectionService(new routesLibrary.DirectionsService());
            setDirectionRenderer(new routesLibrary.DirectionsRenderer({ map }));
        }, [routesLibrary, map])


        //Find a route
        useEffect(() => {
            if (!directionsService || !directionsRenderer) return;

            directionsService.route({
                origin: "Trg Dositeja Obradovića 3,Novi Sad 21000",
                destination: "Bulevar Vojvode Stepe 36,Novi Sad 21000",
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: true
            }).then(res => {
                directionsRenderer.setDirections(res);
                setRoutes(res.routes);
            })
        }, [directionsService, directionsRenderer])

        //Update the map with the selected route
        useEffect(() => {
            if (!directionsRenderer) return;
            directionsRenderer.setRouteIndex(routeIndex);
        }, [routeIndex, directionsRenderer])

        if (!leg) return null;

        return (
            <div className='directions'>
                <h2><strong>{selected.summary} path</strong></h2>
                <p><strong>From</strong> {leg.start_address.split(",")[0]} <strong>to</strong> {leg.end_address.split(",")[0]}</p>
                <p className='bg-yellow-50'>Distance: {leg.distance?.text}</p>
                <p className='bg-yellow-50'>Duration: {leg.duration?.text}</p>

                <h2 className='text-green-500 mt-2'>Other available options:</h2>
                <div className='pl-5'>              
                    <ul className='list-disc'>
                        {routes.map((route, index) => (
                            <li key={route.summary}>
                                <button onClick={() => setRouteIndex(index)}>{route.summary}</button>
                            </li>))}
                    </ul>
                </div>

            </div>)
    }



    //Circles colours
    const defaultOptions = {
        strokeOpacity: 0.5,
        strokeWeight: 2,
        clickable: false,
        draggable: false,
        editable: false,
        visible: true,
    };
    const closeOptions = {
        ...defaultOptions,
        zIndex: 3,
        fillOpacity: 0.05,
        strokeColor: "#8BC34A",
        fillColor: "#8BC34A",
    };
    const middleOptions = {
        ...defaultOptions,
        zIndex: 2,
        fillOpacity: 0.05,
        strokeColor: "#FBC02D",
        fillColor: "#FBC02D",
    };
    const farOptions = {
        ...defaultOptions,
        zIndex: 1,
        fillOpacity: 0.05,
        strokeColor: "#FF5252",
        fillColor: "#FF5252",
    };
} 