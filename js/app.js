const loadPhonesData = async (search) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
  const res = await fetch(url);
  const data = await res.json();
  displayAllPhones(data.data);
};

const displayAllPhones = (phones) => {
  const phonesContainer = document.getElementById("phones-container");
  phonesContainer.innerHTML = "";

  // slice phone to 10 max
  phones = phones.slice(0, 10);

  // show no found message
  const noFound = document.getElementById("no-found-message");
  if (phones.length === 0) {
    noFound.classList.remove("d-none");
    // stop loader
    toggleSpinner(false);
  } else {
    noFound.classList.add("d-none");
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
            </div>
        </div>
      `;

    phonesContainer.appendChild(div);
    // stop loader
    toggleSpinner(false);
  });
};

document.getElementById("search-btn").addEventListener("click", () => {
  const searchInput = document.getElementById("search-input");
  const searchInputValue = searchInput.value;
  searchInput.value = "";

  // start loader
  toggleSpinner(true);
  // pass data to fetch
  loadPhonesData(searchInputValue);
});

const toggleSpinner = (isLoading) => {
  const loader = document.getElementById("loader");
  if (isLoading) {
    loader.classList.remove("d-none");
  } else {
    loader.classList.add("d-none");
  }
};
