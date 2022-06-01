import {useState, useEffect} from "react"
import Header from "./components/Header";
import Booking from "./components/Booking";
import Booklist from "./components/Booklist";
import db from "./components/initializeApp"
import {collection, getDocs,} from "firebase/firestore"



function App() {
 
  const [Bookid, setBookid] = useState("")

  const editHandler = (id) => {
    setBookid(id)

  }



   const [books, setBooks] = useState([])
  
  useEffect( () =>  {
     const GetBooks = async () => {

      const querySnapshot = await getDocs(collection(db, "books"));
       setBooks(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
       
      // console.log(querySnapshot.map => ((doc) => ( {...doc.data(), id: doc.id})))
        // setBooks(querySnapshot.docs.map => ((doc) => ( {...doc.data(), id: doc.id})))
      }
     GetBooks()
  } ,[books])


  return (
    <div>
       <Header/>
        <Booking  Bookid={Bookid} books={books}/>
        <Booklist  editHandler={editHandler} books={books} setBooks={setBooks} />
        
    </div>
  );
}

export default App;
