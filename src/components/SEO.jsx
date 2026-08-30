function SEO() {
  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Gandhi RO Water Enterprises",
    telephone: "+918521836703",
    description:
      "RO purified drinking water and bulk water supply for homes, shops, businesses, events and functions in Rajapakar, Vaishali, Bihar.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rajapakar Banghara",
      addressLocality: "Rajapakar",
      addressRegion: "Bihar",
      postalCode: "844124",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: "Rajapakar",
    },
    makesOffer: [
      {
        itemOffered: {
          "@type": "Product",
          name: "20L RO Water Jar",
          offers: {
              "@type": "Offer",
              price: "20",
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
          },
        },
      },
      {
        itemOffered: {
            "@type": "Product",
            name: "1L Water Bottle",
            offers: {
              "@type": "Offer",
              price: "15",
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
            },
        },
      },
      {
        itemOffered: {
          "@type": "Product",
          name: "500ml Water Bottle",
          offers: {
            "@type": "Offer",
            price: "8",
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
          },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Bulk Event Water Supply",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(businessSchema),
      }}
    />
  );
}

export default SEO;