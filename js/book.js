/* Zanzibar AI Concierge — booking funnel behaviour.
   Wire all CTAs to the WhatsApp deep-link, render dynamic prices,
   and compose the transfer inquiry from the form on each page. */

(function () {
  'use strict';
  var ET = window.EASYTRIP;
  if (!ET) return;

  function $(s, root) { return (root || document).querySelector(s); }
  function $all(s, root) { return Array.prototype.slice.call((root || document).querySelectorAll(s)); }

  /* 1) Every anchor with class "wa-cta" becomes a live WhatsApp link. */
  $all('.wa-cta').forEach(function (a) {
    var msg = a.getAttribute('data-msg') || ET.SITE.genericMsg;
    a.setAttribute('href', ET.waLink(msg));
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
  });

  /* 2) Dynamic price fill: [data-price-key] → renders the fixed price. */
  $all('[data-price-key]').forEach(function (el) {
    var k = el.getAttribute('data-price-key');
    var p = ET.SITE.prices[k];
    if (p) el.textContent = '$' + p.price;
  });
  $all('[data-price-note]').forEach(function (el) {
    var k = el.getAttribute('data-price-note');
    var p = ET.SITE.prices[k];
    if (p) el.textContent = p.note;
  });

  /* 3) The booking form (page has its own form with data-route). */
  $all('form[data-route]').forEach(function (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var key = form.getAttribute('data-route');
      var hotel = $('#b_hotel', form) ? $('#b_hotel', form).value.trim() : '';
      var date = $('#b_date', form) ? $('#b_date', form).value.trim() : '';
      var flight = $('#b_flight', form) ? $('#b_flight', form).value.trim() : '';
      var adults = $('#b_adults', form) ? $('#b_adults', form).value : '2';
      var children = $('#b_children', form) ? $('#b_children', form).value : '0';
      var msg = ET.fill(ET.SITE.transferMsg, { hotel: hotel, date: date, flight: flight, adults: adults, children: children });
      window.open(ET.waLink(msg), '_blank');
    });
  });

  /* 4) Deposit button — real payment link once wired; else falls back to WhatsApp. */
  $all('.deposit-link').forEach(function (a) {
    var pay = ET.SITE.paymentDepositLink || '';
    if (pay && pay.indexOf('pay.example.com') === -1) {
      a.setAttribute('href', pay);
      a.setAttribute('target', '_blank');
    } else {
      a.setAttribute('href', ET.waLink("Karibu! I'd like to confirm my booking with a deposit. Please send the secure payment link."));
    }
  });
})();