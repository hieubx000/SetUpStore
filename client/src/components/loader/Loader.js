import React from "react";
import "./style.css";
function Loader() {
  return (
    <div className="modal">
      <div className="modal-container">
        <img alt="loader" src={"https://firebasestorage.googleapis.com/v0/b/ecommerce-62fba.appspot.com/o/index.svg?alt=media&token=4582b9e5-16e0-4de1-a742-e1f0da3d3d62"} />
      </div>
    </div>
  );
}

export default Loader;
