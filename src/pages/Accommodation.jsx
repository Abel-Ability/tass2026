import React from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Phone, Globe, Wifi, Car, Coffee, Shield } from "lucide-react";
import SectionHeading from "@/components/conference/SectionHeading";

const hotels = [
  {
    name: "Transcorp Hilton Abuja",
    stars: 5,
    distance: "~22 km from University of Abuja",
    price: "From ₦85,000/night",
    phone: "+234 9 461 3000",
    website: "hilton.com",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Transcorp_Hilton%2C_Abuja.jpg",
    amenities: ["Free WiFi", "Pool", "Gym", "Restaurant", "Parking"],
    desc: "Abuja's flagship luxury hotel with world-class facilities and panoramic city views.",
    location: "Plot 1096, Aguiyi Ironsi Street, Maitama",
    featured: true,
  },
  {
    name: "Nicon Luxury Hotel",
    stars: 4,
    distance: "~15 km from University of Abuja",
    price: "From ₦55,000/night",
    phone: "+234 9 461 4000",
    website: "niconluxury.com",
    img: "https://niconluxury.com/yardThree.jpg",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Business Center"],
    desc: "Stylish 4-star hotel centrally located with easy access to major attractions.",
    location: "Plot 903, Tafawa Balewa Way, Central Business District",
  },
  {
    name: "ASUU Charlet",
    stars: 3,
    distance: "~20 km from University of Abuja",
    price: "From ₦18,000/night",
    phone: "+234 9 876 5432",
    website: "uniabuja.edu.ng",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    amenities: ["Free WiFi", "Restaurant", "Parking", "Security"],
    desc: "Comfortable accommodation option near the University of Abuja.",
    location: "University of Abuja, FCT",
  },
  {
    name: "Hawthorn Suites by Wyndham",
    stars: 4,
    distance: "~25 km from University of Abuja",
    price: "From ₦48,000/night",
    phone: "+234 9 290 5000",
    website: "wyndhamhotels.com",
    img: "https://www.wyndhamhotels.com/content/dam/property-images/en-us/bh/ng/others/abuja/31741/31741_exterior_view_2.jpg?crop=3000:2000;*,*&downsize=1800:*",
    amenities: ["Free WiFi", "Pool", "Gym", "Breakfast Included"],
    desc: "Extended-stay suites perfect for delegates attending the full 4-day conference.",
    location: "Plot 861, Cadastral Zone, Wuse II",
  },
  {
    name: "Abuja Continental Hotel",
    stars: 4,
    distance: "~8 km from University of Abuja",
    price: "From ₦42,000/night",
    phone: "+234 9 461 5000",
    website: "abujacontinenal.com",
    img: "https://image-tc.galaxy.tf/wijpeg-c2uhscjmido2fwifh5l3a1jse/aerial-view.jpg?width=1920",
    amenities: ["Free WiFi", "Restaurant", "Conference Rooms", "Parking"],
    desc: "Modern hotel offering great value with proximity to the University of Abuja.",
    location: "Ladi Kwali Way, Central Business District",
  },
  {
    name: "Divine Love (DDL) Retreat and Conference Centre",
    stars: 3,
    distance: "~20 km from University of Abuja",
    price: "₦18,000 - ₦35,000/night",
    phone: "+234 9 876 5000",
    website: "dracc.org",
    img: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHJYtaNGoiZKLnQ-H3x3BvLIe0zac_nmD2Ss8HSFM69h_eAzT2CDN-SV8mwY2pxqa8oH9RALwKzoWpniR8ycz5VV9gfLlcHWzHb4OqQZR87gACmL7_KaQWCIr9Od-WwXjqE_AxpPg=s680-w680-h510",
    amenities: ["Free WiFi", "Restaurant", "Parking", "Security"],
    desc: "Daughters of Divine Love Retreat and Conference Centre — a quiet, budget-friendly option for delegates.",
    location: "Aco Estate, Lugbe, Abuja, Nigeria",
    featured: true,
  },
];

const amenityIcons = {
  "Free WiFi": Wifi,
  "Parking": Car,
  "Restaurant": Coffee,
  "Security": Shield,
};

export default function Accommodation() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-20 md:py-28 text-white overflow-hidden">
        <div className="absolute inset-0" style={{ animation: 'fadeInBg 1.5s ease-out forwards' }}>
          <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1600&q=80" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <style>{`@keyframes fadeInBg { from { opacity: 0; } to { opacity: 1; } }`}</style>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Where to Stay"
            title="Accommodation in Abuja"
            description="We've curated a selection of hotels near the University of Abuja campus — from luxury 5-star properties to comfortable budget options. Delegates are advised to book early."
            light
          />
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.map((hotel, i) => (
              <motion.div
                key={hotel.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className={`rounded-2xl overflow-hidden border bg-card shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col ${
                  hotel.featured ? "border-green-400 ring-2 ring-green-300/40" : "border-border"
                }`}
              >
                <div className="relative h-52 overflow-hidden">
                  <img src={hotel.img} alt={hotel.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  {hotel.featured && (
                    <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-yellow-500 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400" />
                    {hotel.stars}-Star
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-lg mb-1">{hotel.name}</h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                    <MapPin className="w-3 h-3" />
                    <span>{hotel.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{hotel.desc}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.amenities.slice(0, 4).map((a) => (
                      <span key={a} className="text-xs bg-green-50 text-green-700 border border-green-200 rounded-full px-2.5 py-0.5">
                        {a}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <p className="font-bold text-green-700 text-sm">{hotel.price}</p>
                      <p className="text-xs text-muted-foreground">{hotel.distance}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={`tel:${hotel.phone}`} className="p-2 rounded-full border border-border hover:bg-muted transition-colors">
                        <Phone className="w-3.5 h-3.5 text-muted-foreground" />
                      </a>
                      <a href={`https://${hotel.website}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-border hover:bg-muted transition-colors">
                        <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-2xl text-center">
            <p className="text-sm text-yellow-800 font-medium">
              📌 Contact the LOC members for booking. Early booking is strongly advised as the conference period is busy season in Abuja.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}