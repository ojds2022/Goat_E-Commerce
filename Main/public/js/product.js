// Main/public/js/product.js
const buyProductQuantity = async (event) => {
    event.preventDefault();
    const total = 5000;
    const customer_id = 3;  // Assuming you have the customer ID available here
    const created_date = '2024-05-18 00:43:31'
    const ordered = 0;
    const transaction_id = 2;
    const product_id =3;
    const dordered =0;
  
    const transactionData = {
        total,
        customer_id,
        created_date,
        ordered,
        transaction_id,
        product_id,
        dordered,
        
    };
    try {
        const response = await fetch('/products/1', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionData)
        });
        const result = await response.json();
        if (result.success) {
            console.log('Data inserted successfully:', result);
        } else {
            console.error('Error inserting data:', result.error);
        }
    } catch (err) {
        console.error('Error inserting ');
    }
};
document
    .querySelector('.product-bought')
    .addEventListener('submit', buyProductQuantity);