import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Breadcrumbs = () => {
  const router = useRouter();
  const { query } = router;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/products.json')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching product data:', error));
  }, []);

  const getProductTitles = (productSlugs) => {
    return productSlugs.map(slug => {
      const product = products.find(p => p.slug === slug);
      return product ? product.name : '';
    });
  };

  const generateBreadcrumbs = () => {
    let breadcrumbs = [{ name: 'MobileInsider', path: '/' }];

    if (query.items) {
      const productSlugs = query.items.split(',');
      const productTitles = getProductTitles(productSlugs);
      const comparisonTitle = productTitles.join(' vs ');

      breadcrumbs.push({ name: comparisonTitle, path: '#' });
      breadcrumbs.splice(1, 1, { name: `Compare ${comparisonTitle}`, path: '#' });
    } else if (router.pathname.includes('comparison')) {
      breadcrumbs.push({ name: 'Comparison', path: '/comparison' });
    } else if (router.pathname.includes('categories')) {
      breadcrumbs.push({ name: 'Categories', path: '#' });
    } else if (router.pathname.includes('product')) {
      const productSlug = query.Slug;
      const productName = getProductTitles([productSlug])[0];
      breadcrumbs.push({ name: productName, path: '#' });
    } else {
      const pageName = router.pathname.substring(1).charAt(0).toUpperCase() + router.pathname.substring(2);
      breadcrumbs.push({ name: pageName, path: router.pathname });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div className="breadcrumbs">
      <ul className="crumbs">
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={index}>
            {breadcrumb.path !== '#' ? (
              <Link href={breadcrumb.path}>
                <span>{breadcrumb.name}</span>
              </Link>
            ) : (
              <span>{breadcrumb.name}</span>
            )}
            {index !== breadcrumbs.length - 1 && <span className="divider"> | </span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;