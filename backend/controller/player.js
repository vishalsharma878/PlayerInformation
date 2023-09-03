const Player = require('../model/database')


async function createPlayer(req, res) {
    try {
        const formData = req.body;
        console.log(formData);
        const newPlayer = await Player.create(formData);
        res.status(201).json({ message: 'Player record created successfully', player: newPlayer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating player record' });
    }
}


// Handle player search by name
async function searchPlayerByName(req, res) {
    try {
        const playerName = req.params.playerName; // Get the player name from the query parameters
        
        // Search for the player by name in the database
        const player = await Player.findOne({
            where: { name: playerName },
        });

        if (player) {
            res.status(200).json({ player });
        } else {
            res.status(404).json({ message: 'Player not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error searching for player' });
    }
}

async function updatePlayer(req, res) {
    try {
        const playerId = req.params.id; // Get the player ID from the route parameters
        const updatedData = req.body;

        // Find the player by ID and update their information
        const [rowsUpdated] = await Player.update(updatedData, {
            where: { id: playerId },
        });

        if (rowsUpdated === 1) {
            res.status(200).json({ message: 'Player updated successfully' });
        } else {
            res.status(404).json({ message: 'Player not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating player' });
    }
}

module.exports = {
    createPlayer,
    searchPlayerByName,
    updatePlayer,
};
