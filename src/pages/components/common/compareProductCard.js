import Link from "next/link";
import styles from "../../../styles/comparemobiles.module.css"
import Image from "next/image";

function CompareProductCard({items, indexKey}) {
      return (
            <div className={styles['comp-mob-card']} key={indexKey}>
                  <Link href="/">
                        <figure>
                              <Image src={items.images[0].url} className="img-responsive" alt={items.title} width={139} height={107} />
                        </figure>
                        <div className={styles['comp-mob-card-content']}>
                              <h3 className={styles.title}>{items.title}</h3>
                              <span className={styles['selling-price']}>{items.specifications.price.metric.short.name}{items.specifications.price.value}</span>
                              <span className={styles.specttext}>Specifications</span>
                              <div className={styles['comp-mob-ty-list']}>
                                    <ul>
                                          <li>
                                                <label>{items.specifications.color.display_name} -</label>
                                                <span>{items.specifications.color.value}</span>
                                          </li>
                                          <li>
                                                <label>{items.specifications['model-number'].display_name} - </label>
                                                <span>{items.specifications['model-number'].value}</span>
                                          </li>
                                    </ul>
                              </div>
                        </div>
                  </Link>
            </div>
       );
}

export default CompareProductCard;