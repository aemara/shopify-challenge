const todayImageBtn = document.querySelector('.today-image-btn');
const daterangeImageBtn = document.querySelector('.daterange-image-btn');
const dateInputForm = document.querySelector('.home form input');
const dateInputSubmitBtn = document.querySelector('.date-input-btn');
const todayDate = new Date().toISOString().slice(0, 10)
dateInputForm.setAttribute('max', todayDate);

const urlEndpoint = 'https://api.nasa.gov/planetary/apod?api_key=6dU21ajUzWzyyaQCJGsG50rdySm4gQznBNal71t7'
let likeBtns;

todayImageBtn.addEventListener('click', () => {
    fetchImage();
})


    
    dateInputSubmitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        const startDate = event.target.form['0'].value;
        fetchImage(startDate);
    })



const fetchImage = async (startDate) => {
    const imagePosts = document.querySelectorAll('.image-post');
    if(imagePosts) {
        imagePosts.forEach(post => {
            post.remove();
        })
    }

    const loadingComponent = addLoadingComponent();
    const response = await fetch(`${urlEndpoint}${startDate ? `&start_date=${startDate}`: ''}`);
    const data = await response.json();  
    renderImage(data);
    removeLoadingComponent(loadingComponent);
}


const renderImage = (data) => {
    if(data[0]) {
        data.forEach((image, index) => {
            const imageTitle = image.title;
            const imageDescription = image.explanation;
            const imageDate = image.date;
            const imageUrl = image.hdurl;
            const content = image.media_type === "video" ? `<iframe src="${image.url} width = "" height=""></iframe>`: `<img class="requested-image" src="${imageUrl}">`;

            const imagePostHTML = `${content} 
                                    <div class="image-info">
                                        <h2 class="image-title">${imageTitle}</h2>
                                        <p class="image-date">${imageDate}</p>
                                        <button class="like-btn like-${index}">Like</button>
                                        <p class="image-description">${imageDescription}</p>
                                    </div>`
                                    
                                    
            const mainDiv = document.querySelector('main');
            const imagePost = document.createElement('div');
            imagePost.innerHTML = imagePostHTML;
            imagePost.classList.add('image-post');
            imagePost.classList.add(`image-post-${index}`)
            mainDiv.append(imagePost);
        }) 
    } else {
        const imageTitle = data.title;
        const imageDescription = data.explanation;
        const imageDate = data.date;
        const imageUrl = data.hdurl;
        const content = data.media_type === "video" ? `<iframe src="${data.url} height=""></iframe>`: `<img class="requested-image" src="${imageUrl}">`;

        const imagePostHTML = `${content} 
                                <div class="image-info">
                                    <h2 class="image-title">${imageTitle}</h2>
                                    <p class="image-date">${imageDate}</p>
                                    <button class="like-btn">Like</button>
                                    <p class="image-description">${imageDescription}</p>
                                </div>`
                                
                                
        const mainDiv = document.querySelector('main');
        const imagePost = document.createElement('div');
        imagePost.innerHTML = imagePostHTML;
        imagePost.classList.add('image-post');
        mainDiv.append(imagePost);
    }

    likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach(btn => {
        btn.addEventListener('click', (event) => {
            toggleLike(event.target);
        })
    });
}

const toggleLike = (likeBtn) => {
    likeBtn.classList.toggle('liked-state');
    if(likeBtn.innerHTML === "Like") {
        likeBtn.innerHTML = "Liked!"
    } else {
        likeBtn.innerHTML = "Like";
    }
}


const addLoadingComponent = () => {
    const loadingText = document.createElement('h2');
    loadingText.classList.add('loading-component');
    loadingText.classList.add('text-flicker-in-glow');
    loadingText.innerHTML = "Loading...";
    document.querySelector('.date-input-form').insertAdjacentElement('afterend', loadingText);

    return loadingText;
}

const removeLoadingComponent = (loadingComponent) => {
    loadingComponent.remove();
}