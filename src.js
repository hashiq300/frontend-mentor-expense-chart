let expenses = [];
const bars = document.querySelectorAll(".bar");
const totalTag = document.querySelector(".left > h1");
const BlueColor = getComputedStyle(document.body).getPropertyValue("--Cyan");

async function getExpenses() {
    let data = await (await fetch("./data.json")).json();
    expenses = data.map((expense) => {
        return {
            day: expense.day,
            amount: expense.amount,
        };
    });
}

async function setChart() {
    await getExpenses();
    const maxExpense = findMaxAmount(expenses);
    bars.forEach((bar, index) => {
        const day = bar.querySelector(".day");
        const percentage = expenses[index].amount / maxExpense;
        day.textContent = expenses[index].day;
        bar.style.height = `${percentage * 10}rem`;
        if (maxExpense == expenses[index].amount)
            bar.style.backgroundColor = BlueColor;
    });
    const totalExpense = expenses.reduce(
        (total, expense) => total + expense.amount,
        0
    );
    totalTag.textContent = "$" + Math.round(totalExpense);
}

function findMaxAmount(arr) {
    let max = 0;
    arr.forEach((expense) => {
        if (expense.amount > max) max = expense.amount;
    });
    return max;
}

setTimeout(setChart, 500);
