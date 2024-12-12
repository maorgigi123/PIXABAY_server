require('dotenv').config();  // Load environment variables from .env file

const express = require('express');
const axios = require('axios');
const cors = require('cors');  // ייבוא של cors




const app = express();
const PORT = 3001;

// Pixabay API key and URL from environment variables
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
const PIXABAY_API_URL = process.env.PIXABAY_API_URL;


// Enable CORS
app.use(cors());  // הוספת middleware של CORS



// Route to fetch images with pagination
app.get('/images', async (req, res) => {
  const { category = 'sport', page = 1 } = req.query;

  try {
    // Fetch data from Pixabay API
    const response = await axios.get(PIXABAY_API_URL, {
      params: {
        key: PIXABAY_API_KEY,
        category: category,
        page,
        per_page: 9,
        image_type: 'photo',
      },
    });
    // Send data back to the client without sorting
    res.json({
      hits: response.data.hits,
      total: response.data.total,
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
