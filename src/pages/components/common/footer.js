import Link from "next/link";
import Image from "next/image";
import footerStyle from "../../../styles/footer.module.css"
import Button from './button';
import { useRouter } from "next/router";
import { customData } from "public/data/staticdataconfig";

function Footer({selectedProductsCount, displayedCompareProducts}) {
      const currentYear = new Date().getFullYear();
      const router = useRouter();
      const isHomeCompareIcon = router.pathname === '/';

      return (
            <footer className={footerStyle.footer}>
                  <div className="container">
                        <div className={`${footerStyle['footer-wrap']}`}>
                              <div className={`${footerStyle['footer-logo']}`}>
                                    <Link href="/" className="">
                                          <Image src={customData.footer.footerlogo} alt="MobileInsider" width={191} height={36} />
                                    </Link>
                              </div>
                              <div className={`${footerStyle['footer-content']}`}>
                                    <p>{customData.footer.footer_content}</p>
                              </div>
                              <div className={`${footerStyle['footer-links']}`}>
                                    <ul>
                                          {customData.footer.footerlinks.map((footerlink) => (
                                                <li key={footerlink.label}><Link href={footerlink.clickUrl}>{footerlink.label}</Link></li>
                                          ))
                                    }
                                    </ul>
                              </div>
                        </div>
                  </div>
                  <div className={`${footerStyle['copyright-content']}`}>
                        <div className="container">
                              <p>&copy; {currentYear} {customData.footer.copyright}</p>
                        </div>
                  </div>
                  {(isHomeCompareIcon || router.pathname.startsWith('/categories')) && (
                        <Button className="compare-icon" text="Add to compare" addedCompareCount={selectedProductsCount} onClick={displayedCompareProducts} />
                  )}
            </footer>
       );
}

export default Footer;