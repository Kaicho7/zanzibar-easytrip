/* ────────────────────────────────────────────────────────────────
   Zanzibar EasyTrip — single source of truth.
   EDIT THIS FILE ONLY to go live: your real WhatsApp number,
   your real price set (after signed driver quotes), and your
   real payment-link (Pesapal / Stripe / M-Pesa merchant till).
   Every page reads from here, so one edit propagates site-wide.
   ──────────────────────────────────────────────────────────────── */

const SITE = {
  brand: 'Zanzibar EasyTrip',
  tagline: 'One WhatsApp. Confirmed prices. Confirmed pickup. Real local operators.',

  /* Country code, digits only, no '+' and no spaces.
     E.g. +255 77X XXX XXX  →  '2557XXXXXXXXX' */
  whatsappNumber: '255700000000', // ⚠️ TODO: replace with your real WhatsApp Business number

  /* Deposit payment link. Wire a real Pesapal/Stripe/DPO or M-Pesa
     merchant link. Until then, guests pay balance in cash on arrival
     and the button below falls back to the WhatsApp funnel. */
  paymentDepositLink: 'https://pay.example.com/zanzibar-easytrip-deposit', // ⚠️ TODO: replace

  /* Fixed prices per vehicle (4 pax) — OPERATING ASSUMPTION until real
     driver quotes land. Short Stone Town hop vs long beach runs. */
  prices: {
    'stone-town': { label: 'ZNZ → Stone Town',   price: 35, unit: 'per vehicle (up to 4 pax)', note: '~10–15 min' },
    'nungwi':     { label: 'ZNZ → Nungwi',       price: 50, unit: 'per vehicle (up to 4 pax)', note: '~70–80 min' },
    'kendwa':     { label: 'ZNZ → Kendwa',       price: 50, unit: 'per vehicle (up to 4 pax)', note: '~80–90 min' },
    'paje':       { label: 'ZNZ → Paje',         price: 45, unit: 'per vehicle (up to 4 pax)', note: '~55–65 min' },
  },

  /* Message template for the WhatsApp funnel. Placeholders are replaced
     by the booking form. Keep it short — it wins fast replies. */
  transferMsg:
    "Karibu! I'd like a PRIVATE AIRPORT TRANSFER.\n" +
    'Route: ZNZ → {hotel}\n' +
    'Date: {date}\n' +
    'Arrival flight/ferry: {flight}\n' +
    'Party: {adults} adult(s), {children} child(ren)\n' +
    'Please confirm the FIXED price and hold a driver for us.',

  genericMsg: "Karibu! I'm planning my Zanzibar trip. Can you share fixed prices for an airport transfer and your top tours?",
};

/* wa.me deep link — the entire funnel's single entry point. */
function waLink(msg) {
  return 'https://wa.me/' + SITE.whatsappNumber + '?text=' + encodeURIComponent(msg || SITE.genericMsg);
}

/* Fill {placeholder}s in a template from a form/object. */
function fill(template, vals) {
  return template.replace(/\{(\w+)\}/g, (_, k) => (vals[k] !== undefined && vals[k] !== '' ? vals[k] : '?'));
}

/* Expose helpers + data for booking and price rendering. */
window.EASYTRIP = { SITE, waLink, fill };