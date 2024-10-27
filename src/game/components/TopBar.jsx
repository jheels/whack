/* eslint-disable react/prop-types */

import { useState } from "react";
import { ProgressManager } from "./ProgressManager";
import ProgressPopup from "./Progress";

const pm = ProgressManager.getInstance();

let overallValue = 0;
let overallMax = 0;

for (let index = 0; index < 5; index++) {
    overallValue += pm.getUnitProgress(index).completedTasks;
    overallMax += pm.getTotalUnitScenarios(index);
}
const TopBar = () => {
    const [viewProgress, setViewProgress] = useState(false);
    console.log(pm.getTotalUnitScenarios(2));

    return (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-3">
            <progress
                className="bg-gray-100"
                onMouseEnter={() => setViewProgress(true)}
                onMouseLeave={() => setViewProgress(false)}
                value={2}
                max={5}
            ></progress>
            {viewProgress && <ProgressPopup />}
        </div>
    );
};

export default TopBar;
