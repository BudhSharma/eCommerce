const usedNumbers = new Set();

function generateUniqueNumber() {
  let uniqueNumber;
  do {
    uniqueNumber = Math.floor(1000 + Math.random() * 9000);
  } while (usedNumbers.has(uniqueNumber));

  usedNumbers.add(uniqueNumber);
  return uniqueNumber;
}

module.exports = { generateUniqueNumber };
