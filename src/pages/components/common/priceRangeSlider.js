import Slider from "rc-slider";
import 'rc-slider/assets/index.css';


const PriceRangeSlider = ({ min, max, defaultValue, onChange }) => {
      return (
            <div className="price-range-filter">
                  <Slider min={min} max={max} defaultValue={defaultValue} onChange={onChange} range />
                  <span className="pr-label">{defaultValue[0]}</span>
                  <span className="pr-label">{defaultValue[1]}</span>
            </ div>
      );
    };

export default PriceRangeSlider;