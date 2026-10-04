import Link from 'next/link'

// TODO: Yeni e-posta adresini aldığımızda burayı güncelleyelim!
const SUPPORT_EMAIL = 'support@omnisync-app.vercel.app'

export default function PrivacyPage() {
  return (
    <div style={{ backgroundColor: '#0A0D14', color: '#F3F4F6', minHeight: '100vh', fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      
      {/* Üst Bar / Header */}
      <nav style={{ borderBottom: '1px solid #1F2937', backgroundColor: 'rgba(15, 18, 25, 0.8)', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(8px)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ color: '#9CA3AF', textDecoration: 'none', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            ← Ana Sayfaya Dön
          </Link>
          
          {/* OmniSync Marka & Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg, #0066FF 0%, #7000FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#fff', fontSize: '12px' }}>
              OS
            </div>
            <span style={{ fontWeight: '800', fontSize: '18px', color: '#FFFFFF', letterSpacing: '-0.5px' }}>
              Omni<span style={{ color: '#0066FF' }}>Sync</span>
            </span>
          </div>
        </div>
      </nav>

      {/* Ana Gövde */}
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '48px 24px 80px 24px' }}>
        
        {/* Başlık Alanı */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          {/* Logo Çerçevesi */}
          <div style={{ display: 'inline-flex', padding: '16px', backgroundColor: '#0F1219', borderRadius: '24px', border: '1px solid #1F2937', marginBottom: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, #0066FF 0%, #7000FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: '900', fontSize: '22px' }}>
              O+S
            </div>
          </div>

          <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#FFFFFF', margin: '0 0 12px 0', letterSpacing: '-1px' }}>
            OmniSync Gizlilik Politikası
          </h1>
          <p style={{ color: '#9CA3AF', fontSize: '16px', margin: 0 }}>
            Verilerinizin güvenliği ve gizliliği bizim için en büyük önceliktir.
          </p>
          <div style={{ display: 'inline-block', marginTop: '16px', padding: '6px 16px', backgroundColor: '#111827', borderRadius: '20px', border: '1px solid #1F2937', fontSize: '12px', color: '#6B7280' }}>
            Son Güncelleme: 4 Ekim 2026
          </div>
        </div>

        {/* Maddeler - Dark Card Yapısı */}
        <div style={{ display: 'grid', gap: '20px', marginBottom: '40px' }}>
          
          <div style={{ backgroundColor: '#0F1219', padding: '28px', borderRadius: '20px', border: '1px solid #1F2937' }}>
            <div style={{ color: '#0066FF', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              MADDELER — 01
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#FFFFFF', margin: '0 0 12px 0' }}>
              1. Toplanan Veriler
            </h2>
            <p style={{ color: '#D1D5DB', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
              OmniSync, Google OAuth üzerinden güvenli giriş yaptığınızda yalnızca hesabınızı oluşturmak ve doğrulamak için gerekli olan temel bilgileri (Ad, Soyad, E-posta adresi ve Profil Resmi) toplar. Hassas erişim izinleri istenmez.
            </p>
          </div>

          <div style={{ backgroundColor: '#0F1219', padding: '28px', borderRadius: '20px', border: '1px solid #1F2937' }}>
            <div style={{ color: '#7000FF', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              MADDELER — 02
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#FFFFFF', margin: '0 0 12px 0' }}>
              2. Verilerin Kullanımı
            </h2>
            <p style={{ color: '#D1D5DB', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
              Kişisel verileriniz yalnızca OmniSync platformu içerisinde oturum açmanızı sağlamak, profil bilgilerinizi görüntülemek ve abonelik statünüzü kontrol etmek amacıyla kullanılır. Verileriniz izinsiz işlenmez.
            </p>
          </div>

          <div style={{ backgroundColor: '#0F1219', padding: '28px', borderRadius: '20px', border: '1px solid #1F2937' }}>
            <div style={{ color: '#00F0FF', fontWeight: '700', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
              MADDELER — 03
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#FFFFFF', margin: '0 0 12px 0' }}>
              3. Veri Güvenliği & Paylaşım
            </h2>
            <p style={{ color: '#D1D5DB', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
              Toplanan hiçbir kişisel veri üçüncü şahıslara, reklam ortaklarına veya dış kurumlara satılmaz ve kiralanamaz. Tüm veriler Supabase altyapısında şifrelenmiş olarak saklanır.
            </p>
          </div>

        </div>

        {/* İletişim Kutusu */}
        <div style={{ backgroundColor: '#111827', padding: '32px', borderRadius: '24px', border: '1px solid #374151', textAlign: 'center' }}>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#FFFFFF', margin: '0 0 10px 0' }}>
            4. İletişim ve Destek
          </h2>
          <p style={{ color: '#9CA3AF', fontSize: '14px', marginBottom: '20px', lineHeight: '1.5' }}>
            Gizlilik politikamız veya hesabınızla ilgili sorularınız için doğrudan ekibimizle iletişime geçebilirsiniz.
          </p>
          <a 
            href={`mailto:${SUPPORT_EMAIL}`}
            style={{ display: 'inline-block', backgroundColor: '#0066FF', color: '#FFFFFF', padding: '12px 28px', borderRadius: '12px', fontWeight: '600', textDecoration: 'none', fontSize: '14px' }}
          >
            Bize E-posta Gönder ({SUPPORT_EMAIL})
          </a>
        </div>

        {/* Footer */}
        <div style={{ textAlign: 'center', marginTop: '60px', color: '#4B5563', fontSize: '13px' }}>
          © 2026 OmniSync App. Tüm hakları saklıdır.
        </div>

      </div>
    </div>
  )
}