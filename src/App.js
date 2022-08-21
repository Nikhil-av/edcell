import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Link
} from "react-router-dom";
import Login from './Login'
import Register from './Register';
import Otp from './otp'
function App() {
  return (
    <BrowserRouter>
    <Routes>
       <Route exact path="/" element={<Login/>} />
       <Route path="/Login" element={<Login/>} />
       <Route path="/Register" element={<Register/>} />
       <Route path="/otp" element={<Otp/>} />
 
    </Routes>
 
 
  </BrowserRouter>
 

  );
}

export default App;
