document.addEventListener("DOMContentLoaded", () => {
  // Sample user data (pin, balance and daily withdrawal limit)

  const users = [
    {
      pin: "1234",
      balance: 1000,
      dailyLimit: 500,
      withdrawnToday: 0,
      transactionHistory: [],
    },
    {
      pin: "5678",
      balance: 1500,
      dailyLimit: 400,
      withDrawnToday: 0,
      transactionHistory: [],
    },
  ];

  let currentUser = null; // store the currently logged in user

  const pinInput = document.getElementById("pin-input");
  const loginBtn = document.getElementById("login-btn");
  const loginError = document.getElementById("login-error");
  const loginScreen = document.getElementById("login-screen");
  const atmScreen = document.getElementById("atm-screen");
  const welcomeMessage = document.getElementById("welcome-message");
  const actionScreen = document.getElementById("action-screen");

  // Event listeners for ATM actions

  loginBtn.addEventListener("click", login);
  document
    .getElementById("check-balance-btn")
    .addEventListener("click", checkBalance);
  document
    .getElementById("deposit-btn")
    .addEventListener("click", depositMoney);
  document
    .getElementById("withdraw-btn")
    .addEventListener("click", withdrawMoney);
  document
    .getElementById("change-pin-btn")
    .addEventListener("click", changePin);
  document
    .getElementById("transaction-history-btn")
    .addEventListener("click", showTransactionHistory);
  document.getElementById("logout-btn").addEventListener("click", logout);

  // function to login  and validate pin

  function login() {
    const enteredPin = pinInput.value;

    currentUser = users.find((user) => user.pin === enteredPin);

    if (currentUser) {
      // if the valid user found, hide the login screen and show the atm screen
      loginScreen.style.display = "none"; // hide login screen
      atmScreen.style.display = "block"; // Show atm screen
      welcomeMessage.innerText = `Welcome!`;
    } else {
      // if the invalid is entered, show an error Message
      loginError.innerText = "Invalid pin, Try again!";
    }
    pinInput.value = ""; // clear the input value after the login attempt
  }

  // Function to check and display the user's current balance
  function checkBalance() {
    actionScreen.innerHTML = `<p>Your current balance is: £${currentUser.balance.toFixed(
      2
    )}</p>`;
  }

  // Function to deposit money into the user's account

  function depositMoney() {
    const amount = prompt("Enter the amount to deposit: "); // prompt the user to enter the amount

    // check if the entered amount is valid number and greater than 0
    if (!isNaN(amount) && Number(amount) > 0) {
      currentUser.balance += Number(amount);
      currentUser.transactionHistory.push({
        type: "Deposit",
        amount: Number(amount),
      });
      actionScreen.innerHTML = `<p>You deposited £${amount}. your new balance is ${currentUser.balance.toFixed(
        2
      )}</p>`;
    } else {
      actionScreen.innerHTML = `<p>Invalid amount</p>`;
    }
  }

  function withdrawMoney() {
    const amount = prompt("Enter the amount to withdraw: ");
    const numericAmount = Number(amount);
    if (!isNaN(numericAmount) && numericAmount > 0) {
      if (currentUser.balance >= numericAmount) {
        if (
          currentUser.withDrawnToday + numericAmount <=
          currentUser.dailyLimit
        ) {
          currentUser.balance -= numericAmount;
          currentUser.withDrawnToday += numericAmount;
          currentUser.transactionHistory.push({
            type: "withdrawal",
            amount: numericAmount,
          });
          actionScreen.innerHTML = `<p> you withdraw £${amount}. your new balance is: £${currentUser.balance.toFixed(
            2
          )}</p>`;
        } else {
          actionScreen.innerHTML = `<p>Daily withdrawal limit exceeds! you can only withdraw £${
            currentUser.dailyLimit - currentUser.withDrawnToday
          } more today</p>`;
        }
      } else {
        actionScreen.innerHTML = `<p>Insufficient funds.</p>`;
      }
    } else {
      actionScreen.innerHTML = `<p>Invalid amount.</p>`;
    }
  }

  // Function to change users pin

  function changePin() {
    const oldPin = prompt("Enter your current pin: "); // prompt user to enter their current pin
    // check if entered pin is matches the  stored pin

    if (oldPin === currentUser.pin) {
      const newPin = prompt("Enter your new pin: "); // prompt the user to enter new pin

      // check if the new pin is a valid 4-digit number

      if (newPin.length === 4 && !isNaN(newPin)) {
        currentUser.pin = newPin; // update's the users pin

        // Confirm that pin has been successfully changed

        actionScreen.innerHTML = `<p>Your pin has been successfully changed!</p>`;
      } else {
        // if pin in invalid, show error
        actionScreen.innerHTML = `<p>Pin must be 4-digit number.</p>`;
      }
    } else {
      // if the old pin doesn't match, show an error
      actionScreen.innerHTML = `<p>Incorrect current Pin.</p>`;
    }
  }

  // function to display transaction history

  function showTransactionHistory() {
    let historyHTML = "<p><strong>Transaction History:</strong></p>"; // start building the transaction history HTML
    if (currentUser.transactionHistory.length === 0) {
      historyHTML += "<p>No history yet.</p>"; // if no transaction have been made, show a mwssage
    } else {
      historyHTML += "<ul>"; // start an unordered list to display transaction

      // loop through each transaction in the history and create a list item
      currentUser.transactionHistory.forEach((transaction) => {
        historyHTML += `<li>${transaction.type} of £${transaction.amount}</li>`;
      });
    }
    actionScreen.innerHTML = historyHTML; // display the transaction history in the 'action-screen'
  }

  function logout() {
    currentUser = null; // clear the current user
    atmScreen.style.display = "none"; // hide the atm screen
    loginScreen.style.display = "block"; // show the login screen
    actionScreen.innerHTML = ""; // clear the action screen
    welcomeMessage.innerText = ""; // clear the welcome message
  }
});
