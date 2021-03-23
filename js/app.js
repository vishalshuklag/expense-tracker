class ExpenseTracker {
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
      this.balance.classList.add("showRed");
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
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce((acc, cur) => {
        acc += cur.amount;
        return acc;
      }, 0);
    }

    this.expenseAmount.textContent = total;
    return total;
  }

  // submit expense form
  submitExpenseForm() {
    const expenseTitle = this.expenseInput.value;
    const expenseValue = this.amountInput.value;
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
      this.expenseForm.reset();
      let expense = {
        id: this.itemID,
        title: expenseTitle,
        amount,
      };
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();
    }
  }

  // add expense to the list at bottom
  addExpense(expense) {
    const div = document.createElement("div");
    div.classList.add("expense");

    div.innerHTML = `
      <div class="expense-item d-flex justify-content-between align-items-baseline">

        <h6 class="expense-title mb-0 text-uppercase list-item">- ${expense.title}</h6>
        <h5 class="expense-amount mb-0 list-item">₹${expense.amount}</h5>

        <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
          <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
          <i class="fas fa-trash"></i>
          </a>
        </div>
      </div>
    `;
    this.expenseList.appendChild(div);
  }

  // Edit expense
  editExpense(element) {
    let parent = element.parentElement.parentElement.parentElement;
    let id = parseInt(element.dataset.id);
    // remove element from dom
    this.expenseList.removeChild(parent);

    let expense = this.itemList.filter((item) => {
      return item.id === id;
    });
    // show values to be edited in i/p fields
    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;
    let tempList = this.itemList.filter((item) => {
      return item.id !== id;
    });
    this.itemList = tempList;
    this.showBalance();
  }

  // delete expense from list
  deleteExpense(element) {
    let parent = element.parentElement.parentElement.parentElement;
    let id = parseInt(element.dataset.id);
    this.expenseList.removeChild(parent);
    this.itemList.splice(id, 1);
    this.showBalance();
  }
}

function eventListeners() {
  const budgetForm = document.getElementById("budget-form");
  const expenseForm = document.getElementById("expense-form");
  const expenseList = document.getElementById("expense-list");

  // new instance of ExpenseTracker CLASS
  const exp = new ExpenseTracker();

  // budget form submit
  budgetForm.addEventListener("submit", (event) => {
    event.preventDefault();
    exp.submitBudgetForm();
  });
  // expense form submit
  expenseForm.addEventListener("submit", (event) => {
    event.preventDefault();
    exp.submitExpenseForm();
  });
  // expense list event
  expenseList.addEventListener("click", (event) => {
    if (event.target.parentElement.classList.contains("edit-icon")) {
      exp.editExpense(event.target.parentElement);
    }
    if (event.target.parentElement.classList.contains("delete-icon")) {
      exp.deleteExpense(event.target.parentElement);
    }
  });
}

document.addEventListener("DOMContentLoaded", eventListeners);
