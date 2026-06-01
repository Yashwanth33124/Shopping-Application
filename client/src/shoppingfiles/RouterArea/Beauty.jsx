import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../Redux/CartSlice";
import { getImgUrl } from "../../utils/imagePath";
import FastImage from "../../components/FastImage";
import { fetchProductsByCategory } from "../../utils/api";

import "./Beauty.css";

const FALLBACK_LIPSTICKS = [
  { id: "b-lp-1", name: "Classic Matte Lipstick", price: 1299, image: "/images10/lp1.avif", description: "Matte finish lipstick" },
  { id: "b-lp-2", name: "Satin Shine Lipstick", price: 1499, image: "/images10/lp2.avif", description: "Satin finish lipstick" },
  { id: "b-lp-3", name: "Velvet Red Lipstick", price: 1599, image: "/images10/lp3.avif", description: "Velvet finish lipstick" },
  { id: "b-lp-4", name: "Creamy Nude Lipstick", price: 1199, image: "/images10/lp4.avif", description: "Creamy finish lipstick" },
  { id: "b-lp-5", name: "Glossy Pink Lipstick", price: 1399, image: "/images10/lp5.avif", description: "Gloss finish lipstick" },
  { id: "b-lp-6", name: "Liquid Velvet Lip", price: 1699, image: "/images10/lp6.avif", description: "Liquid velvet lipstick" },
  { id: "b-lp-7", name: "Hydrating Lip Balm Tint", price: 999, image: "/images10/lp7.avif", description: "Hydrating tinted lip balm" },
  { id: "b-lp-8", name: "Matte Lip Crayon", price: 1299, image: "/images10/lp1.avif", description: "Easy-wear lip crayon" },
  { id: "b-lp-9", name: "Satin Nude Lip", price: 1499, image: "/images10/lp2.avif", description: "Satin nude shade" },
  { id: "b-lp-10", name: "Classic Red Lip", price: 1599, image: "/images10/lp3.avif", description: "Classic bold red lip" },
];

const FALLBACK_BAGS = [
  { id: "b-bag-1", name: "Luxury Leather Tote", price: 5999, image: "/images10/bag1.avif", description: "Premium leather handbag" },
  { id: "b-bag-2", name: "Elegant Crossbody Bag", price: 3999, image: "/images10/bag2.avif", description: "Elegant small crossbody bag" },
  { id: "b-bag-3", name: "Classic Shoulder Purse", price: 4599, image: "/images10/bag3.avif", description: "Classic everyday purse" },
  { id: "b-bag-4", name: "Minimalist Clutch", price: 2999, image: "/images10/bag4.avif", description: "Sleek evening clutch" },
  { id: "b-bag-5", name: "Designer Satchel Bag", price: 6999, image: "/images10/bag5.avif", description: "Spacious designer satchel" },
  { id: "b-bag-6", name: "Urban Backpack Purse", price: 3499, image: "/images10/bag6.avif", description: "Modern backpack purse" },
  { id: "b-bag-7", name: "Travel Duffle Handbag", price: 4999, image: "/images10/bag7.avif", description: "Stylized travel handbag" },
  { id: "b-bag-8", name: "Suede Leather Tote", price: 5999, image: "/images10/bag1.avif", description: "Classic suede tote bag" },
  { id: "b-bag-9", name: "Mini Elegant Shoulder Bag", price: 3999, image: "/images10/bag2.avif", description: "Mini shoulder handbag" },
  { id: "b-bag-10", name: "Casual Everyday Purse", price: 4599, image: "/images10/bag3.avif", description: "Comfy everyday handbag" },
];

const FALLBACK_MAKEUP = [
  { id: "b-mk-1", name: "Flawless Liquid Foundation", price: 2499, image: "/images10/makeup1.avif", description: "Full coverage foundation" },
  { id: "b-mk-2", name: "Translucent Setting Powder", price: 1899, image: "/images10/makeup2.avif", description: "Loose setting powder" },
  { id: "b-mk-3", name: "Glow Cheek Blush", price: 1599, image: "/images10/makeup3.avif", description: "Radiant blush for cheeks" },
  { id: "b-mk-4", name: "Matte Bronzing Powder", price: 1999, image: "/images10/makeup4.avif", description: "Sunkissed bronzer" },
  { id: "b-mk-5", name: "Volume Mascara Black", price: 1299, image: "/images10/makeup5.avif", description: "Lengthening black mascara" },
];

const FALLBACK_PERFUMES = [
  { id: "b-pf-1", name: "Vogue Classic Eau de Parfum", price: 4999, image: "/images10/perfume1.avif", description: "Signature classic fragrance" },
  { id: "b-pf-2", name: "Sweet Rose Blossom Mist", price: 3499, image: "/images10/perfume2.avif", description: "Fresh floral mist" },
  { id: "b-pf-3", name: "Oud & Wood Luxury Cologne", price: 6999, image: "/images10/perfume3.avif", description: "Deep woody cologne" },
  { id: "b-pf-4", name: "Warm Vanilla Amber Perfume", price: 4299, image: "/images10/perfume4.avif", description: "Warm cozy vanilla amber" },
  { id: "b-pf-5", name: "Fresh Citrus Bloom Scent", price: 3899, image: "/images10/perfume5.avif", description: "Crisp citrus summer scent" },
];

const padList = (apiList, fallbackList, limit) => {
  const result = [...apiList];
  let fallbackIndex = 0;
  while (result.length < limit && fallbackIndex < fallbackList.length) {
    const item = fallbackList[fallbackIndex++];
    if (!result.some(r => r.name?.toLowerCase() === item.name.toLowerCase())) {
      result.push(item);
    }
  }
  return result.slice(0, limit);
};

const Beauty = () => {
  const cardsRef = useRef([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProductClick = (item) => {
    navigate(`/product/${item._id || item.id}`, { state: { product: item } });
  };

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await fetchProductsByCategory("beauty");

      // Filter Lipsticks
      const apiLipsticks = data.filter(p => 
        p.name?.toLowerCase().includes("lp") || 
        p.name?.toLowerCase().includes("lipstick") ||
        p.title?.toLowerCase().includes("lipstick")
      );

      // Filter Bags
      const apiBags = data.filter(p => 
        p.name?.toLowerCase().includes("bag") || 
        p.title?.toLowerCase().includes("bag") ||
        p.description?.toLowerCase().includes("bag")
      );

      // Filter Makeup
      const apiMakeup = data.filter(p => 
        p.name?.toLowerCase().includes("makeup") || 
        p.title?.toLowerCase().includes("makeup") ||
        p.description?.toLowerCase().includes("makeup")
      );

      // Filter Perfumes
      const apiPerfumes = data.filter(p => 
        p.name?.toLowerCase().includes("perfume") || 
        p.name?.toLowerCase().includes("fragrance") ||
        p.name?.toLowerCase().includes("mist") ||
        p.title?.toLowerCase().includes("perfume") ||
        p.description?.toLowerCase().includes("perfume")
      );

      // Pad with fallback data to match exact requested counts:
      // 10 Lipsticks, 10 Bags, 5 Makeup, 5 Perfumes
      const lipsticks = padList(apiLipsticks, FALLBACK_LIPSTICKS, 10);
      const bags = padList(apiBags, FALLBACK_BAGS, 10);
      const makeup = padList(apiMakeup, FALLBACK_MAKEUP, 5);
      const perfumes = padList(apiPerfumes, FALLBACK_PERFUMES, 5);

      // Combine them
      setProducts([...lipsticks, ...bags, ...makeup, ...perfumes]);
      setLoading(false);
    };
    loadProducts();
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      cardsRef.current.forEach((card) => {
        if (!card) return;

        const text = card.querySelector(".beauty2-text");
        if (!text) return;

        const rect = card.getBoundingClientRect();
        const windowH = window.innerHeight;
        const cardH = rect.height;

        const progress = Math.min(
          Math.max((windowH - rect.top) / (windowH + cardH), 0),
          1
        );

        const maxMove = cardH - 140;
        text.style.transform = `translateY(${progress * maxMove}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="beauty-page">

      {/* 🔥 FIRST BANNER (KEEP THIS) */}
      <div className="beauty-banner">
        <FastImage src={getImgUrl("/images10/first.png")} alt="Beauty Banner" />
      </div>

      {/* 🔥 GRID SECTION */}
      <section className="beauty2-page">
        <div className="beauty2-media-section">

          {/* LEFT IMAGE */}
          <div
            className="beauty2-media-left clickable"
            ref={(el) => (cardsRef.current[0] = el)}
            // onClick={() => handleProductClick({
            //   id: "b-glow",
            //   title: "Pure Glow Oil",
            //   price: "3499",
            //   image: getImgUrl("/images10/fifth.jpg"),
            //   sizes: ["50ml"],
            //   category: "beauty"
            // })}
          >
            <FastImage src={getImgUrl("/images10/fifth.jpg")} alt="Glow Beauty" />
            <div className="beauty2-text">
              <h2>PURE GLOW</h2>
              <p>Radiance that feels soft, looks irresistible.</p>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div
            className="beauty2-media-right clickable"
            ref={(el) => (cardsRef.current[1] = el)}
            // onClick={() => handleProductClick({
            //   id: "b-essence",
            //   title: "Radiant Essence",
            //   price: "4299",
            //   image: getImgUrl("/images10/fourth.avif"),
            //   sizes: ["100ml"],
            //   category: "beauty"
            // })}
          >
            <FastImage src={getImgUrl("/images10/fourth.avif")} alt="Radiant Skin" />
            <div className="beauty2-text">
              <h2>RADIANT ESSENCE</h2>
              <p>Subtle. Warm. Quietly intoxicating.</p>
            </div>
          </div>



        </div>
      </section>

      {/* SIXTH IMAGE SECTION */}
      <div className="beauty-bottom-section">
        <FastImage src={getImgUrl("/images10/sixth.jpg")} alt="Lipstick" />
      </div>
      {/* LUXURY PRODUCT SHOWCASE */}
      <section className="beauty-products">

        <h2 className="product-heading">Luxury Collection</h2>

        <div className="product-grid">
          {loading ? (
            <div className="loading-state">Loading luxury products...</div>
          ) : products.length > 0 ? (
            products.map((product, index) => (
              <div
                className="product-card clickable"
                key={product._id || index}
                onClick={() => handleProductClick(product)}
              >
                <FastImage src={getImgUrl(product.image)} alt={product.name || product.title} />
                <div className="product-overlay">
                  <button>Shop Now</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <p>No luxury products available yet.</p>
            </div>
          )}
        </div>

      </section>

      <div className="beauty-fulltext">
        <h2>BEAUTY</h2>

        <p>
          Discover the latest in beauty essentials and skincare must-haves in our
          beauty collection. From everyday makeup staples to luxurious skincare,
          everything you need is right here.
        </p>

        <p>
          Explore foundations, lipsticks, mascaras and more in shades that match
          every mood and moment. Our skincare range includes cleansers, serums and
          moisturizers for glowing skin.
        </p>

        <p>
          Whether you're refreshing your routine or trying something new, our beauty
          range has you covered all year round.
        </p>

        <div className="beauty-breadcrumb">
          VOGUECART.COM / <span>BEAUTY</span>
        </div>
      </div>

      <footer className="beauty-footer">
        <div className="beauty-footer-top">
          <div className="beauty-footer-col">
            <h4>Shop</h4>
            <ul>
              <li onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>Home</li>
              <li onClick={() => navigate("/men")} style={{ cursor: 'pointer' }}>Men</li>
              <li onClick={() => navigate("/woman")} style={{ cursor: 'pointer' }}>Woman</li>
              <li onClick={() => navigate("/beauty")} style={{ cursor: 'pointer' }}>Beauty</li>
              <li onClick={() => navigate("/child")} style={{ cursor: 'pointer' }}>Child</li>
            </ul>
          </div>

          <div className="beauty-footer-col">
            <h4>Corporate Info</h4>
            <ul>
              <li onClick={() => navigate("/info/careers")} style={{ cursor: 'pointer' }}>CAREERS AT VOGUECART</li>
              <li onClick={() => navigate("/info/about-us")} style={{ cursor: 'pointer' }}>ABOUT VOGUECART</li>
              <li onClick={() => navigate("/info/sustainability")} style={{ cursor: 'pointer' }}>SUSTAINABILITY</li>
              <li onClick={() => navigate("/info/press")} style={{ cursor: 'pointer' }}>PRESS</li>
              <li onClick={() => navigate("/info/investor-relations")} style={{ cursor: 'pointer' }}>INVESTOR RELATIONS</li>
            </ul>
          </div>

          <div className="beauty-footer-col">
            <h4>Help</h4>
            <ul>
              <li onClick={() => navigate("/info/customer-service")} style={{ cursor: 'pointer' }}>CUSTOMER SERVICE</li>
              <li onClick={() => navigate("/info/my-account")} style={{ cursor: 'pointer' }}>MY ACCOUNT</li>
              <li onClick={() => navigate("/info/find-a-store")} style={{ cursor: 'pointer' }}>FIND A STORE</li>
              <li onClick={() => navigate("/info/legal-privacy")} style={{ cursor: 'pointer' }}>LEGAL & PRIVACY</li>
              <li onClick={() => navigate("/info/contact")} style={{ cursor: 'pointer' }}>CONTACT</li>
            </ul>
          </div>

          <div className="beauty-footer-col beauty-footer-news">
            <p>
              Sign up now and be the first to know about exclusive beauty launches
              and offers!
            </p>
            <span className="beauty-read-more">READ MORE</span>
          </div>
        </div>

        <div className="beauty-footer-bottom">
          <div className="beauty-footer-left">
            <div className="beauty-footer-brand">VOGUECART</div>
            <p className="beauty-region">
              INDIA (Rs.) <span>CHANGE REGION</span>
            </p>
            <p className="beauty-copyright">
              © VOGUECART
            </p>
          </div>
        </div>
      </footer>


    </div>
  );
};

export default Beauty;
