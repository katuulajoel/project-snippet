import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";

const MetaTags = ({ title, description, keywords }) => {
  const metaTitle = `Tunga | ${title}`;
  const metaDescription = description;

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <link rel="canonical" href={window.location.href} />
      <meta name="description" content={metaDescription} />

      <meta property="og:url" content={window.location.href} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />

      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />

      {keywords ? <meta name="keywords" content={keywords} /> : null}
    </Helmet>
  );
};

MetaTags.propTypes = {
  description: PropTypes.string,
  keywords: PropTypes.string,
  title: PropTypes.string,
};

export default MetaTags;
