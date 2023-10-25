import React from 'react'
import { Col} from "react-bootstrap";
import { Link } from 'react-router-dom';

const CardBook = ({book,onClickBook}) => {

  
   let thumbnail=book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail;
  return (

    <Col xs="6" sm="6" md="4" lg="3" className="my-1" onClick={onClickBook}>
    <Link to={`/book/${book.id}`}>
      <div className="card"  >

       <img className="card__image" alt={book.volumeInfo.title} style={{width:'100%'}} src={thumbnail}/>
     
        <div className="card__overlay">
          <div className="overlay__text text-center w-100 p-2">
          <p>Name of book: {book.volumeInfo.title}</p>
          <p>Release date: {book.volumeInfo.publishedDate} </p>
          <p>Country: {book.accessInfo.country}</p>
          <p>Rating: {book.volumeInfo.ratingsCount} </p>
          </div>
        </div>
        
      </div>
      </Link>
     </Col>
  )
}

export default CardBook