import { CreditCard, Headphones, Mail, Phone } from "lucide-react";

const paymentMethods = ["VISA", "MasterCard", "Momo", "COD"];

export default function Footer() {
  return (
    <footer className="bg-teal-700 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 via-pink-500 to-orange-400 text-[9px] font-black tracking-[-0.12em] text-white shadow-lg shadow-orange-900/30">
                365
              </div>
              <div className="leading-none">
                <p className="text-xl font-black tracking-[-0.06em] text-white">365online</p>
              </div>
            </div>

            <p className="mt-5 max-w-sm text-sm leading-6 text-teal-100">
              Khám phá các sản phẩm thiết yếu, thiết bị xu hướng và ưu đãi nổi bật giúp cuộc sống hàng ngày trở nên tiện nghi, hiện đại và đáng tin cậy hơn.
            </p>

            <div className="mt-5 space-y-3 text-sm text-teal-100">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-teal-50" />
                <span>Hotline: 1900 1234</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-teal-50" />
                <span>support@365online.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white">Chăm sóc khách hàng</h3>
            <ul className="space-y-3 text-sm text-teal-100">
              <li><a href="#" className="transition-colors hover:text-white">Hướng dẫn mua hàng</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Chính sách đổi trả</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Bảo hành</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white">Về 365online</h3>
            <ul className="space-y-3 text-sm text-teal-100">
              <li><a href="#" className="transition-colors hover:text-white">Giới thiệu</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Điều khoản dịch vụ</a></li>
              <li><a href="#" className="transition-colors hover:text-white">Bán hàng cùng chúng tôi</a></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-white">Phương thức thanh toán</h3>
            <div className="grid max-w-xs grid-cols-4 gap-3">
              {paymentMethods.map((label) => (
                <div
                  key={label}
                  className="flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-[10px] font-black uppercase tracking-[0.12em] text-white"
                >
                  {label}
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3 text-sm text-teal-100">
              <div className="flex items-center gap-3">
                <Headphones className="h-4 w-4 text-teal-50" />
                <span>Hỗ trợ khách hàng 24/7</span>
              </div>
              <div className="flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-teal-50" />
                <span>Thanh toán an toàn, bảo mật</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/20 pt-6 text-sm text-teal-100">
          <p>© 2026 365online. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
