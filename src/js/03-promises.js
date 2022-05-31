import Notiflix from 'notiflix';

const refs ={
  form: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStap: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
  btnStart: document.querySelector('button')
}

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt){
    evt.preventDefault();
    refs.btnStart.disabled=true;
    let positionNumber=0;
  const delayValue = Number(refs.inputDelay.value)*1000;
  const positionAmount =Number(refs.inputAmount.value);
  const stapValue = Number(refs.inputStap.value)*1000;
  let intervalToShow=delayValue;
 
  const intervalId=setInterval(()=>{
    if (positionNumber>=positionAmount){
     clearInterval(intervalId);
     return;
    } else{
      positionNumber+=1;
      intervalToShow+=stapValue;
     createPromise(positionNumber, delayValue, intervalToShow).then(onPromiseresolve).catch(onPromiseReject);
     }
     }, stapValue);
  setTimeout(()=>{refs.btnStart.disabled=false;
  },btnDisabledTime(delayValue, positionAmount, stapValue));
  }

function createPromise(position, delay, interval) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${interval}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${interval}ms`);
      }
    }, delay);

})}

function onPromiseresolve(result){
  Notiflix.Notify.success(result, {position: 'center-top', timeout: 5000,});
};

function onPromiseReject(error){
  Notiflix.Notify.failure(error, {position: 'center-top', timeout: 5000,});
}

function btnDisabledTime(delay, amount, step){
return delay+amount*step+5000;
}
