export interface ShipmentEmailData {
  trackingNumber: string;
  status: string;
  statusDescription: string;
  senderName: string;
  senderEmail: string;
  recipientName: string;
  recipientEmail: string;
  origin: string;
  destination: string;
  service: string;
  eta: string;
  eventText?: string;
  action: 'created' | 'updated';
}

const {
  VITE_EMAILJS_SERVICE_ID,
  VITE_EMAILJS_TEMPLATE_ID,
  VITE_EMAILJS_PUBLIC_KEY
} = import.meta.env;

export function isEmailConfigured(): boolean {
  return Boolean(VITE_EMAILJS_SERVICE_ID && VITE_EMAILJS_TEMPLATE_ID && VITE_EMAILJS_PUBLIC_KEY);
}

async function sendOne(toEmail: string, toName: string, data: ShipmentEmailData): Promise<boolean> {
  if (!isEmailConfigured()) return false;
  try {
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: VITE_EMAILJS_SERVICE_ID,
        template_id: VITE_EMAILJS_TEMPLATE_ID,
        user_id: VITE_EMAILJS_PUBLIC_KEY,
        template_params: {
          to_email: toEmail,
          to_name: toName,
          tracking_number: data.trackingNumber,
          tracking_url: `${window.location.origin}/tracking?number=${data.trackingNumber}`,
          action: data.action,
          status: data.status,
          status_description: data.statusDescription,
          event_text: data.eventText || data.statusDescription,
          sender_name: data.senderName,
          sender_email: data.senderEmail,
          recipient_name: data.recipientName,
          recipient_email: data.recipientEmail,
          origin: data.origin,
          destination: data.destination,
          service: data.service,
          eta: data.eta,
          date_time: new Date().toLocaleString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
          })
        }
      })
    });
    if (res.ok) return true;
    const body = await res.text().catch(() => '');
    console.warn('EmailJS send failed', res.status, body);
    return false;
  } catch (e) {
    console.warn('Email notification failed', e);
    return false;
  }
}

export const emailService = {
  isConfigured: isEmailConfigured,

  /** Best-effort notify sender + recipient. Never throws, safe to fire-and-forget. */
  async notifyShipment(data: ShipmentEmailData): Promise<{ sent: number }> {
    if (!isEmailConfigured()) return { sent: 0 };
    let sent = 0;
    if (data.senderEmail) {
      if (await sendOne(data.senderEmail, data.senderName || 'Shipper', data)) sent++;
    }
    if (data.recipientEmail && data.recipientEmail !== data.senderEmail) {
      if (await sendOne(data.recipientEmail, data.recipientName || 'Recipient', data)) sent++;
    }
    return { sent };
  }
};
