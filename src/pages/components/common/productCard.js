import Link from "next/link";
import Image from "next/image";
import CircleProgressBar from "./circleProgressBar";
import Ratings from "./ratings";
import LinkButton from "./linkButton";
import styles from "../../../styles/productcard.module.css"
import SpecAverage from "./specaverage";

function ProductCard({cardData}) {
      return (
            <div className={styles['prod-item-card']}>
                  <div className={styles['prod-item-top']}>
                        <div className={styles['prod-item-top-inn']}>
                              <figure>
                                    <Image src={cardData.images[0].url}  width={121} height={94} alt="" />
                              </figure>
                              <Ratings ratingCount={cardData.specifications['battery-capacity'].stats.rank_bucket} />
                        </div>
                        <h3><Link href={`product/${cardData.id}`} as={`product/${cardData.id}`}>{cardData.title}</Link></h3>
                  </div>
                  <div className={styles['prod-item-specifications']}>
                        <span className={styles.kyspectext}>Key Specifications</span>
                        <div className={styles['prod-item-spec-list']}>
                              {cardData.key_specs.slice(0,3).map((keyspec, index) => (
                                    <div className={styles['spec-item-box']} key={index}>
                                          <CircleProgressBar count={cardData.specifications[keyspec].stats.rank_bucket} />
                                          <SpecAverage avClass={styles['prod-specitem-content']} avCount={cardData.specifications[keyspec].stats.rank_bucket} keyIndex={index} keyspec={keyspec} />
                                    </div>
                              ))
                              }
                        </div>
                  </div>
                  <div className={styles['view-more-btn']}>
                        <LinkButton link={`product/${cardData.id}`} as={`product/${cardData.id}`}  text="View More" />
                  </div>
            </div>
       );
}

export default ProductCard;