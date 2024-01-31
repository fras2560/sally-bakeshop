const { Pool } = require('pg');
const { Order } = require('../models/order');
const { Baker } = require('../models/baker');

const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'sally'
});

/**
 * Get all of todays orders
 * @returns {Array.<Order>} a list of today orders
 */
const getTodayOrders = function() {
  return pool
  .query(`SELECT * FROM product_order WHERE order_date = CURRENT_DATE;`)
  .then((result) => {
    orders = result.rows.map((order_data) => new Order(order_data.id, order_data.name, order_data.duration_seconds, new Date(order_data.order_date)));
    console.log(orders);
    return orders;
  }).catch((err) => {
    console.log(err.message);
  })
};

/**
 * Save the given order
 * @param {Order} order 
 */
const saveOrder = function(order) {
  return pool.query(`
    INSERT INTO product_order (name, duration_seconds, order_date)
    VALUES ($1, $2, $3)
    RETURNING *;
  `,
    [order.name, order.duration, order.date.toDateString()]
  ).then((result) => {
    if (result.rows.length <= 0) {
      return null;
    }
    let order_data = result.rows[0];
    return new Order(order_data.id, order_data.name, order_data.duration_seconds, new Date(order_data.order_date));
  }).catch((err) => {
    console.log(err);
    console.log(err.message);
    return null;
  });
};

const deleteOrder = function(order_id) {
  return pool.query(
    `DELETE FROM product_order where id = $1 RETURNING *;`,
    [order_id]
  ).then((result) => {
    console.log(result);
    return (result.rows.length > 0) ? result.rows[0]: null;
  }).catch((err) => {
    console.log(err);
    console.log(err.message);
    return null;
  })
}

const getBakers = function() {
  return pool
    .query(`SELECT * FROM baker;`)
    .then((result) => {
      bakers = result.rows.map((baker_data) => new Baker(baker_data.id, baker_data.name, baker_data.capacity_seconds));
      console.log(bakers);
      return bakers;
    }).catch((err) => {
      console.log(err.message);
    })
};


module.exports = {
  getTodayOrders,
  saveOrder,
  getBakers,
  deleteOrder
};


