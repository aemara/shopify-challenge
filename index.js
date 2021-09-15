const todayImageBtn = document.querySelector('.today-image-btn');
const urlEndpoint = 'https://api.nasa.gov/planetary/apod?api_key=6dU21ajUzWzyyaQCJGsG50rdySm4gQznBNal71t7'

todayImageBtn.addEventListener('click', () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {button.classList.toggle('hidden')});
    fetchImage();
})

const fetchImage = async () => {
    const response = await fetch(`${urlEndpoint}`);
    const jsonResponse = await response.json();
    
    const imageTitle = jsonResponse.title;
    const imageDescription = jsonResponse.explanation;
    const imageDate = jsonResponse.date;
    const imageUrl = jsonResponse.hdurl;

    const imagePostHTML = `
                            <img src="${imageUrl}">
                            <div class="image-info">
                                <h2 class="image-title">${imageTitle}</h2>
                                <p class="image-date">${imageDate}</p>
                                <p class="image-description">${imageDescription}</p>
                            </div>
                        `;

    const mainDiv = document.querySelector('main');
    const imagePost = document.createElement('div');
    imagePost.innerHTML = imagePostHTML;
    imagePost.classList.add('imagePost');
    mainDiv.append(imagePost);
                        
}