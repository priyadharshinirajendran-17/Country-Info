const countryInput = document.getElementById("countryInput");
const searchBtn = document.getElementById("searchBtn");
const loadingEl = document.getElementById("loading");
const errorEl = document.getElementById("error");
const resultEl = document.getElementById("result");

const countryNameEl = document.getElementById("countryName");
const capitalEl = document.getElementById("capital");
const populationEl = document.getElementById("population");
const regionEl = document.getElementById("region");
const flagEl = document.getElementById("flag");

searchBtn.addEventListener("click", fetchCountry);

countryInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        fetchCountry();
    }
});


async function fetchCountry() {
    const country = countryInput.value.trim();

    if (country === "") {
        errorEl.textContent = "Please enter a country name";
        return;
    }

    loadingEl.textContent = "Loading...";
    errorEl.textContent = "";
    resultEl.style.display = "none";
    flagEl.style.display = "none";

    try {
        const response = await fetch(
            `https://restcountries.com/v3.1/name/${country}?fullText=true`
        );

        if (!response.ok) {
            throw new Error("Country not found");
        }

        const data = await response.json();
        const countryData = data[0];

        countryNameEl.textContent = countryData.name.common;
        capitalEl.textContent = countryData.capital ? countryData.capital[0] : "N/A";
        populationEl.textContent = countryData.population.toLocaleString();
        regionEl.textContent = countryData.region;

        flagEl.src = countryData.flags.png;
        flagEl.style.display = "block";

        resultEl.style.display = "block";
    } catch (error) {
        errorEl.textContent = "Country not found. Please try again.";
    } finally {
        loadingEl.textContent = "";
    }
}
