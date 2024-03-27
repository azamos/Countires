
const genAndAttachSpan = (anchor,statKey,statVal) => {
  const statSpan = document.createElement('span');
  statSpan.innerText = `${statKey}:${statVal}`;
  anchor.appendChild(statSpan);
}

const genAndAttachImg = (anchor,imageURL) => {
  const flagImage = document.createElement('img');
  flagImage.src = imageURL;
  flagImage.setAttribute("width","100%");
  anchor.appendChild(flagImage);
}

const populateLeftCol = (leftCol,name,population,region,subregion,capital) => {
  genAndAttachSpan(leftCol,'Native name',name);
  genAndAttachSpan(leftCol,'Population',population);
  genAndAttachSpan(leftCol,'Region',region);
  genAndAttachSpan(leftCol,'Subregion',subregion);
  genAndAttachSpan(leftCol,'Capital',capital);
}

const populateRightCol = (rightCol,TLD,Currencies,Languages) => {
  genAndAttachSpan(rightCol,'Top Level Domain',TLD);
  genAndAttachSpan(rightCol,'Currencies',Currencies);
  genAndAttachSpan(rightCol,'Languages',Languages);
}

const populateFields = () => {
  document.body.removeChild(document.getElementsByClassName("loader")[0]);

  const name = getParameterByName("name");
  const population = getParameterByName("population");
  const region = getParameterByName("region");
  const capital = getParameterByName("capital");
  const imageURL = getParameterByName("flag");
  const nativeName = getParameterByName("nativeName");
  const subregion = getParameterByName("subregion");
  const TLD = getParameterByName("TLD");
  const borders = getParameterByName("borders").split(',');
  const currencies = getParameterByName("currencies");
  const languages = getParameterByName("languages");

  // console.log({nativeName,subregion,TLD,borders,currencies,languages});

  const countryDetailsContainer =
    document.getElementsByClassName("country-details")[0];

  const countryDiv = document.createElement('div');
  countryDiv.className = "display-flex flex-row";

  const flagDiv = document.createElement('div');
  genAndAttachImg(flagDiv,imageURL);
  countryDiv.appendChild(flagDiv);

  const detailsDiv = document.createElement('div');
  detailsDiv.className = "country-info display-flex flex-col";
  const header = document.createElement('header');
  const h1 = document.createElement('h1');
  h1.innerText = name;
  header.appendChild(h1);
  detailsDiv.appendChild(header);

  const leftCol = document.createElement('div');
  leftCol.className = "display-flex flex-col";
  populateLeftCol(leftCol,name,population,region,subregion,capital);

  const rightCol = document.createElement('div');
  rightCol.className = "display-flex flex-col";
  populateRightCol(rightCol,TLD,currencies,languages);

  const subDiv = document.createElement('div');
  subDiv.className = "display-flex";
  subDiv.appendChild(leftCol);
  subDiv.appendChild(rightCol);

  detailsDiv.appendChild(subDiv);

  const borderDiv = document.createElement('div');
  borderDiv.className = "display-flex";

  const strongBorder = document.createElement('strong');
  strongBorder.innerText = "Border Countries:";
  const bordering = document.createElement('div');
  bordering.className="display-flex";

  borders.forEach(border=>{
    let p = document.createElement('p');
    p.innerText = border;
    bordering.appendChild(p);
  })

  borderDiv.appendChild(strongBorder);
  borderDiv.appendChild(bordering);
  detailsDiv.appendChild(borderDiv);

  countryDiv.appendChild(detailsDiv);

  countryDetailsContainer.appendChild(countryDiv);
};

const getParameterByName = (name, url) => {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};
