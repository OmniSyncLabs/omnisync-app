import Link from 'next/link'
import { ArrowLeft, Mail, ShieldCheck, DatabaseZap, UserCheck } from 'lucide-react'

// TODO: Gerçek support e-postasını aldığında burayı güncelle!
const SUPPORT_EMAIL = 'support@omnisync-app.vercel.app' 

export default function PrivacyPage() {
  const sections = [
    {
      icon: <UserCheck className="w-6 h-6 text-[#0066FF]" />,
      title: '1. Toplanan Veriler',
      description: 'Minimum veri, maksimum hizmet ilkesiyle çalışıyoruz. Google OAuth üzerinden giriş yaptığınızda sadece hesabınızı oluşturmak için gerekli temel profil bilgilerinizi (Ad, Soyad, E-posta adresi ve Profil Resmi) güvenli bir şekilde topluyoruz.',
    },
    {
      icon: <DatabaseZap className="w-6 h-6 text-[#7000FF]" />,
      title: '2. Verilerin Kullanımı',
      description: 'Kişisel verileriniz yalnızca OmniSync platformu içinde kimlik doğrulama, oturum açma süreçlerinin yönetimi ve abonelik durumunuzun kontrolü amacıyla kullanılır.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#00F0FF]" />,
      title: '3. Veri Güvenliği & Paylaşım',
      description: 'Verileriniz bizimle güvendedir. Topladığımız kişisel verileri asla üçüncü taraflarla paylaşmıyor, satmıyor veya kiralamıyoruz. Güvenli veritabanı altyapımızda kriptolanmış olarak saklanır.',
    },
  ]

  return (
    <main className="min-h-screen bg-[#0A0D14] text-gray-200 font-sans">
      {/* Üst Kısım / Header */}
      <nav className="border-b border-gray-800 bg-[#0F1219]/70 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Ana Sayfaya Dön
          </Link>
          <div className="flex items-center gap-2">
            {/* Minimalist O+S Logomuz (SVG yoksa burayı metin olarak bırak) */}
            <span className="font-bold text-lg text-white">Omni</span><span className="font-bold text-lg text-[#0066FF]">Sync</span>
          </div>
        </div>
      </nav>

      {/* Ana İçerik */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24">
        <div className="text-center mb-20">
          <ShieldCheck className="w-16 h-16 text-[#00F0FF] mx-auto mb-6 p-3 bg-[#0F1219] rounded-3xl border border-gray-800 shadow-xl" />
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-white tracking-tighter">
            OmniSync Gizlilik Politikası
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Verilerinizin güvenliği ve gizliliği bizim için en önemli önceliktir. Hangi verileri topladığımızı ve bunları nasıl kullandığımızı aşağıda bulabilirsiniz.
          </p>
          <div className="mt-8 text-sm text-gray-600 bg-gray-900 inline-block px-4 py-1.5 rounded-full border border-gray-800">
            Son Güncelleme: 4 Ekim 2026
          </div>
        </div>

        {/* Veri Maddeleri - Modern Kartlar */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {sections.map((section, index) => (
            <div key={index} className="bg-[#0F1219] p-8 rounded-3xl border border-gray-800 shadow-2xl hover:border-gray-700 transition-colors group">
              <div className="mb-6 bg-gray-900 p-4 inline-block rounded-2xl border border-gray-800 group-hover:scale-105 transition-transform">
                {section.icon}
              </div>
              <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">
                {section.title}
              </h2>
              <p className="text-sm leading-relaxed text-gray-300">
                {section.description}
              </p>
            </div>
          ))}
        </section>

        {/* İletişim / Contact - Özel Kısım */}
        <section className="bg-gray-900/50 p-10 rounded-3xl border border-gray-800 text-center max-w-3xl mx-auto shadow-inner">
          <Mail className="w-12 h-12 text-[#7000FF] mx-auto mb-6" />
          <h2 className="text-2xl font-semibold text-white mb-4 tracking-tight">
            4. İletişim
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Gizlilik politikamızla ilgili herhangi bir sorunuz, geri bildiriminiz veya veri erişim talebiniz varsa, lütfen doğrudan OmniSync Destek ekibiyle iletişime geçin.
          </p>
          <a 
            href={`mailto:${SUPPORT_EMAIL}`}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-gray-800 text-white font-medium rounded-full border border-gray-700 hover:bg-white hover:text-[#0A0D14] transition-all group"
          >
            <Mail className="w-5 h-5 group-hover:scale-110" />
            Bize E-posta Gönder
            <span className="text-gray-400 group-hover:text-[#0A0D14]">{SUPPORT_EMAIL}</span>
          </a>
        </section>

        {/* Alt Bilgi / Footer */}
        <footer className="mt-32 pt-12 border-t border-gray-800 text-center text-sm text-gray-600">
          <p>&copy; 2026 OmniSync. Tüm Hakları Saklıdır.</p>
          <p className="mt-1 text-xs">OmniSync, verilerinizi korumak için en son güvenlik standartlarını kullanır.</p>
        </footer>
      </div>
    </main>
  )
}