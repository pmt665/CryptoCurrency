const express = require("express");
const app = express();
const helmet = require("helmet");
const { handleError } = require("./src/helpers/error");

const cryptoCurrencyRoutes = require("./src/routes/cryptoCurrency");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
app.use("/api/exchangeRates", cryptoCurrencyRoutes);

app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = { app };
