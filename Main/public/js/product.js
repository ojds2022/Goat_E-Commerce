const buyProductQuantity = async (event) => {
    event.preventDefault();

    const productQuantity = document.querySelector('#product-quantity').value;
    // const product_name = document.querySelector('#product-name').textContent;
    // const product_description = document.querySelector('#product-description').textContent;
    // const productImageElement = document.querySelector('#product-image');
    // const product_url = productImageElement.getAttribute('src');
    // const price = document.querySelector('#product-price').textContent.trim().replace('Cost: $', '');
    const Transaction_id = 0;
    const Product_id = 0;
    const ordered = 0;


    if (productQuantity >= 1) {
        for (let i=0; i < productQuantity; i++) {
            try {
                await fetch('/api/product/:id', {
                    method: 'POST',
                    body: JSON.stringify({Transaction_id, Product_id, ordered}),
                    headers: { 'Content-Type': 'application/json' },
                });
              } catch (err) {
                console.log('Error on loop');
              }
        };
    } else {
        alert("Please enter a valid quantity.");
    }
}

document
    .querySelector('.product-bought')
    .addEventListener('submit', buyProductQuantity);
