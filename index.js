import getTransactions, { addTransactionRequest, arrOfTransactions, arrOfDates, mapOfTransactions } from "./modules/api.js"

const inputSource = document.querySelector('.budget_input-source')
const inputCategory = document.querySelector('.budget_input-category')
const inputAmount = document.querySelector('.budget_input-amount')
const inputCommentary = document.querySelector('.budget_input-commentary')
const inputDate = document.querySelector('.budget_input-date')
let sumOfIncomes = 0
let sumOfOutcomes = 0

const addTransactionButton = document.querySelector('.budget_inputs-add')

const historyList = document.querySelector('.budget_list')


function handleAddTransaction() {
    const transaction = {
        category: inputCategory.value,
        source: inputSource.value,
        amount: +inputAmount.value,
        commentary: inputCommentary.value,
        date: inputDate.value
    }

    addTransaction(transaction)

    setProgress()
    
    console.log(arrOfTransactions)

    const response = addTransactionRequest(transaction.date, transaction)

    let dayAmount = +document.getElementById(transaction.date).querySelector('.budget_item-date-sum').textContent.slice(0, -2)
    dayAmount += transaction.amount
    document.getElementById(transaction.date).querySelector('.budget_item-date-sum').innerHTML = `${dayAmount} ₽`

    inputAmount.value = ''
    inputCommentary.value = ''
}

function addTransaction(transaction) {
    const wrappers = [...document.querySelectorAll('.budget_item-wrapper')]
    const index = arrOfTransactions.findIndex(group => group.date === transaction.date);

    const allIncome = +document.querySelector('.budget_income-fact').textContent.slice(0, -2)
    const allOutcome = +document.querySelector('.budget_outcome-fact').textContent.slice(0, -2)
    
    if (index !== -1) {
        arrOfTransactions[index].transactions.push(transaction);
        createTransaction(transaction, document.getElementById(transaction.date))
    } else {
        arrOfTransactions.push({
            date: transaction.date,
            transactions: [transaction],
            amountOfDay: transaction.amount
        });

        const newDateBlock = createDate(transaction.date)

        for (let wrapper of wrappers) {
            if (transaction.date.localeCompare(wrapper.id, { sensitivity: 'base' }) > 0) {
                historyList.insertBefore(newDateBlock, wrapper)
                break
            }
        }

        createTransaction(transaction, newDateBlock)
    }

    if (transaction.amount > 0) {
        document.querySelector('.budget_income-fact').innerHTML = `${allIncome + transaction.amount} ₽`
        console.log(allIncome + transaction.amount)
    } else {
        document.querySelector('.budget_outcome-fact').innerHTML = `${allOutcome + transaction.amount * -1} ₽`
    }

}

function createDate(date) {
    const dateWrapper = document.createElement('div')
    dateWrapper.className = 'budget_item-wrapper'
    dateWrapper.id = `${date}`
    historyList.append(dateWrapper)

    const newDate = document.createElement('div')
    newDate.className = 'budget_item-header'
    dateWrapper.append(newDate)

    const transactionDate = document.createElement('h3')
    transactionDate.className = 'budget_item-date'
    transactionDate.innerHTML = date
    newDate.append(transactionDate)

    const daySum = document.createElement('span')
    daySum.className = 'budget_item-date-sum'
    daySum.innerHTML = 0
    newDate.append(daySum)

    return dateWrapper
}

export function createTransaction(transaction, dateWrapper) {
    const newTransaction = document.createElement('li')
    newTransaction.className = 'budget_item'
    newTransaction.dataset.id = transaction.id
    dateWrapper.append(newTransaction)

    const transactionTitle = document.createElement('div')
    transactionTitle.className = 'budget_item-title'
    newTransaction.append(transactionTitle)

    const transactionCategory = document.createElement('span')
    transactionCategory.className = 'budget_item-category'
    transactionCategory.innerHTML = transaction.category
    transactionTitle.append(transactionCategory)

    const transactionSource = document.createElement('span')
    transactionSource.className = 'budget_item-source'
    transactionSource.innerHTML = transaction.source
    transactionTitle.append(transactionSource)

    const transactionAmount = document.createElement('div')
    transactionAmount.className = 'budget_item-amount'
    transactionAmount.innerHTML = `${transaction.amount} ₽`
    if (transaction.amount >= 0) {
        transactionAmount.classList.add('positive-amount')
    } else {
        transactionAmount.classList.add('negative-amount')
    }
    newTransaction.append(transactionAmount)
}

function renderTransaction() {
    const allIncome = document.querySelector('.budget_income-fact')
    const allOutcome = document.querySelector('.budget_outcome-fact')
    const sortedArrOfTransactions = [...arrOfTransactions].sort((a, b) => b.date.localeCompare(a.date, { sensitivity: 'base' }))
    console.log(arrOfTransactions)
    console.log(sortedArrOfTransactions)

    for (let transactions of sortedArrOfTransactions) {
        createDate(transactions.date)
        const totalSum = document.getElementById(transactions.date).querySelector('.budget_item-date-sum')
        totalSum.textContent = `${transactions.amountOfDay} ₽`
        const dateBlock = document.getElementById(transactions.date)
        for (let transaction of transactions.transactions) {
            if (transaction.date == dateBlock.id) {
                createTransaction(transaction, dateBlock)
            }
        }

        if (transactions.amountOfDay > 0) {
            sumOfIncomes += transactions.amountOfDay
        } else {
            sumOfOutcomes += transactions.amountOfDay
        }

        allIncome.innerHTML = `${sumOfIncomes} ₽`
        allOutcome.innerHTML = `${sumOfOutcomes * -1} ₽`

    }

    
    console.log(sortedArrOfTransactions)
}

function setProgress() {
    const totalIncomePlan = +document.querySelector('.budget_income-plan').textContent.slice(0, -2)
    const totalIncomeFact = +document.querySelector('.budget_income-fact').textContent.slice(0, -2)
    const totalOutcomePlan = +document.querySelector('.budget_outcome-plan').textContent.slice(0, -2)
    const totalOutcomeFact = +document.querySelector('.budget_outcome-fact').textContent.slice(0, -2)
    const totalBarWidth = 261

    let totalIncomeRatio = totalIncomeFact / totalIncomePlan
    let totalOutcomeRatio = totalOutcomeFact / totalOutcomePlan
    let fillIncomeBarWidth = totalBarWidth * totalIncomeRatio
    let fillOutcomeBarWidth = totalBarWidth * totalOutcomeRatio

    console.log(totalOutcomePlan, totalOutcomeFact, totalOutcomeRatio)
    console.log(totalIncomePlan, totalIncomeFact, totalIncomeRatio )

    if (totalIncomeRatio >= 1) {
        document.querySelector('.budget_income-bar-fill').setAttribute('width', totalBarWidth);
    } else {
        document.querySelector('.budget_income-bar-fill').setAttribute('width', fillIncomeBarWidth);
    }

    if (totalOutcomeRatio >= 1) {
        document.querySelector('.budget_outcome-bar-fill').setAttribute('width', totalBarWidth);
        document.querySelector('.budget_outcome-bar-fill').setAttribute('fill', '#FF0000');
        document.querySelector('.budget_outcome-bar-total').setAttribute('fill', '#FF0000');
    } else {
        document.querySelector('.budget_outcome-bar-fill').setAttribute('width', fillOutcomeBarWidth);
    }


}

renderTransaction()

setProgress()

addTransactionButton.addEventListener('click', handleAddTransaction)

