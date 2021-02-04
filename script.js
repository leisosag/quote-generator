const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

const showLoadingSpinner = () => {
  loader.style.visibility = 'visible';
  quoteContainer.style.visibility = 'hidden';
};

const removeLoadingSpinner = () => {
  if (loader.style.visibility === 'visible') {
    quoteContainer.style.visibility = 'visible';
    loader.style.visibility = 'hidden';
  }
};

// Trae la cita de la api
const getQuote = async () => {
  showLoadingSpinner();
  const url = 'https://quotes.rest/qod';
  try {
    const response = await fetch(url);
    const data = await response.json();
    let img = data.contents.quotes[0].background;
    let author = data.contents.quotes[0].author;
    let quote = data.contents.quotes[0].quote;

    // caso de autor desconocido
    author === ''
      ? (authorText.innerText = 'Unknown')
      : (authorText.innerText = author);

    // si el texto es largo
    quote.length > 120
      ? quoteText.classList.add('long-quote')
      : quoteText.classList.remove('long-quote');

    quoteText.innerText = quote;
    document.body.style.backgroundImage = `url(${img})`;
    removeLoadingSpinner();
  } catch (error) {
    console.log(error);
  }
};

// tweet con la cita
const tweetQuote = () => {
  const quote = quoteText.innerText;
  const autor = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${autor}`;
  window.open(twitterUrl, '_blank');
};

twitterBtn.addEventListener('click', tweetQuote);

// al iniciar
getQuote();
