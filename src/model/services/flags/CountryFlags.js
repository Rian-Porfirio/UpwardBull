export async function getFlag(countryName) {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  return data;
}
