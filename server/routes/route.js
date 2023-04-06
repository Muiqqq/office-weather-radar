const path = require('path');
const axios = require('axios');
const express = require('express');
const router = express.Router();
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VAL = process.env.API_KEY_VALUE;
const API_BASE_URL = process.env.API_BASE_URL;

router.get('/', async (req, res) => {
  try {
    const qParams = req.query;
    // Frontend sends endpoint as a query parameter, which is actually a 3rd party
    // API route
    const ENDPOINT = qParams.endpoint;
    // Remove endpoint as a parameter to be assigned into the API call url as a
    // route
    // We want to call the 3rd party API like this f.ex: www.example.com/endpoint?param1=val etc.
    delete qParams.endpoint;

    // We are basically forwarding the search params received from frontend
    // to the 3rd party API and appending our API KEY here.
    // URLSearchParams allows easy appending to the base URL.
    const params = new URLSearchParams({
      ...qParams,
      [API_KEY_NAME]: API_KEY_VAL,
    });
    const api_url = `${API_BASE_URL}${ENDPOINT}?${params}`;
    const apiResult = await axios.get(api_url);

    if (process.env.NODE_ENV !== 'production') {
      console.log(apiResult.data);
    }
    res.status(200).json(apiResult.data);
  } catch (error) {
    res.status(500).send('Internal server error.');

    if (process.env.NODE_ENV !== 'production') {
      console.log(error.response.data);
    }
  }
});

module.exports = router;
