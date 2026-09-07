import { Link } from "react-router-dom";

function NotFound() {

    return (
        <div>
            <h1>Page not found</h1>
            <h3>Return to <Link to="/">dashboard</Link></h3>
        </div>
    );
}

export default NotFound;