const mainBalance = document.querySelector("#mainBalance");

const balanceBtn = document.querySelector("#balanceBtn");
const balanceBtnShow = balanceBtn.firstElementChild;

const addMoneyBtn = document.querySelector("#addMoneyBtn");
const withdrawMoneyBtn = document.querySelector("#withdrawMoneyBtn");
const transactionHistoryBtn = document.querySelector("#transactionHistoryBtn");

const mainAria = document.querySelector("#mainAria");
const addMonyDiv = document.querySelector("#addMony");
const withdrawMoneyDiv = document.querySelector("#withdrawMoney");
const TransactionHistoryDiv = document.querySelector("#TransactionHistory");

const balanceAddBtn = addMonyDiv.querySelector("#balanceAddBtn");
const balanceRemoveBtn = withdrawMoneyDiv.querySelector("#balanceRemoveBtn");

balanceBtn.addEventListener("click", () => {
  balanceBtnShow.classList.replace("w-[184px]", "w-1/4");
  setTimeout(() => {
    balanceBtnShow.classList.replace("w-1/4", "w-[184px]");
  }, 4000);
});

let balance = 0;
let transactions = [];

let updateBalanceDisplay = function () {
  mainBalance.textContent = `$${balance.toFixed(2)}`;
};

// Function to add a transaction to the history
let addTransaction = function (type, amount) {
  const date = new Date().toLocaleString();
  const transaction = {
    date,
    type,
    amount,
    balanceAfter: balance,
  };
  transactions.push(transaction);
  updateTransactionHistory();
};

// Function to update the transaction history display
let updateTransactionHistory = function () {
  transactionList.innerHTML = "";
  transactions.forEach((transaction) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                <td class="border px-2 border-primary text-sm py-2">${
                  transaction.date
                }</td>
                <td class="border px-2 border-primary text-sm py-2">${
                  transaction.type
                }</td>
                <td class="border px-2 border-primary text-sm py-2">$${transaction.amount.toFixed(
                  2
                )}</td>
            `;
    transactionList.appendChild(row);
  });
};

let addDiv = function (i) {
  let mainAriaFirstChild = mainAria.firstElementChild;
  let mainAriaSecondChild = mainAriaFirstChild.nextElementSibling;
  let mainAriaThirdChild = mainAriaSecondChild.nextElementSibling;
  mainAriaFirstChild.classList.add("hidden");
  mainAriaSecondChild.classList.add("hidden");
  mainAriaThirdChild.classList.add("hidden");

  i.classList.remove("hidden");
};

addMoneyBtn.addEventListener("click", () => {
  addDiv(addMonyDiv);
});

withdrawMoneyBtn.addEventListener("click", () => {
  addDiv(withdrawMoneyDiv);
});
transactionHistoryBtn.addEventListener("click", () => {
  addDiv(TransactionHistoryDiv);
});

// Add Balance
balanceAddBtn.addEventListener("click", () => {
  let addMonyInput = document.querySelector("#addMonyInput");
  let amount = parseFloat(addMonyInput.value);

  addMonyInput.value = "";

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid positive number.");
    return;
  }

  balance += amount;
  updateBalanceDisplay();
  addTransaction("Add", amount);
});

balanceRemoveBtn.addEventListener("click", () => {
  let addMonyInput = document.querySelector("#withdrawMoneyInout");
  let amount = parseFloat(addMonyInput.value);

  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid positive number.");
    return;
  }
  if (amount > balance) {
    alert("Insufficient balance.");
    return;
  }

  balance -= amount;
  updateBalanceDisplay();
  addTransaction("Withdraw", amount);
  addMonyInput.value = "";
});
