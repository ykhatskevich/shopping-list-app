import './index.css';
import { useState } from 'react';

const initialProducts = [
  {id: 1, title: "Beer", quantity: 2, put: false},
  {id: 2, title: "Bread", quantity: 1, put: true},
]

function App() {
  const [products, setProducts] = useState([]);
  

  function handleAddProducts (product) {
    setProducts((products)=>[...products, product]);
  }

  function handleDeleteProducts (id) {
    setProducts(products => products.filter(product=> product.id !== id))

  }


  function handleToggleProducts(id){
    setProducts((products) => 
    products.map((product) => 
    product.id === id ? { ...product, put: !product.put}
    : product
    )
    );
  }

  function clearList () {
    setProducts([]);
  }
  
  return (
    <div className="app">
      <div className="shopping-list-banner">
     <Logo />
     </div>
     <Form onAddProducts={handleAddProducts} />
     <ShoppingList products={products} onDeleteProducts={handleDeleteProducts} 
     onToggleProducts={handleToggleProducts} onClearList={clearList}
     />
    </div>
  );
}

export default App;

function Logo() {
  return (
  <h1>Shopping List</h1>
  )
};

function Form({onAddProducts}){
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

 

  function handleSubmit(e) {
    e.preventDefault();

    if(!description) return;
    
    const newProduct = {
      description, quantity, put:false, id:Date.now()
    };

    onAddProducts(newProduct);

    setDescription("");
    setQuantity(1);

  }

  
return (
<div className="form-wrapper">
<form onSubmit={handleSubmit}>
  <h3>Create your shopping list</h3>
  <div className="input-select-wrapper">
  <select value={quantity} onChange={e=>setQuantity(Number(e.target.value))}>
    {Array.from({length: 50}, (_, i) => i + 1).map((num) => (
      <option value ={num} key={num}>{num}</option>
    ))}
  </select>
  <input type="text" placeholder="product" value={description} onChange={
    (e) => setDescription(e.target.value)
  }/>
  </div>
  <button>Put Into Shopping Cart</button>
</form>
</div>
)
};

function ShoppingList({products, onDeleteProducts, onToggleProducts, onClearList}) {
return (
<div className="shopping-list-container">
<ul>

  {products.map(product=><Product 
  product={product} 
  onDeleteProducts={onDeleteProducts}
  onToggleProducts={onToggleProducts}
  key={product.id}/> )}
</ul>
<div className="clear-button-container">
<button onClick={onClearList}>Clear List</button>
</div>
</div>
)


};

function Product({product, onDeleteProducts, onToggleProducts}) {
  return <li>
    <input type="checkbox" value={product.put} onChange={()=> onToggleProducts(product.id)}/>
    <span style={product.put ? {textDecoration: 'line-through'} : {}} 
    
    >
      <span className="quantity">
      {product.quantity}
      </span>
      <span className="product-name">
      {product.description}
      </span>
      
      </span>
    <button onClick={()=>onDeleteProducts(product.id)}>remove</button>
    </li>
}

