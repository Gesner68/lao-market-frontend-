'use client';
import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Award, Store, Globe, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const DICTIONARY = {
  lo: {
    searchPlaceholder: 'ຄົ້ນຫາ ເສື້ອຜ້າ, ເຄື່ອງສຳອາງ, ໂທລະສັບ...',
    all: 'ທັງໝົດ',
    fashion: 'ເສື້ອຜ້າ',
    cosmetics: 'ເຄື່ອງສຳອາງ',
    tech: 'ໂທລະສັບ & ໄອທີ',
    furniture: 'ໂຕະຕັ່ງ & ເຟີນີເຈີ',
    conditionNew: 'ໃໝ່ 100%',
    conditionUsed: 'ມືສອງ 99%',
    usdtRewardTag: 'ຮ້ານ 5 ດາວ ຮັບລາງວັນ USDT',
    buyNow: 'ສັ່ງຊື້',
    sellerHub: 'ສູນຜູ້ຂາຍ',
  },
  vi: {
    searchPlaceholder: 'Tìm quần áo, mỹ phẩm, điện thoại...',
    all: 'Tất cả',
    fashion: 'Quần áo',
    cosmetics: 'Mỹ phẩm',
    tech: 'Điện thoại & IT',
    furniture: 'Bàn ghế & Nội thất',
    conditionNew: 'Mới 100%',
    conditionUsed: 'Like New 99%',
    usdtRewardTag: 'Shop 5 Sao Nhận Thưởng USDT',
    buyNow: 'Mua ngay',
    sellerHub: 'Kênh Người Bán',
  }
};

export default function HomePage() {
  const [lang, setLang] = useState<'lo' | 'vi'>('lo');
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [products, setProducts] = useState<any[]>([]);
  const t = DICTIONARY[lang];

  const sampleProducts = [
    {
      id: '1',
      title: 'iPhone 15 Pro Max 256GB VN/A',
      shop_name: 'Vientiane Apple Store',
      min_price_lak: 28500000,
      condition_status: 'NEW',
      thumbnail: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&q=80',
      is_five_star_shop: true,
    },
    {
      id: '2',
      title: 'Áo Thun Polo Nam Cao Cấp Form Rộng',
      shop_name: 'Xaysetha Fashion',
      min_price_lak: 180000,
      condition_status: 'NEW',
      thumbnail: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80',
      is_five_star_shop: true,
    },
    {
      id: '3',
      title: 'Bộ Bàn Ghế Gỗ Phòng Khách Tự Nhiên',
      shop_name: 'Đồ Gỗ Pakse',
      min_price_lak: 12500000,
      condition_status: 'NEW',
      thumbnail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&q=80',
      is_five_star_shop: false,
    },
    {
      id: '4',
      title: 'Kem Dưỡng Ẩm Phục Hồi Da B5',
      shop_name: 'Cosmetics Boutique Laos',
      min_price_lak: 320000,
      condition_status: 'NEW',
      thumbnail: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80',
      is_five_star_shop: true,
    }
  ];

  useEffect(() => {
    fetch('http://localhost:5001/api/products')
      .then(res => res.json())
      .then(data => {
        if (data?.data && data.data.length > 0) {
          setProducts(data.data);
        } else {
          setProducts(sampleProducts);
        }
      })
      .catch(() => setProducts(sampleProducts));
  }, []);

  const categories = [
    { id: 0, name: t.all },
    { id: 1, name: t.fashion },
    { id: 2, name: t.cosmetics },
    { id: 3, name: t.tech },
    { id: 4, name: t.furniture },
  ];

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-50 bg-[#0f3e6d] text-white px-4 py-3 shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="w-6 h-6 text-amber-400" />
          <span className="font-bold text-lg tracking-wide">LAO MARKET</span>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setLang(lang === 'lo' ? 'vi' : 'lo')}
            className="flex items-center space-x-1 text-xs bg-white/20 px-2.5 py-1.5 rounded-full hover:bg-white/30 transition"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="font-semibold">{lang === 'lo' ? 'ພາສາລາວ' : 'Tiếng Việt'}</span>
          </button>
          
          <Link href="/seller" className="text-xs bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold px-3 py-1.5 rounded-full flex items-center shadow">
            <Store className="w-3.5 h-3.5 mr-1" />
            {t.sellerHub}
          </Link>
        </div>
      </header>

      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 px-4 py-2.5 text-xs font-medium flex items-center justify-between shadow-inner">
        <div className="flex items-center space-x-1.5">
          <Award className="w-4 h-4 text-slate-950 fill-current" />
          <span>{t.usdtRewardTag}</span>
        </div>
        <Link href="/seller" className="font-bold underline flex items-center">
          Chi tiết <ChevronRight className="w-3 h-3 ml-0.5" />
        </Link>
      </div>

      <div className="p-4 bg-white border-b border-slate-100">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            className="w-full bg-slate-100 text-sm pl-9 pr-4 py-2 rounded-xl border border-transparent focus:border-[#0f3e6d] focus:bg-white outline-none transition"
          />
        </div>
      </div>

      <div className="flex space-x-2 px-4 py-3 overflow-x-auto no-scrollbar bg-white">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
              activeCategory === cat.id
                ? 'bg-[#0f3e6d] text-white shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="p-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {products.map((item) => (
          <Link 
            key={item.id} 
            href={`/checkout?id=${item.id}&price=${item.min_price_lak}&title=${encodeURIComponent(item.title)}`}
            className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
          >
            <div className="relative aspect-square bg-slate-100 overflow-hidden">
              <img 
                src={item.thumbnail || 'https://via.placeholder.com/300'} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                {item.condition_status === 'NEW' ? t.conditionNew : t.conditionUsed}
              </span>
            </div>

            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-[11px] text-slate-500 font-medium mb-1 truncate">{item.shop_name}</p>
                <h3 className="text-xs font-semibold text-slate-900 line-clamp-2 leading-relaxed">
                  {item.title}
                </h3>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">LAK</span>
                  <span className="text-sm font-bold text-red-600">
                    {Number(item.min_price_lak).toLocaleString('en-US')} ₭
                  </span>
                </div>
                <button className="bg-[#0f3e6d] text-white p-2 rounded-xl group-hover:bg-blue-800 transition shadow">
                  <ShoppingBag className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
