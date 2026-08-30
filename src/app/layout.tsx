import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Lao Market - Chợ Mua Bán Trực Tuyến Lào',
  description: 'Nền tảng mua bán đa ngành hàng tại Lào, thanh toán QR BCEL OnePay và thưởng USDT',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lo">
      <body className="antialiased min-h-screen pb-20 max-w-md mx-auto bg-white shadow-xl md:max-w-4xl border-x border-slate-100">
        {children}
      </body>
    </html>
  );
}
