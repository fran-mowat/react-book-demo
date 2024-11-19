import React, { useEffect, useState } from 'react';
import SearchBar from './Components/SearchBar';
import BookList from './Components/BookList';
import FavouriteList from './Components/FavouriteList';
import Cart from './Components/Cart';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [favourites, setFavourites] = useState([]);
  const [cartItems, setCartItems] = useState([]);

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
    if (!favourites.some((favourites) => favourites.title === book.title)){
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
    <div className='app'>
      <div className='searchbar-container'>
        <SearchBar handleSearch={handleSearch} />
      </div>
      <div className='main-container'>
        <div className='left-section'>
          <FavouriteList favourites={favourites} handleClearFavourites={handleClearFavourites}/>
          <BookList books={filteredBooks} handleAddToFavourites={handleAddToFavourites} favourites={favourites} />
        </div>
        <div className='right-section'>
          <Cart cartItems={cartItems} setCartItems={setCartItems} />
        </div>
      </div>
    </div>
  );
}

export default App;
