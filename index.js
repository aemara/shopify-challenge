const todayImageBtn = document.querySelector('.today-image-btn');
const urlEndpoint = 'https://api.nasa.gov/planetary/apod?api_key=6dU21ajUzWzyyaQCJGsG50rdySm4gQznBNal71t7&start_date=2021-01-01&end_date=2021-01-05'

todayImageBtn.addEventListener('click', () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {button.classList.toggle('hidden')});
    fetchImage();
})

const fetchImage = async () => {
    const response = await fetch(`${urlEndpoint}`);
    const data = await response.json();  
    renderImage(data);                   
}


const renderImage = (data) => {
    if(data[0]) {
        data.forEach((image, index) => {
            const imageTitle = image.title;
            const imageDescription = image.explanation;
            const imageDate = image.date;
            const imageUrl = image.hdurl;
            const content = image.media_type === "video" ? `<iframe src="${image.url} height=""></iframe>`: `<img class="requested-image" src="${imageUrl}">`;

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
}