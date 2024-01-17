'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMapsLibrary, useMap, useMarkerRef, useAdvancedMarkerRef, Marker } from '@vis.gl/react-google-maps'

import Axios from 'axios'
import Places from './places'
import { list } from 'postcss'
import { any, map } from 'zod'

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


    useEffect(() => {
        Axios.get('http://localhost:3001/chargers/available').then((res) => {
            setListOfChargers(res.data);
        });
    }, []);

    //return _chargers;


    return (<>
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} library={['places']}>
            <div style={{ height: "50vh", width: "150vh" }} className="rounded-xl bg-gray-50 ">
                <Map zoom={11} center={position} mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}>

                    {/** Sets the marker on your current position*/}
                    <AdvancedMarker ref={markerRef} position={currentPosition} onClick={() => setOpen(true)}>
                        <Pin scale={2}></Pin>
                    </AdvancedMarker>
                    {open &&
                        <InfoWindow anchor={marker} onCloseClick={() => setOpen(false)}>
                            Your current position.
                        </InfoWindow>}

                    {/* Sets the marker to the location of chargers */}
                    {listOfChargers.map((charger: any) => (
                        <>
                            <AdvancedMarker
                                key={charger._id}
                                position={charger.position}
                                onClick={() => setOpen(true)}
                            >
                                <Pin background={'#22ccff'} borderColor={'#1e89a1'} scale={2}>
                                    {/* children are rendered as 'glyph' of pin */}
                                    ⚡
                                </Pin>
                            </AdvancedMarker>
                        </>
                    ))}

                </Map>
                <h2 className={`mb-4 text-xl md:text-2xl`}>
                    Charging Options
                </h2>
                <div className="flex w-full md:col-span-4">
                    <div className="flex-1 w-1/6 rounded-xl bg-gray-50 p-2 mb-2">
                        <PlacesLibrary />
                    </div>
                    <div className="flex-1 w-1/2 justify-between rounded-xl bg-gray-50 p-4">
                        {currentPosition && <Directions />}
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
        const geometryLibrary = useMapsLibrary('geometry');
        const [routeIndex, setRouteIndex] = useState(0);
        const selected = routes[routeIndex];
        const leg = selected?.legs[0];

        //Distance init
        const [distanceService, setDistanceService] = useState<google.maps.DistanceMatrixService>();
        const [destinationAddresses, setDestinationAddresses] = useState([] as any);
        const [distance, setDistance] = useState({} as any);

        //Initialization of the Services
        useEffect(() => {
            if (!routesLibrary || !map) return;
            setDirectionService(new routesLibrary.DirectionsService());
            setDirectionRenderer(new routesLibrary.DirectionsRenderer({ map }));
            setDistanceService(new routesLibrary.DistanceMatrixService());
        }, [routesLibrary, map])

        //Find the closest charger by driving 
        useEffect(() => {
            if (!distanceService) return;

            distanceService?.getDistanceMatrix({
                origins: [currentPosition],
                destinations: listOfChargers.map((charger) => charger.position),
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false,
            }).then((response) => {
                setDistance(response.rows[0].elements)
                setDestinationAddresses(response.destinationAddresses)
            })
        }, [distanceService])

        let destinations = destinationAddresses.map((address, index) => ({ address: address, duration: distance[index]['duration'].text, distance: distance[index]['distance'].text }) )
         
        // Sort destinations by distance
        destinations = destinations.sort((a, b) => {
            const distanceA = parseFloat(a.distance.replace(' km', ''));
            const distanceB = parseFloat(b.distance.replace(' km', ''));
            return distanceA - distanceB;
        });

        //Find a driving route
        useEffect(() => {
            if (!directionsService || !directionsRenderer || !geometryLibrary) return;

            directionsService.route({
                origin: currentPosition,
                destination:destinations[0]?.address || closestCharger(geometryLibrary, currentPosition),
                travelMode: google.maps.TravelMode.DRIVING,
                drivingOptions: {
                    departureTime: new Date(Date.now()),
                },
                provideRouteAlternatives: true
            }).then(res => {
                directionsRenderer.setDirections(res);
                setRoutes(res.routes);
            })
        }, [directionsService, directionsRenderer, geometryLibrary])

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
            
            {/** Other routes for the driving path    
                <div className='pl-5 hide'>
                    <ul className='list-disc'>
                        {routes.map((route, index) => (
                            <li key={index + route.summary}>
                                <button onClick={() => setRouteIndex(index)}>{route.summary}</button>
                            </li>))}
                    </ul>
                </div>*/}
                
                <div className='bg-yellow-100'>Closest charger: {destinations[0]?.address} {destinations[0]?.duration} {destinations[0]?.distance}</div>
                <h2 className='text-green-500 mt-2'>Other available options:</h2>
                <div>
                    <ul className='list-disc'>
                        {destinations.slice(1,6).map((destination, index) => (
                            <li key={destination.address}>
                               
                                <p>{destination.address} <strong>Distance:</strong> {destination.distance} <strong>Duration:</strong> {destination.duration}</p>
                            </li>))}
                    </ul>
                </div>
            </div>)
    }

    function PlacesLibrary() {
        const placesLibrary = useMapsLibrary('places');
        const [placesService, setPlacesService] = useState(null);

        useEffect(() => {
            if (!placesLibrary) return;

            const svc = new placesLibrary.PlacesService(document.getElementById('places') as HTMLDivElement);

        }, [placesLibrary]);

        useEffect(() => {
            if (!placesService) return;
        }, [placesService]);

        return (
            <Places setCurrentPosition={(position) => {
                setCurrentPosition(position);
            }}
            />);
    }

    function closestCharger(geometryLibrary, targetPosition: LatLngLiteral) {

        return listOfChargers?.reduce(function (prev, curr) {

            var cpos = geometryLibrary.spherical.computeDistanceBetween(targetPosition, curr.position);
            var ppos = geometryLibrary.spherical.computeDistanceBetween(targetPosition, prev.position);

            return cpos < ppos ? curr : prev;

        }).position;

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