const buyProductQuantity = async (event) => {
    event.preventDefault();

    const productQuantity = document.querySelector('#product-quantity').value;

    if (productQuantity >= 1) {
        for (let i=0; i < productQuantity; i++) {
            
        };
    } else {
        alert("Please enter a valid quantity.");
    }
}

document
    .querySelector('.product-bought')
    .addEventListener('submit', buyProductQuantity);