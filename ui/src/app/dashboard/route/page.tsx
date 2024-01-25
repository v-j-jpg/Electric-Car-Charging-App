'use client'
import { Grid } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import Places from '../(overview)/places'
import { APIProvider, AdvancedMarker, Map, InfoWindow, Pin, useMapsLibrary } from '@vis.gl/react-google-maps';
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
                <Grid item md={6}>Starting address
                    <Places setCurrentPosition={(position) => {
                        setStartAddress(position);
                    }}
                    />
                </Grid>
                <Grid item md={6}>Destination address
                    <PlacesLibrary />
                </Grid>
            </Grid>
            <div>Chosen route: <br /> Start: {startAddress?.lng}</div>
            <div>End: {destinationAddress?.lat} {destinationAddress?.lng}</div>

            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY} library={['places']}>
                <div style={{ height: "50vh", width: "150vh" }} className="rounded-xl bg-gray-50 ">
                    <Map zoom={11} center={position} mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}>

                        {/** Sets the marker on your current position*/}
                        <AdvancedMarker  position={position} >
                            <Pin scale={2}></Pin>
                        </AdvancedMarker>

                    </Map>
                    </div>
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
}


export default Route