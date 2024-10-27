/* eslint-disable react/prop-types */
// src/components/LearningPage.jsx
import React, { useState, useRef } from "react";

export const LearningPage = ({ page, onComplete, onBack }) => {
    const [words] = useState(() =>
        page.correctOrder.map((x) => x).sort(() => Math.random() - 0.5)
            .map((word) => ({
            id: crypto.randomUUID(),
            text: word,
        }))
    );

    const [answers, setAnswers] = useState(Array(page.correctOrder.length).fill(''));
    const draggedWordRef = useRef(null);

    // Split text into parts based on underscores
    const textParts = page.text.split("___");

    const handleDragStart = (word) => {
        draggedWordRef.current = word.id;
    };

    const handleDrop = (blankIndex) => {
        if (!draggedWordRef.current) return;
    
        const word = words.find((w) => w.id === draggedWordRef.current);
        if (word) {
            setAnswers((prevAnswers) => {
                const updatedAnswers = [...prevAnswers]; // Create a copy of the current answers array
                updatedAnswers[blankIndex] = word.text; // Set the dropped word in the correct blank
                return updatedAnswers; // Update the state with the modified array
            });
        }
        draggedWordRef.current = null; // Reset the dragged word reference
    };

    const checkAnswers = () => {
        const isCorrect = answers.every(
            (answer, index) => answer === page.correctOrder[index]
        );
        if (isCorrect) {
            onComplete();
        }
    };

    const areAllBlanksFilled = answers.every(answer => answer.trim() !== '');

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-pixelBackground border-4 border-pixelBorder border-dashed rounded-lg max-w-3xl w-full p-6 space-y-6">
                <h2 className="text-2xl font-pixel text-pixelText">
                    {page.title}
                </h2>

                <div className="space-y-4">
                    <div className="text-lg font-pixel text-pixelText">
                        {textParts.map((part, index) => (
                            <React.Fragment key={index}>
                                {part}
                                {index < textParts.length - 1 && (
                                    <span
                                        className="mx-2 px-4 py-3 mb-[-4px] border-2 border-dashed border-pixelBorder min-w-[100px] inline-block"
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={() => handleDrop(index)}
                                    >
                                        {answers[index] || ""}
                                    </span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-2 p-4 bg-pixelBackground rounded">
                        {words.map((word) => (
                            <div
                                key={word.id}
                                draggable
                                onDragStart={() => handleDragStart(word)}
                                className={`px-3 py-1 bg-pixelBackground border-2 border-pixelBorder rounded cursor-move font-pixel text-pixelText
                                ${
                                    Object.values(answers).includes(
                                        word.text
                                    )
                                        ? "opacity-50"
                                        : ""
                                }`}
                            >
                                {word.text}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between">
                    <button
                        onClick={onBack}
                        className="px-4 py-2 font-pixel text-pixelText bg-pixelBackground border-2 border-pixelBorder hover:border-pixelHover hover:text-pixelHover active:bg-pixelHover rounded"
                    >
                        Back
                    </button>
                    {areAllBlanksFilled && (
                    <button
                        onClick={checkAnswers}
                        className="px-4 py-2 font-pixel text-pixelText bg-pixelBackground border-2 border-pixelBorder hover:border-pixelHover hover:text-pixelHover active:bg-pixelHover rounded"
                    >
                        Check Answers
                    </button> )}
                </div>
            </div>
        </div>
    );
};
