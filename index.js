const countdownContainer = document.getElementById("countdown");

const hoursValue = document.getElementById("hours");
const minutesValue = document.getElementById("minutes");
const secondsValue = document.getElementById("seconds");

const sound = document.getElementById("timer-end");

// get current value of element
const getValue = (element) => (
  parseInt(element.textContent.trim())
);

function incDec(element, offset) {
  // get current number in element
  const currentNumber = getValue(element);

  // inc current number by one
  let newNumber = (currentNumber + offset).toString();

  if (newNumber < 0) {
    if (element.id === "seconds") {
      /*
        get value of minutes, if above 0, decrease it by one
        and set seconds to 59
      */
      if (getValue(minutesValue) > 0) {
        newNumber = "59";
        incDec(minutesValue, -1);
      } else return;
    }

    if (element.id === "minutes") {
      if (getValue(hoursValue) > 0) {
        newNumber = "59";
        incDec(hoursValue, -1);
      } else return;
    }

    if (element.id === "hours") return;
  }

  if (newNumber > 59) {
    if (element.id === "seconds") {
      newNumber = "00";
      incDec(minutesValue, 1);
    }

    if (element.id === "minutes") {
      newNumber = "00";
      incDec(hoursValue, 1);
    }

    if (element.id === "hours") return;
  }

  /*
    convert new number to string
    and add 0 if it's a single digit
  */
  const strNewNumber = newNumber.padStart(2, "0");

  // create span tags
  const spanTag1 = document.createElement("span");
  const spanTag2 = document.createElement("span");

  // split the new number into half
  const [firstDigit, secondDigit] = strNewNumber.split("");

  /*
    add first digit to the first span tag
    e.g. <span>0</span>
  */
  spanTag1.textContent = firstDigit;

  /*
    add second digit to the second span tag
    e.g. <span>1</span>
  */
  spanTag2.textContent = secondDigit;

  /*
    clear old elements that contain the old number
    <span>0</span><span>0</span>
  */
  element.innerHTML = "";

  /*
    add the new span tags to the element

    <div>
      <h4>Hours</h4>
      <p>
        <span>0</span><span>1</span>
      </p>
    </div>
  */
  element.appendChild(spanTag1);
  element.appendChild(spanTag2);
}

const incHours = document.getElementById("incHours");
const decHours = document.getElementById("decHours");

incHours.addEventListener("click", () => {
  incDec(hoursValue, 1);
});

decHours.addEventListener("click", () => {
  incDec(hoursValue, -1);
});

const incMins = document.getElementById("incMins");
const decMins = document.getElementById("decMins");

incMins.addEventListener("click", () => {
  incDec(minutesValue, 1);
});

decMins.addEventListener("click", () => {
  incDec(minutesValue, -1);
});

const incSecs = document.getElementById("incSecs");
const decSecs = document.getElementById("decSecs");

incSecs.addEventListener("click", () => {
  incDec(secondsValue, 1);
});

decSecs.addEventListener("click", () => {
  incDec(secondsValue, -1);
});

function getCountdownValue() {
  const hours = getValue(hoursValue) * 3600;
  const minutes = getValue(minutesValue) * 60;
  const seconds = getValue(secondsValue);

  return hours + minutes + seconds;
}

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const clearBtn = document.getElementById("clearBtn");

let countdown;
let timeout;

startBtn.addEventListener("click", () => {
  if (countdown) return;

  const value = getCountdownValue();

  if (value === 0) return;

  incDec(secondsValue, -1);

  // start counting down by 1 second
  countdown = setInterval(() => {
    incDec(secondsValue, -1);
  }, 1000);

  // run everything here until x amount of time has passed
  timeout = setTimeout(() => {
    clearInterval(countdown);
    countdown = null;
    countdownContainer.style.animation = "blink 500ms ease-in-out infinite", sound.play();

    setTimeout(() => {
      countdownContainer.style.animation = "";
    }, 10000);
  }, value * 1000)
});

stopBtn.addEventListener("click", () => {
  if (!countdown) return;
  clearInterval(countdown);
  clearTimeout(timeout);
  countdown = null;
  timeout = null;
  countdownContainer.style.animation = "";
});

clearBtn.addEventListener("click", () => {
  if (countdown) {
    clearInterval(countdown);
    clearTimeout(timeout);
    countdown = null;
    timeout = null;
  }

  countdownContainer.style.animation = "", sound.pause();

  const spanTag = document.createElement("span");
  spanTag.textContent = 0;

  hoursValue.innerHTML = "";
  minutesValue.innerHTML = "";
  secondsValue.innerHTML = "";

  hoursValue.appendChild(spanTag);
  hoursValue.appendChild(spanTag.cloneNode(true));

  minutesValue.appendChild(spanTag.cloneNode(true));
  minutesValue.appendChild(spanTag.cloneNode(true));

  secondsValue.appendChild(spanTag.cloneNode(true));
  secondsValue.appendChild(spanTag.cloneNode(true));
});

