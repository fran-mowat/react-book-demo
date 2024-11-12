import React, { useEffect, useState } from 'react';
import SearchBar from './Components/SearchBar';
import BookList from './Components/BookList';
import FavouriteList from './Components/FavouriteList';

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favourites, setFavourites] = useState([]);

  //fetch data from books.json
  useEffect(() => { 
    fetch("./books.json")
    .then((response) => response.json())
    .then((data) => setBooks(data.books))
    .catch((error) => console.error("Error fetching data: ", error));
  }, [])

  const handleSearch = (term) => {
    setSearchTerm(term)
  };

  const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToFavourites = (book) => {
    console.log(favourites.book);
    if (!favourites.includes(book)){
      setFavourites([...favourites, book]);
    }
  };

  //save favourites to local storage whenever it changes 
  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  //clear favourites list 
  const handleClearFavourites = () => {
    setFavourites([]);
    localStorage.removeItem("favourites"); //clear local storage 
  };

  //load favourites from local storage on component mount 
  useEffect(() => {
    const savedFavourites = localStorage.getItem("favourites");
    if (savedFavourites) {
      setFavourites(JSON.parse(savedFavourites));
    }
  }, []);

  return (
    <div>
      <SearchBar handleSearch={handleSearch} />
      <BookList books={filteredBooks} handleAddToFavourites={handleAddToFavourites}/>
      <FavouriteList favourites={favourites} handleClearFavourites={handleClearFavourites}/>
    </div>
  );
}

export default App;
