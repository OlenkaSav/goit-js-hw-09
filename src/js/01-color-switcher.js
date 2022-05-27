const refs ={
    buttonStart: document.querySelector('button[data-start]'),
    buttonStop: document.querySelector('button[data-stop]'),
    bodyElement: document.querySelector('body'),
    buttons:  document.querySelectorAll('button'),
};
let colorChange=null; 

refs.buttonStart.addEventListener('click', onButtonStart);
refs.buttonStop.addEventListener('click', onButtonStop);

function onButtonStart(){
   refs.buttonStart.disabled=true;
    colorChange=setInterval(()=>{
refs.bodyElement.style.backgroundColor = getRandomHexColor()},1000);
}

function onButtonStop(){
    clearInterval(colorChange);
    refs.buttonStart.disabled=false;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

//   refs.bodyElement.style.cssText =`display: flex;
//   align-items: center;
//   justify-content: space-around;

//   ` 
//   refs.bodyElement.style.margin='auto'; 

//   refs.buttons.style.cssText = `width: 140px;
//   height: 60px;
//   font-size: 30px;
//   display: flex;
//   align-Items: center;
//   justify-content: center;
//   `;
refs.buttons.forEach(element => {element.style.cssText = `width: 140px;
 height: 60px;
font-size: 30px;
margin-left: 60px;
`
    
});
console.log(refs.buttons);