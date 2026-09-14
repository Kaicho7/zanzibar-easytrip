exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }
  const data = JSON.parse(event.body);
  // Simple placeholder itinerary generation
  const itinerary = `Itinerary for ${data.hotel} on ${data.date}\n` +
    `Flight: ${data.flight || 'N/A'}\n` +
    `Adults: ${data.adults}, Children: ${data.children}\n` +
    `Suggested activities: Sunset dinner, snorkeling, cultural tour.`;
  return {
    statusCode: 200,
    body: JSON.stringify({ itinerary })
  };
};
