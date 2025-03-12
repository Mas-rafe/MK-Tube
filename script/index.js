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
//loadCategories function used for recieved api
function loadCategories() {
  //1-fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    //2-convert promise to json
    .then(res => res.json())
    //3- send data to display
    .then((data) => displayCategories(data.categories));
}



//used for adding the nav buttons(music,comedy,drawing) by fetching API
function displayCategories(categories) {
  const categoryContainer = document.getElementById("category-container");
  for (category of categories) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
              <button onclick="loadCategoryVideos(${category.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${category.category}</button>
         `;
    categoryContainer.append(categoryDiv)
  }
}
const loadCategoryVideos=(id) =>{
  
  const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
  
  fetch(url)
  .then(res=>res.json())
  .then(data => displayVideos(data.category))
}

//used for fetch the videos 
function loadVideos() {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then((data) => displayVideos(data.videos));
}
//after create div element by using the id of ("video-container") and then creates 
// an innerHtml with div.after that append the child(div) to the main containerr
const displayVideos = (videos) => {
  const videoContainer = document.getElementById("video-container");
  //videoContainer.innerHTML="" : used for add datas after removing the previous datas
  videoContainer.innerHTML="";
  videos.forEach(video => {
    console.log(video)
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
                        <img class="w-5 h-5" src="https://img.icons8.com/?size=60&id=lalayI2ulYNt&format=png" alt="">
                    </div>
                    <p class="text-sm text-gray-400">${video.others.views} views</p>
                </div>
            </div>
        </div>
 `
    videoContainer.append(videoCard)

  });
}



loadCategories()
