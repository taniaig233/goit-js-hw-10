// es modules are recommended, if available, especially for typescript
import flatpickr from "flatpickr";

// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";

// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const startBtn = document.querySelector('[data-start]');
const daysData = document.querySelector('[data-days]');
const hoursData = document.querySelector('[data-hours]');
const minutesData = document.querySelector('[data-minutes]');
const secondsData = document.querySelector('[data-seconds]');
const input = document.querySelector('#datetime-picker');

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  input.disabled = true;
  startTimer();
});

startBtn.disabled = true;

let timeDifference; 
let intervalId;


const options = {
  defaultDate: null,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    const userDate = new Date(selectedDates[0]).getTime();
    const startDate = Date.now();
              
    if (userDate >= startDate) {
      startBtn.disabled = false;
      timeDifference = userDate - startDate;
      updateClockface(convertMs(timeDifference));
             
    } else {
      iziToast.error({
        fontSize: 'large',
        close: false,
        position: 'topRight',
        messageColor: 'white',
        timeout: 2000,
        backgroundColor: 'red',
        message: ("Please choose a date in the future")
      });
    }
  }
};

flatpickr('#datetime-picker', options);

function updateClockface({ days, hours, minutes, seconds }) {
  daysData.textContent = `${days}`;
  hoursData.textContent = `${hours}`;
  minutesData.textContent = `${minutes}`;
  secondsData.textContent = `${seconds}`;
}

function startTimer() {
  clearInterval(intervalId);
  intervalId = setInterval(timer, 1000);
}

function timer() {
   
  if (timeDifference > 1000) {
    
    timeDifference -= 1000;
    updateClockface(convertMs(timeDifference))
  
  } else {
     clearInterval(intervalId);
     input.disabled = false;
  }
}
 
function addLeadingZero(value){
    return String(value).padStart(2, "0");
  }

  function convertMs(time) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    
    // Remaining days
    const days = addLeadingZero(Math.floor(time / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((time % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((time % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((time % day) % hour) % minute) / second));
  
    return { days, hours, minutes, seconds };
  }

