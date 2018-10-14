const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const PORT = process.env.PORT || 8080;
const { db, Product, Order, LineItem, seed } = require('./db');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/api/products', (req, res, next) => {
  Product.findAll()
    .then(products => res.send(products))
    .catch(next);
});

app.get('/api/orders', async (req, res, next) => {
  const attr = {
    status: 'CART',
  };
  try {
    let cart = await Order.findOne({ where: attr });
    if (!cart) {
      cart = await Order.create(attr);
    }
    const orders = await Order.findAll({
      include: [LineItem],
      order: [['createdAt', 'DESC']],
    });

    res.send(orders);
  } catch (ex) {
    next(ex);
  }
});

//update line item
app.put('/api/orders/:orderId/lineItems/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
    .then(lineItem => lineItem.update(req.body))
    .then(lineItem => res.send(lineItem))
    .catch(next);
});

//delete all
app.delete('/api/orders/reset', async (req, res, next) => {
  await Order.destroy({ where: {} });
  await LineItem.destroy({ where: {} });
  res.status(200).send();
});

//delete lineItem
app.delete('/api/orders/:orderId/lineItems/:id', (req, res, next) => {
  LineItem.destroy({
    where: {
      orderId: req.params.orderId,
      id: req.params.id,
    },
  })
    .then(() => res.sendStatus(204))
    .catch(next);
});

//create lineItem
app.post('/api/orders/:orderId/lineItems/', (req, res, next) => {
  console.log(req.body);
  LineItem.create({
    orderId: req.params.orderId,
    quantity: req.body.quantity,
    productId: req.body.productId,
  })
    .then(lineItem => res.send(lineItem))
    .catch(next);
});

//update order
app.put('/api/orders/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order.update(req.body))
    .then(order => res.send(order))
    .catch(next);
});

db.sync({ force: true })
  .then(() => {
    console.log('database synced');
    seed();
  })
  .then(() => {
    console.log('databse seeded');
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`);
    });
  });
