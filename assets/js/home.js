const ourproducts = document.getElementById ('ourproducts')
const pagination = document.getElementById('pagination')


function getproducts () {

     axios.get(`https://655c2fe4ab37729791aa011f.mockapi.io/swp102/products`)
    .then(res=>{
        products = res.data
       products.map((item,index)=>{
            let box = document.createElement('div')
            box.className = 'box col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3'
        box.innerHTML = `
        <div class="boxproducts">
        <img src="${item.image}" alt="">
        <h1>${item.Name}</h1>
        <button class="detailbtn" onclick="addtodetailpage(${item.id})"><a href="/detailpage.html">View Details</a></button>

      <div class="btns">
    <button onclick="addtoorderpage(${item.id})"><i class="fa-solid fa-gavel"></i>
    </button>
    <button onclick="addtowishlist(${item.id})"><i class="fa-regular fa-heart"></i></button>

</div>
</div>
        `
    
        ourproducts.appendChild(box)
        })
      
    })
}
function addtodetailpage(id) {
  let detailpage = JSON.parse(localStorage.getItem('detailpage')) || [];
      detailpage.push(products.find(item => item.id == id));
  const maxDetailPageItems = 1;
  if (detailpage.length > maxDetailPageItems) {
      detailpage.shift();
  }
  localStorage.setItem('detailpage', JSON.stringify(detailpage));
}
getproducts()


function addtoorderpage(id) {
  // Order page için güncelleme
  let orderpage = JSON.parse(localStorage.getItem('orderpage')) || [];
  orderpage.push(products.find(item => item.id == id));
  const maxOrderPageItems = 1;
  if (orderpage.length > maxOrderPageItems) {
    orderpage.shift();
  }
  localStorage.setItem('orderpage', JSON.stringify(orderpage));

  // My Orders için güncelleme
  let myorders = JSON.parse(localStorage.getItem('myorders')) || [];
  let selectedProduct = products.find(item => item.id == id);

  if (selectedProduct) {
    myorders.push(selectedProduct);
    localStorage.setItem('myorders', JSON.stringify(myorders));
    console.log('Ürün başarıyla myorders\'a eklendi:', selectedProduct);
  } else {
    console.error('Ürün bulunamadı.');
  }

  // Sayfayı yönlendirme
  window.location.href = 'orderpage.html';
}







function addtowishlist(id){
  let wishlist= JSON.parse(localStorage.getItem('wishlist')) || []
  let productitem = wishlist.find((item)=>item.id == id)
  if(productitem){
    alert('This product is already in favorites')
  }
  else{
      wishlist.push(products.find(item=>item.id == id))
      localStorage.setItem('wishlist',JSON.stringify(wishlist))

  }

}



const searchinput = document.getElementById('searchinput');
const searchform = document.getElementById('searchform');



function searchbyname(e) {
  ourproducts.innerHTML = '';
  e.preventDefault();
  axios.get(`https://655c2fe4ab37729791aa011f.mockapi.io/swp102/products`)
    .then(res => {
      const products = res.data;
      const searchdata = products.filter((item) => item.Name.toLowerCase().startsWith(searchinput.value.toLowerCase()));
      searchdata.map(item => {
        const sortproducts = document.createElement('div');
        sortproducts.className = "box col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3"
        sortproducts.innerHTML = `
          <div class="boxproducts">
            <img src="${item.image}" alt="">
            <h1>${item.Name}</h1>
   
            <button class="detailbtn"   onclick="openProductDetail(${item.id})">View Details</button>
            <div class="btns">
            <button onclick="addtobasket(${item.id})"><i class="fa-solid fa-cart-shopping"></i></button>
            <button onclick="addtowishlist(${item.id})"><i class="fa-regular fa-heart"></i></button>
        
        </div>
          </div>
        `;
        ourproducts.appendChild(sortproducts);
      });
    });
}

searchform.addEventListener('submit', searchbyname);


const filterdata = document.getElementById('filterdata')
// function openProductDetail(productId) {
//     console.log(`Open product detail for ID: ${productId}`);
//   }
function sortdatadefault(){
   ourproducts.innerHTML = ''
    let selectvalue = filterdata.value
    if(selectvalue==='1'){
        axios.get(`https://655c2fe4ab37729791aa011f.mockapi.io/swp102/products`)
        .then(res=>{
            products = res.data
            products.map(item=>{
                let box= document.createElement('div')
                box.className = "box col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3"

                box.innerHTML = `   
                <div class="boxproducts">
                <img src="${item.image}" alt="">
                <h1>${item.Name}</h1>
  
                <button class="detailbtn"  onclick="openProductDetail(${item.id})">View Details</button>
                <div class="btns">
                <button onclick="addtobasket(${item.id})"><i class="fa-solid fa-cart-shopping"></i></button>
                <button onclick="addtowishlist(${item.id})"><i class="fa-regular fa-heart"></i></button>
            
            </div>
              </div>
                `
             ourproducts.appendChild(box)
            })
          
        })
    }
    }
    filterdata.addEventListener('change',sortdatadefault)


    function sortdataAZ(){
       ourproducts.innerHTML = ''
        let selectvalue = filterdata.value
        if(selectvalue==='2'){
            axios.get(`https://655c2fe4ab37729791aa011f.mockapi.io/swp102/products`)
            .then(res=>{
                products = res.data
                let sortaz = products.sort((a,b)=>a.Name.localeCompare(b.Name))
                sortaz.map(item=>{
                    let box = document.createElement('div')
                    box.className = "box col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3"

                    box.innerHTML = `   
                    <div class="boxproducts">
                    <img src="${item.image}" alt="">
                    <h1>${item.Name}</h1>
     
                    <button class="detailbtn"  onclick="openProductDetail(${item.id})">View Details</button>
                    <div class="btns">
                    <button onclick="addtobasket(${item.id})"><i class="fa-solid fa-cart-shopping"></i></button>
                    <button onclick="addtowishlist(${item.id})"><i class="fa-regular fa-heart"></i></button>
                
                </div>
                  </div>
                    `
                  ourproducts.appendChild(box)
                })
              
            })
        }
        }
        filterdata.addEventListener('change',sortdataAZ)

        function sortdataZA(){
            ourproducts.innerHTML = ''
            let selectvalue = filterdata.value
            if(selectvalue==='3'){
                axios.get(`https://655c2fe4ab37729791aa011f.mockapi.io/swp102/products`)
                .then(res=>{
                    products = res.data
                    let sortza = products.sort((a,b)=>b.Name.localeCompare(a.Name))
                    sortza.map(item=>{
                        let box = document.createElement('div')
                        box.className = "box col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3"
                        box.innerHTML = `   
                        <div class="boxproducts">
                        <img src="${item.image}" alt="">
                        <h1>${item.Name}</h1>
                                            <button onclick="openProductDetail(${item.id})">View Details</button>
                        <div class="btns">
                        <button onclick="addtobasket(${item.id})"><i class="fa-solid fa-cart-shopping"></i></button>
                        <button onclick="addtowishlist(${item.id})"><i class="fa-regular fa-heart"></i></button>
                    
                    </div>
                      </div>
                        `
                       ourproducts.appendChild(box)
                    })
                  
                })
            }
            }
            filterdata.addEventListener('change',sortdataZA)




         





