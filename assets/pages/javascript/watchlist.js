
document.addEventListener('DOMContentLoaded', () => {
    const watchlistContainer = document.getElementById('watchlist-items');
    
    // Fetch watchlist from localStorage
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
  
    function renderWatchlist() {
      watchlistContainer.innerHTML = '';
      
      if (watchlist.length === 0) {
        watchlistContainer.innerHTML = '<p>No movies in your watchlist!</p>';
        return;
      }
  
      // Render each movie in the watchlist
      watchlist.forEach((movie) => {
        const item = document.createElement('div');
        item.classList.add('watchlist-item');
  
        item.innerHTML = `
          <div class = "imgDiv"><img src="${movie.bannerImage}" alt="${movie.title}" /></div>
          <div class="watchlist-item-details">
            <h3>${movie.title}</h3>
          </div>
          <button class="remove-btn" data-id="${movie.id}">Remove</button>
          <button class="watch-button" data-movie-id="${movie.id}">Watch</button>        `;
  
        // Remove movie from watchlist when remove button is clicked
        item.querySelector('.remove-btn').addEventListener('click', () => {
          watchlist = watchlist.filter((m) => m.id !== movie.id);
          localStorage.setItem('watchlist', JSON.stringify(watchlist));
          renderWatchlist();
        });

        // Add event listener to the watch button
    item.querySelector('.watch-button').addEventListener('click', () => {
        localStorage.setItem('selectedMovie', JSON.stringify(movie));
        window.location.href = 'details.html';
      });
  
        watchlistContainer.appendChild(item);
      });
    }
  
    renderWatchlist(); 
  });
  