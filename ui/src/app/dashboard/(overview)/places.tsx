import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import { Autocomplete, TextField } from "@mui/material";


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

    async function handleSelect(address: string) {
        setValue(address, false);
        clearSuggestions();

        const results = await getGeocode({ address: address });
        const { lat, lng } = await getLatLng(results[0]);
        setCurrentPosition({ lat, lng });
    };

    return (
        <div className="places">
             <Autocomplete
                value={value}
                onChange={async (e, newInputValue) => {
                    setValue(newInputValue, false);
                    const results = await getGeocode({ address: newInputValue });
                    const { lat, lng } = await getLatLng(results[0]);
                    setCurrentPosition({ lat, lng });
                }}
                inputValue={value}
                onInputChange={(e, newInputValue) => setValue(newInputValue)}
                id="location-autocomplete"
                options={data.map(({ place_id, description }) => (description))}
                sx={{ width: 500 }}
                disableClearable
                renderInput={(params) => <TextField {...params} label="Location" />}
            /> 
            </div>
    );
}