let JUJEtransactions = [{
    date: '21-04-2024',
    transactions: [
        { amount: 321, date: '21-04-2024', type: 'sber' },
        { amount: 432, date: '21-04-2024', type: 'sber' }
    ]
},

{
    date: '26-04-2024',
    transactions: [
        { amount: -235, date: '26-04-2024', type: 't-bank' },
        { amount: -622, date: '26-04-2024', type: 't-bank' }
    ]
}

]


let KUROCHKU_KUPIL = { amount: -999, date: '21-04-2024', type: 't-bank' }
let aboba = '21-04-2024'

function addTransaction() {
    const exile = transactions.find(transactions => transactions.date === aboba)
    exile.transactions.push(KUROCHKU_KUPIL)
    return t
}


let jazz = 'abao 0'

console.log(jazz.slice(0, -2))