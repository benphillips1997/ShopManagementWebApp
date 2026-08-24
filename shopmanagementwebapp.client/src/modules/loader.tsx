import { Oval } from 'react-loader-spinner';

const size = 250;

interface LoaderProps {
    visible: boolean;
    height?: number;
    width?: number;
    backgroundColor?: string;
    spinnerColor?: string;
}

function Loader({ visible, height, width, backgroundColor, spinnerColor }: LoaderProps) {
    return (
        <div className="center">
            <Oval
                height={height || size}
                width={width || size}
                color={spinnerColor || "#22619c"}
                visible={visible}
                ariaLabel="oval-loading"
                secondaryColor={backgroundColor || "white"}
                strokeWidth={4}
                strokeWidthSecondary={4}
                animationDuration="1"
            />
        </div>
    );
}

export default Loader;