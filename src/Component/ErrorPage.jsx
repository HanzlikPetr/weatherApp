import { useRouteError, Link } from "react-router-dom";
import "./style/ErrorPage.css"

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Link to={'/'}>Back</Link>
    </div>
  );
}
