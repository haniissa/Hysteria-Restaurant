export type MenuCategory = 'all' | 'shawarma' | 'burgers' | 'calzones' | 'sides' | 'drinks';

export interface MenuItem {
  id: string;
  name: string;
  arabicName: string;
  category: Exclude<MenuCategory, 'all'>;
  priceJod: number;
  tag: string;
  tagTone: 'yellow' | 'emerald' | 'orange' | 'red';
  mobileTag: string;
  description: string;
  perkIcon: string;
  perkText: string;
  mobilePerkText: string;
  imageUrl: string;
  isCore: boolean;
  customizable: boolean;
}

export interface ReviewItem {
  id: string;
  author: string;
  role: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AtmosphereCard {
  id: string;
  tag: string;
  tagTone: 'yellow' | 'emerald' | 'red';
  title: string;
  description: string;
  imageUrl: string;
  alt: string;
}

export const STORE_INFO = {
  brandName: 'HYSTERIA',
  arabicBrandName: 'هيستيريا',
  tagline: 'Crazy Taste • Est 2021 • Tabarbour',
  arabicHeadline: 'مطعم هيستيريا • طعم جنوني',
  phoneDisplay: '07 9069 9111',
  phoneIntl: '+962 7 9069 9111',
  phoneHref: 'tel:+962790699111',
  whatsappUrl: 'https://wa.me/962790699111',
  talabatUrl: 'https://www.talabat.com/jordan',
  careemUrl: 'https://www.careem.com',
  facebookUrl: 'https://www.facebook.com/hysteria.Shawarma.saj/',
  googleMapsUrl:
    'https://www.google.com/maps/place/Hysteria+Restaurant/@32.0031838,35.9367986,771m/data=!3m1!1e3!4m15!1m8!3m7!1s0x151b61b795197f5d:0xefe9ac91c5a5c9a2!2sHysteria+Restaurant!8m2!3d32.0031838!4d35.9367986!10e5!16s%2Fg%2F11rcxcjvvv!3m5!1s0x151b61b795197f5d:0xefe9ac91c5a5c9a2!8m2!3d32.0031838!4d35.9367986!16s%2Fg%2F11rcxcjvvv',
  addressShort: 'Tabarbour Commercial Area, Tariq, Amman',
  addressFull: 'Tabarbour Commercial Strip, Tariq District, Amman, Jordan',
  landmark: 'Near Tariq Mall & Queen Alia Hospital Area',
  coordinates: '32.0032° N, 35.9368° E',
  rating: 4.4,
  priceRange: '1 - 5 JOD',
  hoursStandard: '11:00 AM – 4:00 AM',
  hoursTuesday: '11:30 AM – 4:00 AM',
  images: {
    storefront:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCDUvfHVoirJ9bpgfyYK7tNKi0ocifRVDBCMhOIQuE6sYtMDCkZFwZ61M2uAgFN4r8qMq_niKEV7UYKbUuysnfBl-MrmuQgIxpKE5cCUcsn9NHQbJIHjl73OPr03GEM3n4tN8gAMkDpChr2MyyOEMk3MM7Tx7jgbZMyvJPHJeEoTx9s5UoE9yE_5s_ZEWXdkvvRpqIzO73C-edWzNuSQm3ZVLxaVRbcMEEzZioj4e60oNXgfEZIXYdi',
    michiganBurger:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDwiMqLUolodg1RVR0svFX18p_1ysSnIq-oj3xYADwxhhmTLi6Tul2tNfHEx3fCTo9Zw9Agdwq0XNM2dA2LY_RdsTRWZjWylaB4ZiichHIiFw9bpwQoJTiuF8YN_TxqWs_sFT1JkyPopUm3ZFbHcEksTcBhOnf53NqBXlENDtqZvi2iHqzHhaOsrJl0224MhUm4V8Jwv4z9QorCjH4l3_8FRJZV7UxyLYlqfgi4_3neRcXe-YbUQZZ0',
    happyCustomer:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDu2-ca0EkOHi2uHz0WX-IlXr_P4i88TMJRY4lF64qpTuSXFOd04pqeR-yyTsnkn56Xke9mzwd8ogpbd24FViHTANtSEAlixhUj-qDpM2nYo1j2BgteFN2WZNKXvTFquzlty0H_dRVtwtUQz7bGTGYiAzArlT6U1IythkwY0fJ4PGRRdL8At2nNNfu_FNrV8KGLzjgsHcaZxedKQlDzp37AT0mR_RZw-AWg5asFZwEFVsFFDk7i-JUp',
    superSaj:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC8ghVM60aHL0jGcEL__7DHkSEC3qfTolYnKPXdw3NPqnRHhxZC0cVWCJ9bn1eDiTkbSX-03huwXUjkNs9eOlB0tH5NIfUDZLJWR6Iuu9Km6l7j1ENzfvizLqSXOET5BrpvEb2PNN2r-L1lZ9OMnfNzFocHv1fPwr3x9oU8jYVk4NG30ADHgZWMSKxeYZu071Pl-QxlbcjOmen88y6-GyW6kBNVa1IRKskGm0Q7Ztd4MLAtWX26fT50',
    shawarmaPockets:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDSKBFfW7oMrpvoEBak1CxPAqx-IbqXRGAvVyCUpyJsY12JJVswJ6x6AstSco8tCDJx7oy48b3eVPwLR3HEMKKXxVn3Jlap7IiiudjTSH8AB-kiQH75rp0XDr2KiNEsDwY4hRaKpa-MjPM6xT1rR36eZPxksB-JDjCodvtzkpNS6OSUhT6sJz99qG4fxoo_MXTgxZclSsqa8FtlzuaUhYHb7UeJB9u_S8KQdz8RHx0hNJPU7GDeBnq7',
    miniSaj:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDZQt21bSFExDqIEddi0s8Ji-B-erqV3oef8LBIKKOmV25szjV9Ep6MjGIPGHvppJo5Kd5SDh3Bt7vserP0uT8kd9DZB7X_IP_vH6_-jJ_j4keZFWi19LD9O7e9Vq3tcWKwMbRL_0d7iqMapsGBJcl2NzBoqkOJqvmEQvmeDY2I8YGyi-K8YHITdo_0LkQkzEHGNh3eHVegFFWRp3g6YN6as_5aTsj_BPHQMoPa0XWNfgDWGAUi0NGr',
    doubleSmash:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCX1XCoYX9Udy3OqCewROZVtoXs1qv3k4y4z7voJmQXRlBixiXw_kQgbEucXniohbU8ivmI4_xq9a92kNtl4REctodixvGHjF64S-yXe9YkGk3ZheP72C31rIME1eB5J7N1scobGxWxRcPdyL6Sd_I1Uc9DFFzIDx2XDpzvFH0LTmhcjXv-Xvuwst_yBmOobfpLfOVPafJfshCHhsiqZZl9Ds92CT4RxxMunGtsTpRo8qv-azPH3Wqc',
    calzoneHero:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDhhE1J-w9990oPPgP3bnl7ja9pxY84XrAkuwbbEavQ9uZAn8P5imoh9m2fEc2gWfVY8NOHfFemZ5qF5jo7jdG8h91G2f3p4cRGtsw9IK80ENCk9vNb6tM35AhaWhgTMI3JUg_QHVfUSYzw-hIpt8WVoHnxevGmtUhds9ObQSY2AETHRzPNuOBRQSVpHH1Bp7w-gI7o4A80U2gXWDqT1kIfxdX7DykKAmo5Yr2fWekXO0fpjEGcDgXq',
    calzoneMobile:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD1WLMjVywZTnFdghmfPKBDJGBFK-kIEALZPN9HLmMvr1z5GNFVd1mUUUVg3sH16Dcsb-HxrpVnhB-cAUC0GRxtIVLluIsx_erf2rzDAg57c5PheBCDhliiOU-LXZyjrVIUlhhKRSFV2Pz8kM_qcscqP9E9eiufZG6nj6uA5n6biLJu0VqjHaUDOdmjAuFDqkIFJqGv0yPq0i24dgml8lxNKktc8o7mleaYJ2A8APaXoU67CtDVDo__',
    murals:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNjhGHaRqAvFyBVPXVrwhJjuAOvuduL-68KwLS5ckNxt4NJqKRtqCKsW23AmXb0c95E-WguuSrmr5fbPYPYqyPiIDGIaOs7-9fmEaEFaUYLrNrgem4iq0dmi6Pc4Zmem-DYLnAUTvK9FJuR8U_h0DitDJwjeFR_Csn3Pq0mcsUJpZO3NCwowjBifexSPAXVFVfO8mlH3cLBkF8RjqvFmMsUWMHjgO5PWuALIyE4wA76sEkF9oAZpJR',
    tableSpread:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCngHPnlOrX2WRJaC7Nfux5UVOZQjkBofsTT4H6KsZF-roAM9fLw9gT11yLoG9sPCrHGPqvEEn1A2GZQRryziaCcZu2J0cZmX1AU5UBKCpC1xlNQ9JJVBgbO5o9kLED_1axpSTwMasEPy4Q0YxJEsp76ths1Pub88y5UOcTLWuJhrMeKX_eRhDwEcXkhrpgPZElylPwQt0imvGCaC_r225vunJIQ3iM6jdrZNg9rnRVJQzAV7Q-dWlc',
    tabarbourMap:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA_dAaV2u1QELOTgkm9is1PnzkMRmvyFSW-0DehOSEA52OEMk0HgVAJVQbOkigt5qkE6nM-oYvabr95RQQuB6uqZA1SvIssDYLcjXt-2yWBBv3uoVWckRMyx1YtYy2mBw6sI5Wr--3RV71hBRR5EFCAVsB0NzWLNmHWiVIRhNUI-WHbOciPid36iWuMugpzjjw-eIpoE7HQyv9hd6kttszbiH5tts7-ogsyugu809E',
  },
} as const;

export const MENU_CATALOG: MenuItem[] = [
  {
    id: 'michigan-mushroom-burger',
    name: 'Michigan Mushroom Burger',
    arabicName: 'منشيغان ماشروم',
    category: 'burgers',
    priceJod: 3.5,
    tag: 'Signature Burger',
    tagTone: 'yellow',
    mobileTag: 'MUST TRY BURGER',
    description:
      'Juicy smashed beef patty, caramelized sautéed mushrooms, melted American & Swiss cheese, crisp battered onion ring, fresh tomato, pickles, and Hysteria secret burger sauce in toasted brioche.',
    perkIcon: 'done_all',
    perkText: 'Includes Seasoned Fries',
    mobilePerkText: 'Beef Smash',
    imageUrl: STORE_INFO.images.michiganBurger,
    isCore: true,
    customizable: true,
  },
  {
    id: 'super-saj-shawarma-platter',
    name: 'Super Saj Shawarma Platter',
    arabicName: 'وجبة شاورما صاج سوبر',
    category: 'shawarma',
    priceJod: 3.0,
    tag: 'Tabarbour Favorite',
    tagTone: 'emerald',
    mobileTag: 'TABARBOUR FAVORITE',
    description:
      'Fire-roasted marinated chicken sliced into crisp grilled saj rolls, served with a mountain of golden spiced street fries, rich garlic toum dip, wild cucumber pickles, and hot peppers.',
    perkIcon: 'local_dining',
    perkText: 'Garlic Dip & Pickles',
    mobilePerkText: 'Chicken Saj',
    imageUrl: STORE_INFO.images.superSaj,
    isCore: true,
    customizable: true,
  },
  {
    id: 'shawarma-pockets-basket',
    name: 'Shawarma Pockets Basket',
    arabicName: 'جيوب شاورما بالخبز الطازج',
    category: 'shawarma',
    priceJod: 2.75,
    tag: 'Fresh Pocket Bread',
    tagTone: 'orange',
    mobileTag: 'POCKET SPECIAL',
    description:
      'Three freshly baked stone-oven flatbread pockets overflowing with spiced chicken shawarma, garlic cream, seasoned fries, and a fresh arugula & pomegranate side.',
    perkIcon: 'bakery_dining',
    perkText: 'Fresh Baked Pockets',
    mobilePerkText: '4 Pockets',
    imageUrl: STORE_INFO.images.shawarmaPockets,
    isCore: true,
    customizable: true,
  },
  {
    id: 'mini-saj-party-platter',
    name: 'Mini Saj Party Platter',
    arabicName: 'صينية ميني صاج هيستيريا',
    category: 'shawarma',
    priceJod: 4.5,
    tag: 'Crew Favorite',
    tagTone: 'yellow',
    mobileTag: 'SHARING COMBO',
    description:
      'Six stuffed mini saj rolls (chicken and spiced beef), toasted on the iron griddle, drizzled with garlic toum and tart pomegranate molasses in our custom wrap paper.',
    perkIcon: 'group',
    perkText: 'Perfect for Sharing',
    mobilePerkText: 'Group Snack',
    imageUrl: STORE_INFO.images.miniSaj,
    isCore: true,
    customizable: true,
  },
  {
    id: 'double-smashed-street-burger',
    name: 'Double Smashed Street Burger',
    arabicName: 'دبل سماش برجر',
    category: 'burgers',
    priceJod: 3.25,
    tag: 'Double Smash',
    tagTone: 'yellow',
    mobileTag: 'DOUBLE PATTY',
    description:
      'Two crispy-edged smashed beef patties, double melted cheddar, grilled onions, crunchy pickles, crisp lettuce, and signature spicy crazy sauce on a buttered bun.',
    perkIcon: 'fastfood',
    perkText: 'High Beef Crisp Edge',
    mobilePerkText: 'High Sizzle',
    imageUrl: STORE_INFO.images.doubleSmash,
    isCore: true,
    customizable: true,
  },
  {
    id: 'stuffed-calzone-cheese-melt',
    name: 'Stuffed Calzone & Cheese Melt',
    arabicName: 'كالزوني الجبنة الجنوني',
    category: 'calzones',
    priceJod: 4.0,
    tag: 'Crazy Cheese Pull',
    tagTone: 'emerald',
    mobileTag: 'MEGA CHEESE PULL',
    description:
      'Stone-baked folded crust packed with strings of molten mozzarella, seasoned shawarma strips or spiced beef, herbs, garlic butter glaze, and a side of loaded fries.',
    perkIcon: 'lunch_dining',
    perkText: '100% Mozzarella Pull',
    mobilePerkText: 'Oven Baked',
    imageUrl: STORE_INFO.images.calzoneHero,
    isCore: true,
    customizable: true,
  },
  {
    id: 'spicy-dynamite-potatoes',
    name: 'Spicy Dynamite Potatoes',
    arabicName: 'بطاطا ديناميت حارة',
    category: 'sides',
    priceJod: 1.5,
    tag: 'Counter Hit',
    tagTone: 'orange',
    mobileTag: 'SPICY SIDE',
    description:
      'Crispy skin-on spiced street fries tossed in smoky paprika, drizzled with Hysteria spicy dynamite glaze and melted cheddar sauce.',
    perkIcon: 'local_fire_department',
    perkText: 'Crispy Spiced Cut',
    mobilePerkText: 'Loaded Fries',
    imageUrl: STORE_INFO.images.tableSpread,
    isCore: false,
    customizable: false,
  },
  {
    id: 'extra-garlic-toum',
    name: 'Extra Garlic Toum Dip',
    arabicName: 'ثومية هيستيريا إضافية',
    category: 'sides',
    priceJod: 0.35,
    tag: 'House Sauce',
    tagTone: 'yellow',
    mobileTag: 'SIGNATURE DIP',
    description:
      'Whipped Levantine garlic toum made fresh every morning with lemon and cold-pressed oil — the essential partner for every saj roll.',
    perkIcon: 'soup_kitchen',
    perkText: 'Whipped Daily',
    mobilePerkText: 'Garlic Dip',
    imageUrl: STORE_INFO.images.superSaj,
    isCore: false,
    customizable: false,
  },
  {
    id: 'sinalco-ice-cold-can',
    name: 'Sinalco Ice Cold Can',
    arabicName: 'سينالكو بارد مثلج',
    category: 'drinks',
    priceJod: 0.5,
    tag: 'Ice Cold',
    tagTone: 'emerald',
    mobileTag: 'CHILLED CAN',
    description:
      'Straight from our sub-zero street cooler — classic Sinalco Cola or Orange served ice cold alongside your shawarma or smash burger.',
    perkIcon: 'local_cafe',
    perkText: 'Served Ice Cold',
    mobilePerkText: '330ml Can',
    imageUrl: STORE_INFO.images.tableSpread,
    isCore: false,
    customizable: false,
  },
];

export const ATMOSPHERE_CARDS: AtmosphereCard[] = [
  {
    id: 'murals',
    tag: 'Graffiti & Art Booths',
    tagTone: 'yellow',
    title: 'Iconic Pop-Art Wall Murals',
    description:
      'Our legendary wood-and-brick booths styled with bold street art. Perfect backdrop for your food photos.',
    imageUrl: STORE_INFO.images.murals,
    alt: 'Pop-art wall murals inside Hysteria restaurant',
  },
  {
    id: 'crowd',
    tag: 'Street Crowd & Takeout',
    tagTone: 'emerald',
    title: 'High Energy Street Gathering',
    description:
      'First-come, first-served counter. Order inside or chill in the outdoor seating area with friends.',
    imageUrl: STORE_INFO.images.happyCustomer,
    alt: 'Happy customer with Hysteria packaging outside the restaurant',
  },
  {
    id: 'feast',
    tag: 'The Full Feast',
    tagTone: 'red',
    title: 'Loaded Wrap Paper Spreads',
    description:
      'Every meal served fresh on branded Hysteria newsprint paper with ice-cold Sinalco and signature sauces.',
    imageUrl: STORE_INFO.images.tableSpread,
    alt: 'Full dine-in table spread at Hysteria with burgers, saj shawarma and drinks',
  },
];

export const INITIAL_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-ahmad-k',
    author: 'Ahmad K.',
    role: 'Tabarbour Local',
    rating: 5,
    comment:
      'The Michigan Mushroom burger is one of the best smash burgers in East Amman, hands down. That onion ring crunch with the mushroom gravy is unbelievable for 3.5 JOD!',
    createdAt: '2025-02-14T22:15:00.000Z',
  },
  {
    id: 'rev-yousef-m',
    author: 'Yousef M.',
    role: 'Late-Night Regular',
    rating: 4.5,
    comment:
      'Life saver at 3:00 AM after late work shifts. The super chicken saj is rolled tight, toasted golden, and their toum has real kick. Fast service every time.',
    createdAt: '2025-02-20T03:10:00.000Z',
  },
  {
    id: 'rev-dana-s',
    author: 'Dana S.',
    role: 'Order via Talabat',
    rating: 5,
    comment:
      'The calzone cheese stretch is crazy like in their videos. Super friendly crew, awesome hip-hop background tunes, and easy parking right out front on the street.',
    createdAt: '2025-03-01T21:40:00.000Z',
  },
];
