/*  fetch('/OTT-Project/assets/pages/json/carsoel.json')
      .then((response) => response.json())
      .then((data) => {
        let selectedMovie;
        Object.keys(data).forEach((category) => {
          const movie = data[category].find((m) => m.id === movieId);
          if (movie) selectedMovie = movie;
        });

        if (selectedMovie) {
          const container = document.getElementById('movie-details-container');
          container.innerHTML = `
            <h1>${selectedMovie.title}</h1>
            <img src="${selectedMovie.bannerImage}" alt="${selectedMovie.title}">
            <p><strong>Description:</strong> ${selectedMovie.description}</p>
            <p><strong>Genre:</strong> ${selectedMovie.genre}</p>
            <p><strong>Release Date:</strong> ${selectedMovie.releaseDate}</p>
            <p><strong>Duration:</strong> ${selectedMovie.duration} mins</p>
            <p><strong>Language:</strong> ${selectedMovie.language}</p>
            <p><strong>Rating:</strong> ⭐ ${selectedMovie.rating}</p>
          `;
        } else {
          document.getElementById('movie-details-container').innerHTML =
            '<p>Movie not found.</p>';
        }
      })
      .catch((error) => console.error('Error loading movie details:', error.message)); */




      const params = new URLSearchParams(window.location.search);
      const movieId = params.get('id'); // Get the movie ID
      
      fetch('../json/carsoel.json')
        .then((response) => response.json())
        .then((data) => {
          let selectedMovie;
          Object.keys(data).forEach((category) => {
            const movie = data[category].find((m) => m.id === movieId);
            if (movie) selectedMovie = movie;
          });
      
          const container = document.getElementById('movie-details-container');
          if (selectedMovie) {
            container.innerHTML = `
              <h1>${selectedMovie.title}</h1>
              <img src="${selectedMovie.bannerImage} alt="${selectedMovie.title}">
              <p>${selectedMovie.description}</p>
              <p><strong>Genre:</strong> ${selectedMovie.genre}</p>
              <p><strong>Release Date:</strong> ${selectedMovie.releaseDate}</p>
              <p><strong>Duration:</strong> ${selectedMovie.duration} mins</p>
              <p><strong>Language:</strong> ${selectedMovie.language}</p>
              <p><strong>Rating:</strong> ⭐ ${selectedMovie.rating}</p>
            `;
          } else {
            container.innerHTML = '<p>Movie not found.</p>';
          }
        })
        .catch((error) => console.error('Error loading movie details:', error.message));
      