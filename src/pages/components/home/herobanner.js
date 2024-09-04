import { useState } from "react";
import  styles from "../../../styles/herobanner.module.css"
import Image from "next/image";
import LinkButton from "../common/linkButton";
import ScoreLabel from "../common/scorelabel";
import CircleProgressBar from './../common/circleProgressBar';
import SpecAverage from './../common/specaverage';

function HeroBanner({smData}) {
      const [activeTab, setActiveTab] = useState(0);

      return (
            <section className={styles['hero-banner-sec']}>
                  <div className={styles['hero-banner-wrap']}>
                        <div className={styles['hero-banner-tab']}>
                              <ul className={`${styles['tab-header']} tab-header`}>
                                    {smData.slice(0,3).map((item, index) => (
                                                <li key={index}>
                                                      <button onClick={()=> setActiveTab(index)} className={`${styles['ai-icon']} ${index === activeTab ? 'active' : ''}`}>
                                                            <Image src={`/img/brands/icons/${item[0].specifications.brand.value.toLowerCase()}.svg`} alt={item[0].specifications.brand.value} width={58} height={45} />
                                                      </button>
                                                </li>
                                          ))
                                    }
                              </ul>
                              <div className={styles['hero-banner-tab-panel']}>
                                    <div className={styles['hero-banner-block']}>
                                          <div className={styles['hero-banner-content']}>
                                               <h2 className={styles.title}>{smData[activeTab][0].specifications.brand.value} <br /> {(smData[activeTab][0].specifications['product-name'].value).replace(smData[activeTab][0].specifications.brand.value, '').trim()}</h2>
                                               <span className={styles['mx-text']}>{`${smData[activeTab][0].specifications['internal-memory'].value} ${smData[activeTab][0].specifications['internal-memory'].metric.short.name}`}</span>
                                               <div className={styles['ky-specification-block']}>
                                                      <span className={styles['ky-spec-link']}>Key Specifications</span>
                                                      <div className={styles['ky-spec-items']}>
                                                            <div className={styles['ky-spec-list']}>
                                                                  <div className="mi-row">
                                                                        {smData[activeTab][0].key_specs.map((value, index) => (
                                                                              <div className={`${styles['hba-grid']} col-md-3 col-sm-6`} key={index}>
                                                                                    <CircleProgressBar count={smData[activeTab][0].specifications[value].stats.rank_bucket} />
                                                                                    <SpecAverage avClass={styles['prod-specitem-content']} avCount={smData[activeTab][0].specifications[value].stats.rank_bucket} keyIndex={index} keyspec={value} />
                                                                              </div>
                                                                              ))
                                                                        }
                                                                  </div>
                                                            </div>
                                                            <div className={`${styles['explore-all-btn']} explore-all-btn`}>
                                                                  <LinkButton link={`product/${smData[activeTab][0].id}`} as={`product/${smData[activeTab][0].id}`} text="Explore All" />
                                                            </div>
                                                      </div>
                                               </div>
                                          </div>
                                          <div className={styles['hero-banner-thumb']}>
                                                <figure>
                                                      <img src={smData[activeTab][0].images[0].url} alt={smData[activeTab][0].title} width={218} height={439} />
                                                      <ScoreLabel scoreLabelClass={styles.scorelabel} scoreCount={smData[activeTab][0].specifications['sm-rating'].value} />
                                                </figure>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
      );
}

export default HeroBanner;