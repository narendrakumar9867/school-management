const School = require("../models/school-model.js");

async function addSchool(req, res) {
    const { name, address, latitude, longitude } = req.body;

    if(!name || !address || !latitude || !longitude) {
        return res.status(400).json({
            msg: "All fields are required."
        });
    }

    try {
        await School.create({ name, address, latitude, longitude });
        return res.status(201).json({
            msg: "School added successfully."
        });
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            msg: "Error adding school.", error
        });
    }
}

async function listSchools(req, res) {
    const { latitude, longitude } = req.query;

    if(!latitude || !longitude) {
        return res.status(400).json({
            msg: "Latitude and longitude are required."
        });
    }

    try {
        const schools = await School.findAll();
        const sortedSchools = schools.map(school => {
            const distance = Math.sqrt(
                Math.pow(school.latitude - latitude, 2) +
                Math.pow(school.longitude - longitude, 2)
            );
            return { ...school.toJSON(), distance };
        }).sort((a, b) => a.distance - b.distance);

        return res.status(200).json(sortedSchools);
    } catch(error) {
        return res.status(500).json({
            msg: "Error retrieving schools.", error
        });
    }
}

module.exports = {
    addSchool,
    listSchools,
}