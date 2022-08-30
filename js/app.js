// fetch api
const loadPhonesData = async (search, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
  const res = await fetch(url);
  const data = await res.json();
  displayAllPhones(data.data, dataLimit);
};

// footer style toggle

const footerToggle = (status) => {
  const footer = document.getElementById("footer");
  if (status) {
    footer.classList.add("fixed-bottom");
  } else {
    footer.classList.remove("fixed-bottom");
  }
};

// display all data as cards
const displayAllPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerHTML = "";

  // slice phone to 10 max
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    showAll.classList.remove("d-none");
    phones = phones.slice(0, 10);
  } else {
    showAll.classList.add("d-none");
  }

  // show no found message
  const noFound = document.getElementById("no-found-message");
  if (phones.length === 0) {
    noFound.classList.remove("d-none");
    footerToggle(true);
    // stop loader
    toggleSpinner(false);
  } else {
    noFound.classList.add("d-none");
    footerToggle(false);
  }

  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");

    div.innerHTML = `
        <div class="card py-2">
            <img src="${phone.image}" class="card-img-top mx-auto" alt="..." style="width: 80%"/>
            <div class="card-body mx-auto" style="width: 90%">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                    ${phone.slug}
                </p>
                <button onclick="showDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show details</button>
            </div>
        </div>
      `;

    phonesContainer.appendChild(div);
  });

  // stop loader
  toggleSpinner(false);
};

// search process function
const searchProcess = (dataLimit) => {
  const searchInput = document.getElementById("search-input");
  const searchInputValue = searchInput.value;

  // start loader
  toggleSpinner(true);
  // pass data to fetch
  loadPhonesData(searchInputValue, dataLimit);
};

// search button
document.getElementById("search-btn").addEventListener("click", function () {
  searchProcess(10);
});

// spinner function
const toggleSpinner = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};

// show details button function
const showDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;

  const res = await fetch(url);
  const data = await res.json();
  console.log(data.data);

  const phoneName = document.getElementById("modalTitle");
  const releaseDate = document.getElementById("phone-date");
  const phoneMemory = document.getElementById("phone-memory");
  const phoneStorage = document.getElementById("phone-storage");

  releaseDate.innerText = data.data.releaseDate
    ? data.data.releaseDate
    : "release data not found";
  phoneName.innerText = data.data.name;
  phoneMemory.innerText = data.data.mainFeatures.memory
    ? data.data.mainFeatures.memory
    : "no memory";
  phoneStorage.innerText = data.data.mainFeatures.storage
    ? data.data.mainFeatures.storage
    : "no storage";
};

// show all button
document.getElementById("show-all-btn").addEventListener("click", function () {
  searchProcess();
});

// clear input field on focus
document
  .getElementById("search-input")
  .addEventListener("focus", function (event) {
    event.target.value = "";
  });

// search on pressing enter key
document
  .getElementById("search-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      searchProcess(10);
    }
  });
