const endpoint =
  "./pk.json";

const cities = [];
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

function findMatches(wordMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordMatch, "gi");
    return place.city.match(regex) || place.admin.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatch() {
  const matchArray = findMatches(this.value, cities);
  const html = matchArray
    .map(place => {
      const regex = new RegExp(this.value , 'gi');
      const cityName = place.city.replace(regex , `<span class="hl">${this.value}</span>`)
      const stateName = place.admin.replace(regex , `<span class="hl">${this.value}</span>`)
      return `
<li>
<span class="name"> ${cityName} , ${stateName}</span>
<span class="population"> ${numberWithCommas(place.population)}</span>
</li>
`;
    })
    .join("");
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

searchInput.addEventListener("change", displayMatch);
searchInput.addEventListener("keyup", displayMatch);
