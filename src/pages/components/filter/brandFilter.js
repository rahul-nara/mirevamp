import React, { useEffect, useState } from "react";

function BrandFilter({handleToggle, active, indexref, indexkey, contentel, resetref, products, onProductBrandChange, onselectedBrand}) {
      const productBrands = [...new Set(products.map(product => product.brand))];

      return (
            <div className={`brand-filter comm-filter-bx ${active === indexkey ? 'active' : ''}`}>
                  <div className="comm-filter-head" onClick={() => handleToggle(indexkey)}>
                        <h3>Brand</h3>
                  </div>
                  <div className={`brandin-filter comm-filter-body ${active === indexkey ? 'show' : ''}`} ref={contentel}   style={{ height: active === indexkey ? indexref(indexkey) : '0'}}>
                        <div className="comm-filter-body-inn">
                              <ul>
                                    {productBrands.map((brand, index) => (
                                    <li key={index}>
                                    <label htmlFor={brand}>
                                          <input
                                          type="radio"
                                          ref={resetref}
                                          checked={onselectedBrand === brand}
                                          onChange={() => onProductBrandChange(brand)}
                                          className="brandinput"
                                          name="brand"
                                          id={brand}
                                          />
                                          <span className="checkmark"></span>
                                          <span>{brand}</span>
                                    </label>
                                    </li>
                                    ))}
                              </ul>
                        </div>
                  </div>
            </div>
       );
}

export default BrandFilter;