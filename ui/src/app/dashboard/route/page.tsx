'use client'
import { Divider, Grid, List, ListItemText, Typography } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import Places from '../(overview)/places'
import { APIProvider, AdvancedMarker, Map, InfoWindow, Pin, useMapsLibrary, useMap } from '@vis.gl/react-google-maps';
type LatLngLiteral = google.maps.LatLngLiteral;

function Route() {
    const [startAddress, setStartAddress] = useState<LatLngLiteral>();
    const [destinationAddress, setDestinationAddress] = useState<LatLngLiteral>();
    const position = useMemo<LatLngLiteral>(() => ({ lat: 45.267136, lng: 19.833549 }), []); //Sets the position of Novi Sad 

    return (
        <>

            <h1 className={`mb-8 text-xl md:text-2xl`}>
                Plan your trip
            </h1>
            <Grid container display={'flex'} wrap='wrap' spacing={1}>
                <Grid item md={6}>Start address
                    <Places setCurrentPosition={(position) => {
                        setStartAddress(position);
                    }}
                    />
                </Grid>
                <Grid item md={6}>Destination address
                    <PlacesLibrary />
                </Grid>
            </Grid>
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} library={['places']}>
                <div style={{ height: "50vh", width: "150vh" }} className="rounded-xl bg-gray-50 mt-4 ">
                    <Map zoom={11} center={position} mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}>

                    </Map>
                    </div>
                    <Directions />
            </APIProvider>

        </>
    )

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
                setDestinationAddress(position);
            }}
            />
        )
    }

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


        //Find a driving route
        useEffect(() => {
            if (!directionsService || !directionsRenderer) return;

            directionsService.route({
                origin: startAddress,
                destination: destinationAddress,
                travelMode: google.maps.TravelMode.DRIVING,
                drivingOptions: {
                    departureTime: new Date(Date.now()),
                },
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
                <Grid container display={'flex'} wrap='wrap' spacing={1}>
                    <Grid item md={6}>
                                <h2 className='font-bold text-l'>{selected.summary} route</h2>
                                <p><strong>From</strong> {leg.start_address.split(",")[0]} <strong>to</strong> {leg.end_address.split(",")[0]}</p>
                                <Typography variant="body2" >
                                    <p className='bg-yellow-50'><strong>Distance: </strong>{leg.distance?.text}</p>
                                    <p className='bg-yellow-50'><strong>Duration: </strong>{leg.duration?.text}</p>
                                </Typography>
                                <List> 
                                    <h2>Other possible routes:</h2>
                                    {routes.map((route, index) => (
                                        <>
                                            <ListItemText key={index + route.summary} primary={<button onClick={() => setRouteIndex(index)}>{route.summary}</button>} />
                                            <Divider />
                                        </>
                                    ))}
                                </List>
                    </Grid>
                </Grid>
            </div>)
    }
}


export default Route