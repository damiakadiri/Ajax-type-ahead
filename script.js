const endpoint = "https://restcountries.com/v3.1/all";

const countries = [];

const prom = fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => countries.push(...data));

function findMatches(wordToMatch, countries) {
  return countries.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.name.common.match(regex);
  });
}

function displayMatches() {
  const matchArray = findMatches(this.value, countries);
  const html = matchArray
    .map((place) => {
      return `
      <li>
         <span class="name">${place.name.common}</span>
         <span class="population">${place.population}</span>

      </li>
    `;
    })
    .join("");
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
