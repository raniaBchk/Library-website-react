import { useEffect, useState } from 'react'
import './App.css'
import { Col, Container } from "react-bootstrap";
import NavbarEx from './components/Navbar'
import CardBook from './components/CardBook'
import BooksCard from './components/BooksCard';
import axios from 'axios'
import {Routes, Route, BrowserRouter} from 'react-router-dom'
import BookDetails from './components/BookDetails';


function App() {
  
  const [books, setBooks]=useState([])
  const [totalItems, setTotalItems]=useState(0)
  const [pageCount,setPageCount]=useState(0)
  //get all books by axios
    const getAllBooks=async ()=>{
    const res=await axios.get('https://www.googleapis.com/books/v1/volumes?q=react&maxResults=12&key=AIzaSyBvXivlMuKFMNoPqTXqL55DVhmfB_7kYl4')
    
    setTotalItems(res.data.totalItems)
    console.log(totalItems);
    setBooks(res.data.items);

      //
    setPageCount(res.data.totalPage);
  
    }

    // 1 get current page et l'envoyer comme prop à booksCard 
    const getPage=async (page)=>{
      const res=await axios.get(`https://www.googleapis.com/books/v1/volumes?q=a&maxResults=12&page=${page}&key=AIzaSyBvXivlMuKFMNoPqTXqL55DVhmfB_7kYl4`)
      setTotalItems(res.data.totalItems)
    }
 
    const search= async(word)=>{

      if(word===""){
        getAllBooks();
     
      }else{
        const res=await axios.get(`https://www.googleapis.com/books/v1/volumes?q=react+${word}`);
        setBooks(res.data.items)

        //
        setPageCount(res.data.totalPage);
      }
    }




  useEffect (()=>{
   getAllBooks()
   console.log(books);
  },[]);


  

  // useEffect(() => {
  //   console.log(books);
  // }, [books]);


  
  //***** avec routes***** */

  // return (
  //   <div>
  //   <NavbarEx search={search}/>
  //   <Container>
  //   <BrowserRouter>
  //   <Routes>
  //   <Route path='/' element={ <BooksCard onClickBook={selectedBook} books={books} getPage={getPage} pageCount={pageCount}/>}/>
  //   <Route path='/book/:id' element={selectedBook && <BookDetails book={selectedBook} /> }/>

  //   </Routes>
  //   </BrowserRouter>
  

  //   </Container>
  
    
  //   </div>


//   <div>
//   <NavbarEx search={search}/>
//   <Container>
  
//   <BooksCard onClickBook={selectedBook} books={books} getPage={getPage} pageCount={pageCount}/>
//  {selectedBook && <BookDetails book={selectedBook} /> }



//   </Container>

  
//   </div>
const [selectedBook, setSelectedBook] = useState(null);

const handleBookClick = (book) => {
  setSelectedBook(book);
};
  return (
  
  <div>
    <NavbarEx search={search}/>
    <Container>
    <BrowserRouter basename="/test">
    <Routes>
    <Route path='/' element={ <BooksCard handleBookClick={handleBookClick} books={books} getPage={getPage} pageCount={pageCount}/>}/>
    <Route path='/book/:id' element={<BookDetails book={selectedBook} />} />


    </Routes>
    </BrowserRouter>
  

    </Container>
  
    
    </div>
   
  )
}

export default App
