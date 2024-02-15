const ourproducts = document.getElementById('ourproducts');
const pagination = document.getElementById('pagination');
const nextButtonContainer = document.getElementById('nextButtonContainer');
let currentPage = 1;

function getProducts(page) {
  axios.get(`https://655c2fe4ab37729791aa011f.mockapi.io/swp102/products?page=${page}&limit=4`)
    .then(res => {
      products = res.data;
      ourproducts.innerHTML = '';

      products.map((item, index) => {
        let box = document.createElement('div');
        box.className = 'box col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3';
        box.innerHTML = `
          <div class="boxproducts">
            <img src="${item.image}" alt="">
            <h1>${item.Name}</h1>
            <p>${item.CurrentBid}</p>
            <button class="detailbtn" onclick="addtodetailpage(${item.id})"><a href="/detailpage.html">View Details</a></button>
            <div class="btns">
              <button onclick="addtoorderpage(${item.id})"><i class="fa-solid fa-gavel"></i></button>
              <button onclick="addtowishlist(${item.id})"><i class="fa-regular fa-heart"></i></button>
            </div>
          </div>
        `;
        ourproducts.appendChild(box);
      });

      // Sayfa sonuna gelindiğinde Next butonunu kontrol et
      if (products.length < 4) {
        nextButtonContainer.style.display = 'none';
      } else {
        nextButtonContainer.style.display = 'block';
      }
    })
    .catch(error => console.error('Error fetching products:', error));
}

getProducts(currentPage);

function changePage(pageChange) {
  currentPage += pageChange;
  if (currentPage < 1) {
    currentPage = 1;
  }
  document.getElementById('currentPage').innerText = currentPage;
  getProducts(currentPage);
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
getProducts()


function addtoorderpage(id) {
  let orderpage = JSON.parse(localStorage.getItem('orderpage')) || [];
  orderpage.push(products.find(item => item.id == id));
  const maxOrderPageItems = 1;
  if (orderpage.length > maxOrderPageItems) {
    orderpage.shift();
  }
  localStorage.setItem('orderpage', JSON.stringify(orderpage));

  let myorders = JSON.parse(localStorage.getItem('myorders')) || [];
  let selectedProduct = products.find(item => item.id == id);

  if (selectedProduct) {
    myorders.push(selectedProduct);
    localStorage.setItem('myorders', JSON.stringify(myorders));
    console.log('Ürün başarıyla myorders\'a eklendi:', selectedProduct);
  } else {
    console.error('Ürün bulunamadı.');
  }

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
        <p>
        ${item.CurrentBid}
    </p>
        <button class="detailbtn" onclick="addtodetailpage(${item.id})"><a href="/detailpage.html">View Details</a></button>

      <div class="btns">
    <button onclick="addtoorderpage(${item.id})"><i class="fa-solid fa-gavel"></i>
    </button>
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
                <p>
                ${item.CurrentBid}
            </p>
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
                    <p>
                    ${item.CurrentBid}
                </p>
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
                        <p>
                        ${item.CurrentBid}
                    </p>
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
            }
            filterdata.addEventListener('change',sortdataZA)

            const newsaboutcars= document.getElementById('newsaboutcars')
            
            function getnews () {
            
                 axios.get(`https://655c2fe4ab37729791aa011f.mockapi.io/swp102/basket`)
                .then(res=>{
                  news = res.data
                    news.map((item,index)=>{
                        let newsbox = document.createElement('div')
                        newsbox.className = 'newsbox col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4'
                        newsbox.innerHTML = `
                    <div class="news">
                    <img src="${item.image}" alt="">
                    <h1>${item.title}</h1>
                    <p>${item.abbreviation}<p>
                  
                    <button class="ReadMore" onclick="addtonewspage(${item.id})"><a href="/news.html">Read More</a><i class="fa-solid fa-arrow-right"></i></button>
            
            </div>
                    `
                
                    newsaboutcars.appendChild(newsbox)
                    })
                  
                })
            }
            function addtonewspage(id) {
              let newspage = JSON.parse(localStorage.getItem('newspage')) || [];
              newspage.push(news.find(item => item.id == id));
              const maxNewsPageItems = 1;
              if (newspage.length > maxNewsPageItems) {
                newspage.shift();
              }
              localStorage.setItem('newspage', JSON.stringify(newspage));
            }
            getnews()

         





