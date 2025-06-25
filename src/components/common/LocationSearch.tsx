import axios from 'axios';
import React, { useState } from 'react'; 
import { API_BASE_URL } from '../../config/api.config';

interface LocationSearchProps{
    intialValue: SuggestionLocation;
    onChange: (value: SuggestionLocation) => void;
    className?: string
    styles?: React.CSSProperties
    disabled?: boolean
}

export interface SuggestionLocation {
    description: string;
    latitude: string;
    longitude: string;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ 
    intialValue,
    onChange,
    className,
    styles,
    disabled,
}) => {
    const [query, setQuery] = useState<string>(intialValue?.description || "");
    const [suggestions, setSuggestions] = useState<SuggestionLocation[]>([]);

    const mockLocations: SuggestionLocation[] = [
        {description: "Quận 1, Hồ Chí Minh", latitude: "10.762622", longitude: "106.660172"},
        {description: "Quận 7, Hồ Chí Minh", latitude: "10.762622", longitude: "106.660172"},
        {description: "Quận 12, Hồ Chí Minh", latitude: "10.762622", longitude: "106.660172"},
        {description: "Quận 8, Hồ Chí Minh", latitude: "10.762622", longitude: "106.660172"}
    ];
    // const handleSearch = async (value: string) => { 
    //     setQuery(value);
    //     try {
    //         const response = await axios.get(
    //             `${API_BASE_URL}/api/places?input=${value}`
    //         );  
    //         setSuggestions(response.data || mockLocations);
    //     } catch (error) {
    //         setSuggestions([]);
    //     }
    // }; 
    const handleSearch = async (value: string) => {
    setQuery(value);

    // ✅ Gửi giá trị thủ công vào callback
    onChange({
        description: value,
        latitude: "",
        longitude: ""
    });

    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/places?input=${value}`
        );  
        setSuggestions(response.data || mockLocations);
    } catch (error) {
        setSuggestions([]);
    }
};

    const handleChange = (value: SuggestionLocation) => {
        if(value){
            onChange(value);
            setQuery(value.description);
            setSuggestions([]);
        }
    }; 

    const hanldeDirectToLocation = (event: React.MouseEvent) => {
        event.stopPropagation();
        if(disabled){
            console.log("Disabled")
        }
    }
    return (
        <div className="w-full min-w-md">
            <div className="relative">
                <div className="relative border-[1px] border-gray-100 shadow rounded-lg">
                    <input
                        type="text"
                        onClick={hanldeDirectToLocation}
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder="Search location..."
                        className={`${className} h-auto break-words w-full ps-4 py-2 rounded-lg`}
                        style={styles}
                        disabled={disabled}
                    />
                </div>

                {suggestions.length > 0 && (
                <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto">
                    {suggestions.map((location, index) => (
                        <div
                            key={index}
                            className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 transition-colors"
                            onClick={(event: React.MouseEvent) => {
                                event.stopPropagation();
                                handleChange(location);
                            }}
                        >
                            <span className="text-gray-400">📍</span>
                            <span className="text-gray-900">{location.description}</span>
                        </div>
                    ))}
                </div>
                )}
            </div>
        </div>
    );
};

export default LocationSearch;