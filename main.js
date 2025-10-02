const base_url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json";
const fromCurrency = document.querySelector(".from-dropdown select");
const toCurrency = document.querySelector(".to-dropdown select");
const msg = document.querySelector(".msg");
const dropdowns = document.querySelectorAll(".dropdown select");

for (let select of dropdowns) {
  for (let code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    select.appendChild(newOption);

    // initial from and to countries
    if (select.name === "from" && code === "BDT") {
      newOption.selected = true;
    } else if (select.name === "to" && code === "USD") {
      newOption.selected = true;
    }
  }
  select.addEventListener("change", (element) => {
    updateFlag(element.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

const btn = document.querySelector(".btn");

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amnt = document.querySelector(".value-input");
  let amntValue = amnt.value;

  //   if the input is not valid
  if (amntValue < 1 || amntValue === "") {
    alert("Enter a valid number!");
  }

  //   fetching the data from the API
  else {
    let response = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrency.value.toLowerCase()}.json`
    );
    let data = await response.json();
    let rate =
      data[`${fromCurrency.value.toLowerCase()}`][
        `${toCurrency.value.toLowerCase()}`
      ];
    let finalAmnt = rate * amntValue;
    msg.innerText = `${amntValue} ${fromCurrency.value} = ${finalAmnt} ${toCurrency.value}`;
  }
});
