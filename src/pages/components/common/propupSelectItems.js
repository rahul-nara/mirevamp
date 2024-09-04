import styles from '../../../styles/comparision.module.css';
import Button from './button';
import Ratings from './ratings';

function PopupSelectItems({onClose, isActive, isOverlayActive, products, selectedProducts, handleCheckboxChange, handleCompareSubmit}) {
      return (
            <>
                  <div className={`${styles['comp-popup-overlay']} ${isOverlayActive} comp-popup-overlay`} onClick={onClose}></div>
                  <div className={`${styles['comp-popup']} ${isActive} comp-popup`} id={styles['comp-popup']}>
                        <button className={styles['close-icon']} onClick={onClose}></button>
                        <div className="mi-section-head">
                              <div className="section-heading">
                                    <h2 className="title"><span>compare </span><span>Mobiles</span></h2>
                              </div>
                        </div>
                        <div className={styles['comp-prodlist']}>
                              <div className={styles['comp-prodlist-inn']}>
                                    <div className="row">
                                          {
                                                products.map((product) => (
                                                      <div className="col-md-4 col-sm-6" key={product.id}>
                                                            <div className={styles['comp-prod-card']}>
                                                                  <div className={styles['comp-prodtop']}>
                                                                        {/* <div className="rating">Rating</div> */}
                                                                        <Ratings ratingCount={product.rating} />
                                                                        <div className={styles['prodcheck']}>
                                                                              <input type="checkbox" className={styles['cp-input']} checked={selectedProducts.includes(product.slug)} onChange={() => handleCheckboxChange(product.slug)} />
                                                                              <span className={styles['checkmark']}></span>
                                                                        </div>
                                                                  </div>
                                                                  <h3>{product.name}</h3>
                                                                  <span>{product.price}</span>
                                                                  <figure>
                                                                        <img src={product.image} alt="{product.name}" width={204} height={140} />
                                                                  </figure>
                                                            </div>
                                                      </div>
                                                ))
                                          }
                                    </div>
                              </div>
                              <div className={`${styles['comparebtn']} common-btn`}>
                                    <Button onClick={handleCompareSubmit} text="Compare" />
                              </div>
                              <div className='compare-message'></div>
                        </div>
                  </div>
            </>
       );
}

export default PopupSelectItems;