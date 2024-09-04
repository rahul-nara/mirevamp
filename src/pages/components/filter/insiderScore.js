import Slider from "rc-slider";
import 'rc-slider/assets/index.css';
import React from "react";

function InsiderScore({handleToggle, active, indexref, indexkey, contentel, onproductInsideScoreChange, oninsiderScoreRange, ononsliderKey}) {
      return (
            <div className={`insider-filter comm-filter-bx ${active === indexkey ? 'active' : ''}`}>
                  <div className="comm-filter-head" onClick={() => handleToggle(indexkey)}>
                        <h3>Insider Score</h3>
                  </div>
                  <div className={`price-range-filter comm-filter-body ${active === indexkey ? 'show' : ''}`} ref={contentel}   style={{ height: active === indexkey ? indexref(indexkey) : '0'}}>
                        <div className="comm-filter-body-inn">
                              <Slider key={ononsliderKey} min={0} max={100} onChange={onproductInsideScoreChange} range />
                              <span className="pr-label">{`${oninsiderScoreRange[0]}%`}</span>
                              <span className="pr-label">{`${oninsiderScoreRange[1]}%`}</span>
                        </div>
                  </ div>
            </div>
       );
}

export default InsiderScore;