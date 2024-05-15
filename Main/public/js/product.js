const buyProductQuantity = async (event) => {
    event.preventDefault();

    const productQuantity = document.querySelector('#product-quantity').value;

    if (productQuantity >= 1) {
        console.log(`button pressed with ${productQuantity}`);
    } else {
        console.log(`please enter a number`);
    }
}

document
    .querySelector('.product-bought')
    .addEventListener('submit', buyProductQuantity);