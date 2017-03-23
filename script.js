function logEvent(event){
  let parentElement = event.target.parentElement;
  let menuClassName = parentElement.parentElement.lastElementChild.className;
  let menuValue = parentElement.parentElement.lastElementChild.textContent;
  let submenuValue = event.target.textContent;
  let color = event.target.classList[2];
  if (menuClassName == "shirtSize"){
    parentElement.parentElement.lastElementChild.closest(".shirtSize").textContent = submenuValue;
    let style = event.target.parentElement.parentElement.parentElement.parentElement.lastElementChild.childNodes[1].textContent;
    let color = event.target.parentElement.parentElement.parentElement.childNodes[7].childNodes[0].classList[2];
    checkStock(style, event.target.textContent, color, event.target.parentElement.parentElement.parentElement.parentElement);

  }
  if (color == "blue" || color == "pink" || color == "yellow" || color == "green"){
    event.target.parentElement.parentElement.parentElement.firstElementChild.closest("i").className = "fa fa-stop "+color;
    event.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.closest(".display").lastElementChild.closest(".shirt").firstElementChild.closest("img").src = "assets/"+color+"-front.png";
    event.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.closest(".display").lastElementChild.closest(".shirt").lastElementChild.closest("img").src = "assets/"+color+"-back.png";
    let style = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.lastElementChild.childNodes[1].textContent;
    let size = event.target.parentElement.parentElement.parentElement.parentElement.childNodes[5].lastElementChild.textContent;
    checkStock(style, size, color, event.target.parentElement.parentElement.parentElement.parentElement.parentElement);
  }
}
let mouseClick = document.querySelector("body");
mouseClick.addEventListener("click", logEvent);
function addToCart(productArray){
  let itemNumber = shoppingCart.length-1;
  shoppingCart[itemNumber] = productArray;
}
function checkStock(style, size, color, eventTarget){
  eventTarget.childNodes[5].childNodes[3].textContent = " ";
  eventTarget.childNodes[3].childNodes[9].classList.remove('cartDisable');
  for (let i=0; i < shoppingCart.length; i++){
    if ((shoppingCart[i][0]===style) && (shoppingCart[i][2]===size) && (shoppingCart[i][3]===color) && (shoppingCart[i][4] >= 8)){
      eventTarget.childNodes[3].childNodes[9].classList.add('cartDisable');
      eventTarget.childNodes[5].childNodes[3].textContent = "SOLD OUT!"
    }
  }
}
function updateCart(){
  let list = document.querySelector("#shoppingCartItems");
  list.innerHTML = "";
  for (let i=0; i < shoppingCart.length; i++){
    let productInfo = `
    <div class="flex space_between">
      <div>`+shoppingCart[i][0]+`</div>
      <div>`+shoppingCart[i][3]+`</div>
      <div>`+shoppingCart[i][2]+`</div>`
      + `<div><span id="shirtQuanity">`+shoppingCart[i][4]+`x</span> $`+shoppingCart[i][1]+`</div>
    </div>`;
    list.innerHTML = list.innerHTML + productInfo;
  }
}
/*Initialize Shopping Cart values, Product Holders with default values and assign buttons*/
let productHolder = [];
let shoppingCart = [];
let shoppingCartSubtotal = 0;
let shoppingCartTotal = 0;
let shoppingCartDiscountTotal = 0;
let shirtTotal = 0;
let sameShirtCounter = 1;
let storeItems = document.querySelectorAll(".store_item");
let cartButtons = document.querySelectorAll(".shoppingCartButton");
let shirtSizes = document.querySelectorAll(".shirtSize");
let shirtTitles = document.querySelectorAll(".title");
let shirtPrices = document.querySelectorAll(".price");
let shirtColors = document.querySelectorAll(".colorSelected");
for (let i = 0; i < storeItems.length; i++) {
  let cartButton = cartButtons[i];
  let shirtSize = shirtSizes[i].textContent;
  let shirtTitle = shirtTitles[i].textContent;
  let shirtPrice = parseInt(shirtPrices[i].textContent);
  let shirtColor = shirtColors[i].classList[2];
  productHolder[i] = [shirtTitle,shirtPrice,shirtSize,shirtColor,sameShirtCounter];
  cartButton.addEventListener("click", function () {
    productHolder[i][2] = shirtSizes[i].textContent;
    productHolder[i][3] = shirtColors[i].classList[2];
    let currentConfiguration = [shirtTitle,shirtPrice,shirtSizes[i].textContent,shirtColors[i].classList[2],sameShirtCounter];
    let foundMatch = false;
    for (let j=0; j<shoppingCart.length; j++){
      if ((shoppingCart[j][0]===currentConfiguration[0]) && (shoppingCart[j][1]===currentConfiguration[1]) && (shoppingCart[j][2]===currentConfiguration[2]) && (shoppingCart[j][3]===currentConfiguration[3])){
        shoppingCart[j][4]++;
        shirtTotal++;
        foundMatch = true;
        if (shoppingCart[j][4] >= 8){
          event.target.parentElement.parentElement.parentElement.childNodes[3].childNodes[9].classList.add('cartDisable');
          event.target.parentElement.parentElement.parentElement.childNodes[5].childNodes[3].textContent = "SOLD OUT!"
        }
      }
    }
    if (foundMatch === false) {
      shoppingCart[shoppingCart.length] = currentConfiguration;
      shirtTotal++;
    }
    shoppingCartSubtotal = shoppingCartSubtotal + productHolder[i][1];
    let cartSubtotal = document.querySelector("#shoppingCartSubtotal");
    cartSubtotal.textContent = shoppingCartSubtotal;
    let discountLimit = document.querySelector("#discountLimit");
    let discountLimitText = document.querySelector("#discountLimitText");
    if (shirtTotal < 5){
      discountLimit.textContent = 5 - shirtTotal;
    }
    if (shirtTotal >= 5){
      discountLimitText.textContent = "YOU DID IT!"
      shoppingCartDiscountTotal = (shoppingCartSubtotal*.05).toFixed(2);
    }
    let shoppingCartDiscount = document.querySelector("#shoppingCartDiscount");
    shoppingCartDiscount.textContent = shoppingCartDiscountTotal;
    shoppingCartTotal = shoppingCartSubtotal - shoppingCartDiscountTotal;
    let shoppingCartTotalSpace = document.querySelector("#shoppingCartTotal");
    shoppingCartTotalSpace.textContent = shoppingCartTotal.toFixed(2);
    updateCart();
  });
}
