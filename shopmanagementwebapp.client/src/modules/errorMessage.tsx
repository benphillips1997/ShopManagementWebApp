import styled from "styled-components";

interface ErrorMessageProps {
    message: string;
    size?: number;
    time?: number;
}

function ErrorMessage({ message, size, time }: ErrorMessageProps) {

    return (
        <Message size={size} $time={time}>{message}</Message>
    );
}

export default ErrorMessage;

const Message = styled.p<{ size?: number, $time?: number }>`
    position: fixed;
    border-radius: 15px;
    top: 20%;
    background-color: rgba(61, 107, 129, 0.5);
    position: fixed;
    color: red;
    font-size: ${props => props.size ?? "16"}px;
    padding: 8px 20px;
`