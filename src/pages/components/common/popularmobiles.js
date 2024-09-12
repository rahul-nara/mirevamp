import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/popularmobiles.module.css"
import Ratings from './ratings';

function PopularMobiles({smData}) {
      return (
            <section className={styles['pop-mob-sec']}>
                  <div className={styles['pop-mob-wrap']}>
                        <div className={styles['pop-mob-left']}>
                              <div className={styles['bpa-mob-card']}>
                                          <Link href={`product/${smData[2][0].id}`} as={`product/${smData[2][0].id}`}>
                                                <figure>
                                                      <Image src="/img/appbanner.jpg" className="img-responsive" alt="BEST PERFORMANCE PHONES" width={491} height={614} />
                                                </figure>
                                                <div className={styles['bpa-mob-content']}>
                                                      <div className={styles.label}>
                                                            <span>BEST PERFORMANCE PHONES</span>
                                                      </div>
                                                      <div className={styles['bpa-mob-over-content']}>
                                                            <h3>{smData[2][0].title}</h3>
                                                            <p>{`${smData[2][0].specifications['screen-size'].value} ${smData[2][0].specifications['screen-size'].metric.long.name} ${smData[2][0].specifications['screen-size'].display_name},
                                                            ${smData[2][0].specifications['internal-memory'].display_name} ${smData[2][0].specifications['internal-memory'].value} ${smData[2][0].specifications['internal-memory'].metric.long.name}
                                                            ${smData[2][0].specifications['front-camera'].value} ${smData[2][0].specifications['front-camera'].metric.long.name} |
                                                            ${smData[2][0].specifications['rear-camera'].display_name} ${smData[2][0].specifications['rear-camera'].value} ${smData[2][0].specifications['rear-camera'].metric.long.name}
                                                            `}</p>
                                                      </div>
                                                </div>
                                          </Link>
                                    </div>
                        </div>
                        <div className={styles['pop-mob-right']}>
                              <div className={`${styles['mi-section-head']} mi-section-head`}>
                                    <div className="section-heading">
                                          <h2 className="title"><span>Popular </span> <span>Mobiles</span></h2>
                                    </div>
                              </div>
                              <div className={styles['pop-mob-block']}>
                                    {smData[2][2].slice(0,5).map((item) => (
                                          <div className={styles['pop-mob-card']} key={item.id}>
                                                <Link href={`product/${item.id}`} as={`product/${item.id}`}>
                                                      <figure>
                                                            <Image src={item.images[0].url} alt={item.title} className="img-responsive" width={129} height={100} />
                                                      </figure>
                                                      <div className={styles['pop-mob-card-content']}>
                                                            <Ratings ratingCount={item.specifications['battery-capacity'].stats.rank_bucket} />
                                                            <h3>{item.title}</h3>
                                                            <span>{item.specifications.price.metric.short.name}{item.specifications.price.value}</span>
                                                      </div>
                                                </Link>
                                          </div>
                                    ))
                                    }
                              </div>
                        </div>
                  </div>
            </section>
       );
}

export default PopularMobiles;