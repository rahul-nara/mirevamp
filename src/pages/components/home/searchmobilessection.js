import Link from "next/link";
import LinkButton from './../common/linkButton';
import styles from "../../../styles/searchmobilessection.module.css"
import Image from "next/image";
import SectionHeading from "../common/sectionheading";
import ScoreLabel from "../common/scorelabel";
import PriceRangeSlider from "../common/priceRangeSlider";
import { useState } from "react";

function SearchMobilesSection({smData}) {
      const [selectedRange, setSelectedRange] = useState([20, 80]);

      const handleRangeChange = (value) => {
      setSelectedRange(value);
      };
      return (
            <section className={styles['shm-mob-sec']}>
                  <div className="shm-mob-wrap">
                        <div className={styles['shm-mob-block']}>
                              <div className={styles['shm-mob-left']}>
                                    <div className={`${styles['mi-section-head']} mi-section-head`}>
                                          <SectionHeading title= {"Search Mobiles".split(/[\s,]+/)} />
                                    </div>
                                    <PriceRangeSlider min={0} max={1200} defaultValue={selectedRange} onChange={handleRangeChange} />
                                    <div className={styles['byfeat-block']}>
                                          <div className={styles['byfeat-header']}>
                                                <ul>
                                                      <li className={styles.active}>By Brands</li>
                                                      <li>By Features</li>
                                                </ul>
                                          </div>
                                          <ul  className={styles['byfeat-list']}>
                                                <li><Link href="/">Apple</Link></li>
                                                <li><Link href="/">Samsung</Link></li>
                                                <li><Link href="/">Nokia</Link></li>
                                                <li><Link href="/">OnePlus</Link></li>
                                                <li><Link href="/">Huawei</Link></li>
                                                <li><Link href="/">Motorola</Link></li>
                                                <li><Link href="/">Vivo</Link></li>
                                                <li><Link href="/">Xaomi</Link></li>
                                                <li><Link href="/">OPPO</Link></li>
                                          </ul>
                                          <div className="common-btn">
                                                <LinkButton link="" text="Find Phones" />
                                          </div>
                                    </div>
                              </div>
                              <div className={styles['shm-mob-right']}>
                                    <div className={styles['shm-mob-content-main']}>
                                          <div className={styles['shm-mob-bg-text']}>
                                                <span>Samsung</span>
                                          </div>
                                                {smData.slice(0,1).map((item, index) => (
                                                      <div className={styles['shm-mob-card']} key={index}>
                                                            <ScoreLabel scoreLabelClass={styles.scorelabel} scoreCount={item[0].specifications['sm-rating'].value} />
                                                            <figure>
                                                                  <Image src={item[0].images[0].url} className="img-responsive" alt={item[0].title} width={354} height={336} />
                                                            </figure>
                                                            <div className={styles['shm-mob-content']}>
                                                                  <h3>{item[0].title}</h3>
                                                                  <span className={styles.price}>{item[0].specifications.price.metric.short.name}{item[0].specifications.price.value}</span>
                                                                  <div className={styles['shmbch-list']}>
                                                                        <ul>
                                                                              <li>
                                                                                    <label>{item[0].specifications['battery-capacity'].display_name} -</label>
                                                                                    <span>{item[0].specifications['battery-capacity'].value} {item[0].specifications['battery-capacity'].metric.long.name}</span>
                                                                              </li>
                                                                              <li>
                                                                                    <label>{item[0].specifications['memory-ram'].display_name} - </label>
                                                                                    <span>{item[0].specifications['memory-ram'].value} {item[0].specifications['memory-ram'].metric.long.name}</span>
                                                                              </li>
                                                                              <li>
                                                                                    <label>Processor Speed - </label>
                                                                                    <span>2.8 gz</span>
                                                                              </li>
                                                                        </ul>
                                                                  </div>
                                                                  <div className="common-btn">
                                                                        <LinkButton link={`product/${item[0].id}`} as={`product/${item[0].id}`} text="View Details" />
                                                                  </div>
                                                            </div>
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

export default SearchMobilesSection;