/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export const LoadingDots = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        console.log('Loading dots effect');
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-center h-24">
            <span className="text-2xl font-bold">{`Implementing advice${dots}`}</span>
        </div>
    );
};

export const OutcomeScreen = ({ outcome }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-pixelBackground border-4 border-pixelBorder border-dashed rounded-lg max-w-3xl w-full p-6 space-y-6">
                <h2 className="text-2xl font-pixel text-pixelText">kjsdafl</h2>

                <div className="space-y-4">
                    dlsfkjasdflkj
                </div>

                <div className="flex justify-between">
                    <button
                        // onClick={onBack}
                        className="px-4 py-2 font-pixel text-pixelText bg-pixelBackground border-2 border-pixelBorder hover:border-pixelHover hover:text-pixelHover active:bg-pixelHover rounded"
                    >
                        Back
                    </button>
                    <button
                        // onClick={checkAnswers}
                        className="px-4 py-2 font-pixel text-pixelText bg-pixelBackground border-2 border-pixelBorder hover:border-pixelHover hover:text-pixelHover active:bg-pixelHover rounded"
                    >
                        Check Answers
                    </button>
                </div>
            </div>
        </div>
    );
};
