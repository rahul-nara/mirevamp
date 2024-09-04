import React, { useEffect, useState } from "react";
import Footer from "../components/common/footer";
import Button from "../components/common/button";
import Link from "next/link";
import CircleProgressBar from "../components/common/circleProgressBar";
import SpecAverage from "../components/common/specaverage";
import LinkButton from "../components/common/linkButton";
import CategoryFilter from "../components/common/categoryFilter";
import Pagination from "../components/pagination/pagination";
import { useRouter } from "next/router";

function CategoriesPage() {
   const router = useRouter();
   const [sortListActive, setSortListActive] = useState(false);
   const [listClassActivated, setListClassActivated] = useState('');
   const [products, setProducts] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [selectedProducts, setSelectedProducts] = useState([]);
   const [sortBy, setSortBy] = useState(null);
   const [filters, setFilters] = useState({
      price: null,
      score: null,
      brand: null
   });
   const [selectedRange, setSelectedRange] = useState([20, 80]);
   const [selectedBrand, setSelectedBrand] = useState(null);
   const [insiderScoreRange, setInsiderScoreRange] = useState([0, 20]);
   const [sliderKey, setSliderKey] = useState(0);
   const productsPerPage = 8;

   const toggleSortList = () => {
      setSortListActive((prevState) => !prevState);
   }

   const listItemClassHandler = () => {
      setSortListActive(false);
      setListClassActivated(true);
   }
   const gridItemClassHandler = () => {
      setSortListActive(false);
      setListClassActivated(false);
   }

   useEffect(() => {
      fetch('/products.json')
      .then((response) => response.json())
      .then((data) => {
         setProducts(data);
         setFilters({ ...filters, price: null, score: null, brand: null });
         setCurrentPage(1);
      })
      .catch((error) => console.error('Error fetching product data:', error));
   }, []);

   const applyFilters = () => {
      let filteredProducts = [...products];
      if (filters.price) {
         filteredProducts = filteredProducts.filter(product => product.price >= filters.price[0] && product.price <= filters.price[1]);
      }
      if (filters.score) {
         filteredProducts = filteredProducts.filter(product => product.score >= filters.score[0] && product.score <= filters.score[1]);
      }
      if (filters.brand) {
         filteredProducts = filteredProducts.filter(product => product.brand === filters.brand);
      }
      return filteredProducts;
   };

   const handlePriceRangeChange = (range) => {
      setFilters({ ...filters, price: range });
      setCurrentPage(1);
      updatePageInUrl(1, range);
   };

   const handleInsideScoreChange = (score) => {
      setFilters({ ...filters, score: score });
      setCurrentPage(1);
      updatePageInUrl(1, null, score);
   };

   const handleBrandChange = (brand) => {
      setFilters({ ...filters, brand });
      setCurrentPage(1);
      updatePageInUrl(1, null, null, brand);
  };

   const handleRangeChange = (value) => {
      setSelectedRange(value);
      handlePriceRangeChange(value);
   };
   const handleRadioChange = (brand) => {
      setSelectedBrand(brand);
      handleBrandChange(brand);
   }
   const handleInsiderScoreChange = (value) => {
      setInsiderScoreRange(value);
      handleInsideScoreChange(value);
   };

   const addToCompareHandler = (productslug) => {
      if (!selectedProducts.includes(productslug)) {
         if (selectedProducts.length < 2) {
            const updatedSelectedProducts = selectedProducts.filter(slug => slug !== productslug);
            setSelectedProducts([...updatedSelectedProducts, productslug]);
         } else {
            alert('You can only compare up to two products.');
         }
      } else {
         const updatedSelectedProducts = selectedProducts.filter(slug => slug !== productslug);
         setSelectedProducts([...updatedSelectedProducts]);
      }
   }

   const sortedAndFilteredProducts = applyFilters();
   const totalPages = Math.ceil(sortedAndFilteredProducts.length / productsPerPage);
   const currentProducts = sortedAndFilteredProducts.slice((currentPage - 1) * productsPerPage, currentPage * productsPerPage);

   const selectPageHandler = (selectedPage) => {
      if (selectedPage >= 1 && selectedPage <= totalPages && selectedPage !== currentPage) {
        setCurrentPage(selectedPage);
        updatePageInUrl(selectedPage);
      }
   };

   const sortProducts = (products, sortBy) => {
      switch(sortBy){
         case 'priceLowToHigh':
            return products.slice().sort((a, b) => a.price - b.price);
         case 'priceHighToLow':
            return products.slice().sort((a, b) => b.price - a.price);
         case 'insiderScore':
            return products.slice().sort((a, b) => b.score - a.score);
         default:
         return products;
      }
   }

   const sortProductsChangehandler = (sortBy) => {
      setSortBy(sortBy);
  };
   const sortedProducts = sortProducts(currentProducts, sortBy);

   // const updatePageInUrl = (newPage) => {
   //    if (newPage === 1) {
   //      const { page, ...query } = router.query;
   //      router.push({
   //        pathname: router.pathname,
   //        query: query
   //      });
   //    } else {
   //      router.push({
   //        pathname: router.pathname,
   //        query: { ...router.query, page: newPage }
   //      });
   //    }
   // };

   const updatePageInUrl = (newPage, priceRange, scoreRange, brand) => {
      const { page, minPrice, maxPrice, minScore, maxScore, ...query } = router.query;
      let newQuery = {};
      if (priceRange) {
          newQuery = { ...query, minPrice: priceRange[0], maxPrice: priceRange[1] };
      } else if (scoreRange) {
          newQuery = { ...query, minScore: scoreRange[0], maxScore: scoreRange[1] };
      } else if (brand) {
          newQuery = { ...query, brand: brand };
      } else {
          delete query.brand;
          newQuery = { ...query };
      }

      if (newPage !== 1) {
          newQuery.page = newPage;
      }

      router.push({
          pathname: router.pathname,
          query: newQuery
      });
   };

   const resetFilters = () => {
      setFilters({
          price: null,
          score: null,
          brand: null
      });
      setSelectedRange([20, 80]);
      setInsiderScoreRange([0, 20]);
      setSelectedBrand(null);
      setSliderKey((prevKey) => prevKey + 1);
      setCurrentPage(1);
      updatePageInUrl(1, null, null, null);
  };

   const selectedProductsCompareHandler = () => {
         if(selectedProducts.length === 2){
            router.push(`/comparision?items=${selectedProducts.join(',')}`);
         } else {
            alert('Please select atlease two products for comparison.');
        }
   }

   return (
      <>
      <div className="category-pg-sec">
         <div className="category-pg-wrap">
            <div className="category-pg-block">
               <div className="left-section">
                  <CategoryFilter onPriceRangeChange={handleRangeChange} selectedRange={selectedRange} products={products} onBrandChange={handleRadioChange} selectedBrand={selectedBrand} onInsideChange={handleInsiderScoreChange} insiderScoreRange={insiderScoreRange} onReset={resetFilters} sliderKey={sliderKey} />
               </div>
               <div className="right-section">
                  <div className="category-filter-icons">
                     <div className="sortbybtns">
                        <Button className="sortbybtn" onClick={toggleSortList} />
                        {sortListActive && (<div className="sortbylist">
                        <span className="title">sort by</span>
                           <ul>
                              <li><Button text={`Relevance`} onClick={() => sortProductsChangehandler('relevance')} /></li>
                              <li><Button text={`Price - Low to High`} onClick={() => sortProductsChangehandler('priceLowToHigh')} /></li>
                              <li><Button text={`Price - High to Low`} onClick={() => sortProductsChangehandler('priceHighToLow')} /></li>
                              <li><Button text={`Insider Score`} onClick={() => sortProductsChangehandler('score')} /></li>
                           </ul>
                        </div>)}
                     </div>
                     <div className="sortgrid-btns">
                        <Button className="sortgrid" onClick={listItemClassHandler} />
                        <Button className="sortlistgrid" onClick={gridItemClassHandler} />
                     </div>
                  </div>
                  <div className="category-pg-items">
                     <div className="mi-row">
                     {
                        sortedProducts.map((product) => {
                           return (
                              <div className={`${listClassActivated ? 'col-xs-12 full-list-grid' : 'col-md-6 col-sm-6'}`} key={product.id}>
                                 <div className="productitem-card">
                                    <div className="productitem-scorelabel">
                                       <span>Score</span>
                                       <span>{product.score}%</span>
                                    </div>
                                    <div className="productitem-top">
                                       <figure>
                                          <img src={product.image} alt={product.name}  width={121} height={94} />
                                       </figure>
                                       <div className="productitem-content">
                                          <h3><Link href={product.click_url}>{product.name}</Link></h3>
                                          <span className="price">${product.price}</span>
                                       </div>
                                    </div>
                                    <div className="productitem-spec-list">
                                       {
                                          product.average.map((av, i) => {
                                             return (
                                                <div className="specitem-box" key={i}>
                                                <CircleProgressBar count={av} />
                                                <SpecAverage avClass="prod-specitem-content" avCount={av} keyIndex="" keyspec="" />
                                                </div>
                                                )
                                             })
                                          }
                                    </div>
                                       <div className="dtlsspec-links">
                                          <div className="dtlsspec-link">
                                             <LinkButton link={product.click_url} as={product.click_url}  text="Detailed Specifications" />
                                          </div>
                                          <div className="productitem-compareicon">
                                             <Button className={`cmp-icon ${selectedProducts.includes(product.id) ? 'selected' : ''}`} onClick={() => addToCompareHandler(product.slug)} />
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 )
                              })
                           }
                           </div>
                        </div>
                        {
                            sortedAndFilteredProducts.length > productsPerPage && <Pagination currentPage={currentPage} totalPages={Math.ceil(sortedAndFilteredProducts.length / productsPerPage)} selectPageHandler={selectPageHandler} />
                        }
                     </div>
                  </div>
               </div>
            </div>
            <Footer selectedProductsCount={selectedProducts.length} displayedCompareProducts={selectedProductsCompareHandler} />
            </>
            );
}

export default CategoriesPage;