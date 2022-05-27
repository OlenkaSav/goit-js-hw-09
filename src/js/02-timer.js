import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDate = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button');
let daysValue = document.querySelector('span[data-days]');
let hoursValue = document.querySelector('span[data-hours]');
let minutesValue = document.querySelector('span[data-minutes]');
let secondsValue = document.querySelector('span[data-seconds]');
let intervalId=null;
let deltaTime=null;
let timeToFinish=null;
const currentTime = Date.now();
// const startTime = Date.now();
// let selectTime=null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
     selectDate(selectedDates[0]);
    //  console.log(deltaTime);
    },
  };

  flatpickr(inputDate, options);

// const timeToFinish = new Date(selectTime);
// console.log(selectTime);

btnStart.addEventListener('click', countDown );
btnStart.disabled=true;

function selectDate(selectTime){
    if (!btnStart.disabled){return;} 
    else{
    timeToFinish = selectTime.getTime()
    deltaTime = timeToFinish-currentTime;
    if(deltaTime<=0){
    Notify.failure('Оберіть дату з майбутнього');
    // alert('Оберіть дату з майбутнього');
    return;}
    else {btnStart.disabled=false;
     return timeToFinish;}
    }
};

function countDown(){
    // console.log(timeToFinish);
    intervalId = setInterval(() => {
        const timeStart = Date.now();
        deltaTime = timeToFinish-timeStart;
        const time = convertMs(deltaTime);
        updateClockface(time)
          }, 1000);
}

function updateClockface({ days, hours, minutes, seconds }) {
    daysValue.textContent=days;
    hoursValue.textContent=hours;
    minutesValue.textContent=minutes;
    secondsValue.textContent=seconds;
  }

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = twoSimbol(Math.floor(ms / day));
    // Remaining hours
    const hours =twoSimbol(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = twoSimbol(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds =twoSimbol(Math.floor((((ms % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

  function twoSimbol(value){
      return String(value).padStart(2, '0');
  }