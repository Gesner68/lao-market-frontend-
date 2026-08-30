'use client';
import { useState, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle2, QrCode, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const title = searchParams.get('title') || 'Sản phẩm đặt mua';
  const price = searchParams.get('price') || '180000';

  const [step, setStep] = useState<'FORM' | 'QR_PAY'>('FORM');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderCode, setOrderCode] = useState('');

  const handlePlaceOrder = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const generatedCode = 'LM' + Math.floor(100000 + Math.random() * 900000);
    setOrderCode(generatedCode);
    setStep('QR_PAY');
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="flex items-center space-x-3 mb-6">
        <button onClick={() => router.back()} className="p-2 bg-white rounded-xl shadow-sm border border-slate-200">
          <ArrowLeft className="w-4 h-4 text-slate-700" />
        </button>
        <h1 className="font-bold text-base text-slate-900">
          {step === 'FORM' ? 'Thông tin giao hàng / ລາຍລະອຽດການຈັດສົ່ງ' : 'Thanh toán QR / ຊຳລະເງິນຜ່ານ QR'}
        </h1>
      </div>

      {step === 'FORM' ? (
        <form onSubmit={handlePlaceOrder} className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Đơn hàng của bạn</h2>
            <p className="font-semibold text-sm text-slate-900">{title}</p>
            <p className="text-base font-extrabold text-red-600 mt-2">
              {Number(price).toLocaleString('en-US')} ₭ (LAK)
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Tên người nhận / ຊື່ຜູ້ຮັບ *</label>
              <input 
                required
                type="text" 
                placeholder="Ví dụ: Somphone / Nguyễn Văn A"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#0f3e6d]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Số điện thoại / ເບີໂທລະສັບ (WhatsApp) *</label>
              <input 
                required
                type="tel" 
                placeholder="020 xxxxxxxx"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#0f3e6d]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Địa chỉ giao hàng / ສະຖານທີ່ຈັດສົ່ງ *</label>
              <textarea 
                required
                rows={2}
                placeholder="Số nhà, Bản, Muang, Tỉnh (Ví dụ: Ban Phonxay, Xaysetha, Vientiane)"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#0f3e6d]"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#0f3e6d] hover:bg-blue-800 text-white font-bold py-3.5 rounded-2xl shadow-lg transition"
          >
            Tiếp tục thanh toán QR BCEL OnePay
          </button>
        </form>
      ) : (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-md text-center space-y-5">
          <div className="inline-flex items-center space-x-1.5 bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
            <QrCode className="w-3.5 h-3.5" />
            <span>BCEL OnePay / LDB Trust</span>
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">Quét mã để thanh toán</h2>
            <p className="text-xs text-slate-500 mt-1">Sử dụng ứng dụng ngân hàng BCEL One hoặc các ngân hàng tại Lào</p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-300 inline-block">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=BCELONE_LAOMARKET_ORDER_${orderCode}_AMOUNT_${price}`}
              alt="Mã QR BCEL OnePay"
              className="w-48 h-48 mx-auto rounded-lg shadow-sm"
            />
          </div>

          <div className="bg-slate-50 p-3 rounded-xl text-left space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Mã đơn hàng:</span>
              <span className="font-bold text-slate-900">{orderCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Số tiền cần thanh toán:</span>
              <span className="font-bold text-red-600">{Number(price).toLocaleString('en-US')} ₭</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Nội dung chuyển khoản:</span>
              <span className="font-bold text-blue-600">{orderCode}</span>
            </div>
          </div>

          <div className="flex items-center justify-center space-x-1.5 text-emerald-600 text-xs font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Tiền được giữ an toàn cho đến khi nhận hàng</span>
          </div>

          <Link 
            href="/"
            className="w-full block bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-2xl shadow transition text-sm"
          >
            Đã chuyển khoản xong (Quay lại trang chủ)
          </Link>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-slate-500">Đang tải giỏ hàng...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
