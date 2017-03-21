function showSubMenu (){
  console.log ('menu clicked');
}
function logEvent(){
  let parentElement = event.target.parentElement;
  let menuClassName = parentElement.parentElement.lastElementChild.className;
  let menuValue = parentElement.parentElement.lastElementChild.textContent;
  let submenuValue = event.target.textContent;
  console.log(event);
  console.log(event.target.classList[2]);
  let color = event.target.classList[2];
  /*console.log('className: ' + event.target.className);
  console.log('parentElement: ' , parentElement.parentElement);

  console.log('offsetParent: ' + event.target.offsetParent.attributes[0].nodeValue);
  console.log('innerText: ' + event.target.textContent);
  console.log(parentElement.parentElement.lastElementChild.textContent);
  console.log(parentElement.parentElement.lastElementChild.className);*/
  //console.log('closest submenu: ' , event.target.closest(".shirtSize"));
  //console.log(menuClassName,menuValue,submenuValue);
  if (menuClassName == 'shirtSize'){
    console.log("change shirt size");
    //menuValue = submenuValue;
    parentElement.parentElement.lastElementChild.closest(".shirtSize").textContent = submenuValue;
    //console.log(menuValue);
    //document.querySelector('.shirtSize').textContent = submenuValue;
  }
  if (color == 'blue' || color == 'pink' || color == 'yellow' || color == 'green'){
    console.log('change color');
    console.log(menuClassName,menuValue,submenuValue);
    console.log(event.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.closest(".display").lastElementChild.closest(".shirt").firstElementChild.closest("img").src);
    //console.log(event.target.parentElement.parentElement.parentElement.firstElementChild.closest("i").className);
    event.target.parentElement.parentElement.parentElement.firstElementChild.closest("i").className = "fa fa-stop "+color;
    event.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.closest(".display").lastElementChild.closest(".shirt").firstElementChild.closest("img").src = "assets/"+color+"-front.png";
    event.target.parentElement.parentElement.parentElement.parentElement.parentElement.firstElementChild.closest(".display").lastElementChild.closest(".shirt").lastElementChild.closest("img").src = "assets/"+color+"-back.png";
    //event.target.classList[2] = colors;
  }
}
let sizeButton = document.querySelector('menu .item:nth-child(3)')
sizeButton.addEventListener('click', showSubMenu);
let colorButton = document.querySelector('menu .item:nth-child(4)')
colorButton.addEventListener('click', showSubMenu);
let mouseClick = document.querySelector('body');
mouseClick.addEventListener('click', logEvent);
