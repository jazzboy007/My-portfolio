let balance = 500;

function updateMessage(message) {
  document.getElementById("message").innerText = message;
}

function checkBalance() {
  updateMessage(`Your balance is: £${balance}`);
}

function deposit() {
  let amount = parseFloat(document.getElementById("amount").value);
  if (amount > 0) {
    balance += amount;
    updateMessage(`You deposited £${amount}. New balance: £${balance}`);
  } else {
    updateMessage("please enter a vlid amount");
  }
  document.getElementById("amount").value = "";
}

function withdraw() {
  let amount = parseFloat(document.getElementById("amount").value);
  if (amount > 0 && amount <= balance) {
    balance -= amount;
    updateMessage(`You withdraw £${amount}. New balance: £${balance}`);
  } else if (amount > balance) {
    updateMessage("Insufficient balance.");
  } else {
    updateMessage("Please enter a valid amount.");
  }
  document.getElementById("amount").value = "";
}
