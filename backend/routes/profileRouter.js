const express = require('express');
const { db } = require('../server/db');

const profileRouter = express.Router();


// value Router is previous routes from ctc lol dont use them but you can change them to profileRouter and then edit the functions.
// I think we need a get id, a post, and a put
// very basic would be to get the name from a person and display it on a page (GET)
// to update the name of a person based on their id (PUT)
// and to create a new person with a new name and id (POST)

// GET all items
valueRouter.get('/', async (req, res) => {
  try {
    const allItems = await db.query(`SELECT * FROM fair_market_value;`);
    res.status(200).send(allItems);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET all values by item id
valueRouter.get('/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await db.query('SELECT * FROM fair_market_value WHERE item_id = $(itemId)', {
      itemId,
    });
    res.status(200).send(item);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// CREATE a new item
valueRouter.post('/', async (req, res) => {
  try {
    const { itemName, quantityType, quantity, price } = req.body;
    const newItem = await db.query(
      'INSERT INTO fair_market_value (item_name, quantity_type, quantity, price) VALUES ($(itemName), $(quantityType), $(quantity), $(price)) RETURNING *',
      { itemName, quantityType, quantity, price },
    );
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = valueRouter;
