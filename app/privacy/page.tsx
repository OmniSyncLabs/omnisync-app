import Link from 'next/link'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0A0D14] text-gray-200 px-6 py-12 max-w-4xl mx-auto">
      <Link href="/" className="text-sm text-blue-400 hover:underline mb-8 inline-block">
        &larr; Ana Sayfaya Dön
      </Link>
      
      <h1 className="text-3xl font-bold mb-6 text-white">OmniSync Gizlilik Politikası</h1>
      <p className="text-sm text-gray-400 mb-6">Son Güncelleme: 4 Ekim 2026</p>

      <section className="space-y-6 text-sm leading-relaxed text-gray-300">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2">1. Toplanan Veriler</h2>
          <p>OmniSync, Google OAuth üzerinden giriş yaptığınızda sadece temel profil bilgilerinizi (Ad, Soyad, E-posta adresi ve Profil Resmi) toplar.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">2. Verilerin Kullanımı</h2>
          <p>Kişisel verileriniz yalnızca OmniSync hesabınızı oluşturmak, oturum açma süreçlerini yönetmek ve hizmetlerimizi size sunmak amacıyla kullanılır. Verileriniz üçüncü taraflarla paylaşılmaz veya satılmaz.</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-2">3. İletişim</h2>
          <p>Gizlilik politikamızla ilgili sorularınız için bizimle <span className="text-white font-medium">ahmetkaaneslik@gmail.com</span> adresi üzerinden iletişime geçebilirsiniz.</p>
        </div>
      </section>
    </main>
  )
}