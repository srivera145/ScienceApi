const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const PORT = process.env.PORT || 4040;
const app = express();


// Create a GET route for News API

const newspaper = [
   {
     name: 'Google Science',
     address: 'https://news.google.com/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRFp0Y1RjU0FtVnVHZ0pWVXlnQVAB?hl=en-US&gl=US&ceid=US%3Aen',
     base: 'https://news.google.com/'
   },
   {
     name: 'Fox Science',
     address: 'https://www.foxnews.com/science',
     base: 'https://www.foxnews.com'
  },
  {
     name: 'BBC Science',
     address: 'https://www.bbc.com/news/science_and_environment',
     base: 'https://www.bbc.com'
  },
  {
    name: 'NBC Science',
    address: 'https://www.nbcnews.com/science',
    base: ''
  },
  {
    name: 'CBS Science',
    address: 'https://www.cbsnews.com/science/',
    base: ''
  }
]

const articles = []

newspaper.forEach((newspaper) => {
  axios.get(newspaper.address).then((response) => {
    const html = response.data
    const $ = cheerio.load(html)
    

    $('article', html).each(function () {
      const title = $(this).find('h4').text()
      const url = $(this).find('a').attr('href')
      const image = $(this).find('img').attr('src')
      const publishedAt = new Date()
      const description = $(this).find('p').text()
      const author = newspaper.name
      
      

      articles.push({
        title,
        description,
        author,
        url: newspaper.base + url,
        image,
        publishedAt
        
      })
    })
  })
})

app.get('/', (req, res) => {
  res.send('Welcome to the Science API!');
});

app.get('/science', (req, res) => {
  res.send(articles);
});
 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});