import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import "./UpdateItem.css";

const UpdateItem = ({ itemId }) => {
  const API_URI = `http://${import.meta.env.VITE_API_URI}/doors/${itemId}`;

  // Initialize state variables
  const [existingItem, setExistingItem] = useState(null);
  const [updatedItem, setUpdatedItem] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // Fetch existing item when the component mounts
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(API_URI);
        if (!response.ok) throw new Error("Failed to fetch item");
        const data = await response.json();
        setExistingItem(data);
        setUpdatedItem(data.name); // Assuming 'name' is an updatable field
      } catch (error) {
        setResponseMessage(error.message);
      }
    };
    fetchItem();
  }, [API_URI]);

  // Handle input change
  const handleInputChange = (event) => {
    setUpdatedItem(event.target.value);
  };

  // Handle form submission (update request)
  const handleUpdate = async () => {
    try {
      const response = await fetch(API_URI, {
        method: "PUT", // Use PATCH if only updating specific fields
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: updatedItem }),
      });

      if (!response.ok) throw new Error("Failed to update item");
      const data = await response.json();
      setResponseMessage("Item updated successfully");
      setExistingItem(data);
    } catch (error) {
      setResponseMessage(error.message);
    }
  };

  return (
    <div className="update-item-container">
      <h2 className="update-item-title">Update Item</h2>
      {existingItem ? (
        <div>
          <p className="current-item">Current Item: {existingItem.name}</p>
          <input
            type="text"
            value={updatedItem}
            onChange={handleInputChange}
            className="update-item-input"
            placeholder="Enter new name"
          />
          <button className="update-item-button" onClick={handleUpdate}>
            Update
          </button>
        </div>
      ) : (
        <p className="loading-message">Loading item...</p>
      )}
      {responseMessage && (
        <p className={`response-message ${responseMessage.includes("Failed") ? "error" : ""}`}>
          {responseMessage}
        </p>
      )}
    </div>
  );
};

UpdateItem.propTypes = {
  itemId: PropTypes.number.isRequired,
};

export default UpdateItem;
