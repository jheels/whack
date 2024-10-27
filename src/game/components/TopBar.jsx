/* eslint-disable react/prop-types */

import { useState } from "react";
import ProgressPopup from "./Progress";
import { ProgressManager } from "./ProgressManager";


const TopBar = () => {
    const pm = ProgressManager.getInstance();

    const [viewProgress, setViewProgress] = useState(false);

    return (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-3">
            <progress
                // value={5}
                // max={7}
                onMouseEnter={() => setViewProgress(true)}
                onMouseLeave={() => setViewProgress(false)}
                value={pm.getUnitProgress(0).completedTasks}
                max={pm.getTotalUnitScenarios(0)}
            ></progress>
            {viewProgress && <ProgressPopup />}
        </div>
    );
};

export default TopBar;
