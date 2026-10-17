"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type CurrencyCode = "USD" | "EUR" | "BRL" | "GBP" | "IDR" | "INR" | "NGN" | "RUB" | "TRY";
type LanguageCode = "EN" | "ID";

export const currencies = [
  { label: "USD ($)", code: "USD", symbol: "$", rate: 0.000064 },
  { label: "EUR (€)", code: "EUR", symbol: "€", rate: 0.000059 },
  { label: "BRL (R$)", code: "BRL", symbol: "R$", rate: 0.00032 },
  { label: "GBP (£)", code: "GBP", symbol: "£", rate: 0.000050 },
  { label: "IDR (Rp)", code: "IDR", symbol: "Rp", rate: 1 },
  { label: "INR (₹)", code: "INR", symbol: "₹", rate: 0.0053 },
  { label: "NGN (₦)", code: "NGN", symbol: "₦", rate: 0.098 },
  { label: "RUB (₽)", code: "RUB", symbol: "₽", rate: 0.0059 },
  { label: "TRY (₺)", code: "TRY", symbol: "₺", rate: 0.0020 },
];

export const languages = [
  { label: "English", code: "EN", flagUrl: "https://flagcdn.com/w20/us.png" },
  { label: "Indonesia", code: "ID", flagUrl: "https://flagcdn.com/w20/id.png" },
  { label: "Español", code: "ES", flagUrl: "https://flagcdn.com/w20/es.png" },
  { label: "Français", code: "FR", flagUrl: "https://flagcdn.com/w20/fr.png" },
  { label: "Türkçe", code: "TR", flagUrl: "https://flagcdn.com/w20/tr.png" },
  { label: "العربية", code: "AR", flagUrl: "https://flagcdn.com/w20/sa.png" }
];

export const countries = [
  "Global",
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Argentina",
  "Australia",
  "Austria",
  "Bahamas",
  "Bangladesh",
  "Belgium",
  "Brazil",
  "Canada",
  "China",
  "Colombia",
  "Denmark",
  "Egypt",
  "Finland",
  "France",
  "Germany",
  "Greece",
  "India",
  "Indonesia",
  "Italy",
  "Japan",
  "Malaysia",
  "Mexico",
  "Netherlands",
  "New Zealand",
  "Nigeria",
  "Norway",
  "Philippines",
  "Poland",
  "Portugal",
  "Russia",
  "Saudi Arabia",
  "Singapore",
  "South Africa",
  "South Korea",
  "Spain",
  "Sweden",
  "Switzerland",
  "Thailand",
  "Turkey",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Vietnam"
];

export const countryStates: Record<string, string[]> = {
  "Afghanistan": ["Badakhshan", "Badghis", "Baghlan", "Balkh", "Bamyan", "Daykundi", "Farah", "Faryab", "Ghazni", "Kabul"],
  "Albania": ["Berat", "Dibër", "Durrës", "Elbasan", "Fier", "Gjirokastër", "Korçë", "Kukës", "Lezhë", "Shkodër", "Tirana", "Vlorë"],
  "Algeria": ["Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", "Blida", "Bouira", "Algiers"],
  "American Samoa": ["Eastern", "Manu'a", "Rose Island", "Swains Island", "Western"],
  "Andorra": ["Canillo", "Encamp", "Ordino", "La Massana", "Andorra la Vella", "Sant Julià de Lòria", "Escaldes-Engordany"],
  "Angola": ["Bengo", "Benguela", "Bié", "Cabinda", "Cuando Cubango", "Cuanza Norte", "Cuanza Sul", "Cunene", "Huambo", "Huíla", "Luanda"],
  "Argentina": ["Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "Mendoza", "Salta"],
  "Australia": ["New South Wales", "Victoria", "Queensland", "Western Australia", "South Australia", "Tasmania"],
  "Austria": ["Burgenland", "Carinthia", "Lower Austria", "Salzburg", "Styria", "Tyrol", "Upper Austria", "Vienna", "Vorarlberg"],
  "Bahamas": ["Acklins", "Berry Islands", "Bimini", "Black Point", "Cat Island", "Central Abaco", "Central Andros", "Eleuthera", "Exuma", "Freeport"],
  "Bangladesh": ["Barisal", "Chittagong", "Dhaka", "Khulna", "Mymensingh", "Rajshahi", "Rangpur", "Sylhet"],
  "Belgium": ["Antwerp", "East Flanders", "Flemish Brabant", "Hainaut", "Liège", "Limburg", "Luxembourg", "Namur", "Walloon Brabant", "Brussels"],
  "Brazil": ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Minas Gerais", "Pará", "Rio de Janeiro", "São Paulo"],
  "Canada": ["Alberta", "British Columbia", "Manitoba", "New Brunswick", "Newfoundland and Labrador", "Nova Scotia", "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan"],
  "China": ["Anhui", "Beijing", "Chongqing", "Fujian", "Gansu", "Guangdong", "Guangxi", "Guizhou", "Hainan", "Hebei", "Henan", "Hubei", "Jiangsu", "Shanghai", "Zhejiang"],
  "Colombia": ["Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Bogotá"],
  "Denmark": ["Capital Region", "Central Denmark Region", "North Denmark Region", "Region Zealand", "Region of Southern Denmark"],
  "Egypt": ["Alexandria", "Aswan", "Asyut", "Beheira", "Beni Suef", "Cairo", "Dakahlia", "Damietta", "Faiyum", "Gharbia", "Giza", "Luxor"],
  "Finland": ["Åland Islands", "Central Finland", "Central Ostrobothnia", "Kainuu", "Kymenlaakso", "Lapland", "North Karelia", "North Savo", "Ostrobothnia", "Pirkanmaa", "Uusimaa"],
  "France": ["Auvergne-Rhône-Alpes", "Bourgogne-Franche-Comté", "Brittany", "Centre-Val de Loire", "Corsica", "Grand Est", "Hauts-de-France", "Île-de-France", "Normandy", "Nouvelle-Aquitaine", "Occitanie"],
  "Germany": ["Baden-Württemberg", "Bavaria", "Berlin", "Brandenburg", "Bremen", "Hamburg", "Hesse", "Lower Saxony", "Mecklenburg-Vorpommern", "North Rhine-Westphalia", "Saxony", "Thuringia"],
  "Greece": ["Attica", "Central Greece", "Central Macedonia", "Crete", "Eastern Macedonia and Thrace", "Epirus", "Ionian Islands", "North Aegean", "Peloponnese", "South Aegean", "Thessaly"],
  "India": ["Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Punjab", "Rajasthan", "Tamil Nadu", "Uttar Pradesh", "West Bengal"],
  "Indonesia": ["Bali", "Banten", "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Kalimantan Timur", "Papua", "Sulawesi Selatan", "Sumatera Utara", "DI Yogyakarta"],
  "Italy": ["Abruzzo", "Aosta Valley", "Apulia", "Basilicata", "Calabria", "Campania", "Emilia-Romagna", "Friuli Venezia Giulia", "Lazio", "Liguria", "Lombardy", "Piedmont", "Sardinia", "Sicily", "Tuscany", "Veneto"],
  "Japan": ["Aichi", "Chiba", "Fukuoka", "Hokkaido", "Hyogo", "Kanagawa", "Kyoto", "Osaka", "Saitama", "Tokyo", "Okinawa"],
  "Malaysia": ["Johor", "Kedah", "Kelantan", "Malacca", "Negeri Sembilan", "Pahang", "Penang", "Perak", "Perlis", "Sabah", "Sarawak", "Selangor", "Terengganu", "Kuala Lumpur"],
  "Mexico": ["Aguascalientes", "Baja California", "Campeche", "Chiapas", "Chihuahua", "Coahuila", "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Mexico City", "Nuevo León", "Yucatán"],
  "Netherlands": ["Drenthe", "Flevoland", "Friesland", "Gelderland", "Groningen", "Limburg", "North Brabant", "North Holland", "Overijssel", "South Holland", "Utrecht", "Zeeland"],
  "New Zealand": ["Auckland", "Bay of Plenty", "Canterbury", "Gisborne", "Hawke's Bay", "Manawatu-Wanganui", "Marlborough", "Nelson", "Northland", "Otago", "Southland", "Taranaki", "Waikato", "Wellington"],
  "Nigeria": ["Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", "Delta", "Edo", "Enugu", "Kano", "Lagos", "Rivers", "Abuja"],
  "Norway": ["Agder", "Innlandet", "Møre og Romsdal", "Nordland", "Oslo", "Rogaland", "Troms og Finnmark", "Trøndelag", "Vestfold og Telemark", "Vestland", "Viken"],
  "Philippines": ["Metro Manila", "Cebu", "Davao", "Iloilo", "Cavite", "Laguna", "Batangas", "Rizal", "Quezon", "Bulacan", "Pampanga", "Zambales"],
  "Poland": ["Greater Poland", "Kuyavian-Pomeranian", "Lesser Poland", "Łódź", "Lower Silesian", "Lublin", "Lubusz", "Masovian", "Opole", "Podkarpackie", "Podlaskie", "Pomeranian", "Silesian"],
  "Portugal": ["Alentejo", "Algarve", "Azores", "Centro", "Lisbon", "Madeira", "Norte"],
  "Russia": ["Moscow", "Saint Petersburg", "Novosibirsk", "Yekaterinburg", "Nizhny Novgorod", "Kazan", "Chelyabinsk", "Omsk", "Samara", "Rostov-on-Don", "Ufa", "Krasnoyarsk"],
  "Saudi Arabia": ["Al Bahah", "Al Jawf", "Al Madinah", "Al Qassim", "Asir", "Eastern Province", "Ha'il", "Jizan", "Makkah", "Najran", "Northern Borders", "Riyadh", "Tabuk"],
  "Singapore": ["Central Region", "East Region", "North Region", "North-East Region", "West Region"],
  "South Africa": ["Eastern Cape", "Free State", "Gauteng", "KwaZulu-Natal", "Limpopo", "Mpumalanga", "North West", "Northern Cape", "Western Cape"],
  "South Korea": ["Busan", "Daegu", "Daejeon", "Gwangju", "Incheon", "Seoul", "Ulsan", "Gyeonggi", "Gangwon", "Jeju"],
  "Spain": ["Andalusia", "Aragon", "Asturias", "Balearic Islands", "Basque Country", "Canary Islands", "Cantabria", "Castile and León", "Castile-La Mancha", "Catalonia", "Extremadura", "Galicia", "Madrid", "Murcia", "Navarre", "La Rioja", "Valencian Community"],
  "Sweden": ["Blekinge", "Dalarna", "Gävleborg", "Gotland", "Halland", "Jämtland", "Jönköping", "Kalmar", "Kronoberg", "Norrbotten", "Örebro", "Östergötland", "Skåne", "Stockholm", "Uppsala", "Värmland", "Västerbotten", "Västernorrland", "Västmanland", "Västra Götaland"],
  "Switzerland": ["Aargau", "Appenzell Ausserrhoden", "Appenzell Innerrhoden", "Basel-Landschaft", "Basel-Stadt", "Bern", "Fribourg", "Geneva", "Glarus", "Graubünden", "Jura", "Lucerne", "Neuchâtel", "Nidwalden", "Obwalden", "Schaffhausen", "Schwyz", "Solothurn", "St. Gallen", "Thurgau", "Ticino", "Uri", "Valais", "Vaud", "Zug", "Zurich"],
  "Thailand": ["Bangkok", "Chiang Mai", "Chiang Rai", "Chonburi", "Khon Kaen", "Nakhon Ratchasima", "Phuket", "Songkhla", "Surat Thani", "Udon Thani"],
  "Turkey": ["Adana", "Ankara", "Antalya", "Bursa", "Diyarbakır", "Erzurum", "Gaziantep", "Istanbul", "Izmir", "Kayseri", "Konya", "Mersin", "Trabzon", "Şanlıurfa"],
  "United Arab Emirates": ["Abu Dhabi", "Ajman", "Dubai", "Fujairah", "Ras Al Khaimah", "Sharjah", "Umm Al Quwain"],
  "United Kingdom": ["England", "Northern Ireland", "Scotland", "Wales"],
  "United States": ["California", "Texas", "Florida", "New York", "Illinois", "Pennsylvania", "Ohio", "Georgia", "North Carolina", "Michigan", "New Jersey", "Virginia", "Washington", "Arizona", "Massachusetts"],
  "Vietnam": ["Hanoi", "Ho Chi Minh City", "Da Nang", "Hai Phong", "Can Tho", "An Giang", "Ba Ria - Vung Tau", "Bac Giang", "Bac Ninh", "Binh Duong", "Dong Nai", "Khanh Hoa", "Quang Ninh", "Thanh Hoa", "Thua Thien Hue"]
};

export const translations = {
  EN: {
    contact: "Contact",
    sell_on_modesy: "Sell on Modesy",
    location: "Location",
    login: "Login",
    register: "Register",
    my_account: "My Account",
    search_placeholder: "Search for products, categories or brands",
    cart: "Cart",
    wishlist: "Wishlist",
    sell_now: "Sell Now",
    hero_title: "Find Backpacks That Best Suit You",
    shop_by_category: "Shop By Category",
    view_all: "View All",
    special_offers: "Special Offers",
    featured_products: "Featured Products",
    new_arrivals: "New Arrivals",
    load_more: "Load More",
    categories_title: "Categories",
    categories: {
      clothing: "Clothing",
      shoes: "Shoes",
      home_living: "Home & Living",
      jewelry: "Jewelry & Accessories",
      toys: "Toys & Entertainment",
      graphics: "Graphics & Photos",
      video_audio: "Video & Audio",
      web_templates: "Web Templates & Code",
      womens_clothing: "Women's Clothing",
      mens_clothing: "Men's Clothing",
      furniture: "Furniture",
      necklaces: "Necklaces & Accessories",
      painting: "Painting",
      boots: "Boots",
      decorative_pillows: "Decorative Pillows",
      handbags: "Handbags"
    },
    products: {
      animal_prints: "Animal colorful digital prints",
      summer_top: "Summer fashion top lace",
      lace_blouse: "Women lace blouse with different colors",
      floral_sundress: "Floral women sundress",
      floral_sundress_2: "Floral women sundress",
      gucci_backpack: "Gucci nylon fabric smart backpack",
      black_midi_skirt: "Black midi skirt with white flowers",
      decorative_pillow: "Handcrafted decorative pillow for a luxurious...",
      decorative_pillow_2: "Handcrafted decorative pillow for a luxurious...",
      sun_hat: "Sun hat for women protection cap",
      sneaker_shoes: "Sneaker shoes men",
      kipling_handbag: "Women kipling bailey saddle handbag",
      cobalt_tshirt: "Cobalt man t-shirt all colors",
      animal_photo: "Adorable animals photo pack",
      piano_music: "Moment of inspiration piano music",
      vacation_spots: "Animation of popular vacation spots",
      light_blue_shirt: "Light blue women shirt",
      summer_top_2: "Summer fashion top lace",
      scarves: "Colorful women scarves",
      ankle_boot: "Women's ankle boot with different colors",
      navy_polka_dress: "Navy polka dot dress",
      modern_couch: "Modern grey couch and pillows",
      black_backpack: "Black fashion women backpack"
    },
    summer_promo: "Summer",
    summer_desc: "Choose your style, make your summer.",
    discount: "DISCOUNT",
    autumn_sale: "Autumn Sale",
    limited_time: "Limited Time",
    off: "OFF",
    request_quote: "Request a Quote",
    free: "Free",
    footer_desc: "Modesy is a modern e-commerce marketplace where buyers and sellers connect with ease. Whether you are looking to shop for unique items or grow your business by selling online, Modesy is here to help you every step of the way.",
    newsletter_desc: "Join our subscribers list to get the latest news, updates and special offers directly in your inbox",
    enter_email: "Enter your email",
    subscribe: "Subscribe",
    quick_links: "Quick Links",
    information: "Information",
    home: "Home",
    blog: "Blog",
    shops: "Shops",
    help_center: "Help Center",
    terms: "Terms & Conditions",
    about_us: "About Us",
    privacy: "Privacy Policy",
    cookie: "Cookie Policy",
    connect_with_google: "Connect with Google",
    or_register_with_email: "Or register with email",
    or_login_with_email: "Or login with email",
    first_name: "First Name",
    last_name: "Last Name",
    email_address: "Email Address",
    password: "Password",
    confirm_password: "Confirm Password",
    agree_to_terms: "I have read and agree to the",
    verifying: "Verifying...",
    success: "Success!",
    have_account: "Have an account?",
    dont_have_account: "Don't have an account?",
    forgot_password: "Forgot Password?",
  },
  ID: {
    contact: "Kontak",
    sell_on_modesy: "Jual di Modesy",
    location: "Lokasi",
    login: "Masuk",
    register: "Daftar",
    my_account: "Akun Saya",
    search_placeholder: "Cari produk, kategori, atau merek",
    cart: "Keranjang",
    wishlist: "Favorit",
    sell_now: "Jual Sekarang",
    hero_title: "Temukan Tas Ransel Paling Cocok Untukmu",
    shop_by_category: "Belanja Berdasarkan Kategori",
    view_all: "Lihat Semua",
    special_offers: "Penawaran Spesial",
    featured_products: "Produk Unggulan",
    new_arrivals: "Kedatangan Baru",
    load_more: "Muat Lebih Banyak",
    categories_title: "Kategori",
    categories: {
      clothing: "Pakaian",
      shoes: "Sepatu",
      home_living: "Rumah & Tempat Tinggal",
      jewelry: "Perhiasan & Aksesoris",
      toys: "Mainan & Hiburan",
      graphics: "Grafis & Foto",
      video_audio: "Video & Audio",
      web_templates: "Template Web & Kode",
      womens_clothing: "Pakaian Wanita",
      mens_clothing: "Pakaian Pria",
      furniture: "Mebel",
      necklaces: "Kalung & Aksesoris",
      painting: "Lukisan",
      boots: "Sepatu Bot",
      decorative_pillows: "Bantal Hias",
      handbags: "Tas Tangan"
    },
    products: {
      animal_prints: "Cetakan digital hewan berwarna-warni",
      summer_top: "Atasan renda fashion musim panas",
      lace_blouse: "Blus renda wanita dengan berbagai warna",
      floral_sundress: "Gaun motif bunga wanita",
      floral_sundress_2: "Gaun motif bunga wanita",
      gucci_backpack: "Tas ransel pintar kain nilon Gucci",
      black_midi_skirt: "Rok midi hitam motif bunga putih",
      decorative_pillow: "Bantal hias buatan tangan mewah...",
      decorative_pillow_2: "Bantal hias buatan tangan mewah...",
      sun_hat: "Topi pelindung matahari wanita",
      sneaker_shoes: "Sepatu kets pria",
      kipling_handbag: "Tas tangan pelana wanita kipling",
      cobalt_tshirt: "Kaos pria warna kobalt semua warna",
      animal_photo: "Koleksi foto hewan menggemaskan",
      piano_music: "Musik piano momen inspirasi",
      vacation_spots: "Animasi tempat liburan populer",
      light_blue_shirt: "Kemeja wanita biru muda",
      summer_top_2: "Atasan renda fashion musim panas",
      scarves: "Syal wanita berwarna-warni",
      ankle_boot: "Sepatu bot wanita berbagai warna",
      navy_polka_dress: "Gaun polkadot biru dongker",
      modern_couch: "Sofa dan bantal abu-abu modern",
      black_backpack: "Tas ransel fashion wanita hitam"
    },
    summer_promo: "Musim Panas",
    summer_desc: "Pilih gaya Anda, buat musim panas Anda.",
    discount: "DISKON",
    autumn_sale: "Promo Musim Gugur",
    limited_time: "Waktu Terbatas",
    off: "DISKON",
    request_quote: "Minta Penawaran",
    free: "Gratis",
    footer_desc: "Modesy adalah platform marketplace e-commerce modern tempat pembeli dan penjual terhubung dengan mudah. Baik Anda mencari barang unik maupun mengembangkan bisnis, Modesy hadir untuk membantu.",
    newsletter_desc: "Bergabunglah dengan daftar pelanggan kami untuk mendapatkan berita terbaru dan penawaran khusus.",
    enter_email: "Masukkan email Anda",
    subscribe: "Berlangganan",
    quick_links: "Tautan Cepat",
    information: "Informasi",
    home: "Beranda",
    blog: "Blog",
    shops: "Toko",
    help_center: "Pusat Bantuan",
    terms: "Syarat & Ketentuan",
    about_us: "Tentang Kami",
    privacy: "Kebijakan Privasi",
    cookie: "Kebijakan Cookie",
    connect_with_google: "Masuk dengan Google",
    or_register_with_email: "Atau daftar dengan email",
    or_login_with_email: "Atau masuk dengan email",
    first_name: "Nama Depan",
    last_name: "Nama Belakang",
    email_address: "Alamat Email",
    password: "Kata Sandi",
    confirm_password: "Konfirmasi Kata Sandi",
    agree_to_terms: "Saya telah membaca dan menyetujui",
    verifying: "Memverifikasi...",
    success: "Berhasil!",
    have_account: "Sudah punya akun?",
    dont_have_account: "Belum punya akun?",
    forgot_password: "Lupa Kata Sandi?",
  },
  ES: {
    contact: "Contacto",
    sell_on_modesy: "Vender en Modesy",
    location: "Ubicación",
    login: "Acceder",
    register: "Registro",
    my_account: "Mi Cuenta",
    search_placeholder: "Buscar productos, categorías o marcas",
    cart: "Carrito",
    wishlist: "Deseados",
    sell_now: "Vender Ahora",
    hero_title: "Encuentra mochilas que mejor se adapten a ti",
    shop_by_category: "Comprar Por Categoría",
    view_all: "Ver Todo",
    special_offers: "Ofertas Especiales",
    featured_products: "Productos Destacados",
    new_arrivals: "Nuevas Llegadas",
    load_more: "Cargar Más",
    categories_title: "Categorías",
    categories: {
      clothing: "Ropa",
      shoes: "Zapatos",
      home_living: "Hogar y Vida",
      jewelry: "Joyería y Accesorios",
      toys: "Juguetes y Entretenimiento",
      graphics: "Gráficos y Fotos",
      video_audio: "Video y Audio",
      web_templates: "Plantillas Web y Código",
      womens_clothing: "Ropa de Mujer",
      mens_clothing: "Ropa de Hombre",
      furniture: "Muebles",
      necklaces: "Collares y Accesorios",
      painting: "Pintura",
      boots: "Botas",
      decorative_pillows: "Cojines Decorativos",
      handbags: "Bolsos"
    },
    products: {
      animal_prints: "Estampados digitales coloridos de animales",
      summer_top: "Top de encaje de moda de verano",
      lace_blouse: "Blusa de encaje de mujer",
      floral_sundress: "Vestido de verano floral para mujer",
      floral_sundress_2: "Vestido de verano floral para mujer",
      gucci_backpack: "Mochila inteligente de nailon Gucci",
      black_midi_skirt: "Falda midi negra con flores blancas",
      decorative_pillow: "Cojín decorativo hecho a mano...",
      decorative_pillow_2: "Cojín decorativo hecho a mano...",
      sun_hat: "Sombrero de sol para mujer",
      sneaker_shoes: "Zapatillas para hombre",
      kipling_handbag: "Bolso de mujer kipling bailey saddle",
      cobalt_tshirt: "Camiseta de hombre cobalto",
      animal_photo: "Pack de fotos de animales adorables",
      piano_music: "Música de piano momento de inspiración",
      vacation_spots: "Animación de lugares de vacaciones",
      light_blue_shirt: "Camisa azul claro para mujer",
      summer_top_2: "Top de encaje de moda de verano",
      scarves: "Bufandas coloridas para mujer",
      ankle_boot: "Botín de mujer",
      navy_polka_dress: "Vestido azul marino a lunares",
      modern_couch: "Sofá y cojines grises modernos",
      black_backpack: "Mochila negra de moda para mujer"
    },
    summer_promo: "Verano",
    summer_desc: "Elige tu estilo, haz tu verano.",
    discount: "DESCUENTO",
    autumn_sale: "Venta de Otoño",
    limited_time: "Tiempo Limitado",
    off: "DESCUENTO",
    request_quote: "Pedir Cotización",
    free: "Gratis",
    footer_desc: "Modesy es un mercado de comercio electrónico.",
    newsletter_desc: "Únase a nuestra lista de suscriptores para recibir noticias.",
    enter_email: "Introduzca su correo",
    subscribe: "Suscribir",
    quick_links: "Enlaces",
    information: "Información",
    home: "Inicio",
    blog: "Blog",
    shops: "Tiendas",
    help_center: "Centro de Ayuda",
    terms: "Términos y Condiciones",
    about_us: "Sobre Nosotros",
    privacy: "Política de Privacidad",
    cookie: "Política de Cookies",
    connect_with_google: "Conectar con Google",
    or_register_with_email: "O regístrate con correo",
    or_login_with_email: "O iniciar sesión con correo",
    first_name: "Nombre",
    last_name: "Apellido",
    email_address: "Correo Electrónico",
    password: "Contraseña",
    confirm_password: "Confirmar Contraseña",
    agree_to_terms: "He leído y acepto los",
    verifying: "Verificando...",
    success: "¡Éxito!",
    have_account: "¿Tienes una cuenta?",
    dont_have_account: "¿No tienes una cuenta?",
    forgot_password: "¿Has olvidado tu contraseña?",
  },
  FR: {
    contact: "Contact",
    sell_on_modesy: "Vendre sur Modesy",
    location: "Emplacement",
    login: "Connexion",
    register: "S'inscrire",
    my_account: "Mon Compte",
    search_placeholder: "Rechercher des produits...",
    cart: "Panier",
    wishlist: "Favoris",
    sell_now: "Vendre",
    hero_title: "Trouvez les sacs à dos qui vous conviennent",
    shop_by_category: "Acheter par catégorie",
    view_all: "Voir tout",
    special_offers: "Offres Spéciales",
    featured_products: "Produits Vedettes",
    new_arrivals: "Nouveautés",
    load_more: "Charger plus",
    categories_title: "Catégories",
    categories: {
      clothing: "Vêtements",
      shoes: "Chaussures",
      home_living: "Maison",
      jewelry: "Bijoux",
      toys: "Jouets",
      graphics: "Graphiques",
      video_audio: "Vidéo & Audio",
      web_templates: "Web & Code",
      womens_clothing: "Femmes",
      mens_clothing: "Hommes",
      furniture: "Meubles",
      necklaces: "Colliers",
      painting: "Peinture",
      boots: "Bottes",
      decorative_pillows: "Coussins",
      handbags: "Sacs à main"
    },
    products: {
      animal_prints: "Impressions numériques d'animaux",
      summer_top: "Haut en dentelle d'été",
      lace_blouse: "Chemisier en dentelle",
      floral_sundress: "Robe d'été florale",
      floral_sundress_2: "Robe d'été florale",
      gucci_backpack: "Sac à dos Gucci en nylon",
      black_midi_skirt: "Jupe midi noire",
      decorative_pillow: "Coussin décoratif artisanal...",
      decorative_pillow_2: "Coussin décoratif artisanal...",
      sun_hat: "Chapeau de soleil",
      sneaker_shoes: "Baskets pour hommes",
      kipling_handbag: "Sac à main kipling",
      cobalt_tshirt: "T-shirt cobalt pour homme",
      animal_photo: "Pack photo d'animaux",
      piano_music: "Musique de piano",
      vacation_spots: "Lieux de vacances",
      light_blue_shirt: "Chemise bleu clair",
      summer_top_2: "Haut en dentelle d'été",
      scarves: "Écharpes colorées",
      ankle_boot: "Bottine pour femmes",
      navy_polka_dress: "Robe à pois bleu marine",
      modern_couch: "Canapé gris moderne",
      black_backpack: "Sac à dos de mode noir"
    },
    summer_promo: "Été",
    summer_desc: "Choisissez votre style.",
    discount: "RÉDUCTION",
    autumn_sale: "Vente d'automne",
    limited_time: "Temps limité",
    off: "RÉDUCTION",
    request_quote: "Devis",
    free: "Gratuit",
    footer_desc: "Modesy est un marché moderne.",
    newsletter_desc: "Abonnez-vous à notre liste.",
    enter_email: "Entrez votre email",
    subscribe: "S'abonner",
    quick_links: "Liens Rapides",
    information: "Information",
    home: "Accueil",
    blog: "Blog",
    shops: "Boutiques",
    help_center: "Aide",
    terms: "Conditions générales",
    about_us: "À propos",
    privacy: "Confidentialité",
    cookie: "Cookies",
    connect_with_google: "Se connecter avec Google",
    or_register_with_email: "Ou s'inscrire par email",
    or_login_with_email: "Ou se connecter par email",
    first_name: "Prénom",
    last_name: "Nom",
    email_address: "Adresse Email",
    password: "Mot de passe",
    confirm_password: "Confirmer le mot de passe",
    agree_to_terms: "J'ai lu et j'accepte les",
    verifying: "Vérification...",
    success: "Succès!",
    have_account: "Vous avez un compte?",
    dont_have_account: "Vous n'avez pas de compte?",
    forgot_password: "Mot de passe oublié?",
  },
  TR: {
    contact: "İletişim",
    sell_on_modesy: "Modesy'de Sat",
    location: "Konum",
    login: "Giriş Yap",
    register: "Kayıt Ol",
    my_account: "Hesabım",
    search_placeholder: "Ürün ara...",
    cart: "Sepet",
    wishlist: "Favoriler",
    sell_now: "Şimdi Sat",
    hero_title: "Sana en uygun çantayı bul",
    shop_by_category: "Kategoriye Göre Alışveriş",
    view_all: "Tümünü Gör",
    special_offers: "Özel Teklifler",
    featured_products: "Öne Çıkanlar",
    new_arrivals: "Yeni Gelenler",
    load_more: "Daha Fazla",
    categories_title: "Kategoriler",
    categories: {
      clothing: "Giyim",
      shoes: "Ayakkabı",
      home_living: "Ev & Yaşam",
      jewelry: "Takı & Aksesuar",
      toys: "Oyuncak",
      graphics: "Grafik",
      video_audio: "Video",
      web_templates: "Web",
      womens_clothing: "Kadın Giyim",
      mens_clothing: "Erkek Giyim",
      furniture: "Mobilya",
      necklaces: "Kolye",
      painting: "Tablo",
      boots: "Bot",
      decorative_pillows: "Yastık",
      handbags: "El Çantası"
    },
    products: {
      animal_prints: "Hayvan dijital baskılar",
      summer_top: "Yazlık dantel üst",
      lace_blouse: "Kadın dantel bluz",
      floral_sundress: "Çiçekli elbise",
      floral_sundress_2: "Çiçekli elbise",
      gucci_backpack: "Gucci akıllı sırt çantası",
      black_midi_skirt: "Siyah midi etek",
      decorative_pillow: "El yapımı dekoratif yastık...",
      decorative_pillow_2: "El yapımı dekoratif yastık...",
      sun_hat: "Kadın güneş şapkası",
      sneaker_shoes: "Erkek spor ayakkabı",
      kipling_handbag: "Kadın kipling el çantası",
      cobalt_tshirt: "Kobalt erkek tişört",
      animal_photo: "Sevimli hayvan fotoğraf paketi",
      piano_music: "İlham veren piyano müziği",
      vacation_spots: "Popüler tatil yerleri",
      light_blue_shirt: "Açık mavi kadın gömleği",
      summer_top_2: "Yazlık dantel üst",
      scarves: "Renkli atkılar",
      ankle_boot: "Kadın yarım bot",
      navy_polka_dress: "Lacivert puantiyeli elbise",
      modern_couch: "Modern gri kanepe",
      black_backpack: "Siyah sırt çantası"
    },
    summer_promo: "Yaz",
    summer_desc: "Tarzını seç.",
    discount: "İNDİRİM",
    autumn_sale: "Sonbahar İndirimi",
    limited_time: "Sınırlı Zaman",
    off: "İNDİRİM",
    request_quote: "Teklif İste",
    free: "Ücretsiz",
    footer_desc: "Modesy modern bir pazardır.",
    newsletter_desc: "Haber bültenimize katılın.",
    enter_email: "E-posta girin",
    subscribe: "Abone Ol",
    quick_links: "Hızlı Linkler",
    information: "Bilgi",
    home: "Ana Sayfa",
    blog: "Blog",
    shops: "Mağazalar",
    help_center: "Yardım",
    terms: "Şartlar",
    about_us: "Hakkımızda",
    privacy: "Gizlilik",
    cookie: "Çerez Politikası",
    connect_with_google: "Google ile Bağlan",
    or_register_with_email: "Veya e-posta ile kayıt ol",
    or_login_with_email: "Veya e-posta ile giriş yap",
    first_name: "Ad",
    last_name: "Soyad",
    email_address: "E-posta Adresi",
    password: "Şifre",
    confirm_password: "Şifreyi Onayla",
    agree_to_terms: "Okudum ve kabul ediyorum",
    verifying: "Doğrulanıyor...",
    success: "Başarılı!",
    have_account: "Hesabınız var mı?",
    dont_have_account: "Hesabınız yok mu?",
    forgot_password: "Şifremi Unuttum?",
  },
  AR: {
    contact: "اتصل بنا",
    sell_on_modesy: "البيع في Modesy",
    location: "الموقع",
    login: "تسجيل الدخول",
    register: "تسجيل",
    my_account: "حسابي",
    search_placeholder: "ابحث عن المنتجات...",
    cart: "عربة التسوق",
    wishlist: "المفضلة",
    sell_now: "بع الآن",
    hero_title: "ابحث عن حقيبة الظهر المناسبة لك",
    shop_by_category: "تسوق حسب الفئة",
    view_all: "عرض الكل",
    special_offers: "عروض خاصة",
    featured_products: "منتجات مميزة",
    new_arrivals: "وصل حديثاً",
    load_more: "تحميل المزيد",
    categories_title: "الفئات",
    categories: {
      clothing: "ملابس",
      shoes: "أحذية",
      home_living: "المنزل",
      jewelry: "مجوهرات",
      toys: "ألعاب",
      graphics: "رسومات",
      video_audio: "فيديو",
      web_templates: "قوالب الويب",
      womens_clothing: "ملابس نسائية",
      mens_clothing: "ملابس رجالية",
      furniture: "أثاث",
      necklaces: "قلائد",
      painting: "لوحات",
      boots: "جزم",
      decorative_pillows: "وسائد",
      handbags: "حقائب يد"
    },
    products: {
      animal_prints: "مطبوعات رقمية للحيوانات",
      summer_top: "قميص دانتيل صيفي",
      lace_blouse: "بلوزة دانتيل نسائية",
      floral_sundress: "فستان صيفي زهري",
      floral_sundress_2: "فستان صيفي زهري",
      gucci_backpack: "حقيبة ظهر ذكية من غوتشي",
      black_midi_skirt: "تنورة سوداء",
      decorative_pillow: "وسادة زينة...",
      decorative_pillow_2: "وسادة زينة...",
      sun_hat: "قبعة شمس نسائية",
      sneaker_shoes: "أحذية رياضية رجالية",
      kipling_handbag: "حقيبة يد نسائية",
      cobalt_tshirt: "تيشيرت رجالي كوبالت",
      animal_photo: "حزمة صور حيوانات",
      piano_music: "موسيقى البيانو",
      vacation_spots: "أماكن سياحية",
      light_blue_shirt: "قميص أزرق فاتح",
      summer_top_2: "قميص دانتيل صيفي",
      scarves: "أوشحة ملونة",
      ankle_boot: "جزمة نسائية",
      navy_polka_dress: "فستان أزرق داكن منقط",
      modern_couch: "أريكة رمادية",
      black_backpack: "حقيبة ظهر سوداء"
    },
    summer_promo: "صيف",
    summer_desc: "اختر أسلوبك.",
    discount: "خصم",
    autumn_sale: "تخفيضات الخريف",
    limited_time: "وقت محدود",
    off: "خصم",
    request_quote: "طلب عرض أسعار",
    free: "مجاني",
    footer_desc: "Modesy هو سوق حديث.",
    newsletter_desc: "انضم إلى القائمة البريدية.",
    enter_email: "أدخل بريدك",
    subscribe: "إشتراك",
    quick_links: "روابط سريعة",
    information: "معلومات",
    home: "الرئيسية",
    blog: "المدونة",
    shops: "المتاجر",
    help_center: "مركز المساعدة",
    terms: "الشروط",
    about_us: "من نحن",
    privacy: "الخصوصية",
    cookie: "ملفات تعريف الارتباط",
    connect_with_google: "اتصل بحساب جوجل",
    or_register_with_email: "أو سجل عبر البريد",
    or_login_with_email: "أو الدخول عبر البريد",
    first_name: "الاسم الأول",
    last_name: "اسم العائلة",
    email_address: "البريد الإلكتروني",
    password: "كلمة المرور",
    confirm_password: "تأكيد كلمة المرور",
    agree_to_terms: "لقد قرأت وأوافق على",
    verifying: "جاري التحقق...",
    success: "نجاح!",
    have_account: "هل لديك حساب؟",
    dont_have_account: "ليس لديك حساب؟",
    forgot_password: "هل نسيت كلمة المرور؟",
  }
};

export type UserRole = "guest" | "member" | "vendor" | "admin" | "super_admin" | "moderator";

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  storeName?: string;
  badgeLabel: string;
}

export const ROLE_PROFILES: Record<UserRole, UserProfile | null> = {
  vendor: {
    name: "Trendshop",
    email: "trendshop@codingest.net",
    avatar: "https://images.unsplash.com/photo-1597848212624-a19eb35e2651?w=100&q=80",
    role: "vendor",
    storeName: "Trendshop",
    badgeLabel: "Vendor",
  },
  admin: {
    name: "Super Admin",
    email: "admin@codingest.net",
    avatar: "https://i.pravatar.cc/150?u=admin",
    role: "admin",
    badgeLabel: "Admin",
  },
  super_admin: {
    name: "Super Admin",
    email: "admin@codingest.net",
    avatar: "https://i.pravatar.cc/150?u=admin",
    role: "super_admin",
    badgeLabel: "Admin",
  },
  moderator: {
    name: "Moderator",
    email: "moderator@codingest.net",
    avatar: "https://i.pravatar.cc/150?u=admin",
    role: "moderator",
    badgeLabel: "Moderator",
  },
  member: {
    name: "John Doe",
    email: "member@codingest.net",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
    role: "member",
    badgeLabel: "Pembeli",
  },
  guest: null,
};

export interface CartItem {
  id: string;
  productSlug: string;
  title: string;
  price: number;
  imageUrl: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  vendorName: string;
}

interface AppContextType {
  currency: typeof currencies[0];
  setCurrency: (c: typeof currencies[0]) => void;
  language: typeof languages[0];
  setLanguage: (l: typeof languages[0]) => void;
  location: string;
  setLocation: (loc: string) => void;
  t: (key: string, fallback?: string) => string;
  formatPrice: (priceIdr: number) => string;
  // User Session & Role
  role: UserRole;
  setRole: (role: UserRole) => void;
  userProfile: UserProfile | null;
  logout: () => void;
  loginAs: (role: UserRole) => void;
  // Cart
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productSlug: string) => void;
  isInWishlist: (productSlug: string) => boolean;
  wishlistCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState(currencies.find(c => c.code === "IDR")!);
  const [language, setLanguage] = useState(languages[0]);
  const [location, setLocation] = useState("Location");

  // User Role & Session (Default to guest, persistent when logged in)
  const [role, setRoleState] = useState<UserRole>("guest");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(";").shift();
      return null;
    };

    const cookieRole = getCookie("demo_role") as UserRole | null;
    const localRole = localStorage.getItem("modesy_role") as UserRole | null;
    const active = cookieRole || localRole || "guest";

    setRoleState(active);
    if (active !== "guest") {
      document.cookie = `demo_role=${active}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem("modesy_role", active);
    }
  }, []);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (typeof document !== "undefined") {
      if (newRole === "guest") {
        document.cookie = "demo_role=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      } else {
        document.cookie = `demo_role=${newRole}; path=/; max-age=31536000; SameSite=Lax`;
      }
    }
    if (typeof window !== "undefined") {
      if (newRole === "guest") {
        localStorage.removeItem("modesy_role");
      } else {
        localStorage.setItem("modesy_role", newRole);
      }
    }
  };

  const logout = () => {
    setRoleState("guest");
    if (typeof document !== "undefined") {
      document.cookie = "demo_role=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("modesy_role");
      window.location.href = "/";
    }
  };

  const loginAs = (newRole: UserRole) => {
    setRole(newRole);
  };

  const userProfile = ROLE_PROFILES[role] || null;

  // Cart & Wishlist State
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("modesy_cart");
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: "black-midi-skirt-default",
        productSlug: "black-midi-skirt",
        title: "Black midi skirt with white flowers",
        price: 791186.40,
        imageUrl: "https://images.unsplash.com/photo-1583496661160-c588c4af16b2?w=500&q=80",
        quantity: 1,
        selectedColor: "Black Floral",
        selectedSize: "M",
        vendorName: "Trendshop"
      }
    ];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("modesy_wishlist");
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return ["gucci-backpack"];
  });

  useEffect(() => {
    try {
      localStorage.setItem("modesy_cart", JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("modesy_wishlist", JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(i => i.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity;
        return updated;
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const updateCartQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const toggleWishlist = (productSlug: string) => {
    setWishlist(prev => {
      if (prev.includes(productSlug)) {
        return prev.filter(slug => slug !== productSlug);
      }
      return [...prev, productSlug];
    });
  };

  const isInWishlist = (productSlug: string) => wishlist.includes(productSlug);
  const wishlistCount = wishlist.length;

  const t = (path: string, fallback?: string) => {
    const keys = path.split(".");
    let current: any = translations[language.code as LanguageCode];
    if (!current) return fallback || path;
    for (const key of keys) {
      if (current[key] === undefined) return fallback || path;
      current = current[key];
    }
    return current;
  };

  const formatPrice = (priceIdr: number) => {
    const converted = priceIdr * currency.rate;
    return `${currency.symbol}${converted.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <AppContext.Provider
      value={{
        currency,
        setCurrency,
        language,
        setLanguage,
        location,
        setLocation,
        t,
        formatPrice,
        // User Session & Role
        role,
        setRole,
        userProfile,
        logout,
        loginAs,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
}

