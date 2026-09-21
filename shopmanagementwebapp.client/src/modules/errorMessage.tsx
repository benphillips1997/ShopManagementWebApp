import { useCallback, useState } from "react";
import Message from "./message";

interface ErrorMessageProps {
    message: string;
    size?: number;
    time?: number;
}

function ErrorMessage({ message, size = 10, time = 5 }: ErrorMessageProps) {
    const [active, setActive] = useState(true);

    const unMountMessage = useCallback(() => setActive(false), []);

    return (
    <>
        {active && <Message message={message} size={size} time={time} disableMe={unMountMessage} />}
    </>
    )
}

export default ErrorMessage;