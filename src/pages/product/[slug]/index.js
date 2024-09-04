import React, { Component } from "react";
import config from '../../../../config.json'
import CircleProgressBar from "@/pages/components/common/circleProgressBar";
import SpecAverage from "@/pages/components/common/specaverage";
import styles from "../../../styles/productDetail.module.css"
import ScoreLabel from "@/pages/components/common/scorelabel";
import PopularMobiles from "@/pages/components/common/popularmobiles";
import CompareMobiles from "@/pages/components/home/comparemobiles";
import Link from "next/link";

export const ImagesBlock = (imageValue) => {
    // console.log(imageValue['images'][0].url)
    let images = imageValue['images']
    let block = Object.entries(images).map(([key, value]) => {
        return (
            <li key={key}><img src={value.url} /></li>
        )
    })
    return block
}

export const ColorBlock = (colorValue) => {
    let color = colorValue.color;
    return (
        <li key={color.display_name}>{color.display_name}: {color.value}</li>
    )
}


const ProductPage = (props) => {
    return (
        <div className="ProdPage">
            <div className={styles['product-detail-sec']}>
                <div className={styles['product-detail-wrap']}>
                        <div className={styles['product-detail-left']}>
                            <figure>
                                <img src={props.results[0].images[0].url} alt={props.results[0].title} width={214} height={431} />
                            </figure>
                            <ScoreLabel scoreLabelClass={styles.scorelabel} scoreCount={props.results[0].specifications['sm-rating'].value} />
                        </div>
                        <div className={styles['product-detail-right']}>
                            <div className={styles['product-detail-content']}>
                                <h1>{props.results[0].title}</h1>
                                <p>{props.results[0].specifications.price.metric.short.name}{props.results[0].specifications.price.value}</p>
                                <div className={styles['product-color-type']}>
                                    <span>Color & Price</span>
                                    <p>Color: {props.results[0].specifications.color.value}</p>
                                </div>
                                <div className={styles['product-detail-ky-block']}>
                                    <div className={styles['product-detail-ky-left']}>
                                        <h2>Key Specifications</h2>
                                        <div className={styles['prod-item-spec-list']}>
                                            {props.results[0].key_specs.map((keyspec, index) => (
                                                    <div className={styles['spec-item-box']} key={index}>
                                                        <CircleProgressBar count={props.results[0].specifications[keyspec].stats.rank_bucket} />
                                                        <SpecAverage avClass={styles['prod-specitem-content']} avCount={props.results[0].specifications[keyspec].stats.rank_bucket} keyIndex={index} keyspec={keyspec} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className={styles['product-detail-ky-right']}>
                                        <h2>Reasons To Buy</h2>
                                        <div className={styles['reasonby-list']}>
                                            <ul>
                                                {props.results[0].super_features[0].keys.slice(0,8).map((specitems) => (
                                                    <li>{specitems}</li>
                                                ))
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <div className={styles['prod-detail-compare-sec']}>
                    <div className={styles['prod-detail-compare-wrap']}>
                            <div className={styles['prod-detail-compare-price']}>
                                <h2>Compare Prices</h2>
                                <div className={styles['prod-detail-compare-graph']}>
                                    <figure>
                                        <img src="/img/compare-price-graph.svg" alt="" width={204} height={202} />
                                    </figure>
                                    <div className={`${styles['prodtxt']} ${styles['prod-compare-graph-text']}`}>
                                        <span>MOST IOS CELLPHONE</span>
                                        <p>$399.97</p>
                                    </div>
                                    <div className={`${styles['prodtxt']} ${styles['prod-compare-graph-text1']}`}>
                                        <span>CURRENT CELLPHONE</span>
                                        <p>$539.97</p>
                                    </div>
                                    <div className={`${styles['prodtxt']} ${styles['prod-compare-graph-text2']}`}>
                                        <span>MOST CELLPHONES</span>
                                        <p>$199.97</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles['prod-detail-compare-over']}>
                                <h2>Overall Review</h2>
                                <div className={styles['urr-main-card']}>
                                        <p>User Ratings and Reviews for Apple - iPhone XS 64GB that mentions "Overview" (Overall people's opinion about the phone is great)</p>
                                        <div className={styles['urr-box']}>
                                            <div className={styles['urr-left-box']}>
                                                <span className={styles['ratebase-txt']}>4.0</span>
                                                <span>Based on<br/> 45 Reviews</span>
                                            </div>
                                            <div className={styles['urr-right-box']}>
                                                <ul>
                                                    <li>
                                                        <div className={styles.label}>Excellent</div>
                                                        <div className={`${styles['progress']} ${styles['progress-moved']}`}>
                                                            <div className={`${styles['progress-bar']} ${styles['progress-bar-excellent']}`} ></div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={styles.label}>Good</div>
                                                        <div className={`${styles['progress']} ${styles['progress-moved']}`}>
                                                            <div className={`${styles['progress-bar']} ${styles['progress-bar-good']}`} ></div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={styles.label}>Average</div>
                                                        <div className={`${styles['progress']} ${styles['progress-moved']}`}>
                                                            <div className={`${styles['progress-bar']} ${styles['progress-bar-average']}`} ></div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={styles.label}>Below Average</div>
                                                        <div className={`${styles['progress']} ${styles['progress-moved']}`}>
                                                            <div className={`${styles['progress-bar']} ${styles['progress-bar-b-average']}`} ></div>
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className={styles.label}>Poor</div>
                                                        <div className={`${styles['progress']} ${styles['progress-moved']}`}>
                                                            <div className={`${styles['progress-bar']} ${styles['progress-bar-poor']}`} ></div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <Link href="/">View Detailed Reviews</Link>
                                </div>
                            </div>
                    </div>
            </div>
            {/* <div className="spec-sup-feaures-sec">
                <div className="spec-sup-feaures-wrap">
                    <div className="spec-sup-feaures-tab">
                            <ul>
                                <li><button>camera</button></li>
                                <li><button>battery</button></li>
                                <li><button>performance</button></li>
                                <li><button>storage</button></li>
                                <li><button>usability</button></li>
                                <li><button>connectivity</button></li>
                            </ul>
                            <div className="spec-sup-feaures-body">
                                    <div className="spec-sup-feaures-panel">
                                        <div className="spec-sup-feaures-block">
                                                <div className="spec-sup-nav">
                                                    <ul>
                                                        <li>Intergrated Front and Back Camera</li>
                                                        <li>60 frames per second</li>
                                                        <li>Front Camera - 7 megapixels</li>
                                                        <li>Rear Camera - 12 megapixels</li>
                                                    </ul>
                                                </div>
                                                <div className="spec-sup-feaures-content">
                                                    <div className="">

                                                    </div>
                                                </div>
                                        </div>
                                    </div>
                            </div>
                    </div>
                </div>
            </div> */}
            {/* <PopularMobiles smData={props.results[0]} />
            <CompareMobiles smData={props.results[0]}  /> */}
        </div>
    );
};

export async function getServerSideProps({ params }) {
    const Slug = params.slug;
    const productSlug = config['smartphones'] + '?q=' + Slug;
    const res = await fetch(productSlug)
    const product = await res.json()
    console.log(product)

    return {
        props: {
            results: product.results[0],
        },
    };
}


export default ProductPage;
