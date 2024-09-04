import '@/styles/globals.css'
import Layout from './components/common/Layout';

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps}/>
    </Layout>
   );
}

export default MyApp;