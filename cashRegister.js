/**
 * Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

* cid is a 2D array listing available currency.

* The checkCashRegister() function should always return an object with a status key and a change key.
* @returns 

* Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

* Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

* Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Currency Unit	Amount
Penny	$0.01 (PENNY)
Nickel	$0.05 (NICKEL)
Dime	$0.1 (DIME)
Quarter	$0.25 (QUARTER)
Dollar	$1 (ONE)
Five Dollars	$5 (FIVE)
Ten Dollars	$10 (TEN)
Twenty Dollars	$20 (TWENTY)
One-hundred Dollars	$100 (ONE HUNDRED)
 * @param price 
 * @param cash 
 * @param cid 
 * 
 */
function checkCashRegister(price, cash, cid)
{
    let change = cash - price
    let changeX100 = change * 100
    let reqChangeArr = []
    let status = {
        status: '',
        change: []
    }
    // the value of change in the dollars for calculating total amount available
    let dollarChange = [.01, .05, .1, .25, 1, 5, 10, 20, 100].reverse()
    let dollarChangeX100 = [...dollarChange].map(item => item * 100)

    // total cash amount available in register 
    let cashAvail = cid
        .reduce((a, b) => a.concat(b))
        .filter(item => typeof (item) === "number")
        .reduce((a, b) => Math.round((a + b) * 100) / 100, 0)

    // total cash available from cash-in=drawer input in an array
    let cashAvailArr = cid
        .reduce((a, b) => a.concat(b))
        .filter(item => typeof (item) === "number")
        .reverse()

    // total individual bills available in the register 
    let billsAvailObj = cid
        .reverse()
        .reduce((acc, item, index) =>
        {
            let [key, value] = item
            acc[key] = Math.round(value / dollarChange[index])
            return acc
        },
        {})

    // check for cash availability 
    if (cashAvail < change)
    {
        status.status = "INSUFFICIENT_FUNDS"
    }
    // for the time when there is enough cash in the register
    else if (cashAvail > change)
    {
        for (let index = 0; index < cid.length; index++)
        {
            let billsReq = (Math.floor(changeX100 / dollarChangeX100[index]))

            if (billsReq == Object.values(billsAvailObj)[index])
            {
                reqChangeArr.push(billsReq)
                changeX100 = changeX100 % dollarChangeX100[index]

            }
            else if (billsReq > Object.values(billsAvailObj)[index])
            {
                reqChangeArr.push(Object.values(billsAvailObj)[index])
                changeX100 = ((billsReq - Object.values(billsAvailObj)[index]) * dollarChangeX100[index]) +
                    (changeX100 % dollarChangeX100[index])

            }
            else if (billsReq < Object.values(billsAvailObj)[index])
            {
                reqChangeArr.push(billsReq)
                changeX100 = Math.round((changeX100 % dollarChangeX100[index]) * 100) / 100

            }
            else if (billsReq == 0)
            {
                reqChangeArr.push(0)
            }
        }

        if (changeX100 != 0)
        {
            status.status = "INSUFFICIENT_FUNDS"
        }
        else
        {
            status.status = "OPEN"
        }
    }
    else if (cashAvail === change)
    {
        status.status = "CLOSED"
    }

    reqChangeArr = reqChangeArr.map((item, index) => item * dollarChange[index])

    let reqChangeObj = Object.keys(billsAvailObj)
        .reduce((acc, key, index) =>
        {
            acc[key] = reqChangeArr[index]
            return acc
        },
        {})
    // removing zeros from the object:
    let reqChangeObjFilter = Object.keys(reqChangeObj)
        .filter(k => reqChangeObj[k] > 0)
        .reduce(function (obj, key)
        {
            if (obj[key] != 0)
            {
                obj[key] = reqChangeObj[key]
            }
            return obj
        },
        {})

    if ((status.status === "OPEN"))
    {
        status.change = Object.entries(reqChangeObjFilter)
    }
    else if (status.status === "CLOSED")
    {
        status.change = cid.reverse()
    }

    return status

}
// test cases 

console.log(checkCashRegister(19.5, 20, [
    ["PENNY", 0.5],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
])) //should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}

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
console.log(checkCashRegister(19.5, 20, [
    ["PENNY", 0.01],
    ["NICKEL", 0],
    ["DIME", 0],
    ["QUARTER", 0],
    ["ONE", 0],
    ["FIVE", 0],
    ["TEN", 0],
    ["TWENTY", 0],
    ["ONE HUNDRED", 0]
])) // should return {status: "INSUFFICIENT_FUNDS", change: []}.

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
