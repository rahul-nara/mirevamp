import Link from "next/link";
import ProductCard from "../common/productCard";
import SectionHeading from "../common/sectionheading";
import { useState } from "react";

function WhatsTrending({smData}) {
      const [activeTab, setActiveTab] = useState(0);
      const tabHeaderArrr = ['Top rated', 'Best Selfie Phones', 'Phones Under $599']
      return (
            <section className="wh-trend-sec">
                  <div className="wh-trend-wrap">
                        <div className="mi-section-head">
                              <SectionHeading title= {"What’s trending?".split(/[\s,]+/)} />
                              <div className="wh-trend-top-links">
                                    <ul>
                                    {tabHeaderArrr.map((item, index) => (
                                                <li key={index}>
                                                      <button onClick={()=> setActiveTab(index)} className={`${index === activeTab ? 'active' : ''}`}>{item}</button>
                                                </li>
                                          ))
                                    }
                                    </ul>
                              </div>
                        </div>
                        <div className="wh-trend-panel">
                              <div className="wh-trend-block">
                                    <div className="mi-row">
                                          {smData.slice(0,3).map((data, index) =>(
                                                <div className="col-md-4 col-sm-6 prs-grid" key={index}>
                                                      <ProductCard cardData={data[0]} />
                                                </div>
                                                ))
                                          }
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
       );
}

export default WhatsTrending;