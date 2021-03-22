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
    const expense = this.totalExpense();
    const total = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = total;
    if (total < 0) {
      this.balance.clasadd("showRed");
      this.balance.classList.remove("showGreen", "showBlack");
    } else if (total > 0) {
      this.balance.classList.add("showGreen");
      this.balance.classList.remove("showRed", "showBlack");
    } else if (total === 0) {
      this.balance.classList.add("showBlack");
      this.balance.classList.remove("showRed", "showGreen");
    }
  }

  //total expense
  totalExpense() {
    const total = 400;
    return total;
  }

  // submit expense form
  submitExpenseForm() {
    const expenseTitle = this.expenseInput.value;
    const expenseValue = this.amountInput.value;
    console.log(this.amountInput);
    if (expenseValue === "" || expenseTitle === "" || expenseValue < 0) {
      this.expenseFeedback.classList.add("show-item");
      this.expenseFeedback.innerHTML = `<p>
      Expense Title or Amount cannot be Empty or Negative
      </p>`;

      setTimeout(() => {
        this.expenseFeedback.classList.remove("show-item");
      }, 3000);
    } else {
      const amount = parseInt(expenseValue);
      console.log(amount);
      this.expenseForm.reset();

      let expense = {
        id: this.itemID,
        title: expenseTitle,
        amount,
      };
      this.itemID++;
      this.itemList.push(expense);

      console.log(this.itemList);
    }
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
    ui.submitExpenseForm();
  });
  // expense list event
  expenseList.addEventListener("click", (event) => {
    event.preventDefault();
  });
}

document.addEventListener("DOMContentLoaded", eventListeners);
