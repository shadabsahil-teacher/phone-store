// Initialize EmailJS
(function() {
    // EmailJS configuration
    emailjs.init("y-OIIbCFko_1RQDx7");
})();

// Show/hide payment details based on payment method
document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const upiDetails = document.getElementById('upi-details');
        const googlePayDetails = document.getElementById('googlepay-details');
        const paytmDetails = document.getElementById('paytm-details');
        const selectedPayment = this.value;
        
        // Hide all payment details first
        upiDetails.style.display = 'none';
        googlePayDetails.style.display = 'none';
        paytmDetails.style.display = 'none';
        
        // Show relevant payment details
        if (selectedPayment === 'googlepay' || selectedPayment === 'paytm') {
            upiDetails.style.display = 'block';
            if (selectedPayment === 'googlepay') {
                googlePayDetails.style.display = 'block';
                // Update amount in Google Pay details
                document.getElementById('amount-to-pay').textContent = 
                    cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
            } else {
                paytmDetails.style.display = 'block';
                // Update amount in Paytm details
                document.getElementById('paytm-amount').textContent = 
                    cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
            }
        }

        // Add selected class to parent label
        document.querySelectorAll('.payment-method').forEach(method => {
            method.classList.remove('selected');
        });
        this.closest('.payment-method').classList.add('selected');
    });
});

// Generate Order ID
function generateOrderId() {
    const date = new Date();
    return `ORD${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}${date.getHours().toString().padStart(2,'0')}${date.getMinutes().toString().padStart(2,'0')}${date.getSeconds().toString().padStart(2,'0')}`;
}

// Handle order form submission
document.getElementById('order-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const customerName = document.getElementById('name').value;
    const customerEmail = document.getElementById('email').value;
    const customerPhone = document.getElementById('phone').value;
    const customerAddress = document.getElementById('address').value;
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    const orderId = generateOrderId();

    // Format payment method display name
    const paymentDisplayNames = {
        'cod': 'Cash on Delivery',
        'googlepay': 'Google Pay',
        'paytm': 'Paytm'
    };

    const orderDetails = cart.map(item => 
        `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`
    ).join('\n');

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Get payment instructions based on method
    const getPaymentInstructions = (method, amount, orderId) => {
        switch(method) {
            case 'cod':
                return 'Please keep the exact amount ready at the time of delivery.';
            case 'googlepay':
                return `Please pay ₹${amount} using Google Pay to number +918860856316\nAdd Order ID: ${orderId} in description`;
            case 'paytm':
                return `Please pay ₹${amount} using Paytm to number +918860856316\nAdd Order ID: ${orderId} in description`;
            default:
                return '';
        }
    };

    const templateParams = {
        to_name: customerName,
        to_email: customerEmail,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        customer_address: customerAddress,
        order_details: orderDetails,
        total_amount: totalAmount.toFixed(2),
        order_date: new Date().toLocaleDateString(),
        order_id: orderId,
        payment_method: paymentDisplayNames[paymentMethod],
        payment_instructions: getPaymentInstructions(paymentMethod, totalAmount.toFixed(2), orderId)
    };

    // Send email using EmailJS
    emailjs.send('service_pw0kgm4', 'template_w2qfnt8', templateParams)
        .then(function(response) {
            let successMessage = `Order placed successfully!\nYour Order ID: ${orderId}\n\nCheck your email for confirmation.`;
            if (paymentMethod !== 'cod') {
                successMessage += '\nPlease complete the payment using the details provided in the email.';
            }
            alert(successMessage);
            cart = [];
            updateCartDisplay();
            closeOrderModal();
        }, function(error) {
            alert('Error placing order. Please try again.');
            console.error('EmailJS error:', error);
        });
});
