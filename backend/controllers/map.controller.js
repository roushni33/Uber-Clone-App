import { validationResult } from 'express-validator';
import { getAddressCordinates, getDistanceTime,getSuggestions } from '../services/maps.service.js';

const getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await getAddressCordinates(address);
        return res.json(coordinates);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

const getDistance = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    if (!origin || !destination) {
        return res.status(400).json({ error: 'Origin and destination are required' });
    }

    try {
        const distanceTime = await getDistanceTime(origin, destination);
        return res.status(200).json(distanceTime);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const getAutoCompleteSuggestions = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { input } = req.query;

    if (!input) {
        return res.status(400).json({ error: 'Input is required' });
    }

    try {
        const suggestions = await getSuggestions(input); // Assuming this function can handle autocomplete
        return res.status(200).json(suggestions);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


export { getCoordinates, getDistance,getAutoCompleteSuggestions };
