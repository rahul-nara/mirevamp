import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/insidewheel.module.css"
import LinkButton from "../common/linkButton";
import ScoreLabel from "../common/scorelabel";
import SectionHeading from './../common/sectionheading';
import { useState } from 'react';

function InsiderWheel() {
      const [wheelSelectedItem, setWheelSelectedItem] = useState(null);
      const wheelItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8'];

      const spinWheel = () => {
            const container = document.querySelector(`.${styles['wheel']}`);
            const wheelRandomIndex = Math.floor(Math.random() * wheelItems.length);
            const selectedAngle = 360 * 10 - (wheelRandomIndex * (360 / wheelItems.length));
            const startingRotation = Math.floor(Math.random() * 360) + 360;
            const stopAngle = 360 * 10 - (wheelRandomIndex * (360 / wheelItems.length));
            container.style.transition = 'none';
            container.style.transform = `rotate(${startingRotation + selectedAngle}deg)`;
            setTimeout(() => {
                container.style.transition = 'transform 5s ease-out';
                container.style.transform = `rotate(${360 * 10 + stopAngle}deg)`;
                setWheelSelectedItem(wheelItems[wheelRandomIndex]);
            }, 50);
      }

      return (
            <section className={styles['insd-wh-sec']}>
                  <div className={styles['insd-wh-wrap']}>
                        <div className={`${styles['mi-section-head']} mi-section-head`}>
                              <SectionHeading titleClass={styles.title} title= {"Insider Wheel".split(/[\s,]+/)} />
                        </div>
                        <div className={styles['insd-wh-block']}>
                              <div className={styles['insd-top-wheel']}>
                                    {/* <Image src="/img/spiner-board.svg" alt="" className="img-responsive" width={613} height={402} /> */}
                                    <div className={styles['wheel']}>
                                    {
                                          wheelItems.map((item, index) => (
                                                <div key={index} className={styles['segment']}>{item}</div>
                                          ))
                                    }
                                    </div>
                                    <div className={styles['spinner-btn']} onClick={spinWheel}></div>
                                    {/* {wheelSelectedItem && <p className="hidden">Selected Item: {wheelSelectedItem}</p>} */}
                              </div>
                              <div className={styles['insd-wh-btm']}>
                                    <div className={styles['insd-wh-content']}>
                                          <h3 className={styles.title}>OnePlus 7 Pro 5G</h3>
                                          <span className={styles['price']}>$1,188</span>
                                          <div className={styles['insd-wh-spec-list']}>
                                                {/* <div className="insd-wh-spec-circle"></div> */}
                                                <div className={styles['insd-wh-spec-items']}>
                                                      <ul>
                                                            <li>
                                                                  <h4>4.7” Screen</h4>
                                                                  <span>(Excellent)</span>
                                                            </li>
                                                            <li>
                                                                  <h4>256 GB Memory</h4>
                                                                  <span>(Excellent)</span>
                                                            </li>
                                                            <li>
                                                                  <h4>Battery 3095 mAh</h4>
                                                                  <span>(Excellent)</span>
                                                            </li>
                                                      </ul>
                                                </div>
                                          </div>
                                          <div className={`${styles['view-dtls-btn']} common-btn`}>
                                                <LinkButton link="" text="View Details" />
                                          </div>
                                    </div>
                                    <div className={styles['insd-wh-thumbs']}>
                                          <div className={styles['insd-wh-add-comp']}>
                                                <Link href="/">Add To Compare</Link>
                                                <figure className={styles['insdspimg']}>
                                                      <Image src="/img/earphone-img.png" alt="" className="img-responsive" width={158} height={158} />
                                                </figure>
                                          </div>
                                          <figure className={styles['insdimg']}>
                                                <Image src="/img/spin-mob-banner.png" alt="" width={384} height={676} />
                                          </figure>
                                          <ScoreLabel scoreLabelClass={styles.scorelabel} scoreCount={79} />
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
       );
}

export default InsiderWheel;