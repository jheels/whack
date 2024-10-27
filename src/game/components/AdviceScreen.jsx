/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
// src/components/AdviceScreen.tsx

export const AdviceScreen = ({
    scenario,
    onSelectAdvice,
    onBack
}) => {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full p-6 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold">What advice would you give?</h2>
                    <p className="text-gray-600">Choose your response carefully - your advice will impact {scenario.advisee.name}'s financial future.</p>
                </div>

                <div className="space-y-4">
                    {scenario.adviceOptions.map(option => (
                        <button
                            key={option.id}
                            onClick={() => onSelectAdvice(option)}
                            className="w-full p-4 text-left border rounded hover:bg-gray-50 transition-colors"
                        >
                            <p className="font-medium">{option.text}</p>
                        </button>
                    ))}
                </div>

                <button
                    onClick={onBack}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                    Back to Learning
                </button>
            </div>
        </div>
    );
};
