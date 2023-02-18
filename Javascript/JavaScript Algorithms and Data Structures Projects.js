function checkCashRegister(price, cash, cid) {
  let change = parseFloat((cash - price).toFixed(2));
  const initialChange = change;
  let totalAmountCid = parseFloat(cid.reduce((sum, current) => sum + current[1], 0).toFixed(2));

  let ret = {
    status: 'OPEN', 
    change: []
  };

  const correspondance = {
    'ONE HUNDRED': 100,
    'TWENTY': 20,
    'TEN': 10,
    'FIVE': 5,
    'ONE': 1,
    'QUARTER': 0.25,
    'DIME': 0.1,
    'NICKEL': 0.05,
    'PENNY': 0.01,
  }

  if (totalAmountCid < change) {
    return {
      status: 'INSUFFICIENT_FUNDS',
      change: []
    };
  } else if (totalAmountCid === change) {
    return {
      status: 'CLOSED',
      change: [...cid]
    };
  }

  let nbUnits = 0;
  let currentCidUnit = [];
  for (let key of Object.keys(correspondance)) {
    if (change >= correspondance[key]) {
      nbUnits = Math.floor(change / correspondance[key]);
      currentCidUnit = cid.filter(arr => (arr.indexOf(key) !== -1));

      if (currentCidUnit[0][1] >= nbUnits * correspondance[key]) {
        ret['change'].push([key, nbUnits * correspondance[key]]);
        change -= nbUnits * correspondance[key];
      } else {
        ret['change'].push([key, currentCidUnit[0][1]]);
        change -= currentCidUnit[0][1];
      }

      change = parseFloat(change.toFixed(2));
    }
  }

  let totalInRet = ret.change.reduce((sum, current) => (sum + current[1]), 0);
  if (totalInRet < initialChange) {
    return {
      status: 'INSUFFICIENT_FUNDS',
      change: []
    };
  }

  return ret;
}

console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))
