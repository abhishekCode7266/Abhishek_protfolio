import React, { useState } from "react";
import { siteConfig } from "@/data/site";
import { socials } from "@/data/socials";
import { useLanguage } from "@/context/LanguageContext";
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  Copy,
  Check,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const cleanEmail = siteConfig.author.email;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(cleanEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Please provide your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }
    if (formData.message.trim().length < 10) {
      setErrorMessage("Message must be at least 10 characters long.");
      return;
    }

    setStatus("submitting");

    // Construct clean mailto link with encoded subject and body
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Abhishek,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`
    );
    const mailtoUrl = `mailto:${cleanEmail}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setStatus("success");
      // Launch mailto
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-500/20 text-purple-700 dark:text-purple-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Sparkles className="w-3 h-3" />
            <span>{t.contact.badge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.contact.heading}
          </h2>
          <p className="max-w-md mx-auto text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-3">
            {t.contact.subtitle}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-purple-500/20 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/30">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {t.contact.channelsTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                {t.contact.channelsDesc}
              </p>

              <div className="space-y-4">
                {/* Email Box */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-500/10 text-purple-700 dark:text-purple-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                        {t.contact.emailLabel}
                      </span>
                      <a
                        href={`mailto:${cleanEmail}`}
                        className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-300 transition-colors"
                      >
                        {cleanEmail}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-lg bg-slate-200 dark:bg-slate-800 transition-colors cursor-pointer"
                    title="Copy email to clipboard"
                    aria-label="Copy email"
                  >
                    {copiedEmail ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Location */}
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[11px] font-mono text-slate-500 dark:text-slate-400 uppercase">
                      {t.contact.locationLabel}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-white">
                      {t.contact.locationValue}
                    </span>
                  </div>
                </div>

                {/* Social Profiles */}
                <div className="pt-2 flex items-center gap-3">
                  {socials.github && (
                    <a
                      href={socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      <Github className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  )}

                  {socials.linkedin && (
                    <a
                      href={socials.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-colors"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Working Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-[#0c101d] border border-slate-200 dark:border-purple-500/20 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/30">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                {t.contact.formTitle}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                {t.contact.formDesc}
              </p>

              {status === "success" ? (
                <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-500/40 text-center space-y-3 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {t.contact.successTitle}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {t.contact.successDesc}{" "}
                    <strong className="text-emerald-700 dark:text-emerald-300">{cleanEmail}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setStatus("idle");
                      setFormData({ name: "", email: "", message: "" });
                    }}
                    className="mt-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer"
                  >
                    {t.contact.sendAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-300 dark:border-rose-500/40 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-mono uppercase text-slate-600 dark:text-slate-400 mb-1"
                      >
                        {t.contact.nameLabel}
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder={t.contact.namePlaceholder}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-purple-500 focus:outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-mono uppercase text-slate-600 dark:text-slate-400 mb-1"
                      >
                        {t.contact.emailFormLabel}
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder={t.contact.emailPlaceholder}
                        className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-purple-500 focus:outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-mono uppercase text-slate-600 dark:text-slate-400 mb-1"
                    >
                      {t.contact.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder={t.contact.messagePlaceholder}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:border-purple-500 focus:outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-purple-900 text-white text-sm font-semibold shadow-lg shadow-purple-950/20 dark:shadow-purple-950 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  >
                    {status === "submitting" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{t.contact.sending}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>{t.contact.sendButton}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
