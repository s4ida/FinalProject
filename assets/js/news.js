const carsnews = document.getElementById('carsnews')
const commentdiv = document.getElementById('commentdiv')
function getproducts(){
    carsnews.innerHTML = ''
    commentdiv.innerHTML = ''
    let newspage = JSON.parse(localStorage.getItem('newspage')) || []
    newspage.map((item,index)=>{
        let news = document.createElement('div')
       news.className = 'news col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'
       news.innerHTML = `
        <div class="boxdiv row">
        <h1 class="title" > ${item.title}</h1>

        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
<div class="imgdiv">
<img src="${item.image1}">
</div>
</div>
<div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
<div class="imgdiv"> 
<img src="${item.image2}">
</div>
</div>
        <p>${item.news}</p>
        <p>${item.news2}</p>
        <p>${item.news3}</p>
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="imgdiv2">
        <img src="${item.image3}">
        </div>
        </div>
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="imgdiv2"> 
        <img src="${item.image4}">
        </div>
        </div>
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="imgdiv2">
        <img src="${item.image5}">
        </div>
        </div>
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
        <div class="imgdiv2"> 
        <img src="${item.image6}">
        </div>
        </div>
        </div>
        `
        let comments = document.createElement('div')
        comments.className = 'comments col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'
        comments.innerHTML = `
        <h1 style="color:#FF2800; font-size:35px; margin-top: 20px; margin-bottom: 20px;" >Comments:</h1>
        <div class="boxproducts">
               <h1>${item.user1}</h1>
               <p>${item.comment1}</p>
          <h1>${item.user2}</h1>
       <p>${item.comment2}</p>
        </div>
        `
        carsnews.appendChild(news)
        commentdiv.appendChild(comments)
    })
}
getproducts()


const starsContainer = document.getElementById('stars');

starsContainer.addEventListener('mouseover', (event) => {
    const hoveredStar = event.target;
    if (hoveredStar.classList.contains('star')) {
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


function getcommentss () {

    axios.get(`https://65cc140cdd519126b83e048a.mockapi.io/news/news`)
   .then(res=>{
      news = res.data
      news.map((item,index)=>{
           let comments = document.createElement('div')
           comments.className = 'comments col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'
           comments.innerHTML = `
         

       <div class="boxproducts">
       <h1>${item.Name}</h1>
       <p>${item.Comment}</p>
      
</div>
       `
   
       commentdiv.appendChild(comments)
       })
     
   })
}
getcommentss()

