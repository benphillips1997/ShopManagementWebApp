import { isRouteErrorResponse, Link } from "react-router-dom";

function ErrorPage(error: any) {

    const checkErrorType = () => {
        if (isRouteErrorResponse(error)) {
            return <h1>Error: {error.status} {error.statusText}</h1>;
        }
        else if (error instanceof Error) {
            return <h1>Error: {error.message} {error.stack}</h1>;
        }
        else {
            return <h1>Unknown error</h1>;
        }
    }

    return (
        <div>
            {checkErrorType()}
            <h3>Return to <Link to="/">dashboard</Link></h3>
        </div>
    );
}

export default ErrorPage;