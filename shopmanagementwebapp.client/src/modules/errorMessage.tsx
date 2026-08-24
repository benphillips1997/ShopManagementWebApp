
interface ErrorMessageProps {
    message: string;
}

function ErrorMessage({ message }: ErrorMessageProps) {

    return (
        <div className="errorMessage">
            {message}
        </div>
    );
}

export default ErrorMessage;