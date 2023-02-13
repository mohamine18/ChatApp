import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const App = () => {
  const [isActive, setIsActive] = useState(true);
  return (
    <>
      {isActive ? (
        <div>
          <h1>Hello World</h1>
          <Outlet />
        </div>
      ) : (
        <Navigate to={`login`} replace={true} />
      )}
    </>
  );
};

export default App;
