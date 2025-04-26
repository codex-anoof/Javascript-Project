
// Initialize app
function init() {
  const transactionListEl = document.getElementById("transaction-list");
  const dateEl = document.getElementById("date");
  const balanceEl = document.getElementById("balance");
  const incomeEl = document.getElementById("income");
  const expenseEl = document.getElementById("expense");
  const generateReportBtn = document.getElementById("generate-report-btn");
  const categoryDropdowns = [document.getElementById("category")];
  const addCategoryBtn = document.getElementById("add-category-btn");
  const saveCategoryBtn = document.getElementById("save-category-btn");
  const closeCategoryModalBtn = document.getElementById("close-modal");
  const chartContainer = document.getElementById("chart");

  let transactions = [];
  let categories = ["Food", "Transport", "Other"];

  generateReportBtn.addEventListener("click", generateReport);
  addCategoryBtn.addEventListener("click", openCategoryModal);
  saveCategoryBtn.addEventListener("click", addNewCategory);
  closeCategoryModalBtn.addEventListener("click", closeCategoryModal);

  function addTransaction(e) {
    e.preventDefault();
    const textInput = document.getElementById("text").value.trim();
    const amountInput = parseFloat(document.getElementById("amount").value.trim());
    const categoryInput = document.getElementById("category").value;

    // ✅ Issue #1: Validation
    if (!textInput || isNaN(amountInput) || amountInput === 0) {
      alert("Please provide valid description and non-zero amount!");
      return;
    }

    const transaction = {
      id: Date.now(),
      text: textInput,
      amount: amountInput,
      category: categoryInput,
    };

    transactions.push(transaction);
    updateTransactions();
    resetInputs();
  }

  function resetInputs() {
    document.getElementById("text").value = "";
    document.getElementById("amount").value = "";
  }

  function updateTransactions() {
    transactionListEl.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
  }

  function addTransactionDOM(transaction) {
    const item = document.createElement("li");

    // ✅ Issue #3: Correct class assignment
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML = \`\${transaction.text} <span>\${transaction.amount < 0 ? "-" : "+"}\$ \${Math.abs(transaction.amount).toFixed(2)}</span>\`;
    transactionListEl.appendChild(item);
  }

  function updateValues() {
    const amounts = transactions.map(t => t.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    const income = amounts.filter(x => x > 0).reduce((acc, x) => (acc += x), 0).toFixed(2);
    const expense = (amounts.filter(x => x < 0).reduce((acc, x) => (acc += x), 0) * -1).toFixed(2);

    balanceEl.innerText = `\$${total}`;
    incomeEl.innerText = `\$${income}`;
    expenseEl.innerText = `\$${expense}`;
  }

  function deleteCategory(category) {
    if (category !== "Other") {
      transactions.forEach(txn => {
        if (txn.category === category) {
          txn.category = "Other";
        }
      });
      categories = categories.filter(c => c !== category);
      updateCategoryDropdowns();
      updateTransactions();
    }
  }

  function updateCategoryDropdowns() {
    categoryDropdowns.forEach(dropdown => {
      dropdown.innerHTML = "";
      categories.forEach(cat => {
        const opt = document.createElement("option");
        opt.value = cat;  // ✅ Issue #5: No extra formatting
        opt.textContent = cat;
        dropdown.appendChild(opt);
      });
    });
  }

  function generateReport() {
    alert("Report Generation Started! (To be extended with utility script)");
  }

  function openCategoryModal() {
    document.getElementById("category-modal").style.display = "block";
  }

  function closeCategoryModal() {
    document.getElementById("category-modal").style.display = "none";
  }

  document.getElementById("add-transaction-form").addEventListener("submit", addTransaction);

  updateCategoryDropdowns();
}

document.addEventListener("DOMContentLoaded", init);
