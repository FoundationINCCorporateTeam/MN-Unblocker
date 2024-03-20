const fetch = require('node-fetch');

module.exports = async (req, res) => {
    const { url } = req.query;

    try {
        if (!url) {
            throw new Error('URL parameter is missing');
        }

        const response = await fetch(url);
        const data = await response.text();
        
        // Set appropriate headers to allow CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        res.status(200).send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to fetch the website.');
    }
};
