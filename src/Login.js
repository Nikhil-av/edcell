import React,{useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import axios from "axios";
import './login.css';
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [post, setPost] = React.useState(null);
  const navigate = useNavigate();
  const handleSubmit=(event)=> {

    const user={username:username,password:password}
    localStorage.setItem("username",user.username)
    axios
    .post('http://localhost:4000/user/login', user)
    .then((response) => {
      setPost(response.data);
      alert(response.data.message)
    });
    event.preventDefault();
    
  }
    return(
  <section>
    <div className="container">
      <div className="user signinBx">
        <div className="imgBx"><img src="https://raw.githubusercontent.com/WoojinFive/CSS_Playground/master/Responsive%20Login%20and%20Registration%20Form/img1.jpg" alt="" /></div>
        <div className="formBx">
          <form action="" onsubmit="return false;">
            <h2>Sign In</h2>
            <input type="text" name="" placeholder="Username" onChange={(e)=>setUsername(e.target.value)}/>
            <input type="password" name="" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            <input type="submit" name="" value="Login" onClick={handleSubmit}/>
            <br></br>
            <Link to='/Register' className="signup">
              Don't have an account Register?
            </Link>
          </form>
        </div>
      </div>
    </div>
  </section>
    );
  }
  
  export default Login;