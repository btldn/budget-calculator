import { addTransactionRequest, deleteTransactionRequest, arrOfTransactions, maxId } from "./modules/api.js"

const inputSource = document.querySelector('.budget_input-source')
const inputCategory = document.querySelector('.budget_input-category')
const inputAmount = document.querySelector('.budget_input-amount')
const inputCommentary = document.querySelector('.budget_input-commentary')
const inputDate = document.querySelector('.budget_input-date')
let sumOfIncomes = 0
let sumOfOutcomes = 0

let localId = maxId + 1

const addTransactionButton = document.querySelector('.budget_inputs-add')

const historyList = document.querySelector('.budget_list')


console.log(typeof (maxId))

function handleAddTransaction() {
    const transaction = {
        id: localId,
        category: inputCategory.value,
        source: inputSource.value,
        amount: +inputAmount.value,
        commentary: inputCommentary.value,
        date: inputDate.value
    }

    localId += 1

    if (!(inputDate.value == '' || inputAmount.value == '')) {
        addTransaction(transaction)
        const response = addTransactionRequest(transaction.date, transaction)
        setProgress(

        )
    }

    console.log(arrOfTransactions)

    let dayAmount = +document.getElementById(transaction.date).querySelector('.budget_item-date-sum').textContent.slice(0, -2)
    dayAmount += transaction.amount
    document.getElementById(transaction.date).querySelector('.budget_item-date-sum').innerHTML = `${dayAmount} ₽`

    inputAmount.value = ''
    inputCommentary.value = ''

    console.log(maxId)
}

console.log(maxId)

function addTransaction(transaction) {
    const wrappers = [...document.querySelectorAll('.budget_date-wrapper')]
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
    dateWrapper.className = 'budget_date-wrapper'
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
    const transactionItemWrapper = document.createElement('div')
    transactionItemWrapper.className = 'budget_item-wrapper'
    transactionItemWrapper.dataset.id = transaction.id
    dateWrapper.append(transactionItemWrapper)

    const newTransaction = document.createElement('li')
    newTransaction.className = 'budget_item'

    switch (transaction.category) {
        case 'Зарплата':
            newTransaction.classList.add('salary');
            break;
        case 'Супермаркет':
            newTransaction.classList.add('food');
            break;
        case 'Ресторан':
            newTransaction.classList.add('restaurant');
            break;
        default:
            if (transaction.amount > 0) {
                newTransaction.classList.add('income');
            } else if (transaction.amount < 0) {
                newTransaction.classList.add('outcome');
            }
            break;
    }

    transactionItemWrapper.append(newTransaction)



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

    const transactionControlsBlock = document.createElement('div')
    transactionControlsBlock.className = 'budget_item-controls'
    newTransaction.append(transactionControlsBlock)

    const deleteButton = document.createElement('button')
    deleteButton.className = 'budget_item-delete'
    deleteButton.innerHTML = '<svg class="budget_item-delete-icon" fill="#000000" width="15px" height="20px" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><defs><style>.cls-1{fill:none;}</style></defs><rect x="12" y="12" width="2" height="12"/><rect x="18" y="12" width="2" height="12"/><path d="M4,6V8H6V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V8h2V6ZM8,28V8H24V28Z"/><rect x="12" y="2" width="8" height="2"/><rect id="_Transparent_Rectangle_" data-name="&lt;Transparent Rectangle&gt;" class="cls-1" width="32" height="32"/></svg>'
    transactionControlsBlock.append(deleteButton)

    const transactionAmount = document.createElement('div')
    transactionAmount.className = 'budget_item-amount'
    transactionAmount.innerHTML = `${transaction.amount} ₽`
    if (transaction.amount >= 0) {
        transactionAmount.classList.add('positive-amount')
    } else {
        transactionAmount.classList.add('negative-amount')
    }
    transactionControlsBlock.append(transactionAmount)

    const commentBlock = document.createElement('div')
    commentBlock.className = 'budget_item-commentary'
    commentBlock.textContent = transaction.commentary
    // commentBlock.style.display = 'none'
    if (transaction.commentary == '') {
        commentBlock.textContent = 'Тут комментария нет...'
    } else {
        commentBlock.textContent = transaction.commentary
    }
    transactionItemWrapper.append(commentBlock)

}

function sumAllComes() {
    const allIncome = document.querySelector('.budget_income-fact')
    const allOutcome = document.querySelector('.budget_outcome-fact')
    
    let sumOfIncomes = 0
    let sumOfOutcomes = 0

    for (let transactions of arrOfTransactions) {
        if (transactions.amountOfDay > 0) {
            sumOfIncomes += transactions.amountOfDay
        } else {
            sumOfOutcomes += transactions.amountOfDay
        }

        allIncome.innerHTML = `${sumOfIncomes} ₽`
        allOutcome.innerHTML = `${sumOfOutcomes * -1} ₽`

    }
}

function renderTransaction() {
    // const allIncome = document.querySelector('.budget_income-fact')
    // const allOutcome = document.querySelector('.budget_outcome-fact')
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

        // if (transactions.amountOfDay > 0) {
        //     sumOfIncomes += transactions.amountOfDay
        // } else {
        //     sumOfOutcomes += transactions.amountOfDay
        // }

        // allIncome.innerHTML = `${sumOfIncomes} ₽`
        // allOutcome.innerHTML = `${sumOfOutcomes * -1} ₽`

    }

    sumAllComes()
    setProgress()
}

historyList.addEventListener('click', async function (event) {
    if (event.target.classList.contains('budget_item-delete')) {
        let transactionElement = event.target.closest('.budget_item-wrapper')
        let transactionControls = event.target.closest('.budget_item-controls')
        let dateElement = event.target.closest('.budget_date-wrapper')
        let transactionId = transactionElement.dataset.id
        event.target.disabled = true

        console.log("Удаляем", transactionElement)

        transactionControls.classList.add('loading')
        const response = await deleteTransactionRequest(transactionId)
        let count = 0

        
        for (let group of arrOfTransactions) {
            const transactions = group.transactions
            const index = group.transactions.findIndex(transaction => transaction.id == transactionId);
            console.log(index)

            if (index !== -1) {
                let totalAmount = 0
                transactions.splice(index, 1);

                if (transactions.length === 0) {
                    arrOfTransactions.splice(index, 1);
                }
                
                for (let transaction of transactions) {
                    totalAmount += transaction.amount
                    transactionElement.parentElement.querySelector('.budget_item-date-sum').innerHTML = `${totalAmount} ₽`
                    group.amountOfDay = totalAmount
                }
            }
        }

        if (response.status == 200) {
            transactionElement.remove();
            transactionElement.classList.remove('delete_loading')


            const transactionElementArr = [...dateElement.querySelectorAll('.budget_item-wrapper')]
            if (transactionElementArr.length == 0) {
                dateElement.remove()
            } else {

            }

        } else {
            alert('Failed to delete the task')
        }

    }

    console.log(arrOfTransactions)

    sumAllComes()
    setProgress()

})

historyList.addEventListener('click', (event) => {
    if (event.target.classList.contains('budget_item-wrapper')) {
        const transactionBlock = event.target
        const transactionCommentary = transactionBlock.querySelector('.budget_item-commentary')

        if (transactionCommentary) {
            transactionCommentary.classList.toggle('active');
        }

    }
})

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
    console.log(totalIncomePlan, totalIncomeFact, totalIncomeRatio)

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

addTransactionButton.addEventListener('click', handleAddTransaction)

