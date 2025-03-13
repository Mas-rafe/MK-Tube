// {
//     "category_id": "1001",
//     "video_id": "aaaa",
//     "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//     "title": "Shape of You",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//         }
//     ],
//     "others": {
//         "views": "100K",
//         "posted_date": "16278"
//     },
//     "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
// }


console.log("hello")
function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active")
  }
}
//loadCategories function used for recieved api
function loadCategories() {
  //1-fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //2-convert promise to json
    .then(res => res.json())
    //3- send data to display
    .then((data) => displayCategories(data.categories));
}

//used for fetch the videos 
function loadVideos(searchText = "") {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then(res => res.json())
    .then((data) => displayVideos(data.videos));
}
const loadCategoryVideos = (id) => {

  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`

  fetch(url)
    .then(res => res.json())
    .then((data) => {
      removeActiveClass()//no active class
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active")
      //console.log(clickedButton)
      displayVideos(data.category)
    })
}
const loadVideoDetails = (videoId) => {
  console.log(videoId)
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  fetch(url)
    .then(res => res.json())
    .then(data => displayVideoDetails(data.video))
}
const displayVideoDetails = (video) => {
  console.log(video)
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
<div class="card bg-slate-700 image-full  shadow-xl">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>If a dog chews shoes whose shoes does he choose?</p>
    <div class="card-actions justify-end">
     
    </div>
  </div>
</div>
`
}


//used for adding the nav buttons(music,comedy,drawing) by fetching API
function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (cat of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
           <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
         `;
    //console.log(categoryDiv)
    categoryContainer.append(categoryDiv)
  }
}




//after create div element by using the id of ("video-container") and then creates 
// an innerHtml with div.after that append the child(div) to the main containerr
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  //videoContainer.innerHTML="" : used for add datas after removing the previous datas
  videoContainer.innerHTML = "";
  if (videos.length == 0) {
    videoContainer.innerHTML = `
      <div class="py-28 col-span-full justify-center flex flex-col items-center text-center ">
            <img class="w-[120px]" src="assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Opps!!sorry, There is no content here</h2>
        </div>
    `;
    return;
  }
  videos.forEach(video => {
    //console.log(video)
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
         <div class="card bg-base-100  shadow-sm">
            <figure class="relative ">
                <img class="w-full h-[150px] object-cover " src="${video.thumbnail}" alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-white text-sm rounded bg-black px-2">3hrs 56 min ago</span>
            </figure>
           
            <div class=" flex gap-4 px-0 py-5">
                 <div class="avatar">
                    <div class="ring-primary ring-offset-base-100 w-8 h-8 rounded-full ring ring-offset-2">
                        <img src="${video.authors[0].profile_picture}" />
                    </div>
                </div>

                <div class="intro">
                    <h2 class="text-base font-semibold">Midnight Serenade</h2>
                    <div class="flex gap-2">
                        <p class="text-sm text-gray-400 ">${video.authors[0].profile_name}</p>
                         ${video.authors[0].verified == true ? 
                          ` <img class="w-5 h-5" src="https://img.icons8.com/?size=60&id=lalayI2ulYNt&format=png" alt="">`: ``
                         } 
                    </div>
                    <p class="text-sm text-gray-400">${video.others.views} views</p>
                </div>
            </div>
            <button onclick=loadVideoDetails('${video.video_id}')  class="btn btn-block">Show Details</button>
        </div>
 `
    videoContainer.append(videoCard)

  });
}

document.getElementById("search-input").addEventListener("keyup",(e) => {
   const input = e.target.value;
   loadVideos(input);

});

loadCategories()
