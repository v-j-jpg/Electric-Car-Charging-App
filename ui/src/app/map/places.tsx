import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import { useState } from "react";

type PlacesProps = {
    setCurrentPosition: (position: google.maps.LatLngLiteral) => void;
};

export default function Places({ setCurrentPosition }: PlacesProps) {
    const {
        ready,
        value,
        setValue,
        suggestions: { status, data },
        clearSuggestions,
    } = usePlacesAutocomplete();


    const handleSelect = async (address: string) => {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address: address});
        const { lat, lng } = await getLatLng(results[0]);
        setCurrentPosition({ lat, lng });
    };

    return (
        <div>
            <h6 className="pb-4">Your location:</h6>
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className="combobox-input"
                    placeholder="Search for your current location"
                    style={{ width: 600 }}
                />
                <ComboboxPopover className="shadow-popup">
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ place_id, description }) => (
                                <ComboboxOption key={place_id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
}