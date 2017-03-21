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
