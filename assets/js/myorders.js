const myordersdiv = document.getElementById('myordersdiv');
const confirmationModal = document.getElementById('confirmationModal');
const confirmButton = document.getElementById('confirmButton');
const cancelButton = document.getElementById('cancelButton');
let selectedIndex;

function getproducts() {
    myordersdiv.innerHTML = '';
    let myorders = JSON.parse(localStorage.getItem('myorders')) || [];
    myorders.map((item, index) => {
        let box = document.createElement('div');
        box.className = 'box col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4';
        box.innerHTML = `
            <div class="boxdiv">
                <img src="${item.image}">
                <p class="name">${item.Name}</p>
                <p>${item.CurrentBid}</p>
                <button onclick="showConfirmationModal(${index})">Cancel order</button>
            </div>
        `;
        myordersdiv.appendChild(box);
    });
}

getproducts();

function showConfirmationModal(index) {
    selectedIndex = index;
    confirmationModal.style.display = 'block';
}

function confirmCancellation() {
    confirmationModal.style.display = 'none';
    cancelOrder(selectedIndex);
}

function cancelCancellation() {
    confirmationModal.style.display = 'none';
}

function cancelOrder(index) {
    let myorders = JSON.parse(localStorage.getItem('myorders')) || [];
    myorders.splice(index, 1);
    localStorage.setItem('myorders', JSON.stringify(myorders));
    getproducts();
}
