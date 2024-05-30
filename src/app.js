const fs = require('fs');
const express = require('express');
const app = express();

// Importing productNames from names.json file
const productNames = JSON.parse(
    fs.readFileSync(`${__dirname}/data/names.json`)
);

//Middlewares
app.use(express.json())

// GET endpoint for sending the products to client by id
//Endpoint - /api/v1/names/:id

app.get("/api/v1/names/:id", (req, res) => {
    let {id} = req.params;
    id *= 1;
    const productName = productNames.find((productName) => productName.id === id);
    if(!productName){
        return res.status(404).send({
            status: "failed",
            message: "Not found!",
        });
    }else{
        res.status(200).send({
            status: "Success",
            message: "Product name fetched successfully",
            data: {
                productName,
            },
        });
    }
});


module.exports = app;
