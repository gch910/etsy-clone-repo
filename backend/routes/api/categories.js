const express = require('express');
const router = express.Router();

const { Category } = require('../../db/models');
const { Product } = require('../../db/models');

const asyncHandler = require("express-async-handler");

router.get('/:categoryId', asyncHandler(async(req, res) => {
    // const parsedId = parseInt(req.params.categoryId);
    // const category = await Category.findOne({
    //     where: {
    //         name: 
    //     }
    // });

    // const products = await Product.findAll({ where: {
       
    // }})

   
    // products.forEach(product => console.log(product.name))
    // res.json({ products })
}));

module.exports = router;