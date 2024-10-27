/* eslint-disable react/prop-types */
const DialogueScreen = ({
    scenario,
    onStartLearning,
    onClose
}) => {
    const { advisee, title } = scenario;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-pixelBackground border-4 border-pixelBorder border-dashed rounded-lg max-w-2xl w-full p-6 space-y-4">
                <div className="flex items-start gap-4">
                    <img
                        src={advisee.imageUrl}
                        alt={advisee.name}
                        className="w-24 h-24 rounded-full object-cover"
                    />
                    <div>
                        <h2 className="text-2xl font-pixel text-pixelText">{title}</h2>
                        <p className="text-lg font-pixel text-pixelText">{advisee.name}</p>
                    </div>
                </div>

                <p className="text-lg font-pixel text-pixelText">{advisee.dialogue}</p>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 font-pixel text-pixelText bg-pixelBackground border-2 border-pixelBorder hover:border-pixelHover hover:text-pixelHover active:bg-pixelHover rounded"
                    >
                        Maybe Later
                    </button>
                    <button
                        onClick={onStartLearning}
                        className="px-4 py-2 font-pixel text-pixelText bg-pixelBackground border-2 border-pixelBorder hover:border-pixelHover hover:text-pixelHover active:bg-pixelHover rounded"
                    >
                        Help {advisee.name.split(' ')[0]}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DialogueScreen;
// // src/components/AdviceScreen.tsx
// import React from 'react';
// import { AdviceOption, Scenario } from '../types';
//
// interface AdviceScreenProps {
//     scenario: Scenario;
//     onSelectAdvice: (advice: AdviceOption) => void;
//     onBack: () => void;
// }
//
// export const AdviceScreen: React.FC<AdviceScreenProps> = ({
//     scenario,
//     onSelectAdvice,
//     onBack
// }) => {
//     return (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" >
//             <div className="bg-white rounded-lg max-w-3xl w-full p-6 space-y-6" >
//                 <div className="space-y-2" >
//                     <h2 className="text-2xl font-bold" > What advice would you give ? </h2>
//                     < p className="text-gray-600" > Choose your response carefully - your advice will impact {scenario.advisee.name} 's financial future.</p>
//                 </div>
//
//                 < div className="space-y-4" >
//                     {
//                         scenario.adviceOptions.map(option => (
//                             <button
//                                 key={option.id}
//                                 onClick={() => onSelectAdvice(option)}
//                                 className="w-full p-4 text-left border rounded hover:bg-gray-50 transition-colors"
//                             >
//                                 <p className="font-medium" > {option.text} </p>
//                             </button>
//                         ))}
//                 </div>
//
//                 < button
//                     onClick={onBack}
//                     className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
//                 >
//                     Back to Learning
//                 </button>
//             </div>
//         </div>
//     );
// };
//
// // src/components/ScenarioManager.tsx
// import React, { useState } from 'react';
// import { DialogueScreen } from './DialogueScreen';
// import { LearningPage } from './LearningPage';
// import { AdviceScreen } from './AdviceScreen';
// import { Scenario, AdviceOption } from '../types';
//
// interface ScenarioManagerProps {
//     scenario: Scenario;
//     onComplete: (selectedAdvice: AdviceOption) => void;
//     onClose: () => void;
// }
//
// export const ScenarioManager: React.FC<ScenarioManagerProps> = ({
//     scenario,
//     onComplete,
//     onClose
// }) => {
//     const [stage, setStage] = useState<'dialogue' | 'learning' | 'advice'>('dialogue');
//     const [currentPageIndex, setCurrentPageIndex] = useState(0);
//
//     const handleStartLearning = () => {
//         setStage('learning');
//     };
//
//     const handlePageComplete = () => {
//         if (currentPageIndex < scenario.learningPages.length - 1) {
//             setCurrentPageIndex(prev => prev + 1);
//         } else {
//             setStage('advice');
//         }
//     };
//
//     const handlePageBack = () => {
//         if (currentPageIndex > 0) {
//             setCurrentPageIndex(prev => prev - 1);
//         } else {
//             setStage('dialogue');
//         }
//     };
//
//     const handleAdviceBack = () => {
//         setCurrentPageIndex(scenario.learningPages.length - 1);
//         setStage('learning');
//     };
//
//     return (
//         <>
//             {stage === 'dialogue' && (
//                 <DialogueScreen
//                     scenario={scenario}
//                     onStartLearning={handleStartLearning}
//                     onClose={onClose}
//                 />
//             )}
//
//             {
//                 stage === 'learning' && (
//                     <LearningPage
//                         page={scenario.learningPages[currentPageIndex]}
//                         onComplete={handlePageComplete}
//                         onBack={handlePageBack}
//                     />
//                 )
//             }
//
//             {
//                 stage === 'advice' && (
//                     <AdviceScreen
//                         scenario={scenario}
//                         onSelectAdvice={onComplete}
//                         onBack={handleAdviceBack}
//                     />
//                 )
//             }
//         </>
//     );
// };