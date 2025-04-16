// lib/vinmonopoletAPI.js

const API_ENDPOINT = "https://apis.vinmonopolet.no/products/v0/details-normal";

// Use a private environment variable for your key.
const SUBSCRIPTION_KEY = process.env.VINMONOPOLET_PRIMARY_KEY;

/**
 * Fetches Bordeaux red wines available at Vinderen store.
 * 
 * @returns {Promise<Object>} API response data.
 */
export async function getVinderenBordeauxRedWines() {
  const params = new URLSearchParams();
  // Filter to match products with "Bordeaux" in the short name
  params.append("productShortNameContains", "Bordeaux");
  // Use the store's vendorId based on the Vinderen details (here "454")
  params.append("vendorId", "454");

  const url = `${API_ENDPOINT}?${params.toString()}`;

  try {
    const res = await fetch(url, {
      headers: {
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": SUBSCRIPTION_KEY,
      },
    });

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = await res.json();
    console.log("API response:", data);
    return data;
  } catch (error) {
    console.error("Error fetching Bordeaux red wines:", error);
    throw error;
  }
}
