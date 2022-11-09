import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Menu = (props) => ( //Record
 <tr>
   <td>{props.menu.name}</td>
   <td>{props.menu.description}</td>
   <td>{props.menu.price}</td>
   <td>{props.menu.category}</td>
   <td>{props.menu.itemStatus}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.menu._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteMenu(props.menu._id);
       }}
     >
       Delete 
     </button>
   </td>
 </tr>
);

export default function MenuList() {
    const [CafeMenu, setMenu] = useState([]); //records
    
    // This method fetches the records from the database.
    useEffect(() => {
      async function getMenu() {
        const response = await fetch(`http://localhost:3001/menu/`);
    
        if (!response.ok) {
          const message = `An error occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
    
        const CafeMenu = await response.json();
        setMenu(CafeMenu); //setRecords(records)
      }
    
      getMenu();
    
      return;
    }, [CafeMenu.length]); //records
 
    // This method will delete a record
    async function deleteMenu(id) {
      await fetch(`http://localhost:3001/${id}`, {
        method: "DELETE"
      });
    
      const newItem = CafeMenu.filter((el) => el._id !== id);
      setMenu(newItem);
    }
    
    // This method will map out the records on the table
    function menuList() { //recordList
      return CafeMenu.map((menu) => {
        return (
          <Menu
            menu={menu}
            deleteMenu={() => deleteMenu(menu._id)}
            key={menu._id}
          />
        );
      });
    }
    // This following section will display the table with the records of individuals.
 return (
    <div>
      <h3>Menu Items List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Item Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{menuList()}</tbody>
      </table>
    </div>
  );
 }