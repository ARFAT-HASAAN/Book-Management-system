import React, {useState, useEffect} from 'react';
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import db from "./initializeApp"
import swal from 'sweetalert';


const Booking = ({ Bookid, books }) => {
  

 const [query , setQuery] = useState({
  name: "",
  AuthorName: "",
  avaiable : false,
})
 
const TextTacker = (e) => {
  const name = e.target.name
  const value = e.target.value

  setQuery({...query, [name] : value})

}

  const ChekedValue = (e) => {
  
  const name = e.target.name;
  const value = e.target.checked;
    console.log(e)
  setQuery({...query,[name]: value})

}

 const Submitform = async (e) => {
   e.preventDefault();


   const BooksData = await addDoc(collection(db, "books"),query);
   if (BooksData.id) {
     swal({
       icon: "success",
       title: "New Book Added!",
       timer: 1000,

     })
      setQuery({
  name: "",
  AuthorName: "",
  avaiable : false,
      })
     
    
 }
 }

  
 useEffect(() => {
   if(Bookid !== undefined && Bookid !== ""){

     const mybook = books.find((book) => book.id === Bookid)
     console.log(mybook)
      
      setQuery({
  name: mybook.name,
  AuthorName: mybook.AuthorName,
  avaiable : mybook.avaiable,
})
   }


    
 } ,[Bookid])
 
  
  
  const updateHandler = async (e) => {
    e.preventDefault()

    const filed = doc(db, "books", Bookid)
    const  Newbook= {...query}
    console.log(Newbook)
    console.log(Bookid)
    const updatebook = await updateDoc(filed, Newbook)
    swal({
       icon: "success",
       title: "updated book details!",
       timer: 1000,

     })


  setQuery({
  name: "",
  AuthorName: "",
  avaiable : false,
})
    
   
  }

    return (
      <div className="container">
        
        <h1 className='my-2'>Add Book / Update Book</h1>

    <form className="">
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Book Name</label>
    <input type="text" onChange={TextTacker} name="name" value={query?.name} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
  
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Author Name</label>
    <input type="text" onChange={TextTacker} name="AuthorName" value={query?.AuthorName}  className="form-control" id="exampleInputPassword1" />
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" onChange={ChekedValue} name="avaiable"   checked={query?.avaiable} className="form-check-input" id="checkBox"/>
    <label className="form-check-label" htmlFor="exampleCheck1">Available</label>
  </div>
  <button type="submit" onClick={Submitform} className="btn btn-dark">Submit</button>
   <span> </span>
  <button type="submit" onClick={updateHandler} className="btn btn-dark">Update</button>
</form>
   </div>
    );
};

export default Booking;