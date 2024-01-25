const ChargerModel = require('../models/Charger');
const logger = require('../logger/logger');

// Get all chargers
const getAllChargers = async (req, res) => {
    try {
        const chargers = await ChargerModel.find();
        res.json(chargers);
    } catch (error) {
        logger.error('Error fetching chargers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getChargerById = async (req, res) => {
    try {
        const id  = req.params.id;
        const charger = await ChargerModel.findById(id);
        console.log(charger)

        if (!charger) {
            return res.status(404).json({ error: 'Charger not found' });
        }

        res.json(charger);
    } catch (error) {
        logger.error('Error fetching charger by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createCharger = async (req, res) => {
    try {
        const newCharger = req.body;
        newCharger.position = { lat: newCharger.lat, lng: newCharger.lng };

        const createdCharger = await ChargerModel.create(newCharger);

        res.status(201).json(createdCharger);
    } catch (error) {
        logger.error('Error creating charger:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateChargerById = async (req, res) => {
    try {
        const  id  = (req.params.id);
        const charger = { ...req.body };
        charger.position = { lat: charger.lat, lng: charger.lng};

        const updatedCharger = await ChargerModel.findByIdAndUpdate(id, charger, { new: true });

        if (!updatedCharger) {
            return res.status(404).json({ error: 'Charger not found' });
        }

        res.json(updatedCharger);
    } catch (error) {
        logger.error('Error updating charger by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteChargerById = async (req, res) => {
    try {
        const  id = req.params.id;
        const deletedCharger = await ChargerModel.findByIdAndDelete(id);

        if (!deletedCharger) {
            return res.status(404).json({ error: 'Charger not found' });
        }
        res.json(`Successfully deleted charger with ID: ${id}`);
    } catch (error) {
        logger.error('Error deleting charger by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getChargersByFilter = async (req, res) => { 
    let { query, offset, ITEMS_PER_PAGE } = req.body;
   
    // Filter for case-insensitive partial matching on name and type
    let filter = {
        $or: [
            { name: { $regex: new RegExp(query, 'i') } },
            { type: { $regex: new RegExp(query, 'i') } },
        ],
    };

    try {
        // Query the chargers collection with the filter
       const filteredChargers = await ChargerModel.find(filter).skip(offset).limit(ITEMS_PER_PAGE);
       res.json(filteredChargers)
        
    }
    catch (error) {
        logger.error('Error occuped:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

};
const getChargerCount = async (req, res) => {

    let { query } = (req.body)
    let filter = {
        $or: [
            { name: { $regex: new RegExp(query, 'i') } },
            { type: { $regex: new RegExp(query, 'i') } },
        ],
    };
    try {
        await ChargerModel.countDocuments(filter).then(function (count) { 
            res.json(count) 
        })
    }
    catch (error) {
        logger.error('Error occuped:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllChargers,
    getChargerById,
    createCharger,
    updateChargerById,
    deleteChargerById,
    getChargersByFilter,
    getChargerCount
};