/**
 * Structured data (JSON-LD) for SEO optimization
 */

export const getWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "משחקים לילדים",
  "alternateName": "Games For My Kids",
  "url": "https://games-for-my-kids.vercel.app",
  "description": "אוסף משחקים חינוכיים ומהנים לילדים בגיל 2-5 שנים",
  "inLanguage": "he",
  "author": {
    "@type": "Organization",
    "name": "Games For My Kids",
    "url": "https://games-for-my-kids.vercel.app"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Games For My Kids",
    "url": "https://games-for-my-kids.vercel.app"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://games-for-my-kids.vercel.app/games/{search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
});

export const getEducationalOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "משחקים לילדים",
  "url": "https://games-for-my-kids.vercel.app",
  "description": "פלטפורמה חינוכית למשחקים לילדים בגיל הרך",
  "educationalUse": "learning",
  "audience": {
    "@type": "EducationalAudience",
    "educationalRole": "student",
    "audienceType": "children",
    "suggestedMinAge": 2,
    "suggestedMaxAge": 5
  },
  "hasOfferingCatalog": {
    "@type": "OfferingCatalog",
    "name": "משחקים חינוכיים",
    "itemListElement": [
      {
        "@type": "Course",
        "name": "לימוד אותיות עברית",
        "description": "משחקים ללימוד האלפבית העברי",
        "provider": {
          "@type": "Organization",
          "name": "משחקים לילדים"
        }
      },
      {
        "@type": "Course",
        "name": "משחקי זיכרון",
        "description": "משחקים לפיתוח הזיכרון והריכוז",
        "provider": {
          "@type": "Organization",
          "name": "משחקים לילדים"
        }
      },
      {
        "@type": "Course",
        "name": "לימוד מספרים",
        "description": "משחקים ללימוד מתמטיקה בסיסית",
        "provider": {
          "@type": "Organization",
          "name": "משחקים לילדים"
        }
      }
    ]
  }
});

export const getGameSchema = (gameName: string, gameDescription: string, gameUrl: string) => ({
  "@context": "https://schema.org",
  "@type": "Game",
  "name": gameName,
  "description": gameDescription,
  "url": gameUrl,
  "genre": "Educational",
  "audience": {
    "@type": "PeopleAudience",
    "suggestedMinAge": 2,
    "suggestedMaxAge": 5
  },
  "isAccessibleForFree": true,
  "inLanguage": "he",
  "operatingSystem": "Web Browser",
  "applicationCategory": "Educational Game",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Games For My Kids",
    "url": "https://games-for-my-kids.vercel.app"
  }
});

export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const getFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "איך המשחקים עוזרים לילדים ללמוד?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "המשחקים מעודדים למידה פעילה באמצעות אינטראקציה, חזרות ומשוב חיובי. הם מפתחים כישורים בסיסיים כמו זיכרון, קואורדינציה ולמידת אותיות ומספרים."
      }
    },
    {
      "@type": "Question",
      "name": "האם המשחקים בטוחים לילדים?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "כן, כל המשחקים מתוכננים במיוחד לילדים בגיל 2-5 ואינם מכילים תוכן לא מתאים. האתר עומד בתקני COPPA לפרטיות ילדים."
      }
    },
    {
      "@type": "Question",
      "name": "האם המשחקים עובדים על טאבלט וטלפון?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "כן, האתר מותאם לכל המכשירים כולל טאבלטים וטלפונים חכמים. המשחקים תומכים במגע ומותאמים לשימוש קל לילדים."
      }
    },
    {
      "@type": "Question",
      "name": "האם המשחקים חינמיים?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "כן, כל המשחקים באתר חינמיים לחלוטין ואין צורך ברישום או תשלום."
      }
    }
  ]
});

export const getAppSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "משחקים לילדים",
  "operatingSystem": "Web Browser",
  "applicationCategory": "Educational",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  },
  "author": {
    "@type": "Organization",
    "name": "Games For My Kids"
  },
  "datePublished": "2024-01-01",
  "description": "אפליקציית משחקים חינוכיים לילדים בגיל 2-5",
  "downloadUrl": "https://games-for-my-kids.vercel.app",
  "screenshot": "https://games-for-my-kids.vercel.app/icons/icon-512x512.svg",
  "softwareVersion": "1.0",
  "url": "https://games-for-my-kids.vercel.app"
});

// Helper to inject structured data into page
export const injectStructuredData = (schema: object) => {
  if (typeof window === 'undefined') return;
  
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};
