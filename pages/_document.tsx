import { Html, Head, Main, NextScript } from "next/document";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "@id": "https://drbrettmarshall.com.au/#medicalbusiness",
      "name": "Dr Brett Marshall — Specialist Obstetrician & Gynaecologist",
      "description": "Specialist obstetrician and gynaecologist on the Mornington Peninsula, Victoria, offering advanced laparoscopic and hysteroscopic surgery.",
      "telephone": "+61 3 9776 6411",
      "email": "admin@pengyn.com.au",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Suite 3, 7 Foot Street",
        "addressLocality": "Frankston",
        "addressRegion": "VIC",
        "postalCode": "3199",
        "addressCountry": "AU",
      },
      "geo": { "@type": "GeoCoordinates", "latitude": -38.1455, "longitude": 145.1215 },
    },
    {
      "@type": "Physician",
      "@id": "https://drbrettmarshall.com.au/#physician",
      "name": "Dr Brett Marshall",
      "medicalSpecialty": "Obstetrics and Gynaecology",
      "honorificSuffix": "MBBS FRANZCOG",
      "worksFor": { "@id": "https://drbrettmarshall.com.au/#medicalbusiness" },
      "memberOf": [
        { "@type": "Organization", "name": "Royal Australian and New Zealand College of Obstetricians and Gynaecologists (RANZCOG)" },
        { "@type": "Organization", "name": "Australian Gynaecological Endoscopy Society (AGES)" },
      ],
    },
  ],
};

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
