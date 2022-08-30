const loadPhonesData = async () => {
  const url = `https://openapi.programming-hero.com/api/phones?search=iphone`;
  const res = await fetch(url);
  const data = await res.json();
  displayAllPhones(data);
};

loadPhonesData();

const displayAllPhones = (phones) => {
  console.log(phones);
};
