const APIURL =
"https://api.edamam.com/api/food-database/v2/parser?app_id=93f8d377&app_key=f7f9cf1182ddaaf968c0093f2d45aa0b&nutrition-type=cooking";

const FoodItem = document.querySelector("#container");
const getFood = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.hints);
  showFood(data.hints);
};
getFood(APIURL);

const showFood = (data) => {
  FoodItem.innerHTML = "";

  data.map((elem) => {
    let box = document.createElement("div");
    box.setAttribute("class", "Food");
    let image = document.createElement("img");
    image.setAttribute("src", elem.food.image);

    let title = document.createElement("h2");
    title.innerText = elem.food.label;
    let category = document.createElement("h3");
    category.innerText = elem.food.category;

    box.append(image, title, category);
    FoodItem.appendChild(box);
  });
};

document.querySelector("#search").addEventListener("keyup", function (event) {
  const query = event.target.value;
  if (query) {
    const searchUrl = `${APIURL}&ingr=${query}`;
    getFood(searchUrl);
  } else {
    FoodItem.innerHTML = "";
  }
});
