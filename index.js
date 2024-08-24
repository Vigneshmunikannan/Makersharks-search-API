const express = require('express');
const bodyParser = require('body-parser');
const connectDb = require('./dbconfig/dbconnection');
const supplierRoutes = require('./routes/router');
connectDb()
const app = express();

app.use(bodyParser.json());


app.use('/', supplierRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
