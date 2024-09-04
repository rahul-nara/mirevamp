function ScoreLabel({scoreCount, scoreLabelClass}) {
      return (
            <div className={`${scoreLabelClass}`}>
                  <span>Score</span>
                  <span>{`${scoreCount}%`}</span>
            </div>
       );
}

export default ScoreLabel;