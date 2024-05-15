const { TransactionsDetail } = require("../../models");

const buyProductQuantity = async (event) => {
    event.preventDefault();

    const productQuantity = document.querySelector('#product-quantity').value;

    if (productQuantity >= 1) {
        for (let i=0; i < productQuantity; i++) {
            try {
                const productData = await TransactionsDetail.create(req.body);
                res.status(200).json(productData);
              } catch (err) {
                res.status(400).json(err);
              }
        };
    } else {
        alert("Please enter a valid quantity.");
    }
}

document
    .querySelector('.product-bought')
    .addEventListener('submit', buyProductQuantity);

module.exports = buyProductQuantity()