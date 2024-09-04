import React, { useState } from "react";
import Slider from "rc-slider";
import 'rc-slider/assets/index.css';

function PriceFilter({handleToggle, active, indexref, indexkey, contentel, onPriceRangeChange, OnselectedRange, ononsliderKey}) {
      return (
            <div className={`price-filter comm-filter-bx ${active === indexkey ? 'active' : ''}`}>
                  <div className="comm-filter-head" onClick={() => handleToggle(indexkey)}>
                        <h3>Price</h3>
                  </div>
                  <div className={`price-range-filter comm-filter-body ${active === indexkey ? 'show' : ''}`} ref={contentel}  style={{ height: active === indexkey ? indexref(indexkey) : '0'}} >
                        <div className="comm-filter-body-inn">
                              <Slider key={ononsliderKey} min={20} max={1400}  onChange={onPriceRangeChange} range />
                              <span className="pr-label">{OnselectedRange[0]}</span>
                              <span className="pr-label">{OnselectedRange[1]}</span>
                        </div>
                  </ div>
            </div>
       );
}

export default PriceFilter;