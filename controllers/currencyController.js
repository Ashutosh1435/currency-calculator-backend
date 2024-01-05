// controllers/currencyController.js
const axios = require('axios');

const COINMARKETCAP_API_URL = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/supported_vs_currencies';
const API_KEY = 'e8ad0270-33d9-4776-8e8e-d4f3f892e030';  //coinmarketcap api key


//controller to fetch top cuurenct using  coinmarketcap api
const getTopCurrencies = async () => {
    try {
        const response = await axios.get(COINMARKETCAP_API_URL, {
            params: {
                start: 1,
                limit: 100,
                convert: 'USD',
            },
            headers: {
                'X-CMC_PRO_API_KEY': API_KEY,
            },
        });

        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

//controller for the supported currencies

const getSupportedCurrencies = async () => {
    try {
        const response = await axios.get(COINGECKO_API_URL);
        const result = response.data
        return result;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

//controller for the currency conversion 
const convertCurrency = async (cryptoSymbol, targetCurrency, amount) => {
    console.log(cryptoSymbol, targetCurrency)
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoSymbol}&vs_currencies=${targetCurrency}`);
        console.log(response.data);
        console.log(cryptoSymbol)
        const conversionData = response.data[cryptoSymbol.toLowerCase()];
        console.log(conversionData)

        if (!conversionData || typeof conversionData !== 'object' || !conversionData[targetCurrency]) {
            throw new Error('Conversion rate not available');
        }

        const usdValue = conversionData[targetCurrency];
        const convertedAmount = amount * usdValue;

        return { cryptoSymbol, targetCurrency, amount, convertedAmount, usdValue };
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};



module.exports = {
    getTopCurrencies,
    getSupportedCurrencies,
    convertCurrency
};
