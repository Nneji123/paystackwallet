var paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener('submit', payWithPaystack, false);

function generateReferenceId() {
  var timestamp = new Date().getTime().toString();

  var randomNumber = Math.floor(Math.random() * 9000) + 1000;

  var referenceId = timestamp + randomNumber;

  return referenceId;
}

function payWithPaystack(event) {
  event.preventDefault();
  var amount = document.getElementById('amount').value;
  if (amount === '') {
    alert('Please enter an amount to fund.');
    return;
  }

  var emailElement = document.getElementById('email');
  var emailString = emailElement.textContent;
  var emailPrefix = "Email: ";
  var email = emailString.slice(emailPrefix.length);
  var ref = generateReferenceId();

  var handler = PaystackPop.setup({
    key: 'pk_test_3e02022b3a8f2f413a0d38d805403c3fd62fa23e',
    email: email,
    amount: amount * 100,
    currency: 'NGN',
    ref: ref,
    callback: function(response) {
      var reference = response.reference;
      alert('Payment complete! Reference: ' + reference);
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/update_wallet/', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
      xhr.setRequestHeader('X-CSRFToken', document.getElementsByName('csrfmiddlewaretoken')[0].value);
      xhr.onload = function() {
        if (xhr.status === 200) {
          alert('Database updated successfully!');
        var walletBalanceElement = document.getElementById('walletBalance'); // Get the wallet balance element
        var walletBalance = response.wallet_balance; // Extract the updated wallet balance from the response
        walletBalanceElement.textContent = walletBalance; // Update the text content of the element with the new wallet balance

        } else {
          alert('Failed to update database. Error: ' + xhr.statusText);
        }
      };
      xhr.onerror = function() {
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
