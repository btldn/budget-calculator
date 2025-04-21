import { addTransactionRequest, arrOfTransactions, arrOfDates, mapOfTransactions } from "./modules/api.js"

const inputSource = document.querySelector('.budget_input-source')
const inputCategory = document.querySelector('.budget_input-category')
const inputAmount = document.querySelector('.budget_input-amount')
const inputCommentary = document.querySelector('.budget_input-commentary')
const inputDate = document.querySelector('.budget_input-date')

const addTransactionButton = document.querySelector('.budget_inputs-add')

const historyList = document.querySelector('.budget_list')

const dayAmount = document.querySelectorAll('.budget_item-amount')

function datesOfTransactions() {  
    const dates = []
    for (let transaction of arrOfTransactions) {
        dates.push(transaction.date)
    }
    return dates
}


function handleAddTransaction() {
    const transaction = {
        category: inputCategory.value,
        source: inputSource.value,
        amount: +inputAmount.value,
        commentary: inputCommentary.value,
        date: inputDate.value
    }

    const response = addTransactionRequest(transaction.date, transaction)

    inputAmount.value = ''
    inputCommentary.value = ''
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
    const sortedArrOfDates = [...arrOfDates].sort((a, b) => b.localeCompare(a, { sensitivity: 'base' }))

    for (let date of sortedArrOfDates) {
        createDate(date)
        const dateWrapper = document.getElementById(date)
        for (let transaction of arrOfTransactions) {
            if (transaction.date == date) {
                createTransaction(transaction, dateWrapper)
            }
        }
    }    
}


mapOfTransactions.entries()


renderTransaction()


addTransactionButton.addEventListener('click', handleAddTransaction)

