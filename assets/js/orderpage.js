const orderpagediv = document.getElementById('orderpagediv');

function getProducts() {
    orderpagediv.innerHTML = '';
    let orderpage = JSON.parse(localStorage.getItem('orderpage')) || [];
    
    orderpage.forEach((item, index) => {
        let box = document.createElement('div');
        box.className = 'orderbox col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12';
        box.innerHTML = `
            <div class="boxdiv">
                <img src="${item.image}">
                <p class="name">${item.Name}</p>
                <p>Current Bid: ${item.CurrentBid}</p>
                <p>Auction start date: ${item.StartDate}</p>
                <p>Auction end date: ${item.EndDate}</p>
            </div>
        `;
        orderpagediv.appendChild(box);
    });
}

getProducts();

function submitForm(event) {
    event.preventDefault();  

    const nameSurnameInput = document.getElementById('nameSurname');
    const emailInput = document.getElementById('email');
    const phoneNumberInput = document.getElementById('phoneNumber');
    const offerPriceInput = document.getElementById('offerPrice');
    const successMessageDiv = document.getElementById('successMessage');
    const orderForm = document.getElementById('orderform');

    if (!nameSurnameInput.value || !emailInput.value || !phoneNumberInput.value || !offerPriceInput.value) {
        alert('Please fill out all fields.');
        return;
    }

    successMessageDiv.style.display = 'block';

    // Formu gizle
    orderForm.style.display = 'none';
}



