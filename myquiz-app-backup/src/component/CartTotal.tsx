import React from "react";

// Step 1: Define the shape of a product
interface Product {
  name: string;
  price: number;
}

// Step 2: Define props for the component
interface CartProps {
  items: Product[];
}

// Step 3: Functional component using the interface
const CartTotal: React.FC<CartProps> = ({ items }) => {
  const totalPrice = items.reduce((total, item) => total + item.price, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name}: ${item.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <h3>Total: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
};

// Step 4: Example usage
const sampleItems: Product[] = [
  { name: "Apple", price: 6.99 },
  { name: "Banana", price: 0.99 },
  { name: "Orange", price: 1.49 },
];

const CalcCartTotal = () => {
  return <CartTotal items={sampleItems} />;
};

export default CalcCartTotal;
