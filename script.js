// elements references
const productContainer = document.getElementById("productsContainer");
const cartContainer = document.getElementById("cartContainer");
const feedback = document.getElementById("feedback");
const total = document.getElementById("total");
const clearCart = document.getElementById("clearCart");
const sortBy = document.getElementById("sortBy");
// default products
const products = [
  { id: 1, name: "Wireless Mouse", price: 599 },
  { id: 2, name: "Bluetooth Headphones", price: 1299 },
  { id: 3, name: "Cotton T-Shirt", price: 399 },
  { id: 4, name: "Water Bottle", price: 249 },
  { id: 5, name: "Notebook", price: 99 },
];
// empty cart
const cart = [];
// used to clear the settimeout
let timerId;

//eventlisteners
clearCart.addEventListener("click", function () {
  cart.length = 0;
  renderCartDetails();
  updateUserFeedback("cart is cleared ", "error");
});
sortBy.addEventListener("click", () => {
  cart.sort((a, b) => a.price - b.price);
  renderCartDetails();
  updateUserFeedback(`Sorted the cart`);
});

function renderProductDetails() {
  products.forEach(function (product) {
    //   const productRow = `
    //     <div class="products-row">
    //       <p>${product.name} - Rs. ${product.price}</p>
    //       <button>Add to cart</button>
    //     </div>
    //   `;
    //    productContainer.insertAdjacentHTML("beforeend", productRow);
    const { id, name, price } = product;
    const productDiv = document.createElement("div");
    productDiv.className = "products-row";
    productDiv.innerHTML = `
          <p>${name} - Rs. ${price}</p>
          <button onclick="addToCart(${id})">Add to cart</button>
        `;
    productContainer.appendChild(productDiv);
  });
}

//render cart details
function renderCartDetails() {
  cartContainer.innerHTML = "";
  cart.forEach(function (product) {
    const { id, name, price } = product;
    const cartItemRow = `  <div class="products-row">
              <p>${name} - Rs.${price}</p>
              <button onclick="removeFromCart (${id})">Remove</button>
            </div> `;

    cartContainer.insertAdjacentHTML("beforeend", cartItemRow);
  });

  // let totalPrice =0;
  // for(let i =0; i<cart.length;i++){
  //   totalPrice +=cart[i].price
  // }

  // total.textContent=` Rs.${totalPrice}`

  const totalPrice = cart.reduce(function (acc, prod) {
    return acc + prod.price;
  }, 0);
  total.textContent = ` Rs.${totalPrice}`;
}
//add to cart
function addToCart(id) {
  // console.log("add to cart",id);
  // check if the product is already available in the cart.
  const isProductAvailable = cart.some((product) => product.id === id);
  if (isProductAvailable) {
    //const productsToAdd = products.find( (products)=> products.id === id);
    // feedback.textContent= ` item already added to cart `
    updateUserFeedback(` item already added to cart `, "error");
    return;
  }

  const productsToAdd = products.find((products) => products.id === id);
  cart.push(productsToAdd);
  console.log(cart);

  renderCartDetails();

  updateUserFeedback(` ${productsToAdd. name} is added to the cart `, "succes");
  // feedback.textContent= ` ${name} is added to the cart `
}
// reomve item from cart function
function removeFromCart(id) {
  const product = cart.find((product) => product.id === id);
  const productIndex = cart.findIndex((product) => product.id === id);
  // const updatedCart= cart.filter(function(product){
  //   return product.id !==id;
  // });
  const updatedCart = cart.splice(productIndex, 1);
  console.log(updatedCart);
  updateUserFeedback(`${product.name} is removed`, "error");
  renderCartDetails();
}


function updateUserFeedback(msg, type) {
  clearTimeout(timerId);
  feedback.style.display = "block";
  // type succes(green) error (red)
  if (type === "succes") {
    feedback.style.backgroundColor = "green";
  }
  if (type === "error") {
    feedback.style.backgroundColor = "red";
  }
  feedback.textContent = msg;

  timerId = setTimeout(function () {
    feedback.style.display = "none";
  }, 3000);
}
renderProductDetails();
