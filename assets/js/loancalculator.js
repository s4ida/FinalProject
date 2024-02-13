function calculateLoan() {
    const loanAmount = parseFloat(document.getElementById('loanAmount').value.replace(',', '')) || 0;
    const interestRate = parseFloat(document.getElementById('interestRate').value.replace(',', '')) || 0;
    const loanTerm = parseInt(document.getElementById('loanTerm').value) || 0;
    const downPayment = parseFloat(document.getElementById('downPayment').value.replace(',', '')) || 0;
    const tradeInValue = parseFloat(document.getElementById('tradeInValue').value.replace(',', '')) || 0;
    const salesTax = parseFloat(document.getElementById('salesTax').value.replace(',', '')) || 0;
  
    const totalLoanAmount = loanAmount - downPayment + (salesTax / 100) * loanAmount;
    const monthlyInterestRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm;
    const monthlyPayment = calculateMonthlyPayment(totalLoanAmount, monthlyInterestRate, numberOfPayments);
  
    const resultContainer = document.getElementById('result-container');
    resultContainer.innerHTML = `Monthly Installment ($): ${monthlyPayment.toFixed(2)}`;
  }
  
  function calculateMonthlyPayment(loanAmount, monthlyInterestRate, numberOfPayments) {
    const denominator = Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1;
    return loanAmount * (monthlyInterestRate + monthlyInterestRate / denominator);
  }
  