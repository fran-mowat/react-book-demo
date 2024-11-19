import React from "react";
import Card from "./Card";

const FavouriteList = ({favourites, handleClearFavourites}) => {
    console.log(favourites)
    if (favourites.length > 0){
        return (
            <div>
                <h2>
                    Favourite Books 
                    <button onClick={handleClearFavourites} style={{ marginLeft: '10px' }}>
                        Clear Favourite List
                    </button>
                </h2>
                <div className="card-container">
                    {favourites.map((book) => (
                        <Card key={book.title} book={book} />
                    ))}
                </div>
                <hr />
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