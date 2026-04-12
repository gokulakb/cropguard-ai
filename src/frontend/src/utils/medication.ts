/**
 * Returns a Google search URL for a given medication/treatment name.
 * No prices, ratings or company promotions — external search only.
 */
export function getMedicationSearchUrl(medicationName: string): string {
  const query = encodeURIComponent(
    `${medicationName} agricultural fungicide crop treatment`,
  );
  return `https://www.google.com/search?q=${query}`;
}

/**
 * Returns a Google search URL to find local agricultural suppliers.
 */
export function getSupplierSearchUrl(location?: string): string {
  const query = encodeURIComponent(
    location
      ? `agricultural supplies crop disease treatment near ${location}`
      : "agricultural supplies crop disease treatment",
  );
  return `https://www.google.com/search?q=${query}`;
}

/**
 * Returns a Google search URL for agricultural officer contacts in a region.
 */
export function getAgriculturalOfficerUrl(location?: string): string {
  const query = encodeURIComponent(
    location
      ? `agricultural extension officer ${location} contact`
      : "agricultural extension officer contact",
  );
  return `https://www.google.com/search?q=${query}`;
}
