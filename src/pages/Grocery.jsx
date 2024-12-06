import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa"; // Import arrow icon

const initialGroceryList = [
  { id: 1, name: "Apples", quantity: 3, price: 1.5, image: "https://domf5oio6qrcr.cloudfront.net/medialibrary/11525/0a5ae820-7051-4495-bcca-61bf02897472.jpg" },
  { id: 2, name: "Bananas", quantity: 5, price: 0.8, image: "https://i.pinimg.com/736x/62/ad/2e/62ad2e600b74cd7e21b37ac6c14769a9.jpg" },
  { id: 3, name: "Carrots", quantity: 2, price: 2.0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo9FJc3j285DgslhXvnrLxYO22o4xRACt6Ww&s" },
  { id: 4, name: "Bread", quantity: 1, price: 1.2, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWSUkDSaiDvgwahcV0DIVH510vBvN3XeVYbQ&s" },
  { id: 5, name: "Milk", quantity: 1, price: 1.0, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlmCahZbysyNI2G2R3Btg3qOPVZ_xYa85NuQ&s" },
];

const Grocery = () => {
  const [groceryList, setGroceryList] = useState(initialGroceryList);
  const [newItem, setNewItem] = useState({ name: "", quantity: 1, price: 0, image: "" });
  const [cart, setCart] = useState([]);

  const handleAddItem = () => {
    if (newItem.name.trim() && newItem.image.trim() && newItem.price > 0) {
      const updatedList = [
        ...groceryList,
        { id: groceryList.length + 1, name: newItem.name, quantity: newItem.quantity, price: newItem.price, image: newItem.image },
      ];
      setGroceryList(updatedList);
      setNewItem({ name: "", quantity: 1, price: 0, image: "" }); // Clear input fields
    } else {
      console.log("Item not added, please check input fields.");
    }
  };

  const handleDeleteItem = (id) => {
    setGroceryList(groceryList.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id, newQuantity) => {
    setGroceryList(
      groceryList.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleAddToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
  };

  const handleRemoveFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Go Back to Home Navigation */}
      <button
        onClick={() => window.location.href = "/"} // Replace with your home route
        className="flex items-center text-blue-500 hover:text-blue-700 mb-4"
      >
        <FaArrowLeft className="mr-2" /> {/* Arrow icon */}
        Back to Home
      </button>

      <h1 className="text-3xl font-bold text-center mb-6">Grocery</h1>

      {/* Grocery List Display */}
      <div>
        <h2 className="text-xl font-bold mb-4">Your Grocery Items</h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {groceryList.map((item) => (
            <div key={item.id} className="bg-blue-100 p-4 rounded shadow flex flex-col items-center">
              <img src={item.image} alt={item.name} className="w-24 h-24 rounded mb-2 object-cover" />
              <h3 className="text-lg font-bold">{item.name}</h3>
              <p className="text-gray-700">Quantity: {item.quantity}</p>
              <p className="text-gray-700">Price: ${item.price.toFixed(2)}</p>
              <div className="flex items-center space-x-2 mt-2 flex-wrap justify-center">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                >
                  +
                </button>
                <button
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                  onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                >
                  -
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  Delete
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Item Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Add New Grocery Item</h2>
        <div className="flex flex-wrap items-center gap-4">
          <input
            type="text"
            className="p-2 border rounded w-full sm:w-64"
            placeholder="Enter grocery item"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <input
            type="number"
            className="p-2 border rounded w-24"
            placeholder="Quantity"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: Math.max(1, +e.target.value) })}
          />
          <input
            type="number"
            className="p-2 border rounded w-24"
            placeholder="Price"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: parseFloat(e.target.value) })}
          />
          <input
            type="text"
            className="p-2 border rounded w-full sm:w-64"
            placeholder="Image URL"
            value={newItem.image}
            onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleAddItem}
          >
            Add Item
          </button>
        </div>
      </div>

      {/* Cart Section */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Your Cart</h2>
        <div>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              <ul>
                {cart.map((item, index) => (
                  <li key={index} className="flex justify-between mb-2">
                    <span>{item.name} - ${item.price.toFixed(2)}</span>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
              <div className="text-xl font-bold mt-4">
                Total: ${calculateTotalPrice()}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Grocery;
