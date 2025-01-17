
const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
 

//event listener for form submission
form.addEventListener('submit', (event) => {
    event.preventDefault(); //prevent the default form submission

    //capturing input values
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    const expense = {
        description: description,
        amount: amount,
        category: category,
        date: new Date(),
        id: Date.now()
    }

    //save the expense  to local storage
    saveExpenseToLocalStorage(expense);

    //update the UI
    addExpenseToList(expense);

    //clearInputFields
    form.reset();

});

//function to save expenses to local storage
const saveExpenseToLocalStorage = (expense) => {
    //get existing expenses from local storage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    //add the new wxpense to the array
    expenses.push(expense);
    //save the updated array back to local storage
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

//function to add expense to the ui list
const addExpenseToList = (expense) => {
    const expenseItem = document.createElement('li');
    const formattedDate = new Date(expense.date).toLocaleDateString();
    expenseItem.classList.add('expense-item'); //styling
    expenseItem.textContent = `${expense.description} - $${expense.amount} (${expense.category}) on ${formattedDate}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete'
    deleteBtn.classList.add('delete-btn');

    deleteBtn.addEventListener('click', () => {
        deleteExpenseFromLocalStorage(expense.id);
        expenseList.removeChild(expenseItem);
    })

    expenseItem.appendChild(deleteBtn);
    expenseList.appendChild(expenseItem);
}


const deleteExpenseFromLocalStorage = (id) => {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}


window.onload = function () {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    storedExpenses.forEach(expense => addExpenseToList(expense));
};

