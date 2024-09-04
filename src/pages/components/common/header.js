import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import headerStyle from "../../../styles/header.module.css"
import { customData } from "public/data/staticdataconfig";
import SearchBar from "./searchBar";


function Header() {
      const router = useRouter();
      const headerRouter = router.pathname === '/';
      return (
            <header className={`${headerRouter ? headerStyle.mainheader : headerStyle.header}`}>
                  <div className={headerStyle['header-wrap']}>
                  <Link href="/" className={`${headerStyle['header-logo']}`}>
                        {headerRouter && <Image src={customData.header.logo} alt="MobileInsider" className={headerStyle['desk-logo']} width={106} height={44} />}
                        {headerRouter && <Image src={customData.header.white_logo} alt="MobileInsider" className={headerStyle['mb-logo']} width={106} height={44} />}
                        {!headerRouter && <Image src={customData.header.white_logo} alt="MobileInsider" width={106} height={44} />}
                  </Link>
                  <div className={`${headerStyle['header-right-block']}`}>
                        <SearchBar />
                        <div className="mobilemenu-icon"></div>
                  </div>
                  </div>
            </header>
       );
}

export default Header;