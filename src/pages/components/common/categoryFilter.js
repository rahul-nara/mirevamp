import { useRef, useState } from "react";
import PriceFilter from "../filter/priceFilter";
import InsiderScore from "../filter/insiderScore";
import BrandFilter from "../filter/brandFilter";
import Button from "./button";
import '../../../styles/categoryfilter.module.css';

function CategoryFilter({onPriceRangeChange, products, onBrandChange, onInsideChange, selectedRange, selectedBrand, insiderScoreRange, sliderKey, onReset}) {
      const [active, setActive] = useState(null);
      const contentEl = [useRef(null), useRef(null), useRef(null)];
      // const priceFilterRef = useRef(null);
      // const insideScoreFilterRef = useRef(null);
      // const brandFilterRef = useRef(null);

      const handleToggle = (index) => {
            setActive(active === index ? null : index);
      }
      const getContentHeight = (index) => {
            if (contentEl[index] && contentEl[index].current) {
                  return contentEl[index].current.scrollHeight + 'px';
            }
                  return '0px';
      };

      return (
            <div className="filter-section">
                  <div className="filter-heading">
                        <span className="title">browse</span>
                        <Button className="resetallbtn" text="Reset All" onClick={onReset} />
                  </div>
                  <PriceFilter indexkey={0} active={active} contentel={contentEl[0]} indexref={getContentHeight} handleToggle={handleToggle} onPriceRangeChange={onPriceRangeChange} OnselectedRange={selectedRange} ononsliderKey={sliderKey} />
                  <InsiderScore indexkey={1} active={active} contentel={contentEl[1]} indexref={getContentHeight} handleToggle={handleToggle} onproductInsideScoreChange={onInsideChange} oninsiderScoreRange={insiderScoreRange} ononsliderKey={sliderKey} />
                  <BrandFilter indexkey={2} active={active} contentel={contentEl[2]} indexref={getContentHeight} handleToggle={handleToggle} products={products} onProductBrandChange={onBrandChange} onselectedBrand={selectedBrand} />
            </div>
       );
}

export default CategoryFilter;