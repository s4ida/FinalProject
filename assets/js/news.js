const carsnews = document.getElementById('carsnews')

function getproducts(){
    carsnews.innerHTML = ''
    let newspage = JSON.parse(localStorage.getItem('newspage')) || []
    newspage.map((item,index)=>{
        let news = document.createElement('div')
       news.className = 'news col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'
       news.innerHTML = `
        <div class="boxdiv row">
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
<div class="imgdiv">
<img  style="width: 100%;height:100%; margin-bottom:15px" src="${item.image1}">
</div>
</div>
<div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
<div class="imgdiv"> 
<img  style="width: 100%; height:100%; margin-bottom:15px" src="${item.image2}">
</div>
</div>

     

        <h1 class="title" > ${item.title}</h1>
        <p>${item.news}</p>
        <p>${item.news2}</p>
        <p>${item.news3}</p>
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="imgdiv">
        <img  style="width: 90%; height:80%;margin-bottom:10px" src="${item.image3}">
        </div>
        </div>
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="imgdiv"> 
        <img  style="width: 90%; height:80%;margin-bottom:10px" src="${item.image4}">
        </div>
        </div>
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="imgdiv">
        <img style="width: 90%; height:80%;margin-bottom:10px" src="${item.image5}">
        </div>
        </div>
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="imgdiv"> 
        <img style="width: 90%; height:80%;margin-bottom:10px" src="${item.image6}">
        </div>
        </div>
        </div>
        `
        carsnews.appendChild(news)
    })
}
getproducts()
const starsContainer = document.getElementById('stars');

starsContainer.addEventListener('mouseover', (event) => {
    const hoveredStar = event.target;
    if (hoveredStar.classList.contains('star')) {
        // Diğer yıldızlara ışıltı eklemek için
        const stars = Array.from(starsContainer.children);
        const hoverIndex = stars.indexOf(hoveredStar);

        stars.forEach((star, index) => {
            if (index <= hoverIndex) {
                star.classList.add('active');
            } else {
                star.classList.remove('active');
            }
        });
    }
});

starsContainer.addEventListener('click', (event) => {
    const clickedStar = event.target;
    if (clickedStar.classList.contains('star')) {
        const ratingValue = clickedStar.getAttribute('data-value');
        alert(`Thanks for rating! You gave ${ratingValue} stars.`);
        // Burada sunucuya bu değerlendirmeyi göndermek için bir AJAX veya başka bir yöntem kullanabilirsiniz.
    }
});


const Name = document.getElementById('name')
const comment = document.getElementById('comment')

function postdata(e){
    e.preventDefault()
    axios.post(`https://65cc140cdd519126b83e048a.mockapi.io/news/news`,{
        Name:Name.value,        
Comment:comment.value
    })
    .then(res=>{
        getproducts()
        postform.reset()
    })
}
postform.addEventListener('submit',postdata)

const commentdiv = document.getElementById('commentdiv')

function getcomments () {

    axios.get(`https://65cc140cdd519126b83e048a.mockapi.io/news/news`)
   .then(res=>{
      news = res.data
      news.map((item,index)=>{
           let commentbox = document.createElement('div')
           commentbox.className = 'commentbox col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'
           commentbox.innerHTML = `
       <div class="boxproducts">
       <h1>${item.Name}</h1>
       <p>${item.Comment}</p>



</div>
       `
   
       commentdiv.appendChild(commentbox)
       })
     
   })
}
getcomments()

