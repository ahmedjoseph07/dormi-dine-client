import React from "react";
import { Typewriter } from "react-simple-typewriter";

const TypeWriter = () => {
    return (
        <div>
            <h1>
                <span className="text-accent font-bold">
                    <Typewriter
                        words={[
                            "Manage Your Meals...",
                            "Track Your Expenses...",
                            "Enjoy Hostel Life...",
                        ]}
                        loop={0}
                        cursor
                        cursorStyle="_"
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                </span>
            </h1>
        </div>
    );
};

export default TypeWriter;
