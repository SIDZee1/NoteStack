import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({email: "", password: ""})
    let history = useHistory()

    const handleSubmit = async (e)=>{
        e.preventDefault();
        // API Call
        
        const response = await fetch(`http://localhost:8080/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password })
        });

        // Logic to get Auth-Token
        const jsn = await response.json();
        // console.log(jsn, jsn.authToken)
        if (jsn.success){
            // Save the authToken and redirect
            localStorage.setItem('token', jsn.authToken)
            // console.log("Login")
            history.push("/")
            props.showAlert("Signed in successfully.", "success")
        }
        else{
            props.showAlert("Invalid credentials!", "danger")
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value});
    }

    return (
        <div style={{overflow: "hidden"}} className="container-fluid">
        <div className="row no-gutter">
            {/* <!-- The image half --> */}        
            <div className="col-md-6 d-none d-md-flex bg-image"></div>
            {/* <!-- The content half --> */}
            <div className="col-md-6 bg-light">
                <div className="login d-flex align-items-center py-5">
    
                    {/* <!-- Demo content--> */}
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-10 col-xl-7 mx-auto">
                                <h3 className="display-4">Generate New Thoughts!</h3>
                                <p className="text-muted mb-4">Please fill your details...</p>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mb-3">
                                        <input htmlFor="email" id="email" type="email" placeholder="Email" value={credentials.email} onChange={onChange} required="" name="email" className="form-control rounded-pill border-0 shadow-sm px-4" />
                                    </div>
                                    <div className="form-group mb-3">
                                        <input htmlFor="password" id="password" type="password" value={credentials.password} onChange={onChange} placeholder="Password" required="" name="password" className="form-control rounded-pill border-0 shadow-sm px-4 text-primary" />
                                    </div>
                                    
                                    <button type="submit" className="btn btn-secondary btn-block text-uppercase mb-2 rounded-pill shadow-sm">Sign in</button>
                                </form>
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
    
        </div>
    </div>
    

    )
}

export default Login
