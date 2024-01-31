var express = require('express');
var router = express.Router();
var db = require('../db/database');
const { Order } = require('../models/order');

const { Baker } = require('../models/baker');

let today_bakers = [];
const MAX_DAY_DURATION = 60*60*8;

const scheduleStore = () => {
  db.getBakers().then((bakers) => {
    today_bakers = bakers;
    db.getTodayOrders().then((orders) => {
      scheduleOrders(orders);
    })
  });
}

const scheduleOrders = (orders) => {
  orders = orders.sort((o1, o2) => o1.duration - o2.duration);
  today_bakers = today_bakers.map((baker) => {
    baker.clearOrders();
    return baker;
  })
  for(const order of orders) {
    if (!scheduleOrder(order)) {
      throw new Error(`Unable to schedule order ${order.id} - ${order.name}`);
    }
  }
}

const scheduleOrder = (order) => {
  today_bakers.sort((b1, b2) => { return b2.todayCapacity() - b1.todayCapacity()});
  for(const baker of today_bakers) {
    if (baker.canTakeOrder(order)) {
      baker.addOrder(order); 
      return true;
    }
  }
}

const storeHaveCapacity = (order) => {
  console.log(today_bakers);
  const totalCapacity = today_bakers.reduce((total, baker) => {
    return total + baker.todayCapacity();
  }, 0);
  console.log(totalCapacity);
  return totalCapacity >= order.duration;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/orders", function(req, res) {
  db.getTodayOrders()
    .then((orders) => {
      res.send(orders.map((order) => {
        return {
          'date': order.date.toDateString(),
          'name': order.name,
          'duration': order.duration,
          'id': order.id
        };
      }));
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    })
});

router.delete("/order/:id", function(req, res) {
  const order_id = req.params.id;
  console.log(order_id);
  db
    .deleteOrder(order_id)
    .then((deleted) => {
      scheduleStore();
      res.send(deleted);
    }).catch((err) => {
      console.log(err);
      res.statusCode = 404;
      res.send("Did not find order");
    })
})

router.post("/order", function(req, res) {
  const body = req.body;
  const order = new Order(null, body.name, body.duration, new Date());
  if (!storeHaveCapacity(order) || order.duration > MAX_DAY_DURATION) {
    // might not be the best status code but using it for now
    res.statusCode = 413;
    res.send("Do not have capacity for order");
    return;
  }
  db.saveOrder(order)
  .then((order) => {
    scheduleStore();
    res.send(order);
  });
});

router.get("/bakers/orders", function(req, res) {
  res.send({
    bakers: bakers
  });
});

scheduleStore();


module.exports = router;
