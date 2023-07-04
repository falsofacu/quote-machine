const quotesJSON = 'https://gist.githubusercontent.com/nasrulhazim/54b659e43b1035215cd0ba1d4577ee80/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

$(document).ready(() => {
  let quote = "The happiness of your life depends upon the quality of your thoughts.";
  let author = "Marcus Aurelius";

  const updateQuote = () => {
    $.getJSON(quotesJSON)
      .done((data) => {
        let num = Math.floor(Math.random() * data.quotes.length);
        quote = data.quotes[num].quote;
        author = data.quotes[num].author;
        renderQuote();
      })
      .fail(function() {
        console.error("Failed to load quotesJSON")
      });
  }
  
  const renderQuote = () => {
    $("#quote").text('"' + quote + '"');
    $("#author").text("— " + author);
    $("#tweet-quote").attr("href", generateTweetURL(quote, author));
  }

  const generateTweetURL = (quote, author) => {
    const tweetURL =
    "https://twitter.com/intent/tweet?text=" +
    encodeURIComponent(quote + " — " + author);
    return tweetURL;
  }

  $("#next-quote").click(() => {
    updateQuote();
  });

  updateQuote();
});