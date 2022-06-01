import React, {useState, useEffect} from 'react';
import {collection, getDocs, doc, deleteDoc } from "firebase/firestore"
import db from "./initializeApp"
import swal from 'sweetalert';

const Booklist = ({editHandler, setBooks, books}) => {
  
 



  const DelteteDoc =  (id) => {
    swal({
       icon: "warning",
       title: "are you sure?!",
       buttons : ['cencle', "Delete"]

    }).then(res => {
      if (res) {
         
        const deleteBook =  deleteDoc(doc(db, "books", id));
       }
     })
  }



    return (
      <div className="container my-2">
        <h1 className='my-4'>Book List</h1>
 <table className="table table-striped table-dark text-center">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Book</th>
      <th scope="col">Author</th>
      <th scope="col">exist</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
   

   {

            books.map( (book, index) => ( 
              
     <tr key={book.id}>
      <th scope="row">{index + 1}</th>
      <td>{book?.name}</td>
      <td>{book?.AuthorName}</td>
      <td>{book?.avaiable ? "Available" : "Not Available"} </td>
      <td> <button onClick={() => DelteteDoc(book.id)} className="btn btn-danger">Delete</button> <button onClick={() => editHandler(book.id)} className="btn btn-light" >Edit</button>  </td>
    </tr>

            ) )  


     }

    
     
      
   
    

    
  </tbody>
</table>

         </div>


    );
};

export default Booklist;