import CircleProgressBar from "./components/common/circleProgressBar";
import SpecAverage from "./components/common/specaverage";
import Link from "next/link";
import styles from "../styles/comparision.module.css"
import ScoreLabel from "./components/common/scorelabel";
import React, { useEffect, useState } from 'react';
import PopupSelectItems from "./components/common/propupSelectItems";
import { useRouter } from "next/router";
import Ratings from "./components/common/ratings";

function Comparision() {
      const router = useRouter();
      const { items } = router.query;
      const CompareselectedItems = items ? items.split(',') : [];
      //console.log(CompareselectedItems);
      const [isPopupOpen, setIsPopupOpen] = useState(false);
      const [isActive, setIsActive] = useState('');
      const [isOverlayActive, setIsOverlayActive] = useState('');
      const [products, setProducts] = useState([]);

      useEffect(() => {
            fetch('/products.json')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching product data:', error));
      }, []);

      const handleCheckboxChange = (productId) => {
            const SelectErrorMessage = document.getElementsByClassName('compare-message')[0];
            SelectErrorMessage.innerHTML = '';
            if (CompareselectedItems.includes(productId)) {
                  const updatedSelectedItems = CompareselectedItems.filter((id) => id !== productId);
                  router.push(`/comparision?items=${updatedSelectedItems.join(',')}`);
            } else {
                  if (CompareselectedItems.length < 2) {
                        const updatedSelectedItems = [...CompareselectedItems, productId];
                        router.push(`/comparision?items=${updatedSelectedItems.join(',')}`);
                  } else {
                        //alert('You can only compare up to two products.');
                        SelectErrorMessage.innerHTML = 'You can only compare up to two products.';
                  }
            }
      };

      const handleCompareSubmit = (event) => {
            event.preventDefault();
            if (CompareselectedItems.length === 2) {
                  router.push(`/comparision?items=${CompareselectedItems.join(',')}`);
                  setIsPopupOpen(false);
                  document.querySelector('body').classList.remove('activebody');
            }
      }

      const openPopupHandler = () => {
            setIsPopupOpen(true);
            setIsOverlayActive('overl-active');
            document.querySelector('body').classList.add('activebody');
            setTimeout(() => {
                  setIsActive('popup-active');
              }, 200);
      }
      const closePopupHandler = () => {
            setIsActive('');
            document.querySelector('body').classList.remove('activebody');
            setTimeout(() => {
                  setIsOverlayActive('overl-active');
                  setIsPopupOpen(false);
            }, 200);
      }

      const removeSelectedProduct = (productId) => {
            const updatedSelectedItems = CompareselectedItems.filter((id) => id !== productId);
            if (updatedSelectedItems.length > 0) {
                  router.push(`/comparision?items=${updatedSelectedItems.join(',')}`);
            } else {
                  router.push(`/comparision`);
            }
      };

      if (products.length === 0) {
            return <div>Loading...</div>;
      }

      return (
            <div className={styles['prodcompare-page']}>
                  <div className="breadcrumbs">
                        <div className="crumbs">
                              <span>MobileInsider</span>
                              <span className="divider">|</span>
                              <span className="current-item">Compare Samsung Galaxy S10 Plus 512GB Vs Motorola Moto Z4</span>
                        </div>
                  </div>
                  <div className={`${styles['prodcompare-sec']} clearfix`}>
                        <div className={styles['prodcompare-wrap']}>
                              <div className={`${styles['mi-section-head']} mi-section-head`}>
                                    <div className="section-heading">
                                          <h2 className="title"><span>compare</span></h2>
                                    </div>
                                    <button className={styles['compare-filter-icon']}></button>
                              </div>
                              <div className={styles['compare-filter-block']}>
                                    <table className={styles['table']}>
                                          <thead>
                                                <tr>
                                                      <th className={styles['side-label']}>
                                                            <button type="button" className={styles['add-prodbtn']} onClick={openPopupHandler}></button>
                                                      </th>
                                                      {
                                                            CompareselectedItems.map((productId) => {
                                                                  const product = products.find((p) => p.id === productId);
                                                                  return (
                                                                        <th key={product.id}>
                                                                              <div className={styles['comp-product-card']}>
                                                                                    <div className={styles['ov-label']}>{product.review}</div>
                                                                                    <button className={styles['closeicon']} onClick={() => removeSelectedProduct(productId)} />
                                                                                    <div className={styles['comp-product-top']}>
                                                                                          <figure>
                                                                                                <img src={product.image} alt={product.name} width={100} height={120} />
                                                                                                <ScoreLabel scoreLabelClass={styles.scorelabel} scoreCount={50} />
                                                                                          </figure>
                                                                                          <div className={styles['comp-product-top-content']}>
                                                                                                <h3 className={styles.title}>{product.name}</h3>
                                                                                                <span className={styles['price']}>{product.price}</span>
                                                                                          </div>
                                                                                    </div>
                                                                                    <div className={styles['prod-item-spec-list']}>
                                                                                          {
                                                                                                product.average.map((av, i) => (
                                                                                                      <div className={styles['spec-item-box']} key={i}>
                                                                                                            <CircleProgressBar count={av} />
                                                                                                            <SpecAverage avClass={styles['prod-specitem-content']} avCount={av}  />
                                                                                                      </div>
                                                                                                ))
                                                                                          }
                                                                                    </div>
                                                                                    <Link className={styles['viewdetails-link']} href={product.click_url}>View Details</Link>
                                                                              </div>
                                                                        </th>
                                                                  )
                                                            })
                                                      }
                                                </tr>
                                          </thead>
                                           <tbody>
                                                <tr className={styles['tb-main-head']}>
                                                      <th>Overview</th>
                                                      {
                                                            CompareselectedItems.map((productId) => {
                                                            const product = products.find((p) => p.id === productId);
                                                            return (
                                                                  <th key={product.id}><Ratings ratingCount={product.rating} /></th>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>Sensors</th>
                                                      {
                                                            CompareselectedItems.map((productId) => {
                                                            const product = products.find((p) => p.id === productId);
                                                            return (
                                                                  <td key={product.id}>{product.sensors}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>Phone Style</th>
                                                       {
                                                            CompareselectedItems.map((productId) => {
                                                            const product = products.find((p) => p.id === productId);
                                                            return (
                                                                  <td key={product.id}>{product.phone_style}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>color</th>
                                                       {
                                                            CompareselectedItems.map((productId) => {
                                                            const product = products.find((p) => p.id === productId);
                                                            return (
                                                                  <td key={product.id}>{product.color}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>Model Number</th>
                                                       {
                                                            CompareselectedItems.map((productId) => {
                                                            const product = products.find((p) => p.id === productId);
                                                            return (
                                                                  <td key={product.id}>{product.model_number}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>No Contract</th>
                                                       {
                                                            CompareselectedItems.map((productId) => {
                                                            const product = products.find((p) => p.id === productId);
                                                            return (
                                                                  <td key={product.id}>{product.no_contract}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>Device Manufacturer</th>
                                                       {
                                                            CompareselectedItems.map((productId) => {
                                                            const product = products.find((p) => p.id === productId);
                                                            return (
                                                                  <td key={product.id}>{product.devide_manufacturer}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>Product Name</th>
                                                       {
                                                            CompareselectedItems.map((productId) => {
                                                            const product = products.find((p) => p.id === productId);
                                                            return (
                                                                  <td key={product.id}>{product.product_name}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>brand</th>
                                                       {
                                                            CompareselectedItems.map((productId) => {
                                                            const product = products.find((p) => p.id === productId);
                                                            return (
                                                                  <td key={product.id}>{product.brand}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>model family</th>
                                                       {
                                                            CompareselectedItems.map((productId) => {
                                                            const product = products.find((p) => p.id === productId);
                                                            return (
                                                                  <td key={product.id}>{product.mode_family}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>Operating System</th>
                                                       {
                                                            CompareselectedItems.map((productId) => {
                                                            const product = products.find((p) => p.id === productId);
                                                            return (
                                                                  <td key={product.id}>{product.operating_system}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>series</th>
                                                       {
                                                            CompareselectedItems.map((productId) => {
                                                            const product = products.find((p) => p.id === productId);
                                                            return (
                                                                  <td key={product.id}>{product.series}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>Stylus Included</th>
                                                       {
                                                            CompareselectedItems.map((productId) => {
                                                            const product = products.find((p) => p.id === productId);
                                                            return (
                                                                  <td key={product.id}>{product.stylus_included}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                          </tbody>
                                    </table>
                              </div>
                        </div>
                  </div>
                  {isPopupOpen && <PopupSelectItems onClose={closePopupHandler} isActive={isActive} isOverlayActive={isOverlayActive} products={products} selectedProducts={CompareselectedItems} handleCheckboxChange={handleCheckboxChange} handleCompareSubmit={handleCompareSubmit} />}
            </div>
       );
}

export default Comparision;