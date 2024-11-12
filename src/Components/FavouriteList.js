import React from "react";

const FavouriteList = ({favourites, handleClearFavourites}) => {
    console.log(favourites)
    if (favourites.length > 0){
        return (
            <div>
                <h2>
                    Favourite Books 
                    <button onClick={handleClearFavourites}>
                        Clear Favourite List
                    </button>
                </h2>
                <ul>
                    {favourites.map((book) => (
                        <li key={book.title}>{book.title} by {book.author}</li>
                    ))}
                </ul>
            </div>
        );
    } else{
        return (
            <div>
                <h2>
                    Favourite Books 
                    <button onClick={handleClearFavourites} disabled>
                        Clear Favourite List
                    </button>
                </h2>
                <ul>
                    {favourites.map((book) => (
                        <li key={book.title}>{book.title} by {book.author}</li>
                    ))}
                </ul>
            </div>
        );
    }
};

export default FavouriteList;