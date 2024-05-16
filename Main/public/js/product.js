const buyProductQuantity = async (event) => {
    event.preventDefault();

    const productQuantity = document.querySelector('#product-quantity').value;
    const productName = document.querySelector('#product-name').textContent;
    const productDescription = document.querySelector('#product-description').textContent;
    const productImageElement = document.querySelector('#product-image');
    const productUrl = productImageElement.getAttribute('src');
    const productPrice = document.querySelector('#product-price').textContent.trim().replace('Cost: $', '');

    if (productQuantity >= 1) {
        for (let i=0; i < productQuantity; i++) {
            try {
                await fetch('/api/product/:id', {
                    method: 'POST',
                    body: JSON.stringify({productName, productDescription, productUrl, productPrice}),
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
