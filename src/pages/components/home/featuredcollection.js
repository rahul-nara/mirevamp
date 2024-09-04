import Image from "next/image";
import Link from "next/link";
import styles from "../../../styles/featuredcollection.module.css"
import SectionHeading from "../common/sectionheading";
import { featureCollectionData } from "public/data/staticdataconfig";

function FeaturedCollection() {
      return (
            <section className={styles['feat-coll-sec']}>
                  <div className={styles['feat-coll-wrap']}>
                        <div className={`${styles['mi-section-head']} mi-section-head`}>
                              <SectionHeading title= {"Featured Collection".split(/[\s,]+/)} />
                        </div>
                        <div className={styles['feat-coll-block']}>
                              <div className={`${styles['mi-row']} mi-row clearfix`}>
                                    <div className="col-md-3 col-xs-12">
                                          <div className={`${styles['feat-coll-card']} ${styles['feat-coll-1']}`}>
                                                <p>{featureCollectionData[0].content}</p>
                                          </div>
                                          <div className={`${styles['feat-coll-card']} ${styles['feat-coll-2']}`}>
                                                <h3>{featureCollectionData[1].label}</h3>
                                                <figure>
                                                      <Image src={featureCollectionData[1].image} alt="" width={213} height={201} />
                                                </figure>
                                          </div>
                                    </div>
                                    <div className="col-md-6 col-xs-12">
                                          <div className={`${styles['feat-coll-card']} ${styles['feat-coll-3']}`}>
                                                <h3>{featureCollectionData[2].title}</h3>
                                                <p>{featureCollectionData[2].content}</p>
                                                <Link href="/">Read More</Link>
                                          </div>
                                    </div>
                                    <div className="col-md-3 col-xs-12">
                                          <div className={`${styles['feat-coll-card']} ${styles['feat-coll-4']}`}>
                                                <h3>{featureCollectionData[3].label}</h3>
                                                <figure>
                                                      <Image src={featureCollectionData[3].image} alt="" width={213} height={201} />
                                                </figure>
                                          </div>
                                          <div className={`${styles['feat-coll-card']} ${styles['feat-coll-5']}`}>
                                                <p>{featureCollectionData[4].content}</p>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
       );
}

export default FeaturedCollection;