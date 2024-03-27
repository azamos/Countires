const limit = 10;

const freeChildren = (
  container = document.getElementById("countries-container")
) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

const addInfoLi = (infoType, infoValue) => {
  const li = document.createElement("li");
  const strong = document.createElement("strong");
  strong.innerText = `${infoType}: `;
  li.appendChild(strong);
  const p = document.createElement("p");
  if(!infoValue){
    infoValue = "N/A";
  }
  p.innerText = infoValue.toString();
  li.appendChild(p);
  return li;
};

const addFlagDiv = (src) => {
  const imageDiv = document.createElement("div");
  imageDiv.className = "country-flag";
  const flagImage = document.createElement("img");
  flagImage.src = src;
  imageDiv.appendChild(flagImage);
  return imageDiv;
};

const addCountryInfo = (commonName, population, region, capital) => {
  const countryInfoDiv = document.createElement("div");
  countryInfoDiv.className = "country-info";
  const h2 = document.createElement("h2");
  h2.className = "country-title";
  h2.innerHTML = commonName;
  countryInfoDiv.appendChild(h2);

  const ul = document.createElement("ul");
  ul.className = "country-brief";
  const population_li = addInfoLi("population", population);
  const region_li = addInfoLi("region", region);
  const capital_li = addInfoLi("capital", capital);
  ul.appendChild(population_li);
  ul.appendChild(region_li);
  ul.appendChild(capital_li);
  countryInfoDiv.appendChild(ul);
  return countryInfoDiv;
};

const addCountryHTML = (countryData) => {
  const { flags, capital, name, population, region } = countryData;
  const commonName = name.common;
  const { svg } = flags;

  const newHTML = document.createElement("a");
  newHTML.href = "#";
  newHTML.className = "country scale-effect";
  newHTML.setAttribute("data-country-name", commonName);

  newHTML.appendChild(addFlagDiv(svg));
  newHTML.appendChild(addCountryInfo(commonName, population, region, capital));

  document.getElementById("countries-container").appendChild(newHTML);
};

const relevantDataURL =
  "https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region";
const COUNTRIES_KEY = "Countries";

const intialise = async () => {
  freeChildren();
  const fromLs = localStorage.getItem(COUNTRIES_KEY);
  let countriesArr;
  if (!fromLs) {
    countriesArr = await fetch(relevantDataURL).then((_) => _.json());
    countriesArr = countriesArr.splice(0, limit);
    let stringed = JSON.stringify(countriesArr);
    localStorage.setItem(COUNTRIES_KEY, stringed);
  } else {
    countriesArr = JSON.parse(fromLs);
  }
  countriesArr.forEach((countryInfo) => addCountryHTML(countryInfo));
};

const regionURL = "https://restcountries.com/v3.1/region";
const searchByRegion = async (region) => {
  const thisRegionURL = `${regionURL}/${region}`;
  freeChildren();
  regionCountires = await fetch(thisRegionURL)
    .then((_) => _.json())
    .catch((e) => console.log(e));
  regionCountires.forEach((cInReg) => addCountryHTML(cInReg));
};

const nameURL = "https://restcountries.com/v3.1/name";

const fetchAutoComSuggestions = async partialMatch => {
  const thisNameURL = `${nameURL}/${partialMatch.trim()}`;
  try {
    let matches = await fetch(thisNameURL).then(_=>_.json());
    if (matches.length) {
      freeChildren();
      matches.forEach((p) => addCountryHTML(p));
    }
  } catch (err) {
    console.error(err);
  }
};

const searchDelay = 300;
let autoCompleteTimer = null;

const searchInputChanged = async (e) => {
  if (autoCompleteTimer) {
    clearTimeout(autoCompleteTimer);
  }
  const { value } = e.target;
  if (value.trim()) {
    autoCompleteTimer = setTimeout(
      async () => await fetchAutoComSuggestions(value.trim()),
      searchDelay
    );
  }
  else{
    intialise();
  }
};

const openDropDown = () => {
  const dd = document.getElementById("dropdown-wrapper");
  dd.classList.toggle("open");
};
