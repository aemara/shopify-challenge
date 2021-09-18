const todayImageBtn = document.querySelector('.today-image-btn');
const daterangeImageBtn = document.querySelector('.daterange-image-btn');
let dateInputSubmitBtn;
const todayDate = new Date().toISOString().slice(0, 10)
const urlEndpoint = 'https://api.nasa.gov/planetary/apod?api_key=6dU21ajUzWzyyaQCJGsG50rdySm4gQznBNal71t7'

todayImageBtn.addEventListener('click', () => {
    fetchImage();
})

daterangeImageBtn.addEventListener('click', () => {
    const homeDiv = document.querySelector('.home');
    const dateRangeHtml = `<form>
                                <label for="start">Choose a start date:</label>
                                <input type="date" id="start" name="start-date"
                                    
                                    max="${todayDate}">
                                <button class="date-input-btn">See Photos</button>
                            </form>`;
    const dateRangeDiv = document.createElement('div');
    dateRangeDiv.classList.add('date-input');
    dateRangeDiv.innerHTML = dateRangeHtml;
    homeDiv.append(dateRangeDiv);

    dateInputSubmitBtn = document.querySelector('.date-input-btn');
    dateInputSubmitBtn.addEventListener('click', (event) => {
        event.preventDefault();
        console.log(event.target);
        const startDate = event.target.form['0'].value;
        fetchImage(startDate);
    })
})


const fetchImage = async (startDate) => {
    const response = await fetch(`${urlEndpoint}${startDate ? `&start_date=${startDate}`: ''}`);
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
            const content = image.media_type === "video" ? `<iframe src="${image.url} width = "" height=""></iframe>`: `<img class="requested-image" src="${imageUrl}">`;

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