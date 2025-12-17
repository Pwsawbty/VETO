document.getElementById("pay").onclick = async () => {
  const res = await fetch("https://YOUR_BACKEND_URL/v1/payments/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": "test_key_123"
    },
    body: JSON.stringify({ amount: 99 })
  });

  const data = await res.json();

  const options = {
    key: "rzp_test_XXXXXXX", // Razorpay TEST key_id
    amount: data.amount,
    currency: data.currency,
    name: "VETO",
    description: "Test Payment",
    order_id: data.orderId,
    handler: function (response) {
      console.log("PAYMENT SUCCESS", response);
      alert("Payment Successful");
    }
  };

  const rzp = new Razorpay(options);
  rzp.open();
};
