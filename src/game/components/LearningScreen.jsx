/* eslint-disable react/prop-types */
// src/components/LearningPage.tsx
import React, { useState, useRef } from 'react';

export const LearningPage = ({
    page,
    onComplete,
    onBack
}) => {
    const [words] = useState(() =>
        page.correctOrder.map(word => ({
            id: crypto.randomUUID(),
            text: word
        }))
    );

    const [filledBlanks, setFilledBlanks] = useState({});
    const draggedWordRef = useRef(null);

    // Split text into parts based on underscores
    const textParts = page.text.split('___');

    const handleDragStart = (word) => {
        draggedWordRef.current = word.id;
    };

    const handleDrop = (blankIndex) => {
        if (!draggedWordRef.current) return;

        const word = words.find(w => w.id === draggedWordRef.current);
        if (word) {
            setFilledBlanks(prev => ({
                ...prev,
                [blankIndex]: word.text
            }));
        }
        draggedWordRef.current = null;
    };

    const checkAnswers = () => {
        const answers = Object.values(filledBlanks);
        const isCorrect = answers.every((answer, index) =>
            answer === page.correctOrder[index]
        );
        if (isCorrect) {
            onComplete();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" >
            <div className="bg-white rounded-lg max-w-3xl w-full p-6 space-y-6" >
                <h2 className="text-2xl font-bold" > {page.title} </h2>

                < div className="space-y-4" >
                    <div className="text-lg" >
                        {
                            textParts.map((part, index) => (
                                <React.Fragment key={index} >
                                    {part}
                                    {
                                        index < textParts.length - 1 && (
                                            <span
                                                className="mx-2 px-4 py-1 border-2 border-dashed border-gray-300 min-w-[100px] inline-block"
                                                onDragOver={(e) => e.preventDefault()}
                                                onDrop={() => handleDrop(index)}
                                            >
                                                {filledBlanks[index] || ''}
                                            </span>
                                        )}
                                </React.Fragment>
                            ))}
                    </div>

                    < div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded" >
                        {
                            words.map(word => (
                                <div
                                    key={word.id}
                                    draggable
                                    onDragStart={() => handleDragStart(word)}
                                    className={`px-3 py-1 bg-blue-100 rounded cursor-move
                                    ${Object.values(filledBlanks).includes(word.text) ? 'opacity-50' : ''}`}
                                >
                                    {word.text}
                                </div>
                            ))}
                    </div>
                </div>

                < div className="flex justify-between" >
                    <button
                        onClick={onBack}
                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                    >
                        Back
                    </button>
                    < button
                        onClick={checkAnswers}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Check Answers
                    </button>
                </div>
            </div>
        </div>
    );
};

