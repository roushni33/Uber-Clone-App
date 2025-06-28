import axios from 'axios';

const getAddressCordinates = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const results = response.data.results;

        if (results && results.length > 0) {
            const location = results[0].geometry.location;
            return {
                ltd: location.lat,
                lang: location.lng
            };
        } else {
            throw new Error('No results found for the given address.');
        }
    } catch (error) {
        throw new Error(`Failed to get coordinates: ${error.message}`);
    }
};

const getDistanceTime = async (origin, destination) => {
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const { rows } = response.data;

        if (rows && rows.length > 0 && rows[0].elements[0].status === "OK") {
            const elements = rows[0].elements[0];
            const distance = elements.distance;
            const duration = elements.duration;

            return { distance, duration };
        } else {
            throw new Error('Distance and time not found');
        }
    } catch (error) {
        throw new Error(`Failed to get distance and time: ${error.message}`);
    }
};

const getSuggestions = async (input) => {
   if (!input || input.length < 3) {
        throw new Error('query must be at least 3 characters long');
    }
    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        const predictions = response.data.predictions;

        if (predictions && predictions.length > 0) {
            return predictions.map(prediction => prediction.description);
        } else {
            throw new Error('No suggestions found');
        }
    } catch (error) {
        throw new Error(`Failed to get suggestions: ${error.message}`);
    }
};

export { getAddressCordinates, getDistanceTime, getSuggestions };
