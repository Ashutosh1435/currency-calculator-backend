// controllers/currencyController.js
const axios = require('axios');

const COINMARKETCAP_API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
const FASTFOREX_API = "https://api.fastforex.io/convert";
const API_KEY = "e8ad0270-33d9-4776-8e8e-d4f3f892e030"; //coinmarketcap api key
const FASTFOREX_API_KEY = "f0c97a7b3e-4d4a32e3e3-s6sfqy";

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
        "X-CMC_PRO_API_KEY": API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

//controller for the currency conversion
const convertCurrency = async (cryptoSymbol, targetCurrency, amount) => {
  console.log(cryptoSymbol, targetCurrency, amount);
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
