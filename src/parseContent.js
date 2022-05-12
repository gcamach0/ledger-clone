const identifyLineContent = {
  unused: (line) =>
    /^[;#%|*][ ].+/.test(line) || line === "" || line.startsWith("!include"),
  transaction: (line) =>
    /^\d{4}\/(0[1-9]|[1-9]|1[0-2])\/(0[1-9]|[1-9]|[12][0-9]|3[01]])[ ].+/.test(
      line
    ),
};

export function parseRawContent(linesOfContent) {
  let transactionsList = [];

  linesOfContent.forEach((line) => {
    if (identifyLineContent["unused"](line)) return;

    if (identifyLineContent["transaction"](line)) {
      transactionsList.push({
        date: line.match(
          /^\d{4}\/(0[1-9]|[1-9]|1[0-2])\/(0[1-9]|[1-9]|[12][0-9]|3[01]])/
        )[0],
        name: line.match(/[a-z].*/i)[0],
        movements: [],
      });
      return;
    }
    const movementDescription = line.match(/([a-z]|:)+/i)[0];
    const isBitcoin = /BTC/.test(line);
    const isCash = /\$([0-9]+\.?)+/.test(line);
    const isBlank = !isBitcoin && !isCash;
    let movementAmount;
    let amountOnly;
    if (isBitcoin) {
      movementAmount = line.match(/-?([0-9]+\.?)+[ ]BTC$/)[0];
      amountOnly = parseFloat(line.match(/-?([0-9]+\.?)+/)[0]);
    } else if (isCash) {
      movementAmount = line.match(/-?\$([0-9]+\.?)+$/)[0];
      amountOnly = parseFloat(movementAmount.replace(/\$/, ""));
    }
    transactionsList[transactionsList.length - 1]["movements"].push({
      description: movementDescription,
      amount: movementAmount,
      amountOnly,
      isBitcoin,
      isCash,
      isBlank,
    });
  });
  return transactionsList;
}
