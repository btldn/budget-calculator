import addTransactionRequest from "./modules/api.js"

const inputSource = document.querySelector('.budget_input-source')
const inputCategory = document.querySelector('.budget_input-category')
const inputAmount = document.querySelector('.budget_input-amount')
const inputCommentary = document.querySelector('.budget_input-commentary')

const addTransactionButton = document.querySelector('.budget_inputs-add')

const historyList = document.querySelector('.budget_list')

function handleAddTransaction() {
    const transaction = {
        category: inputCategory.value,
        source: inputSource.value,
        amount: +inputAmount.value,
        commentary: inputCommentary.value
    }

    const response = addTransactionRequest(transaction)

    console.log(3132)

    inputAmount.value = ''
    inputCommentary.value = ''

}

addTransactionButton.addEventListener('click', handleAddTransaction)

