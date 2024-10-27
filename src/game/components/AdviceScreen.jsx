/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
// src/components/AdviceScreen.jsx

export const AdviceScreen = ({ scenario, onSelectAdvice, onBack }) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-pixelBackground border-4 border-pixelBorder border-dashed rounded-lg max-w-3xl w-full p-6 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-pixel text-pixelText">
                        What advice would you give?
                    </h2>
                    <p className="text-lg font-pixel text-pixelText">
                        Choose your response carefully - your advice will impact{" "}
                        {scenario.advisee.name}'s financial future.
                    </p>
                </div>

                <div className="space-y-4">
                    {Array.from(scenario.adviceOptions.values()).map(
                        (option) => (
                            <button
                                key={option.id}
                                onClick={() => onSelectAdvice(option)}
                                className="w-full p-4 text-left font-pixel text-pixelText bg-pixelBackground border-2 border-pixelBorder hover:border-pixelHover hover:text-pixelHover active:bg-pixelHover rounded"
                            >
                                <p className="font-medium">{option.text}</p>
                            </button>
                        )
                    )}
                </div>
                <button
                    onClick={onBack}
                    className="px-4 py-2 font-pixel text-pixelText bg-pixelBackground border-2 border-pixelBorder hover:border-pixelHover hover:text-pixelHover active:bg-pixelHover rounded"
                >
                    Back to Learning
                </button>
            </div>
        </div>
    );
};

export default AdviceScreen;
