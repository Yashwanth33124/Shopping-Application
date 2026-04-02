import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Globe, Shield, Leaf, Users, Headphones, Briefcase, Mail, MapPin, TrendingUp, Newspaper } from "lucide-react";
import { getImgUrl } from "../../utils/imagePath";
import "./Information.css";

const Information = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [heroLoaded, setHeroLoaded] = useState(true);

    useEffect(() => {
        setLoading(true);
        window.scrollTo(0, 0);
        const timer = setTimeout(() => setLoading(false), 1500); // Slower initial load experience
        return () => clearTimeout(timer);
    }, [type]);

    const getContent = () => {
        const title = type?.replace(/-/g, " ").toUpperCase() || "INFORMATION";
        
        const contentMap = {
            "careers": {
                icon: <Briefcase size={40} />,
                sub: "SHAPE THE FUTURE OF FASHION",
                desc: "Voguecart is where creativity meets technology. We are building the most sophisticated fashion destination in India, and we need the boldest thinkers to lead the way.",
                points: ["Creative Creative Direction", "Luxury Fashion Buying", "AI-Driven UX Research", "Sustainable Supply Chain Logistics"],
                image: "/images6/woman17.jpg",
                sideImage: "/images6/woman18.jpg"
            },
            "about-us": {
                icon: <Globe size={40} />,
                sub: "CURATING ELEGANCE SINCE 2026",
                desc: "Founded on the vision of bridging global luxury with Indian vibrance, Voguecart is a curated ecosystem where every product tells a story of craftsmanship and premium quality.",
                points: ["Global Designer Partnerships", "Rigorous Authenticity Checks", "Unmatched Personal Shopping", "The 30Cr Infrastructure Vision"],
                image: "/images11/login.jpg",
                sideImage: "/images5/fashine2.avif"
            },
            "sustainability": {
                icon: <Leaf size={40} />,
                sub: "COMMITMENT TO THE PLANET",
                desc: "Our 'Green-Vogue' initiative ensures that every stitch is sustainable. We are aiming for 100% biodegradable packaging and carbon-neutral logistics by 2030.",
                points: ["Organic Certified Textiles", "Zero-Plastic Packaging", "Carbon-Offset Deliveries", "Textile Upcycling Program"],
                image: "/images4/gv.webm",
                sideImage: "/images4/gv.webm"
            },
            "customer-service": {
                icon: <Headphones size={40} />,
                sub: "THE VOGUE CONCIERGE",
                desc: "Experience 24/7 personalized assistance. From size consultations to real-time order tracking, our concierge team ensures your journey is as premium as our products.",
                points: ["Instant Video Consultations", "Global 24/7 Support", "White-Glove Delivery Service", "Instant Returns & Refunds"],
                image: "/images10/first.png",
                sideImage: "/images10/second.png"
            },
            "legal-privacy": {
                icon: <Shield size={40} />,
                sub: "YOUR SECURITY, OUR PRIORITY",
                desc: "Every transaction on Voguecart is protected by military-grade encryption. We respect your data as much as we value your trust.",
                points: ["AES-256 Encryption", "Zero-Knowledge Storage", "Biometric Authentication", "Transparent Data Policy"],
                image: "/images10/sixth.jpg",
                sideImage: "/images10/lip7.avif"
            },
            "press": {
                icon: <Newspaper size={40} />,
                sub: "IN THE HEADLINES",
                desc: "Explore the latest news about Voguecart's expansion, our recent collaborations with top-tier designers, and our impact on the modern fashion landscape.",
                points: ["Fashion Week Collaborations", "Digital Innovation Awards", "Quarterly Brand Reports", "Designer Spotlight Series"],
                image: "/images10/second.png",
                sideImage: "/images10/third.png"
            },
            "investor-relations": {
                icon: <TrendingUp size={40} />,
                sub: "GROWING WITH VISION",
                desc: "With a valuation roadmap from 20Cr to 30Cr, Voguecart is on an exponential growth trajectory. We are revolutionizing the luxury e-commerce segment in India.",
                points: ["Quarterly Earning Reports", "Capital Allocation Strategy", "Market Expansion Roadmap", "Investor Conference Access"],
                image: "/images10/third.png",
                sideImage: "/images10/first.png"
            },
            "contact": {
                icon: <Mail size={40} />,
                sub: "LET'S START A CONVERSATION",
                desc: "Whether you're a designer looking to partner with us or a customer with a unique request, our team is ready to listen.",
                points: ["Partnership Inquiries", "Corporate Headquarters", "Media Relations", "Technical Support"],
                image: "/images10/fifth.jpg",
                sideImage: "/images10/fourth.avif"
            },
            "find-a-store": {
                icon: <MapPin size={40} />,
                sub: "EXPERIENCE US IN PERSON",
                desc: "While we are a digital-first brand, our flagship experience centers provide an immersive 'Touch & Feel' experience of our premium collections.",
                points: ["flagship - Hyderabad", "fashine - Karimnagar", "Boutique - Nellore", "Coming Soon - Suryapet"],
                image: "/images5/fashine1.avif",
                sideImage: "/images5/fashine4.avif"
            }
        };

        const current = contentMap[type] || {
            icon: <Globe size={40} />,
            sub: "THE VOGUE EXPERIENCE",
            desc: "Discover the world of Voguecart. We are building the most sophisticated shopping destination for the modern individual.",
            points: ["Global Reach", "Curated Selection", "Seamless Experience"],
            image: "/images11/login.jpg",
            sideImage: "/images6/woman19.jpg"
        };

        return { title, ...current };
    };

    const { title, icon, sub, desc, points, image, sideImage } = getContent();

    if (loading) {
        return (
            <div className="info-loader">
                <div className="loader-content">
                    <h1 className="loader-brand">VOGUECART</h1>
                    <div className="loader-bar"></div>
                    <p className="loader-note">LOADING THE VISION</p>
                </div>
            </div>
        );
    }

    return (
        <div className="info-container">
            <button className="info-back-btn" onClick={() => navigate(-1)}>
                <ArrowLeft size={20} /> <span className="back-text">BACK TO SHOP</span>
            </button>

            <section className="info-hero" style={{ backgroundColor: '#000' }}>
                {heroLoaded && (
                    image.endsWith('.webm') || image.endsWith('.mp4') ? (
                        <video 
                            src={getImgUrl(image)} 
                            autoPlay 
                            loop 
                            muted 
                            playsInline 
                            className="hero-video"
                            onError={() => setHeroLoaded(false)}
                        />
                    ) : (
                        <img 
                            src={getImgUrl(image)} 
                            alt={title} 
                            className="hero-image"
                            onError={() => setHeroLoaded(false)}
                        />
                    )
                )}
                <div className="hero-overlay">
                    <div className="hero-content">
                        <span className="hero-subtitle">{sub}</span>
                        <h1 className="hero-title">{title}</h1>
                    </div>
                </div>
            </section>

            <div className="info-scroll-section">
                {/* BACKGROUND ELEMENT */}
                <div className="info-bg-texture" style={{ backgroundImage: `url(${getImgUrl(sideImage)})` }}></div>
                
                <div className="info-card">
                    <div className="info-header-content">
                        <div className="info-type-icon">{icon}</div>
                    </div>
                    
                    <div className="info-divider"></div>
                    
                    <p className="info-description">{desc}</p>
                    
                    <div className="info-points-grid">
                        {points.map((point, i) => (
                            <div key={i} className="info-point-item" style={{ animationDelay: `${0.5 + i * 0.2}s` }}>
                                <div className="point-card">
                                    <div className="point-bullet"></div>
                                    <h3>{point}</h3>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* NEW EDITORIAL SECTION */}
                    <div className="editorial-showcase">
                        <div className="editorial-left">
                            <img src={getImgUrl(sideImage)} alt="Fashion" className="editorial-img" />
                        </div>
                        <div className="editorial-right">
                            <h2 className="vision-text">VOGUECART VISION 2030</h2>
                            <p className="vision-desc">Building the most trusted luxury ecosystem for the 30Cr Indian premium market.</p>
                        </div>
                    </div>

                    <div className="info-brand-footer">
                        <p className="footer-brand-title">VOGUECART</p>
                        <p className="footer-brand-motto">ELEGANCE REDEFINED.</p>
                    </div>
                </div>
            </div>

            {/* FLOATING DECORATION */}
            <div className="floating-v">V</div>
        </div>
    );
};

export default Information;
