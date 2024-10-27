/* eslint-disable react/prop-types */

import { ProgressManager } from "./ProgressManager";

const pm = ProgressManager.getInstance();

console.log(pm.getUnitProgress(0));

const ProgressPopup = () => {
    return (
        <div className="absolute top-40 left-1/2  -translate-x-1/2 -translate-y-1/2 bg-pixelBackground text-black p-3 ">
            {/* <h1 className="text-3xl">Progress</h1> */}
            <div className="flex gap-4 items-center justify-end">
                <p>Budgeting</p>
                <progress
                    value={pm.getUnitProgress(0).completedTasks}
                    max={pm.getTotalUnitScenarios(0)}
                ></progress>
                <img
                    className={
                        pm.getUnitProgress(0).completedTasks ===
                        pm.getTotalUnitScenarios(0)
                            ? "opacity-100"
                            : "opacity-40"
                    }
                    src="assets/badges/budgeting.png"
                    width={40}
                />
            </div>
            <div className="flex gap-4 items-center  justify-end">
                <p>Scams</p>
                <progress
                    value={pm.getUnitProgress(1).completedTasks}
                    max={pm.getTotalUnitScenarios(1)}
                ></progress>
                <img
                    className={
                        pm.getUnitProgress(1).completedTasks ===
                        pm.getTotalUnitScenarios(1)
                            ? "opacity-100"
                            : "opacity-40"
                    }
                    src="assets/badges/scam.png"
                    width={40}
                />
            </div>
            <div className="flex gap-4 items-center justify-end">
                <p>Loans</p>
                <progress
                    value={pm.getUnitProgress(2).completedTasks}
                    max={pm.getTotalUnitScenarios(2)}
                ></progress>
                <img
                    className={
                        pm.getUnitProgress(2).completedTasks ===
                        pm.getTotalUnitScenarios(2)
                            ? "opacity-100"
                            : "opacity-40"
                    }
                    src="assets/badges/loans.png"
                    width={40}
                />
            </div>
            <div className="flex gap-4 items-center justify-end">
                <p>Credit</p>
                <progress
                    value={pm.getUnitProgress(3).completedTasks}
                    max={pm.getTotalUnitScenarios(3)}
                ></progress>
                <img
                    className={
                        pm.getUnitProgress(3).completedTasks ===
                        pm.getTotalUnitScenarios(3)
                            ? "opacity-100"
                            : "opacity-40"
                    }
                    src="assets/badges/credit.png"
                    width={40}
                />
            </div>
            <div className="flex gap-4 items-center justify-end">
                <p>Housing</p>
                <progress
                    value={pm.getUnitProgress(4).completedTasks}
                    max={pm.getTotalUnitScenarios(4)}
                ></progress>
                <img
                    className={
                        pm.getUnitProgress(4).completedTasks ===
                        pm.getTotalUnitScenarios(4)
                            ? "opacity-100"
                            : "opacity-40"
                    }
                    src="assets/badges/housing.png"
                    width={40}
                />
            </div>
        </div>
    );
};

export default ProgressPopup;
