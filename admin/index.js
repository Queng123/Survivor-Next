const express = require("express");
const app = express();
const product = require("./src/product");

app.use("/src/product", product);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running in port ${PORT}`));