import { Oval } from 'react-loader-spinner';

const defaultSize = 250;

interface LoaderProps {
    visible?: boolean;
    height?: number;
    width?: number;
    size?: number;
    backgroundColor?: string;
    spinnerColor?: string;
}

function Loader({ visible = true, height, width, size, backgroundColor, spinnerColor }: LoaderProps) {
    return (
        <div className="center">
            <Oval
                height={height ?? size ?? defaultSize}
                width={width ?? size ?? defaultSize}
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