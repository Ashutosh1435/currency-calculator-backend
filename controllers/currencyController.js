// controllers/currencyController.js
const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();

const COINMARKETCAP_API_URL = process.env.COINMARKETCAP_API_URL;
const FASTFOREX_API = process.env.FASTFOREX_API;
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;
const FASTFOREX_API_KEY = process.env.FASTFOREX_API_KEY;

//controller to fetch top cuurenct using  coinmarketcap api
const getTopCurrencies = async () => {
  try {
    const response = await axios.get(COINMARKETCAP_API_URL, {
      params: {
        start: 1,
        limit: 100,
        convert: "USD",
      },
      headers: {
        "X-CMC_PRO_API_KEY": COINMARKETCAP_API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

//controller for the currency conversion
const convertCurrency = async (cryptoSymbol, targetCurrency, amount) => {
  try {
    const response = await axios.get(`${FASTFOREX_API}`, {
      params: {
        from: cryptoSymbol,
        to: targetCurrency,
        amount: amount,
        api_key: FASTFOREX_API_KEY,
      },
    });
    const convertedAmount = response.data.result[targetCurrency];
    return { cryptoSymbol, targetCurrency, amount, convertedAmount };
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

module.exports = {
  getTopCurrencies,
  convertCurrency,
};
