// 1. Update DateTime Button to Show/Hide Date and Time Dynamically
const dateTimeButton = document.getElementById('dateTime');
let isTimeDisplayed = false;

function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString('en-US', {
        weekday: 'long', 
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    if (isTimeDisplayed) {
        dateTimeButton.textContent = dateTimeString;
    } else {
        dateTimeButton.textContent = 'Show Current Time';
    }
}

dateTimeButton.addEventListener('click', () => {
    isTimeDisplayed = !isTimeDisplayed;
    updateDateTime();
});

// 2. Theme Toggle Button for Day/Night Mode
document.getElementById('themeToggleBtn').addEventListener('click', () => {
    document.body.classList.toggle('night-theme');
});

const people = [
    { name: 'Kassym-Jomart Tokayev', description: 'Kazakh politician and diplomat who has served as the President of Kazakhstan since 2019.', image:'images/people/Kassym-Jomart_Tokayev.jpg' },
    { name: 'Nurbek Oralbay', description: 'At the 2024 Summer Olympics in Paris, he had his first fight against Australian Callum Peters. In the final, he lost to Ukrainian boxer Oleksandr Khyzhniak, earning a silver medal.', image:'images/people/Nurbek Oralbay.webp' },
    { name: 'Daneliya Tuleshova', description: "In 2019, she took part in The World's Best, representing her country alongside Dimash Kudaibergen. She was a finalist on season 15 of America's Got Talent.", image:'images/people/Daneliya.jfif' },
    { name: 'Dinara Saduakassova', description: 'a Kazakh chess player who holds the FIDE titles of International Master (IM) and Woman Grandmaster (WGM).', image:'images/people/Dinara-Saduakassova.JPG' },
    { name: 'Islambek Kuat', description: 'a Kazakh footballer who plays for Astana and the Kazakhstan national team. Kuat scored his first goal for Kazakhstan on 10 October 2015 in a 2–1 defeat against the Netherlands in a UEFA Euro 2016 qualifier.', image:'images/people/IslambekKuat.png' },
    { name: 'Aida Bauyrzhanova', description: 'a Kazakh artistic gymnast. She is the 2021 Islamic Solidarity Games champion on floor exercise.', image:'images/people/Aida.webp' },
];

function renderPeople(limit = 3) {
    const peopleContainer = document.getElementById('peopleContainer');
    peopleContainer.innerHTML = '';
    
    people.slice(0, limit).forEach(person => {
        const personDiv = document.createElement('div');
        personDiv.className = 'person col-md-4';
        
        // Use a placeholder image if no image is provided
        const imageSrc = person.image.endsWith('/') ? 
            'https://via.placeholder.com/400x300' : person.image;
        
        personDiv.innerHTML = `
            <div class="card">
                <div class="image-container">
                    <img src="${imageSrc}" class="card-img-top" alt="${person.name}">
                </div>
                <div class="card-body">
                    <h3 class="card-title">${person.name}</h3>
                    <p class="card-text">${person.description}</p>
                </div>
            </div>
        `;
        
        peopleContainer.appendChild(personDiv);
    });
}

// Initialize the rendering
renderPeople();

// 4. "Read More" / "Hide" Toggle to Show More People
const readMoreLink = document.getElementById('readMoreLink');
let showingMore = false;

readMoreLink.addEventListener('click', (event) => {
    event.preventDefault();
    showingMore = !showingMore;
    renderPeople(showingMore ? 100 : 3); // Show 100 people if showingMore is true, otherwise show 3
    readMoreLink.textContent = showingMore ? 'Hide' : 'Read more...';
});

// 5. Display Greeting Based on Time of Day
function displayGreeting() {
    const hours = new Date().getHours();
    let greeting;
    switch (true) {
        case (hours < 12):
            greeting = 'Good Morning!';
            break;
        case (hours < 18):
            greeting = 'Good Afternoon!';
            break;
        default:
            greeting = 'Good Evening!';
    }
    document.getElementById('greetingSection').textContent = greeting;
}
displayGreeting();

// Toggle play/pause for greeting sound based on the greeting
const audio = new Audio();
let isPlaying = false;

document.getElementById('playGreetingSound').addEventListener('click', () => {
    const greeting = document.getElementById('greetingSection').textContent;

    if (greeting.includes('Good Morning')) {
        audio.src = 'mp3/morning.mp3';
    } else if (greeting.includes('Good Afternoon')) {
        audio.src = 'mp3/afternoon.mp3';
    } else {
        audio.src = 'mp3/evening.mp3';
    }

    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }

    isPlaying = !isPlaying;
    audio.onended = () => {
        isPlaying = false;
    };
});