const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes =[];

// Show Loading

function loading() {
    quoteContainer.hidden = true;
    loader.hidden = false;
}

// Hide Loading

function hideLoading() {
    if(!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
        // quoteContainer.display = block;
    }
}

// Pick a random quote
function newQuote() {
    // Show Loading & Hide Quote
    loading();
    setTimeout(
    function (){
    let quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Change style if quote is long
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote') ;
    }
    quoteText.textContent = quote.text;
    // Changing null in author response to Unknown
    authorText.textContent = quote.author === null ? 'Unknown':quote.author;
    // Show Quote and hide Loading
    hideLoading();
    },1000);
    console.log(quote);
}
// Get quotes from API
async function getQuotes () {
    const apiURL= "https://type.fit/api/quotes";
    try {
        // Show Loading & Hide Quote
        loading();
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
        console.log(apiQuotes);
    } catch (error) {
        // Catch error here
        // console.log(error);
    }
}

getQuotes();


// Tweet a quote

function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterURL,'_blank');
}