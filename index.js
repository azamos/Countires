const URL = "https://restcountries.com/v3.1/all";
const limit = 10;

/*
          <a id = "template" href="#" class="country scale-effect" data-country-name="Afghanistan">
            <div class="country-flag">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Flag_of_the_Taliban.svg"
                alt="Afghanistan FLag"
              />
            </div>
            <div class="country-info">
              <h2 class="country-title">Afghanistan</h2>
              <ul class="country-brief">
                <li><strong>population: </strong>40218234</li>
                <li><strong>Region: </strong>Asia</li>
                <li><strong>capital: </strong>Kabul</li>
              </ul>
            </div>
          </a>
 */


const addInfoLi = (infoType, infoValue) => {
    const li = document.createElement('li');
    const strong = document.createElement('strong');
    strong.innerText = `${infoType}: `;
    li.appendChild(strong);
    const p = document.createElement('p');
    p.innerText = infoValue.toString();
    li.appendChild(p);
    console.log(li);
    return li;

}

const addCountryHTML = countryData => {
    const {  flags,capital, name , population, region } = countryData;
    const commonName = name.common;
    const mainCapital = capital[0];
    const {svg,png} = flags;
    console.log({mainCapital,commonName,population,region,png,svg});

    const newHTML = document.createElement('a');
    newHTML.href="#";
    newHTML.className = "country scale-effect";
    newHTML.setAttribute("data-country-name",commonName);

    const imageDiv = document.createElement('div');
    imageDiv.className = "country-flag";
    const flagImage = document.createElement('img');
    flagImage.src = svg;
    imageDiv.appendChild(flagImage);
    newHTML.appendChild(imageDiv);

    const countryInfoDiv = document.createElement('div');
    countryInfoDiv.className = "country-info";
    const h2 = document.createElement('h2');
    h2.className = "country-title";
    h2.innerHTML = commonName;
    countryInfoDiv.appendChild(h2);

    const ul = document.createElement('ul');
    ul.className = "country-brief";
    const population_li = addInfoLi("population",population);
    const region_li = addInfoLi("region",region);
    const capital_li = addInfoLi("capital",capital); 
    ul.appendChild(population_li);
    ul.appendChild(region_li);
    ul.appendChild(capital_li);
    countryInfoDiv.appendChild(ul);

    newHTML.appendChild(countryInfoDiv);

    document.getElementById("countries-container").appendChild(newHTML);
}

const intialise = async () => {
    console.log("Body Loaded");
    try{
        const result_array = await fetch(URL).then(_=>_.json());
        let limited = result_array.slice(0,limit);
        limited.forEach(country => addCountryHTML(country));
    }
    catch(err){
        console.log(err);
    }
}