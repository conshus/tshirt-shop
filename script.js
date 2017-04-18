let productHolder = [];
let shoppingCart = [];
let shoppingCartSubtotal = 0;
let shoppingCartTotal = 0;
let shoppingCartDiscountTotal = 0;
let shirtTotal = 0;
let sameShirtCounter = 1;

function addToCart(productArray){
  let itemNumber = shoppingCart.length-1;
  shoppingCart[itemNumber] = productArray;
}

function checkStock(style, size, color, $eventTarget){
  $eventTarget.find('.shoppingCartButton').removeClass('cartDisable');
  let $soldOut = $eventTarget.find('.soldOut');
  $soldOut.text('');
  for (let i=0; i < shoppingCart.length; i++){
    if ((shoppingCart[i][0]===style) && (shoppingCart[i][2]===size) && (shoppingCart[i][3]===color) && (shoppingCart[i][4] >= 8)){
      $eventTarget.find('.shoppingCartButton').addClass('cartDisable');
      $soldOut.text('SOLD OUT!');
    }
  }
}

function updateCart(){
  let $list = $("#shoppingCartItems").html('');
  for (let i=0; i < shoppingCart.length; i++){
    let productInfo = `
    <div class="flex space_between">
      <div>`+shoppingCart[i][0]+`</div>
      <div>`+shoppingCart[i][3]+`</div>
      <div>`+shoppingCart[i][2]+`</div>`
      + `<div><span id="shirtQuanity">`+shoppingCart[i][4]+`x</span> $`+shoppingCart[i][1]+`</div>
    </div>`;
    $list.append(productInfo);
  }
}

let $shirtSizeSubmenu = $('.mock_shirt');
$shirtSizeSubmenu.on('click',function(e){
  let $shorter = $(this).parent().parent();
  $(this).parent().next().text($(this).text());
  let color = $shorter.next().find('[colorselected]').attr('colorselected');
  let style = $shorter.parent().next().find('.title').text();
  let price = $shorter.parent().next().find('.price').text();
  let size = $(this).parent().next().text($(this).text()).text();
  let $toTheTop = $(this).parent().parent().parent().parent();
  checkStock(style, size, color, $toTheTop);
});

let $shirtColorSubmenu = $("[mockcolor]");
$shirtColorSubmenu.on('click', function(e){
  let $toTheTop = $(this).parent().parent().parent().parent().parent();
  let $shorter = $(this).parent().parent();
  $shorter.prev().attr('colorselected',$(this).attr('mockcolor'));
  $shorter.parent().find('.fa.fa-stop').eq(0).removeClass().addClass('fa fa-stop '+$(this).attr('mockcolor'));
  let color = $(this).attr('mockcolor');
  $toTheTop.find('.design').attr('src','assets/'+color+'-front.png');
  $toTheTop.find('.design_back').attr('src','assets/'+color+'-back.png');
  let style = $toTheTop.find('.title').text();
  let price = parseInt($toTheTop.find('.price').text());
  let size =$shorter.parent().prev().find('.shirtSize').text();
  checkStock(style, size, color, $toTheTop);
});

let $cartButton = $('.shoppingCartButton');
$cartButton.on('click',function(e){
  let shirtTitle = $(this).parent().next().find('.title').text();
  let shirtPrice = parseInt($(this).parent().next().find('.price').text());
  let shirtSize = $(this).parent().find('.shirtSize').text();
  let shirtColor = $(this).parent().find('[colorselected]').attr('colorselected');
  productHolder = [shirtTitle,shirtPrice,shirtSize,shirtColor,sameShirtCounter];
  let currentConfiguration = [shirtTitle,shirtPrice,shirtSize,shirtColor,sameShirtCounter];
  let foundMatch = false;
  for (let j=0; j<shoppingCart.length; j++){
    if ((shoppingCart[j][0]===currentConfiguration[0]) && (shoppingCart[j][1]===currentConfiguration[1]) && (shoppingCart[j][2]===currentConfiguration[2]) && (shoppingCart[j][3]===currentConfiguration[3])){
      shoppingCart[j][4]++;
      shirtTotal++;
      foundMatch = true;
      if (shoppingCart[j][4] >= 8){
        $(this).addClass('cartDisable');
        $(this).parent().next().find('.soldOut').text('SOLD OUT!')
      }
    }
  }
  if (foundMatch === false) {
    shoppingCart[shoppingCart.length] = currentConfiguration;
    shirtTotal++;
  }
  shoppingCartSubtotal = shoppingCartSubtotal + productHolder[1];
  let $cartSubtotal = $("#shoppingCartSubtotal").text(shoppingCartSubtotal);
  let $discountLimit = $("#discountLimit");
  let $discountLimitText = $("#discountLimitText");
  if (shirtTotal < 5){
    $discountLimit.text(5 - shirtTotal);
  }
  if (shirtTotal >= 5){
    $discountLimitText.text("YOU DID IT!");
    shoppingCartDiscountTotal = (shoppingCartSubtotal*.05).toFixed(2);
  }
  let $shoppingCartDiscount = $("#shoppingCartDiscount").text(shoppingCartDiscountTotal);
  shoppingCartTotal = shoppingCartSubtotal - shoppingCartDiscountTotal;
  let $shoppingCartTotalSpace = $("#shoppingCartTotal").text(shoppingCartTotal.toFixed(2));
  updateCart();
});
