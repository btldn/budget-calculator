import { createTransaction } from "../index.js"

export const mapOfTransactions = new Map()
export const arrOfDates = []
export let arrOfTransactions = []

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
        } 

        // ошибка с тем, что прохожусь по двум транкзациям с одинаковой датой,
        // тут нужен values()?

        for (let transaction of transactions) {
            if (mapOfTransactions.has(transaction.date)) {
                arrOfTransactions.push({
                    date: transaction.date,
                    transactions: mapOfTransactions.get(transaction.date)
                })
            } 
        } 

        console.log(arrOfTransactions)
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