const countryToLocaleMap = {
  af: 'fa-AF', // Afghanistan
  al: 'sq-AL', // Albania
  dz: 'ar-DZ', // Algeria
  ar: 'es-AR', // Argentina
  am: 'hy-AM', // Armenia
  au: 'en-AU', // Australia
  at: 'de-AT', // Austria
  be: 'nl-BE', // Belgium
  br: 'pt-BR', // Brazil
  bg: 'bg-BG', // Bulgaria
  ca: 'en-CA', // Canada
  cl: 'es-CL', // Chile
  cn: 'zh-CN', // China
  co: 'es-CO', // Colombia
  hr: 'hr-HR', // Croatia
  cz: 'cs-CZ', // Czech Republic
  dk: 'da-DK', // Denmark
  eg: 'ar-EG', // Egypt
  ee: 'et-EE', // Estonia
  fi: 'fi-FI', // Finland
  fr: 'fr-FR', // France
  de: 'de-DE', // Germany
  gr: 'el-GR', // Greece
  hk: 'zh-HK', // Hong Kong
  hu: 'hu-HU', // Hungary
  is: 'is-IS', // Iceland
  in: 'hi-IN', // India
  id: 'id-ID', // Indonesia
  ie: 'en-IE', // Ireland
  il: 'he-IL', // Israel
  it: 'it-IT', // Italy
  jp: 'ja-JP', // Japan
  kr: 'ko-KR', // Korea
  lv: 'lv-LV', // Latvia
  lt: 'lt-LT', // Lithuania
  my: 'ms-MY', // Malaysia
  mx: 'es-MX', // Mexico
  ma: 'ar-MA', // Morocco
  nl: 'nl-NL', // Netherlands
  nz: 'en-NZ', // New Zealand
  no: 'nb-NO', // Norway
  pe: 'es-PE', // Peru
  ph: 'fil-PH', // Philippines
  pl: 'pl-PL', // Poland
  pt: 'pt-PT', // Portugal
  ro: 'ro-RO', // Romania
  ru: 'ru-RU', // Russia
  sa: 'ar-SA', // Saudi Arabia
  rs: 'sr-RS', // Serbia
  sg: 'en-SG', // Singapore
  sk: 'sk-SK', // Slovakia
  si: 'sl-SI', // Slovenia
  za: 'en-ZA', // South Africa
  es: 'es-ES', // Spain
  se: 'sv-SE', // Sweden
  ch: 'de-CH', // Switzerland
  tw: 'zh-TW', // Taiwan
  th: 'th-TH', // Thailand
  tr: 'tr-TR', // Turkey
  ua: 'uk-UA', // Ukraine
  ae: 'ar-AE', // United Arab Emirates
  gb: 'en-GB', // United Kingdom
  us: 'en-US', // United States
  uy: 'es-UY', // Uruguay
  ve: 'es-VE', // Venezuela
  vn: 'vi-VN', // Vietnam
}

export const convertToLocale = ({
  amount = 0,
  currency_code = 'EUR',
  country = 'fr-FR',
  minimumFractionDigits,
  maximumFractionDigits,
}: {
  amount?: number
  currency_code?: string
  country?: string | null
  minimumFractionDigits?: number
  maximumFractionDigits?: number
}) => {
  const locale = countryToLocaleMap[country as keyof typeof countryToLocaleMap]

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency_code,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount)
}
