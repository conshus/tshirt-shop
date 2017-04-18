//function logEvent(event){
  //let parentElement = event.target.parentElement;
  //let menuClassName = parentElement.parentElement.lastElementChild.className;
  //let menuValue = parentElement.parentElement.lastElementChild.textContent;
  //let submenuValue = event.target.textContent;
  //let color = event.target.classList[2];
  // if (menuClassName == "shirtSize"){
  //   parentElement.parentElement.lastElementChild.closest(".shirtSize").textContent = submenuValue;
  //   let style = event.target.parentElement.parentElement.parentElement.parentElement.lastElementChild.childNodes[1].textContent;
  //   let color = event.target.parentElement.parentElement.parentElement.childNodes[7].childNodes[0].classList[2];
  //   console.log(event.target.parentElement.parentElement.parentElement.parentElement);
  //   checkStock(style, event.target.textContent, color, event.target.parentElement.parentElement.parentElement.parentElement);
  //
  // }
  // if (color == "blue" || color == "pink" || color == "yellow" || color == "green"){
  //   event.target.parentElement.parentElement.parentElement.firstElementChild.closest("i").className = "fa fa-stop "+color;
  //   event.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.closest(".display").lastElementChild.closest(".shirt").firstElementChild.closest("img").src = "assets/"+color+"-front.png";
  //   event.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.closest(".display").lastElementChild.closest(".shirt").lastElementChild.closest("img").src = "assets/"+color+"-back.png";
  //   let style = event.target.parentElement.parentElement.parentElement.parentElement.parentElement.lastElementChild.childNodes[1].textContent;
  //   let size = event.target.parentElement.parentElement.parentElement.parentElement.childNodes[5].lastElementChild.textContent;
  //   checkStock(style, size, color, event.target.parentElement.parentElement.parentElement.parentElement.parentElement);
  // }
//}
//let mouseClick = document.querySelector("body");
//mouseClick.addEventListener("click", logEvent);
function addToCart(productArray){
  let itemNumber = shoppingCart.length-1;
  shoppingCart[itemNumber] = productArray;
}
function checkStock(style, size, color, $eventTarget){
  //sold out div
  //console.log(style, size, color, $eventTarget);
  //console.log($eventTarget.find('.shoppingCartButton').removeClass('cartDisable'));
  $eventTarget.find('.shoppingCartButton').removeClass('cartDisable');
  let $soldOut = $eventTarget.find('.soldOut');
  $soldOut.text('');
  for (let i=0; i < shoppingCart.length; i++){
    if ((shoppingCart[i][0]===style) && (shoppingCart[i][2]===size) && (shoppingCart[i][3]===color) && (shoppingCart[i][4] >= 8)){
      $eventTarget.find('.shoppingCartButton').addClass('cartDisable');
      $soldOut.text('SOLD OUT!');
    }
  }

  //console.log($soldOut);
  // console.log(eventTarget.childNodes[5].childNodes[3]);
  // eventTarget.childNodes[5].childNodes[3].textContent = " ";
  // eventTarget.childNodes[3].childNodes[9].classList.remove('cartDisable');
  // for (let i=0; i < shoppingCart.length; i++){
  //   if ((shoppingCart[i][0]===style) && (shoppingCart[i][2]===size) && (shoppingCart[i][3]===color) && (shoppingCart[i][4] >= 8)){
  //     eventTarget.childNodes[3].childNodes[9].classList.add('cartDisable');
  //     eventTarget.childNodes[5].childNodes[3].textContent = "SOLD OUT!"
  //   }
  // }
}
function updateCart(){
  let $list = $("#shoppingCartItems").html('');
  //let list = document.querySelector("#shoppingCartItems");
  ///list.innerHTML = "";
  for (let i=0; i < shoppingCart.length; i++){
    let productInfo = `
    <div class="flex space_between">
      <div>`+shoppingCart[i][0]+`</div>
      <div>`+shoppingCart[i][3]+`</div>
      <div>`+shoppingCart[i][2]+`</div>`
      + `<div><span id="shirtQuanity">`+shoppingCart[i][4]+`x</span> $`+shoppingCart[i][1]+`</div>
    </div>`;
    $list.append(productInfo);
    //list.innerHTML = list.innerHTML + productInfo;
  }
}
/*Initialize Shopping Cart values, Product Holders with default values and assign buttons*/

//jQuery refactoring start....
// Didn't need since already accomplished with CSS
// let $shirtSizes = $('.shirtSize').parent();
// $shirtSizes.hover(
//   function(){
//     $(this).addClass("hover");
//     console.log("hover on");
//   }, function(){
//     $(this).removeClass("hover");
//     console.log("hover off");
//   }
// );
// console.log($shirtSizes);

//let $shirtTitles = $('.title');
//console.log($shirtTitles);

let $shirtSizeSubmenu = $('.mock_shirt');
$shirtSizeSubmenu.on('click',function(e){
  let $shorter = $(this).parent().parent();
  $(this).parent().next().text($(this).text());
  let color = $shorter.next().find('[colorselected]').attr('colorselected');
  let style = $shorter.parent().next().find('.title').text();
  let price = $shorter.parent().next().find('.price').text();
  // let color = $(this).parent().parent().next().find('[colorselected]').attr('colorselected');
  // let style = $(this).parent().parent().parent().next().find('.title').text();
  // let price = $(this).parent().parent().parent().next().find('.price').text();
  let size = $(this).parent().next().text($(this).text()).text();
  //console.log($(this).parent().parent().parent().next().find('.price').text());
  //console.log('jQuery size submenu clicked');
  //console.log($(this).parent().next().text());
  //console.log($(this).text());
  //change size
  //console.log(size);
  let $toTheTop = $(this).parent().parent().parent().parent();
  //console.log($toTheTop);
  checkStock(style, size, color, $toTheTop);
});


let $shirtColorSubmenu = $("[mockcolor]");
//console.log($shirtColorSubmenu);
$shirtColorSubmenu.on('click', function(e){
  let $toTheTop = $(this).parent().parent().parent().parent().parent();
  let $shorter = $(this).parent().parent();
  $shorter.prev().attr('colorselected',$(this).attr('mockcolor'));
  $shorter.parent().find('.fa.fa-stop').eq(0).removeClass().addClass('fa fa-stop '+$(this).attr('mockcolor'));
  //$(this).parent().parent().prev().attr('colorselected',$(this).attr('mockcolor'));
  //$(this).parent().parent().parent().find('.fa.fa-stop').eq(0).removeClass().addClass('fa fa-stop '+$(this).attr('mockcolor'));
  let color = $(this).attr('mockcolor');
  //console.log(color);
  $toTheTop.find('.design').attr('src','assets/'+color+'-front.png');
  $toTheTop.find('.design_back').attr('src','assets/'+color+'-back.png');
  //$(this).parent().parent().parent().parent().parent().find('.design').attr('src','assets/'+color+'-front.png');
  //$(this).parent().parent().parent().parent().parent().find('.design_back').attr('src','assets/'+color+'-back.png');
  let style = $toTheTop.find('.title').text();
  //let style = $(this).parent().parent().parent().parent().parent().find('.title').text();
  //console.log($(this).parent().parent().parent().parent().parent());
  let price = parseInt($toTheTop.find('.price').text());
  //let price = parseInt($(this).parent().parent().parent().parent().parent().find('.price').text());
  let size =$shorter.parent().prev().find('.shirtSize').text();
  //let size =$(this).parent().parent().parent().prev().find('.shirtSize').text();
  //console.log($(this).parent().parent().parent().find('.fa.fa-stop').eq(0));
  //console.log($(this).parent().parent().prev().attr('colorselected'));
  //console.log($(this).attr('mockcolor'));
  //let $toTheTop = $(this).parent().parent().parent().parent().parent();
  //console.log($toTheTop);
  checkStock(style, size, color, $toTheTop);
});




let productHolder = [];
let shoppingCart = [];
let shoppingCartSubtotal = 0;
let shoppingCartTotal = 0;
let shoppingCartDiscountTotal = 0;
let shirtTotal = 0;
let sameShirtCounter = 1;
// let storeItems = document.querySelectorAll(".store_item");
// let cartButtons = document.querySelectorAll(".shoppingCartButton");
// let shirtSizes = document.querySelectorAll(".shirtSize");
// let shirtTitles = document.querySelectorAll(".title");
// let shirtPrices = document.querySelectorAll(".price");
// let shirtColors = document.querySelectorAll(".colorSelected");



let $cartButton = $('.shoppingCartButton');
$cartButton.on('click',function(e){
  //console.log('jQuery cartButton clicked');
  let shirtTitle = $(this).parent().next().find('.title').text();
  //console.log(shirtTitle);
  let shirtPrice = parseInt($(this).parent().next().find('.price').text());
  //console.log(shirtPrice);
  let shirtSize = $(this).parent().find('.shirtSize').text();
  //console.log(shirtSize);
  let shirtColor = $(this).parent().find('[colorselected]').attr('colorselected');
  //console.log(shirtColor);
  //console.log($(this).parent().find('[colorselected]').attr('colorselected'));
  productHolder = [shirtTitle,shirtPrice,shirtSize,shirtColor,sameShirtCounter];
  console.log(shirtTitle,shirtPrice,shirtSize,shirtColor,sameShirtCounter);

  let currentConfiguration = [shirtTitle,shirtPrice,shirtSize,shirtColor,sameShirtCounter];
  console.log($(this).parent().next())

  let foundMatch = false;
  for (let j=0; j<shoppingCart.length; j++){
    if ((shoppingCart[j][0]===currentConfiguration[0]) && (shoppingCart[j][1]===currentConfiguration[1]) && (shoppingCart[j][2]===currentConfiguration[2]) && (shoppingCart[j][3]===currentConfiguration[3])){
      shoppingCart[j][4]++;
      shirtTotal++;
      foundMatch = true;
      if (shoppingCart[j][4] >= 8){
        $(this).addClass('cartDisable');
        $(this).parent().next().find('.soldOut').text('SOLD OUT!')
        //event.target.parentElement.parentElement.parentElement.childNodes[3].childNodes[9].classList.add('cartDisable');
        //event.target.parentElement.parentElement.parentElement.childNodes[5].childNodes[3].textContent = "SOLD OUT!"
      }
    }
  }
  if (foundMatch === false) {
    shoppingCart[shoppingCart.length] = currentConfiguration;
    shirtTotal++;
  }
  console.log(productHolder[1]);
  shoppingCartSubtotal = shoppingCartSubtotal + productHolder[1];
  let $cartSubtotal = $("#shoppingCartSubtotal").text(shoppingCartSubtotal);
  //cartSubtotal.textContent = shoppingCartSubtotal;
  //let cartSubtotal = document.querySelector("#shoppingCartSubtotal");
  //cartSubtotal.textContent = shoppingCartSubtotal;
  let $discountLimit = $("#discountLimit");
  //let discountLimit = document.querySelector("#discountLimit");
  let $discountLimitText = $("#discountLimitText");
  //let discountLimitText = document.querySelector("#discountLimitText");
  if (shirtTotal < 5){
    $discountLimit.text(5 - shirtTotal);
    //discountLimit.textContent = 5 - shirtTotal;
  }
  if (shirtTotal >= 5){
    $discountLimitText.text("YOU DID IT!");
    //discountLimitText.textContent = "YOU DID IT!"
    shoppingCartDiscountTotal = (shoppingCartSubtotal*.05).toFixed(2);
  }
  let $shoppingCartDiscount = $("#shoppingCartDiscount").text(shoppingCartDiscountTotal);
  //let shoppingCartDiscount = document.querySelector("#shoppingCartDiscount");
  //shoppingCartDiscount.textContent = shoppingCartDiscountTotal;
  shoppingCartTotal = shoppingCartSubtotal - shoppingCartDiscountTotal;
  let $shoppingCartTotalSpace = $("#shoppingCartTotal").text(shoppingCartTotal.toFixed(2));
  // let shoppingCartTotalSpace = document.querySelector("#shoppingCartTotal");
  // shoppingCartTotalSpace.textContent = shoppingCartTotal.toFixed(2);
  updateCart();


});





//
// for (let i = 0; i < storeItems.length; i++) {
//   let cartButton = cartButtons[i];
//   let shirtSize = shirtSizes[i].textContent;
//   let shirtTitle = shirtTitles[i].textContent;
//   let shirtPrice = parseInt(shirtPrices[i].textContent);
//   let shirtColor = shirtColors[i].classList[2];
//   productHolder[i] = [shirtTitle,shirtPrice,shirtSize,shirtColor,sameShirtCounter];
//   cartButton.addEventListener("click", function () {
//     productHolder[i][2] = shirtSizes[i].textContent;
//     productHolder[i][3] = shirtColors[i].classList[2];
//     let currentConfiguration = [shirtTitle,shirtPrice,shirtSizes[i].textContent,shirtColors[i].classList[2],sameShirtCounter];
//     let foundMatch = false;
//     for (let j=0; j<shoppingCart.length; j++){
//       if ((shoppingCart[j][0]===currentConfiguration[0]) && (shoppingCart[j][1]===currentConfiguration[1]) && (shoppingCart[j][2]===currentConfiguration[2]) && (shoppingCart[j][3]===currentConfiguration[3])){
//         shoppingCart[j][4]++;
//         shirtTotal++;
//         foundMatch = true;
//         if (shoppingCart[j][4] >= 8){
//           event.target.parentElement.parentElement.parentElement.childNodes[3].childNodes[9].classList.add('cartDisable');
//           event.target.parentElement.parentElement.parentElement.childNodes[5].childNodes[3].textContent = "SOLD OUT!"
//         }
//       }
//     }
//     if (foundMatch === false) {
//       shoppingCart[shoppingCart.length] = currentConfiguration;
//       shirtTotal++;
//     }
//     shoppingCartSubtotal = shoppingCartSubtotal + productHolder[i][1];
//     let cartSubtotal = document.querySelector("#shoppingCartSubtotal");
//     cartSubtotal.textContent = shoppingCartSubtotal;
//     let discountLimit = document.querySelector("#discountLimit");
//     let discountLimitText = document.querySelector("#discountLimitText");
//     if (shirtTotal < 5){
//       discountLimit.textContent = 5 - shirtTotal;
//     }
//     if (shirtTotal >= 5){
//       discountLimitText.textContent = "YOU DID IT!"
//       shoppingCartDiscountTotal = (shoppingCartSubtotal*.05).toFixed(2);
//     }
//     let shoppingCartDiscount = document.querySelector("#shoppingCartDiscount");
//     shoppingCartDiscount.textContent = shoppingCartDiscountTotal;
//     shoppingCartTotal = shoppingCartSubtotal - shoppingCartDiscountTotal;
//     let shoppingCartTotalSpace = document.querySelector("#shoppingCartTotal");
//     shoppingCartTotalSpace.textContent = shoppingCartTotal.toFixed(2);
//     updateCart();
//   });
// }
