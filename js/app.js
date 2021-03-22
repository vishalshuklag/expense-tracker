class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  }

  // submit budget method
  submitBudgetForm() {
    const value = this.budgetInput.value;
    if (value == "" || value < 0) {
      this.budgetFeedback.classList.add("show-item");
      this.budgetFeedback.innerHTML = `<p>
      Budget value cannot be Empty or Negative.
      </p>`;
      setTimeout(() => {
        this.budgetFeedback.classList.remove("show-item");
      }, 3000);
    } else {
      this.budgetAmount.textContent = value;
      this.budgetForm.reset();
      this.showBalance();
    }
  }

  // show balance method
  showBalance() {
    console.log("show balance");
  }
}

function eventListeners() {
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");

  // new instance of UI CLASS
  const ui = new UI();

  // budget form submit
  budgetForm.addEventListener("submit", (event) => {
    event.preventDefault();
    ui.submitBudgetForm();
  });
  // expense form submit
  expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
  });
  // expense list event
  expenseList.addEventListener("click", (event) => {
    event.preventDefault();
  });
}

document.addEventListener("DOMContentLoaded", eventListeners);
