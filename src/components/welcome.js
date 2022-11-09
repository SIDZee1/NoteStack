import React from 'react'

const Welcome = () => {

    return (
        <div>
            {/* <!-- Bootstrap Static Header --> */}
            <div style={{ background: "url(https://images.unsplash.com/photo-1604147495798-57beb5d6af73?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)" }} className=" jumbotron bg-cover text-white">
                <div className="container-fluid py-5 text-center">
                    <h1 className="display-5 font-weight-bold">THINK...</h1>
                    <div style={{ borderTop: "2px solid #fff ",  marginRight: 200, marginLeft: 200 }}></div>
                    {/* <p className="font-italic mb-0">Hello </p> */}
                    <p className="font-italic" style={{fontSize: "25px" , margin:20 }}></p>
                    {/* <a role="button" className="btn btn-primary px-5">See All Features</a> */}
                </div>
            </div>

        </div>
    )
}

export default Welcome
