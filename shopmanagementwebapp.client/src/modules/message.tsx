import { useEffect, useState } from "react";
import styled from "styled-components";

interface MessageProps {
    message: string;
    size?: number;
    time?: number;
    disableMe: () => void;
}

function Message({ message, size, time, disableMe }: MessageProps) {
    const [timeLeft, setTimeLeft] = useState(time ?? 5);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((timeLeft) => timeLeft - 0.1);            
        }, 100);

        return () => clearInterval(interval);
    }, [])

    useEffect(() => {
        if (timeLeft < 0) {
            disableMe();
        }
    }, [timeLeft, disableMe])

    return (
    <>
        <MessageStyle size={size} $time={timeLeft}>{message}</MessageStyle>
    </>
    );
}

export default Message;

const MessageStyle = styled.p<{ size?: number, $time?: number }>`
    position: absolute;
    border-radius: 15px;
    top: ${props => props.$time ? `${30 + Math.min(5, props.$time)}%` : "30%"};
    left: 42.5%;
    width: 15%;
    text-align: center;
    background-color: rgba(61, 107, 129, 0.5);
    color: red;
    font-size: ${props => props.size ?? "16"}px;
    padding: 8px 20px;
    opacity: ${props => props.$time ? `${Math.min(1, props.$time / 5)}` : "1"};
`