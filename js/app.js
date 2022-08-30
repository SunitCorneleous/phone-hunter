const loadPhonesData = async () => {
  const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
  const res = await fetch(url);
  const data = await res.json();
  displayAllPhones(data.data);
};

loadPhonesData();

const displayAllPhones = (phones) => {
  console.log(phones);
  const phonesContainer = document.getElementById("phones-container");

  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");

    div.innerHTML = `
        <div class="card py-2" >
            <img src="${phone.image}" class="card-img-top mx-auto" alt="..." style="width: 80%"/>
            <div class="card-body mx-auto" style="width: 90%">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">
                    This is a longer card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                </p>
            </div>
        </div>
      `;

    phonesContainer.appendChild(div);
  });
};
