import React,{useState} from 'react';
import './login.css';
import {Link} from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Otp() {
    const navigate = useNavigate();

    const [otp, setOtp] = useState("");
    const [post, setPost] = React.useState(null);
    const handleSubmit=(event)=> {
        const user={username:localStorage.getItem("username"),otp:otp};
        console.log(user)
        axios
        .post('http://localhost:4000/user/verifyotp', user)
        .then((response) => {
          setPost(response.data);
          alert(response.data.message)
          if(response.data.message==="user created")
          navigate("/Login")
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
            <input type="text"  placeholder="OTP"  onChange={(e)=>setOtp(e.target.value)}/>
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
  
  export default Otp;