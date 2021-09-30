const billAmount = document.querySelector("#bill-amount");
const cashGiven = document.querySelector("#cash-given");
const errorMsg = document.querySelector("#error-message");
const moneyToReturn = document.querySelector("#money-to-return");
const checkBtn = document.querySelector("#check-button");
const notesOp = document.querySelectorAll(".no-of-notes");
const clearDataBtn = document.querySelector("#clear-button");
const availableNotes = [2000, 500, 100, 20, 10, 5, 1];
let changeNotes = [0, 0, 0, 0, 0, 0, 0];

const isInputValid = (bill, cash) => {
  let flag = true;
  if (bill <= 0 || cash <= 0) {
    errorMsg.innerText = "Invalid Amount";
    flag = false;
  } else if (bill === cash) {
    errorMsg.innerText = "No change Required";
    flag = false;
  } else if (bill > cash) {
    errorMsg.innerText = "Cash given is less than bill";
    flag = false;
  }
  return flag;
};

const setOutput = (changeMoney, changeNotes) => {
  moneyToReturn.innerText = "Money to return is " + changeMoney;
  for (let i = 0; i < changeNotes.length; i++) {
    notesOp[i].innerText = changeNotes[i];
  }
};

const removeOutput = () => {
  billAmount.value = "";
  cashGiven.value = "";
  for (let i = 0; i < changeNotes.length; i++) {
    notesOp[i].innerText = "";
  }
  moneyToReturn.innerText = "";
};

const removeNotesToReturn = ()=>{
  for (let i = 0; i < changeNotes.length; i++) {
    notesOp[i].innerText = "";
  }
  moneyToReturn.innerText = "";
}
checkBtn.addEventListener("click", () => {
  let bill = Number(billAmount.value);
  let cash = Number(cashGiven.value);

  if (isInputValid(bill, cash)) {
    errorMsg.innerText = "";
    changeNotes = [0, 0, 0, 0, 0, 0, 0];

    // calculate no of notes to return

    let change = cash - bill;
    let returnChange = change;
    let returnNoOfNotes;
    for (let i = 0; i < availableNotes.length; i++) {
      returnNoOfNotes = Math.floor(change / availableNotes[i]);

      change = change - availableNotes[i] * returnNoOfNotes;

      changeNotes[i] = returnNoOfNotes;

      if (change === 0) {
        break;
      }
    }
    
    // fill no of notes in table
    setOutput(returnChange, changeNotes);
  }
});

clearDataBtn.addEventListener("click", removeOutput);
billAmount.addEventListener("click",removeNotesToReturn);
cashGiven.addEventListener("click", removeNotesToReturn);