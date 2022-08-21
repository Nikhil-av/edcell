import React,{useState} from 'react';
import './login.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  Link
} from "react-router-dom";

function Register() {
  const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [post, setPost] = React.useState(null);
    const [rollno,setRollno] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [branch, setBranch] = useState("");
    const [year, setYear] = useState("");
    const handleSubmit=(event)=> {
        const user={username:username,email:email,branch:branch,year:year,password:password}
        localStorage.setItem("username",user.username)
        console.log(user)
        axios
        .post('http://localhost:4000/user/create', user)
        .then((response) => {
          setPost(response.data);
          alert(response.data.message)
          if(response.data.message==="otp sent")
          navigate("/otp");
        });
        event.preventDefault();
        
      }
    return(
  <section>
    <div className="container">

      <div className="user signinBx">
        <div className="formBx">
          <form >
            <h2>Create an account</h2>
            <input type="text"  placeholder="Username"  onChange={(e)=>setUsername(e.target.value)}/>
            <input type="email"  placeholder="Email Address"  onChange={(e)=>setEmail(e.target.value)}/>
            <input type="text" placeholder="Branch"  onChange={(e)=>setBranch(e.target.value)}/>
            <input type="text" placeholder="Year"  onChange={(e)=>setYear(e.target.value)}/>
            <input type="text" placeholder="Roll no"  onChange={(e)=>setRollno(e.target.value)}/>
            <input type="password"  placeholder="Create Password"  onChange={(e)=>setPassword(e.target.value)}/>
            <input name="" type="submit" value="Sign Up" onClick={handleSubmit}/>
            <br></br>
            <Link to='/Login' className="signup">
              Already have an account Login?
            </Link>
          </form>
        </div>
        <div className="imgBx"><img src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img2.jpg" alt="" /></div>
      </div>
    </div>
  </section>
    );
  }
  
  export default Register;