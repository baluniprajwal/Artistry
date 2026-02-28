import React from 'react';
import { CORPORATE_ADULT_GALLERY_IMAGES, HAMPER_GALLERY_IMAGES, RESIN_GALLERY_IMAGES, RETURN_GIFT_GALLERY_IMAGES, WORKSHOPS } from '../constants';
import { Category } from '../types';
import { ArrowLeft, ArrowUpRight, Star, Heart, Palette, Gift, Briefcase, PartyPopper, ArrowDown } from 'lucide-react';

interface WorkshopGridProps {
    category: Category;
    onBack: () => void;
    onBook: () => void;
}

// Configuration for each Category Landing Page
const CATEGORY_THEMES: Record<string, {
    title: string;
    tagline: string;
    description: string;
    bgColor: string;
    accentColor: string;
    accentBg: string;
    heroImage: string;
    icon: React.ElementType;
    pattern: string;
}> = {
    [Category.KIDS]: {
        title: "Little Hands, Big Mess.",
        tagline: "Sensory Art & Creative Chaos",
        description: "We believe every child is a born artist. Our workshops aren't just about painting; they're about squishing clay, mixing colors, and building confidence. It's safe, guided, and wonderfully messy.",
        bgColor: "bg-[#FFF0EE]", // Soft Red
        accentColor: "text-[#FF6B6B]",
        accentBg: "bg-[#FF6B6B]",
        heroImage: "/Kids-art/decoden.webp",
        icon: Palette,
        pattern: "radial-gradient(#FF6B6B 1.5px, transparent 1.5px)"
    },
    [Category.RESIN]: {
        title: "Frozen in Time.",
        tagline: "The Art of Gloss & Luxury",
        description: "Resin art is where chemistry meets creativity. From preserving precious memories to creating functional luxury home decor, we teach you how to tame the fluid medium.",
        bgColor: "bg-[#F0FFF4]", // Soft Green
        accentColor: "text-[#38A169]",
        accentBg: "bg-[#38A169]",
        heroImage: "/Resin-art/resin19.webp",
        icon: Star,
        pattern: "radial-gradient(#38A169 1.5px, transparent 1.5px)"
    },
    [Category.HAMPERS]: {
        title: "Unbox Happiness.",
        tagline: "Curated Art Kits & Gifts",
        description: "Why give a generic gift when you can give an experience? Our hampers are thoughtfully curated with premium supplies, instructions, and a whole lot of love.",
        bgColor: "bg-[#FFFBF0]", // Soft Gold
        accentColor: "text-[#D69E2E]",
        accentBg: "bg-[#D69E2E]",
        heroImage: "/hampers/hamper11.webp",
        icon: Gift,
        pattern: "radial-gradient(#D69E2E 1.5px, transparent 1.5px)"
    },
    [Category.CORPORATE_ADULT]: {
        title: "Sip, Paint, De-stress.",
        tagline: "Art Therapy for the Busy Soul",
        description: "Step away from the screens. Our adult workshops are designed as 'Art Therapy'—a judgement-free zone to reconnect with your hands and your team.",
        bgColor: "bg-[#F5F7FF]", // Soft Blue
        accentColor: "text-[#5A67D8]",
        accentBg: "bg-[#5A67D8]",
        heroImage: "/Corporate-adults/corporate22.webp",
        icon: Briefcase,
        pattern: "radial-gradient(#5A67D8 1.5px, transparent 1.5px)"
    },
    [Category.RETURN_GIFTS]: {
        title: "The Perfect Takeaway.",
        tagline: "Memorable Gifts",
        description: "Say goodbye to plastic junk. Give your guests a DIY kit they'll actually cherish. Our return gift options are customizable and budget-friendly.",
        bgColor: "bg-[#FAF5FF]", // Soft Purple
        accentColor: "text-[#805AD5]",
        accentBg: "bg-[#805AD5]",
        heroImage: "/return-gift/return24.webp",
        icon: PartyPopper,
        pattern: "radial-gradient(#805AD5 1.5px, transparent 1.5px)"
    },
    [Category.ALL]: {
        title: "The Full Collection.",
        tagline: "Explore Everything We Do",
        description: "Can't decide? Browse our entire catalog of creative experiences. From messy play to elegant decor, we have something for every vibe.",
        bgColor: "bg-[#F5EFE6]", // Brand Beige
        accentColor: "text-[#2E2E2E]",
        accentBg: "bg-[#2E2E2E]",
        heroImage: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2080&auto=format&fit=crop",
        icon: Heart,
        pattern: "radial-gradient(#2E2E2E 1.5px, transparent 1.5px)"
    }
};

const GALLERY_CATEGORIES = [
    Category.RESIN,
    Category.HAMPERS,
    Category.CORPORATE_ADULT,
    Category.RETURN_GIFTS
];

interface GalleryItem {
  key: string;
  src: string;
  alt: string;
}

const splitIntoColumns = (items: GalleryItem[], columnCount: number): GalleryItem[][] => {
  const columns: GalleryItem[][] = Array.from({ length: columnCount }, () => []);
  items.forEach((item, index) => {
    columns[index % columnCount].push(item);
  });
  return columns;
};

const WorkshopGrid: React.FC<WorkshopGridProps> = ({ category, onBack, onBook }) => {
  const theme = CATEGORY_THEMES[category] || CATEGORY_THEMES[Category.ALL];
  
  const filteredWorkshops = category === Category.ALL 
    ? WORKSHOPS 
    : WORKSHOPS.filter(w => w.categories.includes(category));

  const isGalleryView = GALLERY_CATEGORIES.includes(category);
  const galleryItems: GalleryItem[] =
    category === Category.RESIN
      ? RESIN_GALLERY_IMAGES.map((src, index) => ({
          key: `resin-image-${index}`,
          src,
          alt: `Resin Art ${index + 1}`,
        }))
      : category === Category.HAMPERS
      ? HAMPER_GALLERY_IMAGES.map((src, index) => ({
          key: `hamper-image-${index}`,
          src,
          alt: `Hamper ${index + 1}`,
        }))
      : category === Category.CORPORATE_ADULT
      ? CORPORATE_ADULT_GALLERY_IMAGES.map((src, index) => ({
          key: `corporate-image-${index}`,
          src,
          alt: `Corporate Adult ${index + 1}`,
        }))
      : category === Category.RETURN_GIFTS
      ? RETURN_GIFT_GALLERY_IMAGES.map((src, index) => ({
          key: `return-gift-image-${index}`,
          src,
          alt: `Return Gift ${index + 1}`,
        }))
      : filteredWorkshops.map((workshop) => ({
          key: workshop.id,
          src: workshop.image,
          alt: workshop.title,
        }));

  const mobileColumns = splitIntoColumns(galleryItems, 1);
  const tabletColumns = splitIntoColumns(galleryItems, 2);
  const desktopColumns = splitIntoColumns(galleryItems, 3);

  return (
    <div className={`min-h-screen ${theme.bgColor} relative font-sans selection:bg-art-text selection:text-white`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: theme.pattern, backgroundSize: '30px 30px' }}></div>
        <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none fixed"></div>

        {/* 1. EDITORIAL HEADER */}
        <header className="relative pt-24 md:pt-32 pb-14 md:pb-24 px-3 sm:px-4 lg:px-4 overflow-hidden">
            <div className="max-w-[96rem] mx-auto relative z-10">
                
                {/* Navigation Bar */}
                <div className="flex justify-between items-center mb-10 md:mb-16">
                    <button 
                        onClick={onBack} 
                        className="group flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 bg-white border-2 border-art-text/10 rounded-full text-art-text font-bold hover:border-art-text hover:shadow-quirky transition-all duration-300"
                    >
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
                        <span className="font-quirky uppercase tracking-wider text-xs">Back</span>
                    </button>
                </div>

                {/* Hero Content with Image */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-16 items-center">
                    <div className="lg:col-span-6">
                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-art-text mb-4 md:mb-5 leading-[0.9] tracking-tight">
                            {theme.title}
                        </h1>
                        <div className="flex flex-col md:flex-row gap-3 md:gap-5 md:items-center mt-6 md:mt-7 mb-5 md:mb-7">
                             <div className={`h-px w-16 ${theme.accentBg} hidden md:block`}></div>
                             <p className={`text-lg md:text-2xl font-quirky font-bold ${theme.accentColor}`}>
                                {theme.tagline}
                             </p>
                        </div>
                        <p className="text-base md:text-lg text-art-text/70 leading-relaxed font-light mb-8 md:mb-10 max-w-xl">
                            {theme.description}
                        </p>
                        
                        <button onClick={() => document.getElementById('grid-start')?.scrollIntoView({ behavior: 'smooth' })} className="hidden lg:flex w-14 h-14 rounded-full border-2 border-art-text/70 bg-white/70 backdrop-blur-sm items-center justify-center hover:bg-art-text hover:text-white hover:border-art-text transition-all animate-bounce">
                                <ArrowDown size={24}/>
                        </button>
                    </div>
                    
                    {/* Hero Image Section */}
                    <div className="lg:col-span-6 relative">
                        <div className="relative rounded-[2rem] overflow-hidden border-4 border-white shadow-[0_24px_60px_rgba(0,0,0,0.2)] transform rotate-1 hover:rotate-0 transition-transform duration-700 ease-out aspect-[5/4]">
                            <img 
                                src={theme.heroImage} 
                                alt={category} 
                                width={1600}
                                height={1200}
                                className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-transparent"></div>
                        </div>
                        {/* Abstract background element */}
                        <div className={`absolute -top-6 -right-6 w-full h-full rounded-[2rem] border-2 border-art-text/10 -z-10 transform -rotate-1 ${theme.bgColor} opacity-60`}></div>
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/50 blur-2xl -z-10"></div>
                    </div>
                </div>
            </div>
        </header>

        {/* 2. THE CONTENT GRID */}
        <div id="grid-start" className="bg-white rounded-t-[2.5rem] md:rounded-t-[4rem] border-t-2 border-art-text/10 py-16 md:py-24 px-3 sm:px-4 lg:px-4 relative z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.02)]">
            <div className="max-w-[96rem] mx-auto">
                
                {/* Grid Header */}
                <div className="flex items-end justify-between mb-10 md:mb-16 px-2">
                    <div>
                        <span className="block font-quirky font-bold text-xs uppercase tracking-[0.2em] text-art-text/40 mb-2">Portfolio</span>
                        <h2 className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-art-text">
                            Featured <span className={`italic border-b-4 border-art-text/10 ${theme.accentColor} border-opacity-30`}>Collection</span>
                        </h2>
                    </div>
                </div>

                {/* Conditional Layout Rendering */}
                {isGalleryView ? (
                    <>
                        <div className="grid grid-cols-1 gap-6 md:hidden">
                            {mobileColumns[0].map((item) => (
                                <div
                                    key={item.key}
                                    className="relative rounded-2xl overflow-hidden shadow-sm transition-all duration-500"
                                >
                                    <img
                                        src={item.src}
                                        alt={item.alt}
                                        width={400}
                                        height={500}
                                        className="w-full h-auto object-cover transform transition-transform duration-700"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
                            {tabletColumns.map((column, columnIndex) => (
                                <div key={`tablet-column-${columnIndex}`} className="space-y-6">
                                    {column.map((item) => (
                                        <div
                                            key={item.key}
                                            className="relative rounded-2xl overflow-hidden shadow-sm transition-all duration-500"
                                        >
                                            <img
                                                src={item.src}
                                                alt={item.alt}
                                                width={400}
                                                height={500}
                                                className="w-full h-auto object-cover transform transition-transform duration-700"
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        <div className="hidden lg:grid grid-cols-3 gap-6">
                            {desktopColumns.map((column, columnIndex) => (
                                <div key={`desktop-column-${columnIndex}`} className="space-y-6">
                                    {column.map((item) => (
                                        <div
                                            key={item.key}
                                            className="relative rounded-2xl overflow-hidden shadow-sm transition-all duration-500"
                                        >
                                            <img
                                                src={item.src}
                                                alt={item.alt}
                                                width={400}
                                                height={500}
                                                className="w-full h-auto object-cover transform transition-transform duration-700"
                                                loading="lazy"
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {category === Category.RESIN && filteredWorkshops.length > 0 && (
                            <div className="mt-16">
                                <h3 className="text-2xl md:text-3xl font-serif font-bold text-art-text mb-6">Resin Workshop Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {filteredWorkshops.map((workshop) => (
                                        <div
                                            key={`resin-detail-${workshop.id}`}
                                            className="rounded-3xl border border-art-text/10 bg-white p-6 md:p-7 shadow-sm"
                                        >
                                            <h4 className="text-xl font-serif font-bold text-art-text mb-3">{workshop.title}</h4>
                                            <p className="text-sm md:text-base text-art-text/70 leading-relaxed">{workshop.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    // CARD VIEW (Original style for Kids, Resin, All)
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
                        {filteredWorkshops.map((workshop, idx) => (
                            <div 
                                key={workshop.id} 
                                className="group flex flex-col h-full bg-[#fffdf9] rounded-[2rem] border border-art-text/10 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.10)] hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
                                style={{ transitionDelay: `${idx * 50}ms` }}
                            >
                                {/* Image Area */}
                                <div className="aspect-[4/5] w-full overflow-hidden relative bg-art-beige/30">
                                    <img 
                                        src={workshop.image} 
                                        alt={workshop.title} 
                                        width={800}
                                        height={600}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Content Area */}
                                <div className="flex-1 p-5 md:p-6 flex flex-col relative">
                                    <div className="mb-5 pt-1">
                                        <h3 className="text-xl md:text-2xl font-serif font-bold text-art-text mb-3 leading-tight group-hover:text-art-green-dark transition-colors">
                                            {workshop.title}
                                        </h3>
                                        <p className="text-art-text/70 text-sm leading-relaxed font-sans">
                                            {workshop.description}
                                        </p>
                                    </div>

                                    {/* Features / Meta */}
                                    <div className="mt-auto">
                                        <button 
                                            onClick={onBook} 
                                            className="w-full py-3.5 rounded-xl font-bold font-quirky text-sm uppercase tracking-widest bg-art-text text-white hover:bg-art-green hover:text-art-text transition-all duration-300 flex items-center justify-center gap-2 border-2 border-art-text"
                                        >
                                            <span>Request Quote</span>
                                            <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform"/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Empty State */}
                {!isGalleryView && filteredWorkshops.length === 0 && (
                    <div className="text-center py-32">
                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Star size={40} className="text-gray-300"/>
                        </div>
                        <h3 className="text-3xl font-serif font-bold text-art-text mb-2">More magic brewing...</h3>
                        <p className="text-gray-400 mb-8">We're curating new activities for {category}. Check back soon!</p>
                        <button onClick={onBack} className="text-art-green-dark font-bold hover:underline font-quirky uppercase tracking-wider text-sm">Return to Categories</button>
                    </div>
                )}

            </div>
        </div>
    </div>
  );
};

export default WorkshopGrid;
