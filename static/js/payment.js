var paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener('submit', payWithPaystack, false);

function generateReferenceId() {
  // Generate a timestamp
  var timestamp = new Date().getTime().toString();

  // Generate a random number between 1000 and 9999
  var randomNumber = Math.floor(Math.random() * 9000) + 1000;

  // Combine the timestamp and random number to create the reference ID
  var referenceId = timestamp + randomNumber;

  return referenceId;
}

function payWithPaystack(event) {
  event.preventDefault(); // Prevent form submission
  var amount = document.getElementById('amount').value;
  if (amount === '') {
    alert('Please enter an amount to fund.'); // Show error message if amount is empty
    return;
  }

  var email = "{{ user.email }}"; // Replace with the actual email of the user
  var ref = generateReferenceId(); // Generate a reference ID

  var handler = PaystackPop.setup({
    key: 'pk_test_3e02022b3a8f2f413a0d38d805403c3fd62fa23e', // Replace with your public key
    email: email,
    amount: amount * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
    currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
    ref: ref,
    callback: function(response) {
      // This happens after the payment is completed successfully
      var reference = response.reference;
      alert('Payment complete! Reference: ' + reference);
      // Make an AJAX call to your server with the reference to verify the transaction and update the database
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/update_wallet/', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
      xhr.setRequestHeader('X-CSRFToken', document.getElementsByName('csrfmiddlewaretoken')[0].value);
      xhr.onload = function() {
        if (xhr.status === 200) {
          // Handle successful response from server
          alert('Database updated successfully!');
        } else {
          // Handle error response from server
          alert('Failed to update database. Error: ' + xhr.statusText);
        }
      };
      xhr.onerror = function() {
        // Handle AJAX error
        alert('Failed to update database. Error: ' + xhr.statusText);
      };
      xhr.send(JSON.stringify({ amount: amount }));
    },
    onClose: function() {
      alert('Transaction was not completed, window closed.');
    },
  });
  handler.openIframe();
}
