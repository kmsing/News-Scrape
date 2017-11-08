// require cheerio 
var cheerio = require('cheerio');

// get html
var request = require('request');

// Use Article model
var Article = require('../models/Article');

// define the site we want to scrape with var
var website = 'http/www.wired.com/latest-news';

function scrapedWeb(callback) 
{
  request(website, function(error, response, html)
    
  {
    if (error) console.log("Error Scraping", error);

    var $ = cheerio.load(html);

    //Target articles by tag
    $("ul.col li a").each(function(i, element) 
    {
      
      // Add the text and href of every link
      var title = $(this).children("div").children("h2").text();
      var link = $(this).attr("href");

      var scrapeArticle = new Article(
      {
        title: title,
        link: link
    
      });

      scrapeArticle.save(function(error) 
      {

      });
    });

    callback();
  });
      
}

// export the scraps
exports.scrapedWeb = scrapedWeb;