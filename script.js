function calculateFees() {
  const level = document.getElementById('level').value;
  const subjects = parseInt(document.getElementById('subjects').value);
  const siblings = parseInt(document.getElementById('siblings').value);
  const paymentPlan = document.getElementById('paymentPlan').value;

  const baseFeePerSubject = getBaseFee(level); // Fetch the base fee for the level
  const baseFee = baseFeePerSubject * subjects; 

  const bundleDiscount = calculateBundleDiscount(subjects);
  const siblingDiscount = calculateSiblingDiscount(siblings, baseFee);
  const paymentPlanDiscount = calculatePaymentPlanDiscount(paymentPlan, baseFee);

  const registrationFee = 30;
  const materialsFee = 60;
  const refundableDeposit = 50;

  let totalBeforeGST = baseFee - bundleDiscount - siblingDiscount - paymentPlanDiscount + registrationFee + materialsFee + refundableDeposit;
  let gst = totalBeforeGST * 0.09;
  let total = totalBeforeGST + gst;

  // Update the table with the breakdown
  document.getElementById('baseFee').innerText = `$${baseFee.toFixed(2)}`;
  document.getElementById('bundleDiscount').innerText = `$${bundleDiscount.toFixed(2)}`;
  document.getElementById('siblingDiscount').innerText = `$${siblingDiscount.toFixed(2)}`;
  document.getElementById('paymentPlanDiscount').innerText = `$${paymentPlanDiscount.toFixed(2)}`;
  document.getElementById('gstAmount').innerText = `$${gst.toFixed(2)}`;
  document.getElementById('totalFee').innerText = `$${total.toFixed(2)}`;

  document.getElementById('feeBreakdown').style.display = 'block';
}

function getBaseFee(level) {
  const fees = {
    'K2': 200,
    'Primary 1': 220,
    'Primary 2': 220,
    'Primary 3': 250,
    'Primary 4': 250,
    'Primary 5': 280,
    'Primary 6': 280,
    'Secondary 1': 320,
    'Secondary 2': 320,
    'Secondary 3': 350,
    'O/N Levels': 400
  };
  return fees[level] || 0;
}

function calculateBundleDiscount(subjects) {
  if (subjects > 3) {
    return (subjects - 3) * 10;
  }
  return 0;
}

function calculateSiblingDiscount(siblings, baseFee) {
  if (siblings > 0) {
    return baseFee * 0.05;
  }
  return 0;
}

function calculatePaymentPlanDiscount(paymentPlan, baseFee) {
  if (paymentPlan === 'halfYearly') {
    return baseFee * 0.02;
  } else if (paymentPlan === 'annually') {
