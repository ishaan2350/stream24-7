
require('dotenv').config();
const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2/top-headlines';

const handleCategoryClick = async (category) => {
    const categoryMap = {
        home: 'general',
        business: 'business',
        education: 'education',
        technology: 'technology',
        sports: 'sports',
        videos: 'entertainment'
    };

    try {
        const response = await fetch(`${BASE_URL}?category=${categoryMap[category]}&apiKey=${API_KEY}`);
        const data = await response.json();
        const articleContainer = document.getElementById('news-articles'); 
        
        if (data.articles && data.articles.length > 0) {
            const articlesHtml = data.articles.map(article => `
                <div class="article"> <!-- Ensure this class matches your CSS -->
                    ${article.urlToImage ? `<img src="${article.urlToImage}" alt="${article.title}" class="article-image">` : ''}
                    <h2>${article.title}</h2>
                    <p>${article.description}</p>
                    <a href="${article.url}" target="_blank">Read more</a>
                </div>
            `).join('');
            
            articleContainer.innerHTML = articlesHtml;
        } else {
            articleContainer.innerHTML = '<p>No articles found.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        document.getElementById('news-articles').innerHTML = '<p>Error fetching news. Please try again later.</p>';
    }
};

document.querySelectorAll('.items div').forEach(element => {
    element.addEventListener('click', () => {
        const category = element.id;
        handleCategoryClick(category);
    });
});


const updateClock = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2,'0');
    const minutes = now.getMinutes().toString().padStart(2,'0');
    const seconds = now.getSeconds().toString().padStart(2,'0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;
}

updateClock();
setInterval(updateClock,1000)


