import { createTransaction } from "../index.js"

export const mapOfTransactions = new Map()
export const arrOfDates = []
export let arrOfTransactions = []
export let maxId = 0

const historyUrl = 'https://680256170a99cb7408e950d7.mockapi.io/transactions'

export default async function getTransactions() {
    try {
        const response = await fetch(historyUrl)
        const transactions = await response.json()

        for (let transaction of transactions) {
            if (mapOfTransactions.has(transaction.date)) {
                mapOfTransactions.get(transaction.date).push(transaction)
            } else {
                mapOfTransactions.set(transaction.date, [transaction])
            }

            if (maxId < +transaction.id) {
                maxId = +transaction.id
            }
        } 

        for (let [date, transactionsOfDay] of mapOfTransactions) {
            let total = 0

            for (let dateTransaction of transactionsOfDay) {
                total += dateTransaction.amount
            }

            arrOfTransactions.push({
                date,
                transactions: transactionsOfDay,
                amountOfDay: total,
            });

            total = 0
        }


    } catch (error) {

    }
    
}

await getTransactions() 

export async function addTransactionRequest(date, transaction) {
    try {
        const response = await fetch(historyUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(transaction)
        })

        console.log(date, transaction)
        createDate(date, transaction)
        

        return response
        
    } catch (error) {

    }
}

export async function deleteTransactionRequest(transactionId) {
    try {
        const response = await fetch(`${historyUrl}/${transactionId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        })
        return response
    } catch (error) {
    
    }
}