import React from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Phone, Globe } from "lucide-react";
import SectionHeading from "@/components/conference/SectionHeading";

const hotels = [
  {
    name: "ASUU Charlette",
    stars: 4,
    distance: "0 km (on University of Abuja campus)",
    price: "From ₦18,000/night",
    phone: "+234 9 876 5432",
    website: "uniabuja.edu.ng",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    amenities: ["Parking", "Security"],
    desc: "Comfortable accommodation option on the University of Abuja campus.",
    location: "University of Abuja, FCT",
    featured: true,
  },
  {
    name: "Divine Love (DDL) Retreat and Conference Centre",
    stars: 3,
    distance: "~11 km from University of Abuja",
    price: "From ₦20,000/night",
    phone: "+234 9 876 5000",
    website: "dracc.org",
    img: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHJYtaNGoiZKLnQ-H3x3BvLIe0zac_nmD2Ss8HSFM69h_eAzT2CDN-SV8mwY2pxqa8oH9RALwKzoWpniR8ycz5VV9gfLlcHWzHb4OqQZR87gACmL7_KaQWCIr9Od-WwXjqE_AxpPg=s680-w680-h510",
    amenities: ["Parking", "Security"],
    desc: "Daughters of Divine Love Retreat and Conference Centre — a quiet, budget-friendly option for delegates.",
    location: "Aco Estate, Lugbe, Abuja, Nigeria",
    featured: true,
  },
  {
    name: "Casa De Kings",
    stars: 3,
    distance: "~20 km from University of Abuja",
    price: "From ₦21,000/night",
    phone: "+234 9 710 4400",
    website: "hotels.ng",
    img: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAF1Xov3oXpKvKFmQnMot6OwzS2EH-tRi6n0KTk5Qpel-CQUn4sJAuTYL79A3cJxyu03_zHsUbxWOxvPm59wmJZdZd-Z6eUIw_X7I7aj8hlTF2QUe_RVZsmESns8OdbDvZCiPjZQ=w252-h180-k-no",
    amenities: ["Restaurant", "Parking", "Bar", "Security"],
    desc: "Popular hotel in Lugbe Extension off Airport Road offering spacious rooms, on-site restaurant, and reliable service at an affordable rate.",
    location: "Plot 44349, Off Airport Road, Lugbe Extension, Abuja",
  },
  {
    name: "C7 Hazelwood Residence & Suites",
    stars: 3,
    distance: "~20 km from University of Abuja",
    price: "From ₦22,000/night",
    phone: "+234 9 710 3300",
    website: "comabuja.com",
    img: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAHNEcK6cc-fCW41nSGYZXJ-dTft9IZheAazWAcFub_L6vX2n-ZrElHhnCtj4dtdMD5xm8UozW2j6eRb9PXywZUWdM30CzmoBV8zcN2v0yBMoXOPd8FmFJjlDx53-4czyyyrCf9l=s680-w680-h510",
    amenities: ["Free WiFi", "Parking", "Restaurant", "Security"],
    desc: "Modern residence and suites off Airport Road with comfortable rooms, complimentary WiFi, and easy access to both the airport and city centre.",
    location: "Emmanuel Mbaka Boulevard, Off Airport Road, Abuja",
  },
  {
    name: "Nexus Xpress Hotel",
    stars: 3,
    distance: "~22 km from University of Abuja",
    price: "From ₦30,000/night",
    phone: "+234 9 710 5500",
    website: "hotels.ng",
    img: "https://lh3.googleusercontent.com/gps-cs-s/APNQkAG4M4UtuCpuizSTMAvf62fulnQoL9h93Zoh6uT0p_8qwkt_lnJbSf5ClK30DXpntE_SzhwEuru9xB5vF3XZygPibj-nbYZ9VHg3fZIpNgF3YugRdx53wedix9WWsUWCdSyuroJ0Iw=s680-w680-h510",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Parking", "Breakfast Included"],
    desc: "Well-rated hotel in Lugbe offering comfortable rooms, complimentary breakfast, and easy access to the airport and Abuja's business districts.",
    location: "Lugbe, Airport Road, Abuja",
  },
  {
    name: "Hawthorn Suites by Wyndham",
    stars: 4,
    distance: "~25 km from University of Abuja",
    price: "From ₦55,000/night",
    phone: "+234 9 290 5000",
    website: "wyndhamhotels.com",
    img: "https://www.wyndhamhotels.com/content/dam/property-images/en-us/bh/ng/others/abuja/31741/31741_exterior_view_2.jpg?crop=3000:2000;*,*&downsize=1800:*",
    amenities: ["Free WiFi", "Pool", "Gym", "Breakfast Included"],
    desc: "Extended-stay suites perfect for delegates attending the full 4-day conference.",
    location: "Plot 861, Cadastral Zone, Wuse II",
  },
  {
    name: "Bourdillon Hotel & Apartments",
    stars: 4,
    distance: "~25 km from University of Abuja",
    price: "From ₦70,000/night",
    phone: "+234 9 169 0640",
    website: "bourdillonhotel.com",
    img: "https://bourdillonhotel.com/wp-content/uploads/2025/08/BHA-Delux-1.jpg",
    amenities: ["Free WiFi", "Pool", "Gym", "Restaurant", "Bar", "Parking"],
    desc: "Luxurious hotel on Airport Road with 50+ rooms, modern facilities, restaurant, gym, and business centre — ideal for delegates seeking premium comfort.",
    location: "Airport Road, Abuja",
  },
  {
    name: "Transcorp Hilton Abuja",
    stars: 5,
    distance: "~22 km from University of Abuja",
    price: "From ₦200,000/night",
    phone: "+234 9 461 3000",
    website: "hilton.com",
    img: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Transcorp_Hilton%2C_Abuja.jpg",
    amenities: ["Free WiFi", "Pool", "Gym", "Restaurant", "Parking"],
    desc: "Abuja's flagship luxury hotel with world-class facilities and panoramic city views.",
    location: "Plot 1096, Aguiyi Ironsi Street, Maitama",
  },
  {
    name: "Abuja Continental Hotel",
    stars: 5,
    distance: "~25 km from University of Abuja",
    price: "From ₦240,000/night",
    phone: "+234 9 461 5000",
    website: "abujacontinental.com",
    img: "https://image-tc.galaxy.tf/wijpeg-c2uhscjmido2fwifh5l3a1jse/aerial-view.jpg?width=1920",
    amenities: ["Free WiFi", "Restaurant", "Conference Rooms", "Parking"],
    desc: "Modern hotel offering great value with proximity to the University of Abuja.",
    location: "Ladi Kwali Way, Central Business District",
  },
];

export default function Accommodation() {
  return (
    <div className="pt-10">
      {/* Hero */}
      <section className="relative py-10 md:py-10 bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=1600&q=80" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
          <SectionHeading
            label="Where to Stay"
            title="Accommodation in Abuja"
            description="We've curated a selection of hotels near the University of Abuja campus — from luxury 5-star properties to comfortable budget options. Delegates are advised to book early."
            light
            titleClass="text-3xl md:text-4xl lg:text-5xl dark:text-white"
            descClass="dark:text-white"
          />
        </div>
      </section>

      {/* Hotels Grid */}
      <section className="py-10 md:py-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {hotels.map((hotel, i) => (
              <motion.div
                key={hotel.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.5 }}
                className={`rounded-xl overflow-hidden border bg-card shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col ${
                  hotel.featured ? "border-green-400 ring-2 ring-green-300/40" : "border-border"
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={hotel.img} alt={hotel.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  {hotel.featured && (
                    <span className="absolute top-3 left-3 bg-green-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                      Recommended
                    </span>
                  )}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-yellow-500 text-sm font-bold px-2 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400" />
                    {hotel.stars}-Star
                  </div>
                </div>

                <div className="p-3 md:p-4 flex flex-col flex-1">
                  <h3 className="font-heading font-bold text-xl mb-1">{hotel.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{hotel.location}</span>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed mb-2 flex-1">{hotel.desc}</p>

                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {hotel.amenities.slice(0, 4).map((a) => (
                      <span key={a} className="text-sm bg-green-50 text-green-700 border border-green-200 rounded-full px-2.5 py-0.5">
                        {a}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border">
                    <div>
                      <p className="font-bold text-green-700 text-base">{hotel.price}</p>
                      <p className="text-sm text-muted-foreground">{hotel.distance}</p>
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

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-center">
            <p className="text-sm text-yellow-800 font-medium">
              Contact the LOC members for booking. Early booking is strongly advised as the conference period is busy season in Abuja.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}