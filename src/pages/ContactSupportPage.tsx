import { useState } from 'react';
import { Phone, Mail, MessageSquare, Clock, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TARGET_EMAIL = 'chaudharydiya536@gmail.com';

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

const ContactSupportPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState('');

  const validate = (): boolean => {
    const errs: FormErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim();
    const message = formData.message.trim();

    if (!name || name.length < 2) errs.name = 'Name is required (min 2 chars)';
    if (name.length > 100) errs.name = 'Name must be under 100 characters';
    if (!email) errs.email = 'Email is required';
    else if (!EMAIL_REGEX.test(email)) errs.email = 'Enter a valid email address';
    if (!subject || subject.length < 3) errs.subject = 'Subject is required (min 3 chars)';
    if (subject.length > 200) errs.subject = 'Subject must be under 200 characters';
    if (!message || message.length < 10) errs.message = 'Message is required (min 10 chars)';
    if (message.length > 2000) errs.message = 'Message must be under 2000 characters';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot spam check
    if (honeypot) return;

    if (!validate()) return;

    const mailSubject = encodeURIComponent(`[Support Ticket] ${formData.subject.trim()}`);
    const mailBody = encodeURIComponent(
      `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\nSubject: ${formData.subject.trim()}\n\nMessage:\n${formData.message.trim()}`
    );

    window.open(`mailto:${TARGET_EMAIL}?subject=${mailSubject}&body=${mailBody}`, '_self');

    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
  };

  const fieldClass = (field: keyof FormErrors) =>
    `w-full bg-background border ${errors[field] ? 'border-destructive' : 'border-border'} px-3 py-2 text-sm font-body text-foreground focus:border-primary focus:outline-none transition-colors`;

  return (
    <div className="space-y-6">
      <div>
        <div className="text-xs tracking-[0.4em] text-primary font-mono-space mb-1">ASSISTANCE</div>
        <h1 className="font-display text-2xl md:text-3xl text-foreground tracking-wider">CONTACT SUPPORT</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Info */}
        <div className="space-y-4 min-w-0">
          <div className="bg-destructive/5 border border-destructive/30 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Phone size={14} className="text-destructive flex-shrink-0" />
              <span className="font-display text-xs tracking-wider text-destructive">24/7 EMERGENCY LINE</span>
            </div>
            <div className="font-display text-xl text-foreground mb-0.5">+91 9636711659</div>
            <div className="text-[10px] font-mono-space text-muted-foreground">+91 6376011942</div>
          </div>

          <div className="bg-card border border-border p-4 space-y-3">
            <h3 className="font-display text-xs tracking-wider text-foreground">SUPPORT CHANNELS</h3>
            {[
              { icon: Phone, label: 'Technical Support', value: '9109217344', sub: 'Mon-Fri 8AM-6PM IST' },
              { icon: Mail, label: 'Email Support', value: TARGET_EMAIL, sub: 'Response within 4 hours' },
              { icon: MessageSquare, label: 'Live Chat', value: 'Available 24/7', sub: 'Avg. wait: 2 minutes' },
            ].map(ch => (
              <div key={ch.label} className="flex items-start gap-2 min-w-0">
                <ch.icon size={13} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-body text-foreground">{ch.label}</div>
                  <div className="text-[11px] font-mono-space text-primary break-all leading-relaxed">{ch.value}</div>
                  <div className="text-[9px] font-mono-space text-muted-foreground">{ch.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-border p-4 space-y-2">
            <h3 className="font-display text-xs tracking-wider text-foreground">REGIONAL OFFICE</h3>
            <div className="flex items-start gap-2">
              <MapPin size={13} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="text-[10px] font-body text-muted-foreground leading-relaxed">
                addddreesssssss<br />
                Sitapura Extension, Vidhani<br />
                Jaipur – 303905, India
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock size={13} className="text-primary mt-0.5 flex-shrink-0" />
              <div className="text-[10px] font-body text-muted-foreground">
                Office Hours: Mon-Fri 9:00 AM — 6:00 PM IST
              </div>
            </div>
          </div>

          <div className="bg-card border border-border p-4">
            <h3 className="font-display text-xs tracking-wider text-foreground mb-2">YOUR SERVICE TEAM</h3>
            {[
              { name: 'Diya Singh Chaudhary', role: 'Founder' },
              { name: 'Prateek Sharma', role: 'Front and Back End Developer ' },
              { name: 'Bhavya Gaur', role: 'Back End Developer (Scensors)' },
              { name: 'Kavyansh Pareek', role: 'R&A Analyst' },
              { name: 'Akshita Kumawat', role: 'Designer' },
            ].map(p => (
              <div key={p.name} className="flex items-center justify-between py-2 border-b border-border last:border-0 gap-2">
                <div className="min-w-0">
                  <div className="text-xs font-body text-foreground truncate">{p.name}</div>
                  <div className="text-[9px] font-mono-space text-muted-foreground">{p.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Form */}
        <div className="lg:col-span-2 bg-card border border-border p-5 md:p-6">
          <h3 className="font-display text-base md:text-lg tracking-wider text-foreground mb-5">SUBMIT SUPPORT TICKET</h3>

          {submitted && (
            <div className="border border-safe/30 bg-safe/5 p-4 mb-5 flex items-start gap-3">
              <CheckCircle size={18} className="text-safe flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-body text-safe font-semibold mb-1">Request Submitted Successfully</div>
                <div className="text-xs font-body text-safe/80">Your support request has been submitted successfully. Our team will contact you soon.</div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Honeypot - hidden from humans */}
            <input
              type="text"
              name="website"
              value={honeypot}
              onChange={e => setHoneypot(e.target.value)}
              className="absolute opacity-0 h-0 w-0 overflow-hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] font-mono-space text-muted-foreground tracking-wider block mb-1">NAME *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => { setFormData({ ...formData, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: undefined }); }}
                  className={fieldClass('name')}
                  maxLength={100}
                />
                {errors.name && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle size={10} className="text-destructive" />
                    <span className="text-[9px] font-mono-space text-destructive">{errors.name}</span>
                  </div>
                )}
              </div>
              <div>
                <label className="text-[9px] font-mono-space text-muted-foreground tracking-wider block mb-1">EMAIL *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => { setFormData({ ...formData, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: undefined }); }}
                  className={fieldClass('email')}
                  maxLength={255}
                />
                {errors.email && (
                  <div className="flex items-center gap-1 mt-1">
                    <AlertCircle size={10} className="text-destructive" />
                    <span className="text-[9px] font-mono-space text-destructive">{errors.email}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <label className="text-[9px] font-mono-space text-muted-foreground tracking-wider block mb-1">SUBJECT *</label>
              <input
                type="text"
                value={formData.subject}
                onChange={e => { setFormData({ ...formData, subject: e.target.value }); if (errors.subject) setErrors({ ...errors, subject: undefined }); }}
                className={fieldClass('subject')}
                maxLength={200}
              />
              {errors.subject && (
                <div className="flex items-center gap-1 mt-1">
                  <AlertCircle size={10} className="text-destructive" />
                  <span className="text-[9px] font-mono-space text-destructive">{errors.subject}</span>
                </div>
              )}
            </div>
            <div>
              <label className="text-[9px] font-mono-space text-muted-foreground tracking-wider block mb-1">ISSUE DESCRIPTION *</label>
              <textarea
                value={formData.message}
                onChange={e => { setFormData({ ...formData, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: undefined }); }}
                rows={6}
                className={`${fieldClass('message')} resize-none`}
                maxLength={2000}
              />
              <div className="flex justify-between mt-1">
                {errors.message ? (
                  <div className="flex items-center gap-1">
                    <AlertCircle size={10} className="text-destructive" />
                    <span className="text-[9px] font-mono-space text-destructive">{errors.message}</span>
                  </div>
                ) : <span />}
                <span className="text-[9px] font-mono-space text-muted-foreground">{formData.message.length}/2000</span>
              </div>
            </div>
            <button
              type="submit"
              className="clip-angled bg-primary text-primary-foreground px-8 py-3 font-display text-sm tracking-widest hover:glow-cyan transition-shadow cursor-pointer flex items-center gap-2"
            >
              <Send size={14} />
              SUBMIT TICKET
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSupportPage;
