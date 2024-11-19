function changePaymentMethod(method) {
  const paymentForm = document.getElementById("payment-form");
  let formContent = "";

  switch (method) {
    case "bca":
      formContent = `
                <h4>Pay with BCA</h4>
                <div>
                    <label for="fullName" class="form-label">Card Holder Full Name</label>
                    <input type="text" id="fullName" class="form-control" placeholder="Enter your full name">
                </div>
                <div>
                    <label for="cardNumber" class="form-label">Card Number</label>
                    <input type="text" id="cardNumber" class="form-control" placeholder="0000 0000 0000 0000">
                </div>
                <div class="row">
                    <div class="col">
                        <label for="expiryDate" class="form-label">Expiry Date</label>
                        <input type="text" id="expiryDate" class="form-control" placeholder="MM/YY">
                    </div>
                    <div class="col">
                        <label for="cvv" class="form-label">CVV</label>
                        <input type="text" id="cvv" class="form-control" placeholder="CVV">
                    </div>
                </div>`;
      break;
    case "dana":
    case "gopay":
    case "ovo":
      formContent = `
                <h4>Pay with ${method.toUpperCase()}</h4>
                <div>
                    <label for="phoneNumber" class="form-label">Phone Number</label>
                    <input type="text" id="phoneNumber" class="form-control" placeholder="Enter your phone number">
                </div>`;
      break;
    case "qris":
      const randomQR = Math.random().toString(36).substr(2, 8);
      formContent = `
                <h4>Pay with QRIS</h4>
                <div class="text-center">
                    <p>Scan the QR code below:</p>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?data=${randomQR}&size=150x150" alt="QR Code">
                </div>`;
      break;
    case "kreditnow":
      formContent = `
                <h4>Pay with KreditNow</h4>
                <div>
                    <label for="phoneNumber" class="form-label">Phone Number</label>
                    <input type="text" id="phoneNumber" class="form-control" placeholder="Enter your phone number">
                </div>
                <div>
                    <label for="password" class="form-label">Password</label>
                    <input type="password" id="password" class="form-control" placeholder="Enter your password">
                </div>
                <div>
                    <label for="loanAmount" class="form-label">Loan Amount (IDR)</label>
                    <input type="number" id="loanAmount" class="form-control" placeholder="Enter loan amount">
                </div>`;
      break;
  }

  formContent += `
        <div class="mt-4">
            <button class="btn-checkout" onclick="processPayment()">Checkout</button>
        </div>`;

  paymentForm.innerHTML = formContent;
}

function processPayment() {
  alert("Payment Successful!");
}
