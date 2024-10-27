/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { AdviceRank } from "../../../public/static/scenario";

export const LoadingDots = () => {
    const [dots, setDots] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.');
        }, 500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-pixelBackground border-4 border-pixelBorder border-dashed rounded-lg max-w-3xl w-full p-6 space-y-6">
                <h2 className="text-2xl font-pixel text-pixelText">Loading</h2>
                <span className="text-2xl font-bold">{`Implementing advice${dots}`}</span>
            </div>
        </div>
    );
};

export const OutcomeScreen = ({ outcome, onRestart, onContinue }) => {
    const isOptimal = outcome?.rank == AdviceRank.BEST;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-pixelBackground border-4 border-pixelBorder border-dashed rounded-lg max-w-3xl w-full p-6 space-y-6">
                <div className="space-y-4">
                    <h2 className="text-2xl font-pixel text-pixelText">
                        {isOptimal ? "Great job!" : "Room for improvement"}
                    </h2>

                    <div className="p-4">
                        <p className="text-lg text-pixelText mb-4">{outcome.outcomes.immediate}</p>
                        <p className="text-lg text-pixelText mb-4">{outcome.outcomes.longTerm}</p>
                        {/* <hr></hr> */}

                        {!isOptimal && (
                            <div className="text-pixelText/80 italic align-bottom text-s mt-16">
                                <p>Would you like to try a different approach?</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex justify-between pt-0">
                    {!isOptimal && (
                        <button
                            onClick={onRestart}
                            className="px-4 py-2 font-pixel text-pixelText bg-pixelBackground border-2 border-pixelBorder hover:border-pixelHover hover:text-pixelHover active:bg-pixelHover rounded"
                        >
                            Try Again
                        </button>
                    )}
                    <button
                        onClick={onContinue}
                        className="px-4 py-2 font-pixel text-pixelText bg-pixelBackground border-2 border-pixelBorder hover:border-pixelHover hover:text-pixelHover active:bg-pixelHover rounded ml-auto"
                    >
                        {isOptimal ? "Continue" : "Continue Anyway"}
                    </button>
                </div>
            </div>
        </div >
    );
};
