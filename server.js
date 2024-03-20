const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const NodeCache = require('node-cache');
const app = express();

// Initialize a cache with a TTL of 1 hour
const cache = new NodeCache({ stdTTL: 3600 });

app.get('/proxy', async (req, res) => {
    const url = req.query.url;
    try {
        // Check cache first
        const cachedContent = cache.get(url);
        if (cachedContent) {
            console.log('Serving from cache:', url);
            return res.send(cachedContent);
        }

        console.log('Fetching from origin:', url);
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        // Modify HTML content here if needed

        // Store in cache
        cache.set(url, $.html());

        res.send($.html());
    } catch (error) {
        console.error('Error fetching content:', error);
        res.status(500).send('Error fetching content');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
