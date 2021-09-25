const billAmount = document.querySelector("#bill-amount");
const cashGiven = document.querySelector("#cash-given");
const errorMsg = document.querySelector("#error-message");
const checkBtn = document.querySelector("#check-button");
const notesOp = document.querySelectorAll(".no-of-notes");
const clearDataBtn = document.querySelector("#clear-button");
const availableNotes = [2000, 500, 100, 20, 10, 5, 1];

checkBtn.addEventListener("click", () => {
  let bill = Number(billAmount.value);
  let cash = Number(cashGiven.value);

  if (bill <= 0 || cash <= 0) {
    errorMsg.innerText = "Invalid Amount";
  } else if (bill === cash) {
    errorMsg.innerText = "No change Required";
  } else if (bill > cash) {
    errorMsg.innerText = "Cash given is less than bill";
  } else {
    errorMsg.innerText = "";
    // calculate no of notes to return
    let changeNotes = [0, 0, 0, 0, 0, 0, 0];

    let change = cash - bill;
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
    for (let i = 0; i < changeNotes.length; i++) {
      notesOp[i].innerText = changeNotes[i];
    }
  }
});

clearDataBtn.addEventListener("click", () => {
  billAmount.value = "";
  cashGiven.value = "";
  for (let i = 0; i < changeNotes.length; i++) {
    notesOp[i].innerText = "";
  }
});
