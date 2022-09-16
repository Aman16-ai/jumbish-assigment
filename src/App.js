import './App.css';
import MyOrders from './pages/MyOrders';
import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import UserOrders from './pages/UserOrders';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<UserOrders/>} />
          <Route exact path="/myOrders" element={<MyOrders/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
