import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
   name: "",
   description: "",
   price: "",
   category: "",
   itemStatus: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:3001/menu/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const item = await response.json(); //record
     if (!item) {
       window.alert(`Item with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(item);
   }
 
   fetchData();
   return;
}, [params.id, navigate]);

// These methods will update the state properties.
function updateForm(value) {
  return setForm((prev) => {
    return { ...prev, ...value };
  });
}

async function onSubmit(e) {
  e.preventDefault();
  const editedItem = {
    name: form.name,
    description: form.description,
    price: form.price,
    category: form.category,
    itemStatus: form.itemStatus,
  };

   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:3001/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedItem),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 } 

  //displaying form that takes input from user
  return(
    <div>
        <h3> Edit Menu Item</h3>
        <form onSubmit = {onSubmit}>
            <div className = "form-group">
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={form.name}
                    onChange={(e) => updateForm({name: e.target.value})}
                    />
            </div>
            <div className="form-group">
             <label htmlFor="description">Description</label>
             <input
                 type="text"
                 className="form-control"
                id="description"
                value={form.description}
                onChange={(e) => updateForm({ description: e.target.value })}
                 />
             </div>
             <div className="form-group">
             <label htmlFor="price">Price</label>
             <input
                 type="text"
                 className="form-control"
                id="price"
                value={form.price}
                onChange={(e) => updateForm({ price: e.target.value })}
                 />
             </div>


             

             <div className="form-group">   
     <div className="form-check form-check-inline">
       <input
         className="form-check-input"
         type="radio"
         name="category"
         id="breakfast"
         value="breakfast"
         checked={form.level === "breakfast"}
         onChange={(e) => updateForm({ category: e.target.value })}
       />
       <label htmlFor="breakfast" className="form-check-label">Breakfast</label>
        </div>

        <div className="form-check form-check-inline">
       <input
         className="form-check-input"
         type="radio"
         name="category"
         id="snacks"
         value="snacks"
         checked={form.level === "snacks"}
         onChange={(e) => updateForm({ category: e.target.value })}
       />
       <label htmlFor="snacks" className="form-check-label">Snacks</label>
        </div>
        <div className="form-check form-check-inline">
       <input
         className="form-check-input"
         type="radio"
         name="category"
         id="drinks"
         value="drinks"
         checked={form.level === "drinks"}
         onChange={(e) => updateForm({ category: e.target.value })}
       />
       <label htmlFor="drinks" className="form-check-label">Drinks</label>
        </div>
     <div className="form-check form-check-inline">
       <input
         className="form-check-input"
         type="radio"
         name="category"
         id="lunch"
         value="lunch"
         checked={form.level === "lunch"}
         onChange={(e) => updateForm({ category: e.target.value })}
       />
       <label htmlFor="category" className="form-check-label">Lunch</label>
     </div>
   </div>

   <div className="form-group">   
     <div className="form-check form-check-inline">
       <input
         className="form-check-input"
         type="radio"
         name="itemStatus"
         id="itemStatus"
         value="available"
         checked={form.level === "available"}
         onChange={(e) => updateForm({ itemStatus: e.target.value })}
       />
       <label htmlFor="itemStatus" className="form-check-label">Available</label>
        </div>
     <div className="form-check form-check-inline">
       <input
         className="form-check-input"
         type="radio"
         name="itemStatus"
         id="itemStatus"
         value="out of stock"
         checked={form.level === "out of stock"}
         onChange={(e) => updateForm({ itemStatus: e.target.value })}
       />
       <label htmlFor="itemStatus" className="form-check-label">Out of Stock</label>
     </div>
   </div>

 <div className="form-group">
    
     <input
       type="submit"
       value="Update item"
       className="btn btn-primary"
     />
   </div>
        </form>
    </div>
);
}