import { useState, useEffect } from "react";

function CircleProgressBar({ count }) {
  const [progressPercentage, setProgressPercentage] = useState(0);
  const circleLength = 2 * Math.PI * 15.9155;
  const dashArray = circleLength;
  const dashOffset = circleLength - (progressPercentage / 100) * circleLength;

  useEffect(() => {
    setProgressPercentage(count * 10);
  }, [count]);

  return (
    <div className={`ky-spec-progress-bar progress-bar-${count}`}>
      <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
        <path className="svg-color" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="2" strokeDasharray={dashArray} strokeDashoffset={dashOffset} />
        <text className="percentage" x="18" y="22">{`${count * 10}%`}</text>
      </svg>
    </div>
  );
}

export default CircleProgressBar;