import { useState, useEffect } from "react";
import UpdateItem from "./components/UpdateItem";

// use the following link to get the data
// `/doors` will give you all the doors, to get a specific door use `/doors/1`.


function App() {
  // Get the existing item from the server
  // const [item, setItem] = useState(null);
  // pass the item to UpdateItem as a prop

  const [item, setItem] = useState(null);
  const itemId = 1; // Example item ID, can be dynamic

  
  useEffect(() => {
    const fetchItem = async () => {
      const API_URI = `http://${import.meta.env.VITE_API_URI}/doors`;
      try {
        const response = await fetch(`${API_URI}/${itemId}`);
        if (!response.ok) throw new Error("Failed to fetch item");
        const data = await response.json();
        setItem(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItem();
  }, []);

  return <UpdateItem itemId={itemId} item={item}/>;
}

export default App;



