const wishlistdiv = document.getElementById('wishlistdiv')

function getproducts(){
    wishlistdiv.innerHTML = ''
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || []
  wishlist.map((item,index)=>{
        let box = document.createElement('div')
        box.className = 'box col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4'
        box.innerHTML = `
        <div class="boxdiv">
        <img src="${item.image}">
        <p class="name">${item.Name}</p>
        <p>${item.CurrentBid}</p>
        <button onclick="remove(${index})"><i class="fa-solid fa-trash"></i></button>
        </div>
        `
        wishlistdiv.appendChild(box)
    })
}
getproducts()

function remove(index){
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || []
wishlist.splice(index,1)
localStorage.setItem('wishlist',JSON.stringify(wishlist))
getproducts()
}