import Web3  from 'web3'

export function fromWei(amountOf) {
    const  web3      = new Web3()
    const  amountWei = amountOf.toString()
    const  amountEth = web3.utils.fromWei(amountWei, 'ether')
    return amountEth
}

export function toWei(amountOf) {
    const  web3      = new Web3()
    const  amountEth = amountOf.toString()
    const  amountWei = web3.utils.toWei(amountEth, 'ether')
    return amountWei  
}

export function toDate(_unixSeconds) {
    return new Date(_unixSeconds * 1000)
}

export function abbreviate(address) {
    let addr, start, end, abbr

    addr  = address
    start = addr.substring(0, 4)
    end   = addr.substring((addr.length - 4), addr.length)
    abbr  = start + '...' + end

    return abbr
}

export function nickname(address) {
    let addr, name

    addr = address
    name = addr.substring(0, 4)

    return name
}

export function removespaces(string) {
    let joined = string.replace(/\s+/g, '')
    let noChar = joined.replace(/[^a-zA-Z ]/g, '')
    let result = noChar.toLowerCase()
    return result
}

export function scrollTo(target) {
    var element = document.getElementById(target)
    element.scrollIntoView({behavior: "smooth"})
}

export function isEqual(a, b) {
    return a.toUpperCase() === b.toUpperCase()
}

export function toAPY(rate) {
    const P = 100                   //principle amount
    const R = (rate * 365) / 100    //for annual rate as decimal
    const t = 1                     //years
    const n = 365                   //number of times compounding per t

    const amount = P * (Math.pow((1 + (R / n)), (n * t)))
    const interest = amount - P
    return interest
}

export function isMobile(dimensions) {
    return dimensions.width < 1000
}