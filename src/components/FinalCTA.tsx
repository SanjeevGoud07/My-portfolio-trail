import { useEffect, useRef, useState, type FormEvent } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { createPortal } from 'react-dom';
import { profile } from '../data/portfolio';
import { useScrollLock, useSmoothScroll } from '../hooks/smoothScroll';
import { EASE, Magnetic, Particles } from './fx';
import { SeriesMark } from './Poster';

export default function FinalCTA({ onReplay }: { onReplay: () => void }) {
  const ref = useRef<HTMLElement>(null);
  const [activeModal, setActiveModal] = useState<'create' | 'email' | null>(null);
  const { scrollTo } = useSmoothScroll();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.2'] });
  const spacing = useTransform(scrollYProgress, [0, 1], ['0.6em', '0.02em']);
  const blur = useTransform(scrollYProgress, [0, 1], ['blur(16px)', 'blur(0px)']);
  const opacity = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  useScrollLock(activeModal !== null);

  const ctas = [
    { label: "Let's Create", primary: true, cursor: 'play', onClick: () => setActiveModal('create') },
    { label: 'LinkedIn', href: profile.links.linkedin, cursor: 'link' },
    { label: 'GitHub', href: profile.links.github, cursor: 'link' },
    { label: 'Email', cursor: 'link', onClick: () => setActiveModal('email') },
  ];

  return (
    <section id="contact" ref={ref} className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-4 py-24 text-center">
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_60%,rgba(229,19,43,0.18),transparent_70%)]" />
      <Particles count={36} />

      <motion.p
        className="relative mb-6 text-[11px] font-bold uppercase tracking-[0.5em] text-crimson-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        The Next Episode
      </motion.p>
      <motion.h2
        className="relative font-display leading-[0.85] text-bone"
        style={{ fontSize: 'clamp(3.4rem, 13vw, 12rem)', letterSpacing: spacing, filter: blur, opacity }}
      >
        TO BE CONTINUED…
      </motion.h2>

      <motion.div
        className="relative mt-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
      >
        <p className="font-sans text-2xl font-semibold tracking-[0.2em] text-bone sm:text-3xl">{profile.displayName.toUpperCase()}</p>
        <p className="mt-2 text-xs font-semibold tracking-[0.4em] text-mist sm:text-sm">{profile.role.toUpperCase()}</p>
      </motion.div>

      <motion.div
        className="relative mt-10 flex flex-wrap justify-center gap-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.08, delayChildren: 0.35 }}
      >
        {ctas.map((c) => (
          <motion.div key={c.label} variants={{ hidden: { opacity: 0, y: 20, scale: 0.9 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: EASE } } }}>
            <Magnetic>
              {c.href ? (
                <a
                  href={c.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor={c.cursor}
                  className={`flex min-h-12 items-center gap-2 rounded-full px-7 text-sm font-bold tracking-[0.12em] transition ${
                    c.primary ? 'bg-crimson text-white shadow-[0_0_50px_rgba(229,19,43,0.5)] hover:bg-crimson-2' : 'border border-white/25 text-bone hover:border-bone hover:bg-white/10'
                  }`}
                >
                  {c.primary && <span>▶</span>}
                  {c.label.toUpperCase()}
                  {!c.primary && <span className="text-mist">↗</span>}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={c.onClick}
                  data-cursor={c.cursor}
                  className={`flex min-h-12 items-center gap-2 rounded-full px-7 text-sm font-bold tracking-[0.12em] transition ${
                    c.primary ? 'bg-crimson text-white shadow-[0_0_50px_rgba(229,19,43,0.5)] hover:bg-crimson-2' : 'border border-white/25 text-bone hover:border-bone hover:bg-white/10'
                  }`}
                >
                  {c.primary && <span>▶</span>}
                  {c.label.toUpperCase()}
                  {!c.primary && <span className="text-mist">↗</span>}
                </button>
              )}
            </Magnetic>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative mt-16 flex flex-wrap justify-center gap-6 text-xs font-semibold tracking-[0.24em] text-smoke">
        <button type="button" onClick={() => scrollTo(0, { offset: 0 })} className="hover:text-bone">
          ↺ WATCH AGAIN
        </button>
        <button type="button" onClick={onReplay} className="hover:text-bone">
          ▶ REPLAY OPENING
        </button>
      </div>

      <footer className="absolute inset-x-0 bottom-0 px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center">
        <div className="mb-2 text-base">
          <SeriesMark />
        </div>
        <p className="text-[11px] leading-relaxed text-smoke">
          © {new Date().getFullYear()} {profile.displayName}. A personal, streaming-inspired portfolio — not affiliated with any streaming service.
        </p>
      </footer>
      {activeModal && createPortal(
        <ContactModal mode={activeModal} onClose={() => setActiveModal(null)} />,
        document.body,
      )}
    </section>
  );
}

function ContactModal({ mode, onClose }: { mode: 'create' | 'email'; onClose: () => void }) {
  const closeButton = useRef<HTMLButtonElement>(null);
  const [copyMessage, setCopyMessage] = useState('');
  const isCreate = mode === 'create';

  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    closeButton.current?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  function submitRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') || '');
    const body = [
      `Name: ${name}`,
      `Email: ${formData.get('email')}`,
      `Phone Number: ${formData.get('phone') || 'Not provided'}`,
      '',
      'What I would like to create:',
      String(formData.get('description') || 'Not provided'),
    ].join('\n');
    const subject = name ? `Request Creation - ${name}` : 'Request Creation';
    const composeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(composeUrl, '_blank', 'noopener,noreferrer');
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyMessage('Email address copied.');
    } catch (error) {
      console.error('Unable to copy the email address to the clipboard.', error);
      setCopyMessage('Unable to copy automatically. Select the address above to copy it.');
    }
  }

  return (
    <motion.div
      className="fixed inset-0 z-[160] flex items-center justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <motion.div
        data-lenis-prevent
        className="glass relative my-auto w-full max-w-xl rounded-2xl p-6 text-left shadow-2xl sm:p-8"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButton}
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-bone transition hover:bg-white/20"
        >
          ✕
        </button>

        {isCreate ? (
          <>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.35em] text-crimson-2">Let’s make something</p>
            <h2 id="contact-modal-title" className="mb-6 pr-10 font-display text-4xl tracking-wide text-bone sm:text-5xl">
              Tell me your idea
            </h2>
            <form onSubmit={submitRequest} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-xs font-semibold text-mist">
                  Name <span className="text-crimson-2">*</span>
                  <input name="name" autoComplete="name" required className="contact-field" />
                </label>
                <label className="space-y-2 text-xs font-semibold text-mist">
                  Email <span className="text-crimson-2">*</span>
                  <input name="email" type="email" autoComplete="email" required className="contact-field" />
                </label>
              </div>
              <label className="block space-y-2 text-xs font-semibold text-mist">
                Phone Number
                <input name="phone" type="tel" autoComplete="tel" className="contact-field" />
              </label>
              <label className="block space-y-2 text-xs font-semibold text-mist">
                What would you like to create together?
                <textarea name="description" rows={4} className="contact-field resize-y" />
              </label>
              <p className="text-xs leading-relaxed text-smoke">
                Submit opens your email app with these details addressed to {profile.email}. Review and send the message there.
              </p>
              <button type="submit" className="min-h-12 w-full rounded-full bg-crimson px-6 text-sm font-bold tracking-[0.12em] text-white transition hover:bg-crimson-2">
                SUBMIT REQUEST
              </button>
            </form>
          </>
        ) : (
          <>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.35em] text-crimson-2">Get in touch</p>
            <h2 id="contact-modal-title" className="mb-6 pr-10 font-display text-4xl tracking-wide text-bone sm:text-5xl">
              Email me
            </h2>
            <p className="mb-2 text-xs font-semibold text-mist">EMAIL ADDRESS</p>
            <p className="break-all text-lg text-bone sm:text-xl">{profile.email}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button type="button" onClick={copyEmail} className="min-h-12 rounded-full border border-white/25 px-6 text-sm font-bold text-bone transition hover:border-bone hover:bg-white/10">
                COPY ADDRESS
              </button>
              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent('Hello Sanjeev')}&body=${encodeURIComponent('Hello Sanjeev, nice to meet you.')}`}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-12 items-center justify-center rounded-full bg-crimson px-6 text-sm font-bold text-white transition hover:bg-crimson-2"
              >
                INTERACT
              </a>
            </div>
            <p className="mt-4 min-h-5 text-sm text-mist" aria-live="polite">{copyMessage}</p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
