function logEvent(){
  let parentElement = event.target.parentElement;
  let menuClassName = parentElement.parentElement.lastElementChild.className;
  let menuValue = parentElement.parentElement.lastElementChild.textContent;
  let submenuValue = event.target.textContent;
  let color = event.target.classList[2];
  if (menuClassName == 'shirtSize'){
    parentElement.parentElement.lastElementChild.closest(".shirtSize").textContent = submenuValue;
  }
  if (color == 'blue' || color == 'pink' || color == 'yellow' || color == 'green'){
    event.target.parentElement.parentElement.parentElement.firstElementChild.closest("i").className = "fa fa-stop "+color;
    event.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.closest(".display").lastElementChild.closest(".shirt").firstElementChild.closest("img").src = "assets/"+color+"-front.png";
    event.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.closest(".display").lastElementChild.closest(".shirt").lastElementChild.closest("img").src = "assets/"+color+"-back.png";
  }
}
let mouseClick = document.querySelector('body');
mouseClick.addEventListener('click', logEvent);
function addToCart(productArray){
  let itemNumber = shoppingCart.length-1;
  console.log(numberOfItems);
  shoppingCart[itemNumber] = productArray;
  console.log(shoppingCart);
}

function updateCart(){
  let list = document.querySelector('#shoppingCartItems');
  list.innerHTML = "";
  for (let i=0; i < shoppingCart.length; i++){
    list.innerHTML = list.innerHTML + "item "+ i +" added <br>";
  }
}
/*Initialize Product Holders with default values and assign buttons*/
let productHolder = [];
let shoppingCart = [];
let shoppingCartTotal = 0;
let storeItems = document.querySelectorAll('.store_item');
let cartButtons = document.querySelectorAll('.fa-shopping-cart');
let shirtSizes = document.querySelectorAll('.shirtSize');
let shirtTitles = document.querySelectorAll('.title');
let shirtPrices = document.querySelectorAll('.price');
let shirtColors = document.querySelectorAll('.colorSelected');
console.log(storeItems);
for (let i = 0; i < storeItems.length; i++) {
  let cartButton = cartButtons[i];
  let shirtSize = shirtSizes[i].textContent;
  let shirtTitle = shirtTitles[i].textContent;
  let shirtPrice = parseInt(shirtPrices[i].textContent);
  let shirtColor = shirtColors[i].classList[2];
  console.log(shirtColor);
  productHolder[i] = [shirtTitle,shirtPrice,shirtSize,shirtColor];
  cartButton.addEventListener('click', function () {
    productHolder[i][2] = shirtSizes[i].textContent;
    productHolder[i][3] = shirtColors[i].classList[2];
    console.log("shopping cart clicked! store item: "+ i)
    console.log(productHolder[i]);
    shoppingCart[shoppingCart.length] = productHolder[i];
    console.log(shoppingCart);

    shoppingCartTotal = shoppingCartTotal + productHolder[i][1];
    let element = document.querySelector("#shoppingCartTotal");
    element.textContent = shoppingCartTotal;
    console.log(shoppingCartTotal);
    updateCart();
  });
}

console.log(productHolder);
