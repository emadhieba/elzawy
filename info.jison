{
  "meta": {
    "name": "Zawy Restaurants – Design Spec",
    "version": "1.0.0",
    "createdAt": "2025-08-17T00:00:00.000Z",
    "referenceStyle": "Inspired by BazookaEgypt restaurant page; not a copy",
    "languageDefault": "ar",
    "rtl": true
  },
  "brand": {
    "titleAr": "الزاوي",
    "titleEn": "Al-Zawy",
    "logo": "assets/brand/logo.png",
    "favicon": "assets/brand/favicon.png",
    "tone": "Warm, appetizing, street-grill energy with modern cleanliness",
    "voice": "Direct, friendly، مسموح استخدام اللهجة المصرية في البانرات التسويقية"
  },
  "palette": {
    "primary": "#C8102E",
    "primaryDark": "#8E0D22",
    "accent": "#FFD166",
    "accentDark": "#E6B84F",
    "neutral950": "#0B0B0F",
    "neutral800": "#1F2329",
    "neutral600": "#4B5563",
    "neutral300": "#D1D5DB",
    "neutral100": "#F5F6F8",
    "surface": "#FFFFFF",
    "success": "#22C55E",
    "warning": "#F59E0B",
    "danger": "#EF4444",
    "gradientHero": ["#C8102E", "#FF5E5B"]
  },
  "typography": {
    "fontAr": "Tajawal, system-ui, sans-serif",
    "fontEn": "Inter, system-ui, sans-serif",
    "scale": {
      "display": 48,
      "h1": 36,
      "h2": 30,
      "h3": 24,
      "h4": 20,
      "bodyLg": 18,
      "body": 16,
      "small": 14,
      "tiny": 12
    },
    "weight": { "display": 800, "bold": 700, "semibold": 600, "medium": 500, "regular": 400 },
    "numerals": "Localized numerals for Arabic; switch on language toggle"
  },
  "spacing": {
    "radius": { "sm": 8, "md": 14, "lg": 20, "xl": 28 },
    "shadow": {
      "card": "0 10px 24px 0 rgba(0,0,0,0.08)",
      "hover": "0 14px 28px 0 rgba(0,0,0,0.12)",
      "soft": "0 6px 16px rgba(0,0,0,0.06)"
    },
    "gaps": [6, 10, 14, 20, 28, 36]
  },
  "breakpoints": { "xs": 360, "sm": 480, "md": 768, "lg": 1024, "xl": 1280 },
  "layout": {
    "containerWidth": { "md": 720, "lg": 992, "xl": 1200 },
    "grid": { "menuCols": { "xs": 1, "sm": 2, "md": 3, "lg": 4 }, "offersCols": { "xs": 1, "sm": 2, "md": 3 } },
    "header": { "height": 72, "sticky": true, "elevationOnScroll": true },
    "footer": { "columns": 3, "compactMobile": true }
  },
  "assets": {
    "heroBanners": ["assets/hero/offer-1.jpg", "assets/hero/offer-2.jpg"],
    "menuReferenceImage": "assets/brand/menu-scan.jpeg",
    "uploadedSampleFromUser": "assets/brand/user-menu-upload.jpeg"
  },
  "components": {
    "navbar": {
      "style": "Solid surface with subtle gradient and thin decorative Egyptian border under nav",
      "elements": ["logo", "branchSwitcher", "navLinks", "languageToggle", "ctaPhone"],
      "navLinks": [
        { "labelAr": "القائمة", "to": "/menu" },
        { "labelAr": "العروض", "to": "/offers" },
        { "labelAr": "فروعنا", "to": "/#branches" },
        { "labelAr": "اتصل بنا", "to": "/contact" }
      ],
      "ctaPhone": { "icon": "phone", "textAr": "اتصل الآن", "number": "0100-000-0000" },
      "hoverUnderline": true
    },
    "branchSwitcher": {
      "type": "dropdown",
      "shape": "pill",
      "icon": "store",
      "items": [
        { "id": 1, "name": "بروست الزاوي نيو" },
        { "id": 2, "name": "اولاد الزاوي للمشويات" }
      ]
    },
    "hero": {
      "variant": "carousel",
      "height": { "mobile": 280, "desktop": 460 },
      "overlay": { "type": "gradient", "opacity": 0.25 },
      "caption": { "titleSize": "display", "button": { "labelAr": "اطلب الآن", "to": "/menu" } },
      "badges": [{ "textAr": "عرض اليوم", "tone": "accent" }]
    },
    "categoryTabs": {
      "style": "segmented",
      "rounded": "xl",
      "items": [
        { "key": "tasyewat", "labelAr": "ركن التسويات" },
        { "key": "additions", "labelAr": "ركن الاضافات" },
        { "key": "drinks", "labelAr": "ركن المشروبات" },
        { "key": "mix", "labelAr": "وجبات مشكلة" }
      ]
    },
    "menuCard": {
      "imageRatio": "4:3",
      "priceBadge": { "shape": "pill", "position": "top-start", "elevated": true },
      "titleMaxLines": 2,
      "descMaxLines": 3,
      "buttons": [{ "labelAr": "أضف", "variant": "filled" }],
      "hover": { "lift": true, "shadow": "hover", "scale": 1.01 }
    },
    "offerCard": {
      "layout": "image-left",
      "ribbon": { "textAr": "خصم", "tone": "primary" },
      "cta": { "labelAr": "تفاصيل العرض", "to": "/offers" }
    },
    "sectionHeading": { "decor": "thin red line + small chili icon", "align": "center", "marginY": 28 },
    "footer": {
      "bg": "neutral950",
      "text": "surface",
      "blocks": [
        { "titleAr": "عن الزاوي", "items": ["جودة من 1980", "مذاق مصري أصيل"] },
        { "titleAr": "الفروع", "items": ["الزاوي نيو", "اولاد الزاوي للمشويات"] },
        { "titleAr": "تواصل", "items": ["0100-000-0000", "facebook.com/alzawy"] }
      ],
      "smallPrint": "© جميع الحقوق محفوظة"
    },
    "chips": { "sizes": { "sm": 24, "md": 28 }, "variants": ["filled", "outline"] },
    "buttons": {
      "radius": "xl",
      "sizes": { "sm": 36, "md": 44, "lg": 52 },
      "variants": {
        "filled": { "bg": "primary", "text": "surface" },
        "outline": { "bg": "transparent", "border": "primary", "text": "primary" },
        "ghost": { "bg": "transparent", "text": "primary" }
      }
    },
    "forms": { "fieldHeight": 44, "labelWeight": "medium", "radius": "md", "focusRing": "0 0 0 3px rgba(200,16,46,0.25)" }
  },
  "pages": {
    "home": {
      "sectionsOrder": ["hero", "offersStrip", "categoriesIntro", "menuGrid", "branches", "ctaBanner"],
      "offersStrip": { "style": "marquee", "icon": "flame", "bg": "accent" },
      "branches": { "cards": { "icon": "pin", "showWorkingHours": true }, "map": { "enabled": false } },
      "ctaBanner": { "titleAr": "جاهز تطلب؟", "button": { "labelAr": "افتح المنيو", "to": "/menu" }, "bgGradient": ["#1F2329", "#0B0B0F"] }
    },
    "menu": {
      "filterBar": { "search": true, "chips": ["الأكثر مبيعًا", "جديد", "حار"] },
      "grid": "menuCols",
      "emptyState": { "titleAr": "قريبًا", "descAr": "لم تتم إضافة عناصر هنا بعد" }
    },
    "offers": {
      "grid": "offersCols",
      "emptyState": { "titleAr": "لا توجد عروض", "descAr": "تابعنا لمعرفة أحدث العروض" }
    },
    "contact": {
      "form": { "fields": ["name", "phone", "message"] },
      "whatsapp": { "enabled": true, "number": "0100-000-0000" }
    },
    "notFound": { "titleAr": "الصفحة غير موجودة", "cta": { "labelAr": "العودة للصفحة الرئيسية", "to": "/" } }
  },
  "motion": {
    "durationMs": { "fast": 120, "base": 240, "slow": 400 },
    "easing": { "inOut": "cubic-bezier(0.4,0,0.2,1)" },
    "revealOnScroll": true,
    "hoverScale": 1.02
  },
  "a11y": { "contrastMinimum": 4.5, "focusVisible": true, "skipToContent": true, "ariaLabelsLanguageAware": true },
  "differencesFromReference": [
    "Distinct saffron accent color and softer rounded radius",
    "Segmented category tabs instead of horizontal scroll chips",
    "Decorative Egyptian border under navbar only",
    "Price pill badge on menu cards",
    "Marquee offers strip on home"
  ]
}
