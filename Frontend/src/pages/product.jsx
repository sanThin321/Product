import React from "react"
import Header from "../components/header";

const LandingPage = () => {
  return (
    <Header>
      <div>
        <div className="d-flex flex-column position-relative">
          <input
            type="search"
            placeholder="Search product..."
            // onChange={(e) => handleSearch(e.target.value)}
            className="form-control no-focus text-dark w-25"
            aria-label="Search"
          />
        </div>
      </div>
    </Header>
  );
};
export default LandingPage;
