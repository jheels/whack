/* eslint-disable react/prop-types */

import { ProgressManager } from "./ProgressManager";

const pm = ProgressManager.getInstance();

const ProgressPopup = () => {
    return (
        <div className="absolute top-40 left-1/2  -translate-x-1/2 -translate-y-1/2 bg-pixelBackground text-black p-3 w-[420px] rounded-lg">
            <div className="flex items-center justify-between">
                <p className="flex-1 text-left">Budgeting</p>
                <progress
                    className="flex-1 mx-4"
                    value={pm.getUnitProgress(0).completedTasks}
                    max={pm.getTotalUnitScenarios(0)}
                ></progress>
                <img
                    className={`flex-shrink-0 w-10 ${
                        pm.getUnitProgress(0).completedTasks ===
                        pm.getTotalUnitScenarios(0)
                            ? "opacity-100"
                            : "opacity-40"
                    }`}
                    src="assets/badges/budgeting.png"
                    width={40}
                />
            </div>

            <div className="flex items-center justify-between">
                <p className="flex-1 text-left">Scams</p>
                <progress className="flex-1 mx-4" value={5} max={5}></progress>
                <img
                    className={`flex-shrink-0 w-10`}
                    src="assets/badges/scams.png"
                    width={40}
                />
            </div>

            <div className="flex items-center justify-between">
                <p className="flex-1 text-left">Loans</p>
                <progress className="flex-1 mx-4" value={2} max={5}></progress>
                <img
                    className={`flex-shrink-0 w-10 ${
                        pm.getUnitProgress(2).completedTasks ===
                        pm.getTotalUnitScenarios(2)
                            ? "opacity-100"
                            : "opacity-40"
                    }`}
                    src="assets/badges/loans.png"
                    width={40}
                />
            </div>

            <div className="flex items-center justify-between">
                <p className="flex-1 text-left">Credit</p>
                <progress className="flex-1 mx-4" value={1} max={5}></progress>
                <img
                    className={`flex-shrink-0 w-10 ${
                        pm.getUnitProgress(3).completedTasks ===
                        pm.getTotalUnitScenarios(3)
                            ? "opacity-100"
                            : "opacity-40"
                    }`}
                    src="assets/badges/credit.png"
                    width={40}
                />
            </div>

            <div className="flex items-center justify-between">
                <p className="flex-1 text-left">Housing</p>
                <progress className="flex-1 mx-4" value={3} max={5}></progress>
                <img
                    className={`flex-shrink-0 w-10 ${
                        pm.getUnitProgress(4).completedTasks ===
                        pm.getTotalUnitScenarios(4)
                            ? "opacity-100"
                            : "opacity-40"
                    }`}
                    src="assets/badges/housing.png"
                    width={40}
                />
            </div>
        </div>
    );
};

export default ProgressPopup;
