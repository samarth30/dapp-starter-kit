import React from "react";

const Admin = () => {
  return (
    <div class="container">
      <main role="main" class="container">
        <div class="jumbotron">
          <h1>Project</h1>
          <div className="row" style={{ paddingTop: "30px" }}>
            {" "}
            <div className="row" style={{ paddingLeft: "40px" }}>
              <h3>text 1</h3>
            </div>
            <div className="row" style={{ paddingLeft: "40px" }}>
              <h3>text 2</h3>
            </div>
            <div className="row" style={{ paddingLeft: "40px" }}>
              <h3>text 3</h3>
            </div>
            <div className="row" style={{ paddingLeft: "40px" }}>
              <button className="btn btn-primary">Click on it</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Admin;
