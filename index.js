// app.js
const express = require('express');
const app = express();
const currencyController = require('./controllers/currencyController');
const PORT = process.env.PORT || 4000;
const cors = require('cors')
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: true }));


//api endpoint for top currency  
app.get('/api/topCurrencies', async (req, res) => {
    try {
        const topCurrencies = await currencyController.getTopCurrencies();
        res.json(topCurrencies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//api endpoint for currecy conversion
app.get('/api/convertCurrency', async (req, res) => {

    const { cryptoSymbol, targetCurrency, amount } = req.query;
    if (!cryptoSymbol || !targetCurrency || !amount) {
        return res.status(400).json({ error: 'Missing parameters' });
    }
    try {
        const conversionResult = await currencyController.convertCurrency(cryptoSymbol, targetCurrency, amount);
        res.json(conversionResult);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
