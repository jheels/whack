/* eslint-disable react/prop-types */
const ProgressPopup = ({ onClose }) => {
    return (
        <div className="absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-3xl">Progress</h1>
            <button onClick={onClose}>Go Back</button>
        </div>
    );
};

export default ProgressPopup;
