const router = require('express').Router();
const { Product , Customers} = require('../models');

//adding Auth 
const withAuth = require('../utils/auth');

const sequelize = require('../config/connection');

//* FELIX'S CODE HERE:
// Login route
router.get('/login', (req, res) => {
  // If the customer is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/products');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

// Logout route
router.get('/logout', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/products');
    return;
  }
  res.render('login');
});

router.get('/', (req, res) => {
  res.redirect('/products');
});
//* FELIX'S CODE ENDS HERE!

router.get('/products', async (req, res) => {
  try {
    const productData = await Product.findAll({
      order: [['product_name', 'ASC']],
    });
    const Products = productData.map((project) => project.get({ plain: true }));
    const customerData = await Customers.findAll({
      order: [['customer_id', 'ASC']],
    });
    const customerVar = customerData.map((project) => project.get({ plain: true }));

  res.render('productsPage', { 
    title: 'Products',
    Products,
    customerVar,
    loggedIn: req.session.loggedIn
  });

} catch (err) {
  res.status(500).json(err);
}
});

router.get('/products/:id',  async (req, res) => {
  try {
    const productData = await Product.findByPk(req.params.id);
    const Products = productData.get({ plain: true });

    const customerData = await Customers.findAll({
      order: [['customer_id', 'ASC']],
    });
    const customerVar = customerData.map((project) => project.get({ plain: true }));

    res.render('productDetailsPage', {
      Products,
      customerVar,
      loggedIn: req.session.loggedIn
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});

//shopping cart page
router.get('/shoppingCart', async (req, res) => {
  try {
    //raw sql data to pull values needed to display on shopping cart page
    const sqlQuery = `
      SELECT 
        c.customer_id, 
        p.product_url,
        p.product_name,
        p.price,
        tm.total,
        COUNT(p.product_name) AS QTY,
        (SELECT SUM(p2.price) 
          FROM products p2
          JOIN transactionsdetails td2 ON p2.Product_id = td2.Product_id
          JOIN transactionsmains tm2 ON td2.Transaction_id = tm2.Transaction_id
          JOIN customers c2 ON tm2.customer_id = c2.customer_id
          WHERE c2.customer_id = 1
        ) AS totalPrice
      FROM 
        customers c
      JOIN 
        transactionsmains tm ON c.customer_id = tm.customer_id
      JOIN 
        transactionsdetails td ON tm.Transaction_id = td.Transaction_id
      JOIN 
        products p ON td.Product_id = p.Product_id
      WHERE
       c.customer_id = 1
      GROUP BY 
        p.price, c.customer_id,p.product_url, p.product_name, tm.total
      
    `;
    //running raw sql query
    const [results] = await sequelize.query(sqlQuery);
    
    //passing it as an object 
    const serializedData = results.map((data) => ({
      product_name: data.product_name,
      product_url: data.product_url,
      price: data.price,
      quantity: data.QTY,
      totalCost: data.price * data.QTY,
      subtotalPrice: data.totalPrice,
      tax: 9,
      finalPrice: (data.totalPrice * 1.09).toFixed(2)     
    }));
    //passing it through to the shopping cart page
    res.render('shoppingCart', {
      title: 'Shopping Cart',
      data:serializedData,
      loggedIn: req.session.loggedIn
    });
    
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/products/1', async (req, res) => {
  const { total, customer_id, created_date, ordered, product_id, dordered ,} = req.body;
  try {
    // Step 1: Check if there is an existing transaction for the customer
    const selectQuery = `
      SELECT transaction_id
      FROM TransactionsMains
      WHERE customer_id = :customer_id AND ordered = 0
      ORDER BY transaction_id DESC
      LIMIT 1
    `;
    const [transaction] = await sequelize.query(selectQuery, {
      replacements: { customer_id },
      type: sequelize.QueryTypes.SELECT
    });
    let transaction_id;
    if (transaction) {
      // If record exists, get the transaction_id
      transaction_id = transaction.transaction_id;
    } else {
      // If no record exists, insert a new record into TransactionsMains
      const insertTransactionMainsQuery = `
        INSERT INTO TransactionsMains (total, customer_id, created_date, ordered)
        VALUES (:total, :customer_id, :created_date, :ordered)
      `;
      const result = await sequelize.query(insertTransactionMainsQuery, {
        replacements: { total, customer_id, created_date, ordered },
        type: sequelize.QueryTypes.INSERT
      });
      // Retrieve the transaction_id of the newly inserted record
      const newTransaction = await sequelize.query(`
        SELECT transaction_id
        FROM TransactionsMains
        WHERE customer_id = :customer_id
        ORDER BY transaction_id DESC
        LIMIT 1
      `, {
        replacements: { customer_id },
        type: sequelize.QueryTypes.SELECT
      });
      transaction_id = newTransaction[0].transaction_id;
    }
    // Insert into TransactionsDetails
    const insertTransactionDetailsQuery = `
      INSERT INTO TransactionsDetails (transaction_id, product_id, ordered)
      VALUES (:transaction_id, :product_id, :dordered)
    `;
    await sequelize.query(insertTransactionDetailsQuery, {
      replacements: { transaction_id, product_id, dordered },
      type: sequelize.QueryTypes.INSERT
    });
    res.json({ success: true, transaction_id });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});




















router.get('/ordermain', withAuth, async (req, res) => {
  try {
    
    const sqlQuery = `
    SELECT
      c.first_name,
      c.last_name,
      tm.transaction_id,
      tm.created_date,
      c.customer_id,
    
    
      SUM(p.price) AS total_price,
      tm.ordered
  FROM 
      customers c
  JOIN 
      transactionsmains tm ON c.customer_id = tm.customer_id
  JOIN 
      transactionsdetails td ON tm.transaction_id = td.transaction_id
  JOIN 
      products p ON td.product_id = p.product_id
  where c.customer_id = ${req.session.customer_id}
  GROUP BY 
      tm.transaction_id,tm.created_date, c.customer_id;
    `;

    const [results] = await sequelize.query(sqlQuery);

    const serializedData = results.map((data) => ({
      transaction_id: data.transaction_id,
      created_date: data.created_date,
      customer_id : data.customer_id,
      first_name: data.first_name,
      last_name: data.last_name,
      total: data.total_price,
      ordered: data.ordered,
      
    }));

    res.render('orderMain', { 
      data: serializedData,
      loggedIn: req.session.loggedIn
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/orderDetail/:id', async (req, res) => {
  try {
    
    const sqlQuery = `
    SELECT 
    tm.transaction_id,
    p.product_id,
    p.product_name,
    p.product_description,
    sum(p.price) as total,
    p.product_url,

    COUNT(p.product_name) AS QTY
  FROM 
    customers c
  JOIN 
    transactionsmains tm ON c.customer_id = tm.customer_id
  JOIN 
    transactionsdetails td ON tm.Transaction_id = td.Transaction_id
  JOIN 
    products p ON td.Product_id = p.Product_id
    where tm.transaction_id = ${req.params.id}
  GROUP BY 
     p.product_id,tm.transaction_id,p.price, p.product_name, p.product_description, p.product_url;
    `;

    const [results] = await sequelize.query(sqlQuery);

    const serializedData = results.map((data) => ({
      transaction_id: data.transaction_id,
      product_id: data.product_id,
      product_name: data.product_name,
      product_description: data.product_description,
      total: data.total,
      product_url: data.product_url,
      Qty: data.Qty
      
      
    }));

    res.render('orderdetail', { 
      data: serializedData,
      loggedIn: req.session.loggedIn 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/transactionComplete', (req,res) => {
  

  res.render('transactionComplete',{
    loggedIn: req.session.loggedIn
  });
});
module.exports = router;
