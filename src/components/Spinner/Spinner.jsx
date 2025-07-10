import { ClipLoader} from "react-spinners";
import React from 'react';

const Spinner = () => {
    const color = "#3b82f6";
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <ClipLoader
                color={color}
                size={70}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    );
};

export default Spinner;
