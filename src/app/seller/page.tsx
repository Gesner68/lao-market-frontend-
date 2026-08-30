'use client';
import { useState } from 'react';
import { ArrowLeft, PlusCircle, Award, Wallet, Star, CheckCircle, Package } from 'lucide-react';
import Link from 'next/link';

export default function SellerHubPage() {
  const [activeTab, setActiveTab] = useState<'KPI' | 'ADD_PRODUCT'>('KPI');

  const [productTitle, setProductTitle] = useState('');
  const [category, setCategory] = useState('1');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState('NEW');
  const [usdtWallet, setUsdtWallet] = useState('TYDzsYUbEm5Ysn867JTVQE799EcNVxxUSDT');
  const [isSaved, setIsSaved] = useState(false);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Đăng sản phẩm thành công lên sàn Lao Market!');
    setProductTitle('');
    setPrice('');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Link href="/" className="p-2 bg-white rounded-xl shadow-sm border border-slate-200">
            <ArrowLeft className="w-4 h-4 text-slate-700" />
          </Link>
          <h1 className="font-bold text-base text-slate-900">Kênh Quản Trị Gian Hàng</h1>
        </div>
      </div>

      <div className="flex space-x-2 bg-slate-200 p-1 rounded-2xl mb-4 text-xs font-bold">
        <button 
          onClick={() => setActiveTab('KPI')}
          className={`flex-1 py-2 rounded-xl transition flex items-center justify-center space-x-1.5 ${
            activeTab === 'KPI' ? 'bg-white text-[#0f3e6d] shadow-sm' : 'text-slate-600'
          }`}
        >
          <Award className="w-3.5 h-3.5" />
          <span>Thưởng 5 Sao USDT</span>
        </button>

        <button 
          onClick={() => setActiveTab('ADD_PRODUCT')}
          className={`flex-1 py-2 rounded-xl transition flex items-center justify-center space-x-1.5 ${
            activeTab === 'ADD_PRODUCT' ? 'bg-white text-[#0f3e6d] shadow-sm' : 'text-slate-600'
          }`}
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Đăng Sản Phẩm Mới</span>
        </button>
      </div>

      {activeTab === 'KPI' ? (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-[#0f3e6d] to-blue-900 text-white p-5 rounded-3xl shadow-md space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[11px] text-blue-200 font-semibold uppercase tracking-wider block">Tiến độ nhận thưởng</span>
                <h2 className="text-xl font-black mt-0.5">50.00 USDT / Tháng</h2>
              </div>
              <span className="bg-amber-400 text-slate-950 text-[10px] font-extrabold px-2.5 py-1 rounded-full">
                ĐANG ĐẠT CHUẨN
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-white/10">
              <div className="bg-white/10 p-3 rounded-2xl">
                <div className="flex items-center space-x-1 text-amber-300 text-xs font-semibold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>Tỷ lệ 5 Sao</span>
                </div>
                <p className="text-lg font-bold mt-1">98.2% <span className="text-[10px] text-emerald-400">(Y/c &gt;95%)</span></p>
              </div>

              <div className="bg-white/10 p-3 rounded-2xl">
                <div className="flex items-center space-x-1 text-blue-200 text-xs font-semibold">
                  <Package className="w-3.5 h-3.5" />
                  <span>Đơn hoàn thành</span>
                </div>
                <p className="text-lg font-bold mt-1">42 / 20 đơn</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center space-x-2 text-slate-900">
              <Wallet className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-sm">Ví Blockchain Nhận Thưởng (TRC-20 / BEP-20)</h3>
            </div>
            
            <p className="text-xs text-slate-500">
              Khi đạt chuẩn 5 sao cuối chu kỳ, hệ thống sẽ tự động chuyển thẳng USDT vào địa chỉ ví này.
            </p>

            <input 
              type="text"
              value={usdtWallet}
              onChange={(e) => setUsdtWallet(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono outline-none focus:border-[#0f3e6d]"
            />

            <button 
              onClick={() => { setIsSaved(true); setTimeout(() => setIsSaved(false), 2000); }}
              className="w-full bg-slate-900 text-white text-xs font-bold py-2.5 rounded-xl transition hover:bg-slate-800"
            >
              {isSaved ? 'Đã lưu địa chỉ ví!' : 'Lưu địa chỉ ví USDT'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleAddProduct} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Tên sản phẩm *</label>
            <input 
              required
              type="text" 
              placeholder="Ví dụ: Áo sơ mi nam công sở, Điện thoại iPhone cũ..."
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#0f3e6d]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Ngành hàng *</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#0f3e6d]"
              >
                <option value="1">1. Quần áo & Thời trang</option>
                <option value="2">2. Mỹ phẩm & Làm đẹp</option>
                <option value="3">3. Điện thoại & Đồ công nghệ</option>
                <option value="4">4. Bàn ghế & Nội thất</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Tình trạng *</label>
              <select 
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs outline-none focus:border-[#0f3e6d]"
              >
                <option value="NEW">Mới 100%</option>
                <option value="LIKE_NEW">Cũ 99% / Like New</option>
                <option value="USED">Hàng qua sử dụng</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Giá bán (Kip Lào - LAK) *</label>
            <input 
              required
              type="number" 
              placeholder="Ví dụ: 150000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#0f3e6d]"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-[#0f3e6d] hover:bg-blue-800 text-white font-bold py-3 rounded-xl shadow transition text-sm mt-2"
          >
            Đăng bán lên chợ Lao Market
          </button>
        </form>
      )}
    </div>
  );
}
