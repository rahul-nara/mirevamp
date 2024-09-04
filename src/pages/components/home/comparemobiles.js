import styles from '../../../styles/comparemobiles.module.css';
import SectionHeading from '../common/sectionheading';
import { useEffect, useState } from 'react';
import Slider from 'react-slick'; // Import Slider from react-slick
import Button from '../common/button';

function CompareMobiles() {
    const [compareProducts, setCompareProducts] = useState([]);

    useEffect(() => {
        fetch('/comparephones.json')
            .then((response) => response.json())
            .then((data) => {
                setCompareProducts(data.comparisons);
            })
            .catch((error) => console.error('Error fetching product data:', error));
    }, []);

    const sliderSettings = {
        dots: true,
        infinite: false,
        arrows: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1
    };

    const compareMobileHandler = () => {

    }

    return (
        <section className={styles['comp-mob-sec']}>
            <div>
                <div className="mi-section-head">
                    <SectionHeading title={["Compare", "Mobiles"]} />
                </div>
                <div className={styles['comp-mob-block']}>
                    <div className="fx-wh-row">
                        <Slider className="comparemobile-slider" {...sliderSettings}>
                            {Object.values(compareProducts).map((items, index) => (
                                <div className={`${styles['cmb-grid']} col-md-6`} key={index}>
                                    <div className={styles['comp-mob-items']}>
                                        {items.map((prod) => (
                                            <div className={styles['comp-mob-card']} key={prod.id}>
                                                <figure>
                                                    <img src={prod.image} className="img-responsive" alt={prod.title} width={139} height={107} />
                                                </figure>
                                                <div className={styles['comp-mob-card-content']}>
                                                    <h3 className={styles.title}>{prod.title}</h3>
                                                    <span className={styles['selling-price']}>${prod.price}</span>
                                                    <span className={styles.specttext}>Specifications</span>
                                                    <div className={styles['comp-mob-ty-list']}>
                                                        <ul>
                                                            <li>
                                                                <label>Color -</label>
                                                                <span>{prod.specs.color}</span>
                                                            </li>
                                                            <li>
                                                                <label>Model -</label>
                                                                <span>{prod.specs.model}</span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <Button text={`v/s`} className={styles.vscircle} onClick={compareMobileHandler} />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CompareMobiles;