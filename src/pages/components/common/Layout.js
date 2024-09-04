import React from "react";
import Meta from "./meta";
import Header from "./header";
import Footer from "./footer";
import Breadcrumbs from "./breadCrumbs";
import { useRouter } from "next/router";

function Layout({children}) {
      const router = useRouter();
      const isHomePage = router.pathname === '/';
      const isCategoriesPage = router.pathname === '/categories';
      return (
            <>
                  <Meta />
                  <Header />
                  {
                        !isHomePage && <Breadcrumbs />
                  }
                  <main className="sticky-content">{children}</main>
                  {!isCategoriesPage && <Footer />}
            </>
       );
}

export default Layout;