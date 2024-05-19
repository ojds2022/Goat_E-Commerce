// Main/public/js/product.js
const buyProductQuantity = async (event) => {
    event.preventDefault();
    const total = 1;
    const customer_id = 3;  // Assuming you have the customer ID available here
    const created_date = '2024-05-18 00:43:31'
    const ordered = 0;
    const transaction_id = 2;
    const product_id =3;
    const dordered =0;

    const customerId = 4;

    //global var cutomerId
   
   // Update global customerId on the server side


   const UserId = {
    customerId,
    
    
};
   try {
    const updateResponse = await fetch('/updateCustomerId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(UserId)
    });
    const updateResult = await updateResponse.json();
    if (updateResult.success) {
        console.log ('Global varible updated!!'+ updateResult.customerId)
     
      //throw new Error(updateResult.message);
    }
  } catch (err) {
    console.error('Error updating global customerId:', err);
  }


  try {
    const fetchResponse = await fetch('/getCustomerId', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const fetchResult = await fetchResponse.json();
    console.log('Global customerId after update:', fetchResult.customerId);
  } catch (err) {
    console.error('Error fetching global customerId:', err);
  }




 
  
  
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
            
            //console.log ( global.cutomerId)



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