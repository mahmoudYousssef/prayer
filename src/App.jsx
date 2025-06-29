import React, { useEffect, useState } from "react";
import Prayer from "./component/Prayer";

const LoadingSpinner = () => (
  <div className="loading-overlay">
    <div className="prayer-spinner"></div>
    <p className="loading-text">جاري تحميل مواقيت الصلاة...</p>
  </div>
);
function App() {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [dateTime, setDateTime] = useState("");
  const [city, setCity] = useState("Cairo");
  const [country, setCountry] = useState("Egypt");
  const [loading, setLoading] = useState(true);

  const countries = [
    {
      name: "مصر",
      value: "Egypt",
      cities: [
        { name: "القاهرة", value: "Cairo" },
        { name: "الإسكندرية", value: "Alexandria" },
        { name: "الجيزة", value: "Giza" },
        { name: "المنصورة", value: "Mansoura" },
        { name: "قنا", value: "Qena" },
        { name: "الأقصر", value: "Luxor" },
        { name: "أسوان", value: "Aswan" },
        { name: "بورسعيد", value: "Port Said" },
        { name: "السويس", value: "Suez" },
        { name: "المنيا", value: "Minya" },
        { name: "أسيوط", value: "Asyut" },
        { name: "سوهاج", value: "Sohag" },
        { name: "دمياط", value: "Damietta" },
        { name: "الفيوم", value: "Faiyum" },
        { name: "بنها", value: "Banha" },
        { name: "طنطا", value: "Tanta" },
        { name: "الزقازيق", value: "Zagazig" },
        { name: "شرم الشيخ", value: "Sharm El Sheikh" }
      ]
    },
    {
      name: "السعودية",
      value: "Saudi Arabia",
      cities: [
        { name: "مكة", value: "Makkah" },
        { name: "المدينة", value: "Madinah" },
        { name: "الرياض", value: "Riyadh" },
        { name: "جدة", value: "Jeddah" },
        { name: "الدمام", value: "Dammam" }
      ]
    },
    {
      name: "الإمارات",
      value: "United Arab Emirates",
      cities: [
        { name: "دبي", value: "Dubai" },
        { name: "أبوظبي", value: "Abu Dhabi" },
        { name: "الشارقة", value: "Sharjah" }
      ]
    },
    {
      name: "الأردن",
      value: "Jordan",
      cities: [
        { name: "عمان", value: "Amman" },
        { name: "الزرقاء", value: "Zarqa" }
      ]
    }
  ];

  useEffect(() => {
    const fetchPrayerTime = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=5`
        );
        const data = await res.json();
        setPrayerTimes(data.data.timings);
        setDateTime(data.data.date.gregorian.date);
      } catch (err) {
        console.error("فشل في جلب البيانات:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayerTime();
  }, [city, country]);
  
  if (loading) {
    return <LoadingSpinner />;
  }

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    // تحديث المدينة الأولى افتراضيًا عند تغيير الدولة
    const selectedCountry = countries.find(c => c.value === e.target.value);
    if (selectedCountry && selectedCountry.cities.length > 0) {
      setCity(selectedCountry.cities[0].value);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section>
      <div className="container">
            <div className="date">
            <h3>التاريخ</h3>
            <h4>{dateTime}</h4>
          </div>
        <div className="top-sec">
    
          <div className="country">
            <h3>الدولة</h3>
            <select 
              value={country} 
              onChange={handleCountryChange}
            >
              {countries.map((country) => (
                <option key={country.value} value={country.value}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="city">
            <h3>المدينة</h3>
            <select 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
            >
              {countries.find(c => c.value === country)?.cities.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>
          
        </div>

        <div className="prayers-grid">
          <Prayer name="الفجر" time={prayerTimes?.Fajr || "--:--"} />
          <Prayer name="الشروق" time={prayerTimes?.Sunrise || "--:--"} />
          <Prayer name="الظهر" time={prayerTimes?.Dhuhr || "--:--"} />
          <Prayer name="العصر" time={prayerTimes?.Asr || "--:--"} />
          <Prayer name="المغرب" time={prayerTimes?.Maghrib || "--:--"} />
          <Prayer name="العشاء" time={prayerTimes?.Isha || "--:--"} />
        </div>
      </div>
    </section>
  );
}

export default App;