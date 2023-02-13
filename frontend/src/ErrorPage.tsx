import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  //! remove console.log
  console.log(error);
  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Something went Wrong</h1>
      <p>General error from the react router</p>
    </div>
  );
};

export default ErrorPage;
