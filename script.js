// URL of data of 1000 cities and states
const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const cities = [];

// fetching data
fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

// console.log(cities);

// finding matches function
function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    // searching word in each place item
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}

// adding commas to number
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
  // console.log(this.value); 
//   this.value = typed value by user
  const matchArray = findMatches(this.value, cities);
  // console.log(matchArray);

  const itemDisplayed = matchArray
                                .map((place) => {
                                const regex = new RegExp(this.value, "gi");
                                //   this.value = typed value by user
                                // cityNmme and StateName are used to highlight the typed value
                                const cityName = place.city.replace(
                                    regex,
                                    `<span class="hl">${this.value}</span>`
                                );


                                const stateName = place.state.replace(
                                    regex,
                                    `<span class="hl">${this.value}</span>`
                                );

                                return `
                                    <li>
                                    <span class="name">${cityName}, ${stateName}</span>
                                    <span class="population">${numberWithCommas(place.population)}</span>
                                    </li>`;
                                })
                                .join("");

  suggestions.innerHTML = itemDisplayed;
}

const searchInput = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

// event listeners
searchInput.addEventListener("change", displayMatches);
searchInput.addEventListener("keyup", displayMatches);
