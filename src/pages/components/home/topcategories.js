import Image from "next/image";
import styles from "../../../styles/topcategories.module.css"
import { topCategories } from "public/data/staticdataconfig";

function TopCategories() {
      return (
            <section className={styles['top-categories-sec']}>
                  <div className="container">
                        <div className={styles['top-categories-wrap']}>
                              <div className="mi-row">
                                    {topCategories.map((topcategory, index) => (
                                          <div className={styles['top-categories-card']} key={index}>
                                                <div className={styles['top-cat-icon']}>
                                                      <Image src={topcategory.icon} alt={topcategory.label} width={81} height={79} />
                                                </div>
                                                <div className={styles['top-cat-content']}>
                                                      <h3>{topcategory.label}</h3>
                                                </div>
                                          </div>
                                          ))
                                    }
                              </div>
                        </div>
                  </div>
            </section>
       );
}

export default TopCategories;