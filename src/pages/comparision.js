import CircleProgressBar from "./components/common/circleProgressBar";
import SpecAverage from "./components/common/specaverage";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/comparision.module.css"
import ScoreLabel from "./components/common/scorelabel";
import React, { useEffect, useState } from 'react';
import PopupSelectItems from "./components/common/propupSelectItems";
import { useRouter } from "next/router";
import Ratings from "./components/common/ratings";
import { compareSmallIcons } from "public/data/staticdataconfig";

function Comparision() {
      const router = useRouter();
      const { items } = router.query;
      const CompareselectedItems = items ? items.split(',') : [];
      //console.log(CompareselectedItems);
      const [isPopupOpen, setIsPopupOpen] = useState(false);
      const [isActive, setIsActive] = useState('');
      const [isOverlayActive, setIsOverlayActive] = useState('');
      const [products, setProducts] = useState([]);
      const [compareDeviceActive, setCompareDeviceActive] = useState(false);

      useEffect(() => {
            fetch('/products.json')
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error('Error fetching product data:', error));
      }, []);

      const handleCheckboxChange = (productslug) => {
            const SelectErrorMessage = document.getElementsByClassName('compare-message')[0];
            SelectErrorMessage.innerHTML = '';
            if (CompareselectedItems.includes(productslug)) {
                  const updatedSelectedItems = CompareselectedItems.filter((slug) => slug !== productslug);
                  router.push(`/comparision?items=${updatedSelectedItems.join(',')}`);
            } else {
                  if (CompareselectedItems.length < 2) {
                        const updatedSelectedItems = [...CompareselectedItems, productslug];
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

      const removeSelectedProduct = (productslug) => {
            const updatedSelectedItems = CompareselectedItems.filter((slug) => slug !== productslug);
            if (updatedSelectedItems.length > 0) {
                  router.push(`/comparision?items=${updatedSelectedItems.join(',')}`);
            } else {
                  router.push(`/comparision`);
            }
      };

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

      const specColorClass = (review) => {
        switch(review) {
          case 'Excellent':
            return styles['extcolor'];
          case 'Good':
            return styles['gdcolor'];
          case 'Average':
            return styles['avcolor'];
          case 'Poor':
            return styles['prcolor'];
          default:
            return styles['undefined'];
        }
      }

      const comparisonData = [
            { key: 'rating', label: 'Rating' },
            { key: 'sensors', label: 'Sensors' },
            { key: 'phone_style', label: 'Phone Style' },
            { key: 'color', label: 'Color' },
            { key: 'model_number', label: 'Model Number' },
            { key: 'no_contract', label: 'No Contract' },
            { key: 'devide_manufacturer', label: 'Device Manufacturer' },
            { key: 'product_name', label: 'Product Name' },
            { key: 'brand', label: 'Brand' },
            { key: 'mode_family', label: 'Model Family' },
            { key: 'operating_system', label: 'Operating System' },
            { key: 'series', label: 'Series' },
            { key: 'stylus_included', label: 'Stylus Included' }
      ];

      if (products.length === 0) {
            return <div>Loading...</div>;
      }

      const compareDevicesButton = () => {
            setCompareDeviceActive(!compareDeviceActive);
      }

      return (
            <div className={styles['prodcompare-page']}>
                  <div className={`${styles['prodcompare-sec']} clearfix`}>
                        <div className={styles['prodcompare-wrap']}>
                              <div className={styles['prodcompare-block']}>
                                    <div className={`${styles['mi-section-head']} mi-section-head`}>
                                          <div className="section-heading">
                                                <h2 className="title"><span>compare</span></h2>
                                          </div>
                                          <button className={styles['compare-filter-icon']} onClick={compareDevicesButton}></button>
                                    </div>
                                    {compareDeviceActive && <div className={styles['prodcompare-ty-list']}>
                                          <ul>
                                                {compareSmallIcons.map((icon, i) => (
                                                      <li key={i}>
                                                            <figure><Image src={icon.img} width={106} height={44} alt="MobileInsider" /></figure>
                                                      </li>
                                                ))}
                                          </ul>
                                    </div>
                                    }
                              </div>
                              <div className={styles['compare-filter-block']}>
                                    <table className={styles['table']}>
                                          <thead>
                                                <tr>
                                                      <th className={`${styles['side-label']} ${styles['prodbtn-cnt']}`}>
                                                            <button type="button" className={styles['add-prodbtn']} onClick={openPopupHandler}></button>
                                                      </th>
                                                      {
                                                            CompareselectedItems.map((productslug) => {
                                                              const product = products.find((p) => p.slug === productslug);
                                                                  return (
                                                                        <td key={product.id}>
                                                                              <div className={styles['comp-product-card']}>
                                                                                    <div className={`${styles['ov-label']} ${specColorClass(product.review)}`}>{product.review}</div>
                                                                                    <button className={styles['closeicon']} onClick={() => removeSelectedProduct(productslug)} />
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
                                                                        </td>
                                                                  )
                                                            })
                                                      }
                                                </tr>
                                          </thead>
                                          <tbody>
                                                {comparisonData.map((item, index) => (
                                                      <tr key={index}>
                                                            <th className={styles['side-label']}>{item.label}</th>
                                                            {CompareselectedItems.map((productslug) => {
                                                                  const product = products.find((p) => p.slug === productslug);
                                                                  return item.key === 'rating' ? (
                                                                        <td key={`${product.id}-${item.key}`}>
                                                                              <Ratings ratingCount={product.rating} />
                                                                        </td>
                                                                  ) : (
                                                                        <td key={`${product.id}-${item.key}`}>{product[item.key]}</td>
                                                                  );
                                                            })}
                                                      </tr>
                                                ))}
                                          </tbody>
                                           {/* <tbody>
                                                <tr className={styles['tb-main-head']}>
                                                      <th>Overview</th>
                                                      {
                                                            CompareselectedItems.map((productslug) => {
                                                                  const product = products.find((p) => p.slug === productslug);
                                                            return (
                                                                  <td key={product.id}><Ratings ratingCount={product.rating} /></td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>Sensors</th>
                                                      {
                                                            CompareselectedItems.map((productslug) => {
                                                                  const product = products.find((p) => p.slug === productslug);
                                                            return (
                                                                  <td key={product.id}>{product.sensors}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>Phone Style</th>
                                                       {
                                                            CompareselectedItems.map((productslug) => {
                                                                  const product = products.find((p) => p.slug === productslug);
                                                            return (
                                                                  <td key={product.id}>{product.phone_style}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>color</th>
                                                       {
                                                            CompareselectedItems.map((productslug) => {
                                                                  const product = products.find((p) => p.slug === productslug);
                                                            return (
                                                                  <td key={product.id}>{product.color}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>Model Number</th>
                                                       {
                                                            CompareselectedItems.map((productslug) => {
                                                                  const product = products.find((p) => p.slug === productslug);
                                                            return (
                                                                  <td key={product.id}>{product.model_number}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>No Contract</th>
                                                       {
                                                            CompareselectedItems.map((productslug) => {
                                                                  const product = products.find((p) => p.slug === productslug);
                                                            return (
                                                                  <td key={product.id}>{product.no_contract}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>Device Manufacturer</th>
                                                       {
                                                            CompareselectedItems.map((productslug) => {
                                                                  const product = products.find((p) => p.slug === productslug);
                                                            return (
                                                                  <td key={product.id}>{product.devide_manufacturer}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>Product Name</th>
                                                       {
                                                            CompareselectedItems.map((productslug) => {
                                                                  const product = products.find((p) => p.slug === productslug);
                                                            return (
                                                                  <td key={product.id}>{product.product_name}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>brand</th>
                                                       {
                                                            CompareselectedItems.map((productslug) => {
                                                                  const product = products.find((p) => p.slug === productslug);
                                                            return (
                                                                  <td key={product.id}>{product.brand}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>model family</th>
                                                       {
                                                            CompareselectedItems.map((productslug) => {
                                                                  const product = products.find((p) => p.slug === productslug);
                                                            return (
                                                                  <td key={product.id}>{product.mode_family}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>Operating System</th>
                                                       {
                                                            CompareselectedItems.map((productslug) => {
                                                                  const product = products.find((p) => p.slug === productslug);
                                                            return (
                                                                  <td key={product.id}>{product.operating_system}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>series</th>
                                                       {
                                                            CompareselectedItems.map((productslug) => {
                                                                  const product = products.find((p) => p.slug === productslug);
                                                            return (
                                                                  <td key={product.id}>{product.series}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                                <tr>
                                                      <th className={styles['side-label']}>Stylus Included</th>
                                                       {
                                                            CompareselectedItems.map((productslug) => {
                                                                  const product = products.find((p) => p.slug === productslug);
                                                            return (
                                                                  <td key={product.id}>{product.stylus_included}</td>
                                                            )
                                                            })
                                                      }
                                                </tr>
                                          </tbody> */}
                                    </table>
                              </div>
                        </div>
                  </div>
                  {isPopupOpen && <PopupSelectItems onClose={closePopupHandler} isActive={isActive} isOverlayActive={isOverlayActive} products={products} selectedProducts={CompareselectedItems} handleCheckboxChange={handleCheckboxChange} handleCompareSubmit={handleCompareSubmit} />}
            </div>
       );
}

export default Comparision;