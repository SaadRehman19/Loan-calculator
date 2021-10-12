document.getElementById('loan-form').addEventListener('submit', function(e) {
    //show loader;
    document.getElementById('loading').style.display = 'block';

    //hide result
    document.getElementById('results').style.display = 'none';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

//calculatResults
function calculateResults() {
    // console.log(e);
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    //compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);

        //show results
        document.getElementById('results').style.display = 'block';

        //hide loader
        document.getElementById('loading').style.display = 'none';


    } else {
        showError('Please enter correct input');
        document.getElementById('loading').style.display = 'none';

        // console.log("Please enter correct input")
    }
    //SET TO LOCAL STORAGE 
    storeTaskInLocalStorage(monthlyPayment.value);
}
//store payment value in local storage

function storeTaskInLocalStorage(value) {
    let MonthlyPayment;
    if (localStorage.getItem('MonthlyPayment') === null) {
        MonthlyPayment = [];
    } else {
        MonthlyPayment = JSON.parse(localStorage.getItem('MonthlyPayment'));
    }
    MonthlyPayment.push(value);

    localStorage.setItem('MonthlyPayment', JSON.stringify(MonthlyPayment));

}

//show error 
function showError(message) {

    //create a div
    const errorDiv = document.createElement('div');

    //add a class
    errorDiv.className = 'alert alert-danger';

    //add a text
    errorDiv.appendChild(document.createTextNode(message));

    //get element to insert error
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //insert error above heading
    card.insertBefore(errorDiv, heading);

    //clear error after 3 seconds
    setTimeout(clearError, 3000); //it takes ms so 1000ms=1s 
    // console.log(heading);
}

function clearError() {
    document.querySelector('.alert').remove();
}

//save it to local storage