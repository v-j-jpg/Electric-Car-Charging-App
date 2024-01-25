'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useMapsLibrary, useMap, useMarkerRef, useAdvancedMarkerRef, Marker } from '@vis.gl/react-google-maps'
import { Card, CardActions, CardContent, Divider, FormControlLabel, FormGroup, Grid, List, ListItemText, Switch, Typography, tableBodyClasses } from '@mui/material';
import Places from './places'

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;


export default function MapComponent({ listOfChargers: listOfChargers }) {
    const position = useMemo<LatLngLiteral>(() => ({ lat: 45.267136, lng: 19.833549 }), []); //Sets the position of Novi Sad 
    const [currentPosition, setCurrentPosition] = useState<LatLngLiteral>();
    const [directions, setDirections] = useState<DirectionsResult>();
    const [open, setOpen] = useState(false);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [showAvailableOnly, setShowAvailableOnly] = useState(false);
    let filteredChargers = showAvailableOnly ? listOfChargers.filter(charger => charger.status === 'available') : listOfChargers;

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
                    {filteredChargers?.map((charger: any) => (
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
                <div>
                    <FormGroup>
                        <FormControlLabel control={<Switch color='secondary' checked={showAvailableOnly}
                            onChange={() => setShowAvailableOnly(!showAvailableOnly)}
                            inputProps={{ 'aria-label': 'controlled' }} />} label="Show only available chargers" />
                    </FormGroup>
                    <Card sx={{ minWidth: 275 }}>
                        <CardActions>
                            <PlacesLibrary />
                        </CardActions>
                        <br />
                        {currentPosition && <Directions />}
                    </Card>

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
                destinations: filteredChargers.map((charger) => charger.position),
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false,
            }).then((response) => {
                setDistance(response.rows[0].elements)
                setDestinationAddresses(response.destinationAddresses)
            })
        }, [distanceService])

        //Merge destination addresses with their distance and duation
        let destinations = destinationAddresses.map((address, index) => ({ address: address, duration: distance[index]['duration'].text, distance: distance[index]['distance'].text }))

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
                destination: destinations[0]?.address || closestCharger(geometryLibrary, currentPosition),
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
                <Grid container display={'flex'} wrap='wrap' spacing={1}>
                    <Grid item md={6}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                <h2 className='font-bold text-l'>{selected.summary} route</h2>
                                <p><strong>From</strong> {leg.start_address.split(",")[0]} <strong>to</strong> {leg.end_address.split(",")[0]}</p>
                                <Typography variant="body2" >
                                    <p className='bg-yellow-50'><strong>Distance: </strong>{leg.distance?.text}</p>
                                    <p className='bg-yellow-50'><strong>Duration: </strong>{leg.duration?.text}</p>
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <List> 
                                    <h2>Other possible routes:</h2>
                                    {routes.map((route, index) => (
                                        <>
                                            <ListItemText key={index + route.summary} primary={<button onClick={() => setRouteIndex(index)}>{route.summary}</button>} />
                                            <Divider />
                                        </>
                                    ))}
                                </List>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item md={6}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent>
                                Closest charger:
                                <div className='bg-yellow-100'>
                                    <Typography variant="body1" gutterBottom> {destinations[0]?.address} </Typography>
                                    <Typography variant="body2" gutterBottom>
                                        <strong>Duration:</strong> {destinations[0]?.duration}
                                        <strong> Distance:</strong> {destinations[0]?.distance}
                                    </Typography>
                                </div>
                                <h2 className='text-green-500 mt-2'>Other available chargers:</h2>
                                <div>
                                    <List sx={{ maxWidth: 360 }}>
                                        {destinations.slice(1, 6).map((destination, index) => (
                                            <>
                                                <ListItemText key={index + destination.address} primary={destination.address}
                                                    secondary={<p><strong>Distance:</strong> {destination.distance} <strong>Duration:</strong> {destination.duration}</p>} />
                                                <Divider />
                                            </>))}
                                    </List>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
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

    function closestCharger(geometryLibrary, targetPosition: { lat: Number, lng: Number}) {
        return filteredChargers?.reduce(function (prev, curr) {
            var cpos = geometryLibrary.spherical.computeDistanceBetween(targetPosition, (curr.position.lat && curr.position.lng && curr.position));
            var ppos = geometryLibrary.spherical.computeDistanceBetween(targetPosition, (prev.position.lat && prev.position.lng && prev.position));
            return cpos < ppos ? curr : prev;
        }).position;
    }
}
