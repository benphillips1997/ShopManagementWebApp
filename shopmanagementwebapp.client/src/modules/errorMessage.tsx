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
    color: red;
    font-size: ${props => props.size ?? "16"}px;
    opacity: 1;
    transition: opacity ${props => props.$time ?? 10}s;
`