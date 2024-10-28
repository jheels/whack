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