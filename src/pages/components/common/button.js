
function Button({text, className ,onClick, buttonArrow, addedCompareCount}) {
      return (
            <button className={className} onClick={onClick}>
                   {buttonArrow ? (buttonArrow) : (<span>{text}</span>)}
                   {addedCompareCount > 0 &&  <div className="compare-productcount">{addedCompareCount}</div>}
            </button>
       );
}

export default Button;