import Head from "next/head";

function Meta({title, keyword, description}) {
      return (
            <Head>
            <title>{title}</title>
            <meta name="robots" content="noindex" />
            <meta name="googlebot" content="noindex" />
            <meta name="keyword" content={keyword} />
            <meta name="description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;500;600;700;800&display=swap" />
            </Head>
       );
}

Meta.defaultProps = {
      title : 'MobileInsider',
      description : 'You may experience nights where no matter how tired you feel, your mind refuses to let you sleep. This could happen despite going to bed at a reasonab',
      keyword : ''
}

export default Meta;