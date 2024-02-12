const detailpagediv = document.getElementById('detailpagediv');
const features = document.getElementById('features')
const photos = document.getElementById('photos')
const descriptionsdiv = document.getElementById('descriptionsdiv')
function getproducts() {
photos.innerHTML = '';
descriptionsdiv.innerHTML = '' ;

    let detailpage = JSON.parse(localStorage.getItem('detailpage')) || [];
    console.log(detailpage);

  
    detailpage.map((item) => {
        const ul= document.createElement('ul');
       ul.innerHTML = `
        <li><span>Name:</span>${item.Name}</li>
        <li><span>Current Bid:</span>${item.CurrentBid}</li>
        <li><span>Milleage:</span>${item.Mileage}</li>
        <li><span>Fuel Type:</span>${item.FuelType}</li>
        <li><span>Year:</span>${item.Year}</li>
        <li><span>Airbags:</span>${item.Airbags}</li>
        <li><span>Body:</span>${item.Body}</li>
        <li><span>Color:</span>${item.Color}</li>
        <li><span>Seats:</span>${item.Seats}</li>
        <li><span>Door:</span>${item.Door}</li>
        <li><span>Gearbox:</span>${item.Gearbox}</li>
        <li><span>Climitisation:</span>${item.Climatisation}</li>
        <li><span>Parking:</span>${item.Parking}</li>
        <li><span>Power:</span>${item.Power}</li>
        

        `;
        const container= document.createElement('div');
        container.className = "photo-container"
        container.innerHTML = `
        <div class="card">
        <img src="${item.image1}">
        <div class="card__head">Front view</div>
      </div>
      <div class="card">
      <img src="${item.image2}">
      <div class="card__head">Side view</div>
    </div>   
    <div class="card">
    <img src="${item.image3}">
    <div class="card__head">View from behind</div>
  </div>   <div class="card">
  <img src="${item.image4}">
  <div class="card__head">Internal view</div>
</div>   <div class="card">
<img src="${item.image5}">
<div class="card__head">General appearance</div>
</div>
   
        `;

const descriptions = document.createElement('div')
descriptions.innerHTML = `
<p><span>Description:</span>${item.Description}</p>
<p><span>Design:</span>${item.Description1}</p>
<p><span>Engine:</span>${item.Description2}</p>
<p><span>Transmission:</span>${item.Description3}</p>

`



        photos.appendChild(container);
     features.appendChild(ul);
     descriptionsdiv.appendChild(descriptions)
    });
}
getproducts();
