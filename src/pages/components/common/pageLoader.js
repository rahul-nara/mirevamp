import React, { useEffect, useState } from 'react';
import LoaderStyles from '../../../styles/pageloader.module.css';

function pageLoader() {
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            const loaderTimer = setTimeout(() => {
                  setLoading(false);
            }, 3000);
            return () => clearTimeout(loaderTimer);
      }, []);

      return (
            <div id={`${LoaderStyles['loader']}`} style={{ display: loading ? 'block' : 'none' }}>
                  <div className={`${LoaderStyles['loader-inn']}`}>
                        <div className={`${LoaderStyles['ring']}`}>Loading
                              <span></span>
                        </div>
                  </div>
            </div>
       );
}

export default pageLoader;