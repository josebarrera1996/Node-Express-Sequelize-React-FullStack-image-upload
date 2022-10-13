import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddProduct from './screens/AddProduct';
import ShowProducts from './screens/ShowProducts';
import EditProduct from './screens/EditProduct';
import ProductDetails from './screens/ProductDetails';

const App = () => {

  return (

    <Router>
      <Routes>
        <Route exact path="/addProduct" caseSensitive={false} element={<AddProduct />} />
        <Route exact path="/products" caseSensitive={false} element={<ShowProducts />} />
        <Route exact path="/product/edit/:id" caseSensitive={false} element={<EditProduct />} />
        <Route exact path="/product/:id" caseSensitive={false} element={<ProductDetails />} />
      </Routes>
    </Router>
  )
}

export default App;