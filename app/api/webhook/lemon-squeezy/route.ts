import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    // 1. Lemon Squeezy'den gelen veriyi oku
    const rawBody = await request.text();
    const signature = request.headers.get('x-signature');
    const secret = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

    // Güvenlik kontrolü: Şifreler uyuşuyor mu?
    if (!signature || !secret) {
      return NextResponse.json({ error: 'Eksik imza veya şifre' }, { status: 400 });
    }

    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8');
    const signatureBuffer = Buffer.from(signature, 'utf8');

    if (!crypto.timingSafeEqual(digest, signatureBuffer)) {
      return NextResponse.json({ error: 'Geçersiz imza' }, { status: 401 });
    }

    // 2. Gelen verinin içinden Kullanıcı ID'sini ve Olayı al
    const payload = JSON.parse(rawBody);
    const eventName = payload.meta.event_name;
    const userId = payload.meta.custom_data?.user_id;

    if (!userId) {
      return NextResponse.json({ message: 'User ID bulunamadı' }, { status: 200 });
    }

    // 3. Paketin Adına Göre Plan Tespiti (Pro mu Plus mı?)
    const variantName = payload.data?.attributes?.first_order_item?.variant_name || 
                        payload.data?.attributes?.variant_name || '';
    
    let targetPlan = 'pro';
    if (variantName.toLowerCase().includes('plus')) {
      targetPlan = 'plus';
    }

    // 4. Ödeme Yapıldıysa Veya Abonelik Başladıysa Planı Güncelle
    if (eventName === 'order_created' || eventName === 'subscription_created' || eventName === 'subscription_updated') {
      // Supabase Profiles Tablosu Güncellemesi
      await supabase
        .from('profiles')
        .update({ plan: targetPlan, is_pro: true })
        .eq('id', userId);

      // Supabase Auth Metadata Güncellemesi
      await supabase.auth.admin.updateUserById(userId, {
        user_metadata: { plan: targetPlan }
      });
    } 
    // Abonelik İptal Edildiyse Veya Süresi Bittiyse
    else if (eventName === 'subscription_cancelled' || eventName === 'subscription_expired') {
      await supabase
        .from('profiles')
        .update({ plan: 'free', is_pro: false })
        .eq('id', userId);

      await supabase.auth.admin.updateUserById(userId, {
        user_metadata: { plan: 'free' }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook hatası:', error);
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 });
  }
}