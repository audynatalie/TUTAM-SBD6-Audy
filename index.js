const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use(`/user`, require(`./src/routes/user.route`));
app.use(`/store`, require(`./src/routes/storeRoutes`));
app.use(`/item`, require(`./src/routes/item.route`));
app.use('/transaction', require('./src/routes/transaction.route'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
