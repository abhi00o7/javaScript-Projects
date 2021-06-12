/**
 * Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

* cid is a 2D array listing available currency.

* The checkCashRegister() function should always return an object with a status key and a change key.
* @returns 

* Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

* Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

* Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.
 * @param price 
 * @param cash 
 * @param cid 
 * 
 */

function checkCashRegister(price, cash, cid) {
    let change = cash - price
    let changeX100 =change*100
    let reqChangeArr = []

    let dollarChange = [.01, .05, .1, .25, 1, 5, 10, 20, 100].reverse()
    let dollarChangeX100 = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000].reverse()

    // console.log(cid)
    // console.log(dollarChange)
    // total cash available in register 
    let cashAvail = cid
        .reduce((a, b) => a.concat(b))
        .filter(item => typeof (item) === "number")
        .reduce((a, b) => Math.round((a + b) * 100) / 100, 0)

    let billsAvail = cid
        .reverse()
        .reduce((acc, item, index) => {
            let [key, value] = item
            acc[key] = Math.round(value / dollarChange[index])
            return acc
        }, {})
        // console.log(billsAvail)
    // return dollarChange

    if (cashAvail < change) {
        console.log("Change: " + change)
        console.log("Cash Available: " + cashAvail)
        return {
            status: "INSUFFICIENT_FUNDS",
            change: []
        }
    }
    // console.log ()
    // return change%dollarChange[1]
    for (let index = 0; index < cid.length; index++) {
        // let bills = (Math.round(change / dollarChange[index])*100)/100
        let billsReq = (Math.floor(changeX100 / dollarChangeX100[index]))

        console.log('index:'+index)
        console.log('bills Req:'+billsReq)
        console.log('change:'+changeX100)
        console.log('Available:'+ Object.values(billsAvail)[index])

        if (billsReq == Object.values(billsAvail)[index]) {
            
            console.log("inside if at index "+index)
            
            reqChangeArr.push(billsReq)
            // change = Math.round((change%dollarChange[index]*100))/100
            changeX100 = Math.round((changeX100 % dollarChangeX100[index]) * 100) / 100
        }
        else if(billsReq > Object.values(billsAvail)[index]){
            console.log("inside else at index "+index)
            
            reqChangeArr.push(Object.values(billsAvail)[index])

            let billsDiff = billsReq - Object.values(billsAvail)[index]

            console.log("bills Diff:"+billsDiff)

            let a = (Math.round((billsDiff * dollarChangeX100[index])*100)/100)
            let b = ((Math.round((changeX100%dollarChangeX100[index])*100)/100))
            
            changeX100 = a+b

            console.log("change Inside else "+ changeX100)


        }

        else if( billsReq < Object.values(billsAvail)[index] ){
            
            reqChangeArr.push(billsReq)
            changeX100 = Math.round((changeX100 % dollarChangeX100[index]) * 100) / 100

        }

        else if(billsReq == 0){
            
            reqChangeArr.push(0)

            // changeX100 
        }

    console.log()

    }
    return reqChangeArr.map((item,index) => item * dollarChange[index])
}

// console.log(Math.floor(9674/2000))
// console.log(Number(Math.round((96.74 % 20) * 100 + 'e2') + 'e-2')
// )
// console.log)()
// console.log(checkCashRegister(19.5, 20, [
//     ["PENNY", 1.01],
//     ["NICKEL", 2.05],
//     ["DIME", 3.1],
//     ["QUARTER", 4.25],
//     ["ONE", 90],
//     ["FIVE", 55],
//     ["TEN", 20],
//     ["TWENTY", 60],
//     ["ONE HUNDRED", 100]
// ]))

// console.log(checkCashRegister(19.5, 20, [
//     ["PENNY", 0.01],
//     ["NICKEL", 0],
//     ["DIME", 0],
//     ["QUARTER", 0],
//     ["ONE", 0],
//     ["FIVE", 0],
//     ["TEN", 0],
//     ["TWENTY", 0],
//     ["ONE HUNDRED", 0]
// ])) // should return {status: "INSUFFICIENT_FUNDS", change: []}.

console.log(checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
])) // should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.)
console.log(checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]))
/**

 
 // test cases 
checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]) // should return an object.

checkCashRegister(19.5, 20, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]) // should return {status: "OPEN", change: [["QUARTER", 0.5]]}.

checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 1],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
]) // should return {status: "INSUFFICIENT_FUNDS", change: []}.

checkCashRegister(19.5, 20, [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
]) // should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.

 */