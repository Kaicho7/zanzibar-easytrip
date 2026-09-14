// Stripe init (replace with live key when ready)
const stripe = Stripe('pk_test_51HXXXXXXXXXXXX');
const form = document.getElementById('booking-form');
const resultDiv = document.getElementById('itinerary-result');
const payBtn = document.getElementById('pay-button');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    hotel: document.getElementById('b_hotel').value,
    date: document.getElementById('b_date').value,
    flight: document.getElementById('b_flight').value,
    adults: document.getElementById('b_adults').value,
    children: document.getElementById('b_children').value
  };
  try {
    const resp = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await resp.json();
    resultDiv.textContent = data.itinerary || 'No itinerary returned';
    payBtn.style.display = 'inline-block';
  } catch (err) {
    resultDiv.textContent = 'Error generating itinerary';
  }
});
payBtn.addEventListener('click', async () => {
  const sessionResp = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: 500 })
  });
  const session = await sessionResp.json();
  const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
  if (error) alert(error.message);
});
