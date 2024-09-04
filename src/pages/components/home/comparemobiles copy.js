import styles from '../../../styles/comparemobiles.module.css'
import CompareProductCard from '../common/compareProductCard';
import SectionHeading from '../common/sectionheading';

function CompareMobiles({smData}) {
      return (
            <section className={styles['comp-mob-sec']}>
                  <div>
                        <div className="mi-section-head">
                              <SectionHeading title= {"Compare Mobiles".split(/[\s,]+/)} />
                        </div>
                        <div className={styles['comp-mob-block']}>
                              <div className="row">
                                    <div className={`${styles['cmb-grid']} col-md-6`}>
                                          <div className={styles['comp-mob-items']}>
                                                {smData[2][2].slice(0,2).map((item) => (
                                                      <CompareProductCard items={item} />
                                                      ))
                                                }
                                                <div className={styles.vscircle}><span>v&#47;s</span></div>
                                          </div>
                                    </div>
                                    <div className={`${styles['cmb-grid']} col-md-6`}>
                                          <div className={styles['comp-mob-items']}>
                                                {smData[2][2].slice(2,4).map((item, index) => (
                                                      <CompareProductCard items={item} indexKey={index} />
                                                      ))
                                                }
                                                <div className={styles.vscircle}><span>v&#47;s</span></div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
       );
}

export default CompareMobiles;