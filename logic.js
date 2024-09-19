// Your API Key and Base URL
const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Use your environment variable
const BASE_URL = 'https://newsapi.org/v2/top-headlines';
require('dotenv').config();

// Function to handle category clicks
const handleCategoryClick = async (category) => {
    const articleContainer = document.getElementById('news-articles');
    try {
        const response = await fetch(`${BASE_URL}?category=${category}&apiKey=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            const articlesHtml = data.articles.map(article => `
                <div class="article">
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
        articleContainer.innerHTML = '<p>Error fetching news. Please try again later.</p>';
    }
};

// Example of adding click event listeners for category buttons
document.querySelectorAll('.items div').forEach(element => {
    element.addEventListener('click', () => {
        const category = element.id;
        handleCategoryClick(category);  // Call the function when a category is clicked
    });
});

// Clock function (optional)
const updateClock = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}:${seconds}`;
    document.getElementById('clock').textContent = timeString;
};

updateClock();
setInterval(updateClock, 1000);
