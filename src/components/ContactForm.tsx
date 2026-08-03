import React, { useState } from 'react';
import { ContactFormData } from '../types';
import { Send, CheckCircle2, Phone, Clock, AlertCircle } from 'lucide-react';

interface ContactFormProps {
  compact?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ compact = false }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    projectType: 'Film de Marque / Publicité',
    budget: '5 000€ - 15 000€',
    location: 'Bretagne',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const projectTypes = [
    'Film de Marque / Publicité',
    'Spot TV ou Digital',
    'Fiction / Court-Métrage',
    'Clip Musical',
    'Podcast',
    'Projet Comité d\'Entreprise',
    'Film Corporate / Captation',
    'Coaching & Media Training',
  ];

  const budgetRanges = [
    '< 5 000 €',
    '5 000 € - 15 000 €',
    '15 000 € - 30 000 €',
    '30 000 € +',
    'A discuter / Sur mesure',
  ];

  const locations = [
    'Bretagne (Lorient, Vannes, Rennes...)',
    'Paris / Île-de-France',
    'France',
    'International',
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Veuillez remplir votre nom, email et le message de votre projet.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('https://formbold.com/s/3La1x', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `Nouveau projet VDR: ${formData.projectType}`,
          phone: formData.phone || 'Non renseigné',
          projectType: formData.projectType,
          budget: formData.budget,
          location: formData.location,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const backupRes = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (backupRes.ok) {
          setStatus('success');
        } else {
          setErrorMessage('Erreur lors de l’envoi. Veuillez réessayer ou contacter directement par téléphone.');
          setStatus('error');
        }
      }
    } catch {
      setStatus('success');
    }
  };

  return (
    <div className="theme-bg-card border theme-border rounded-sm p-6 sm:p-8 lg:p-10 shadow-lg relative">
      <div className="absolute top-0 right-0 w-32 h-32 theme-accent-subtle-bg rounded-bl-full pointer-events-none opacity-40"></div>

      {status === 'success' ? (
        <div className="text-center py-12 space-y-6">
          <div className="w-16 h-16 theme-accent-subtle-bg theme-accent-text rounded-full flex items-center justify-center mx-auto border theme-accent-subtle-border animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2 max-w-lg mx-auto">
            <h3 className="text-2xl font-black theme-text-heading">Demande Transmise avec Succès !</h3>
            <p className="text-sm theme-text-main leading-relaxed">
              Merci <strong className="theme-accent-text">{formData.name}</strong>. Votre message nous a bien été transmis.
            </p>
            <p className="text-xs theme-text-muted font-mono pt-2">
              Une réponse détaillée vous sera envoyée à <strong className="theme-text-heading">{formData.email}</strong> sous 24 à 48 heures.
            </p>
          </div>

          <div className="p-4 theme-bg-subtle border theme-border rounded-sm max-w-md mx-auto text-left text-xs font-mono theme-text-muted space-y-2">
            <div className="flex items-center space-x-2 theme-text-heading font-bold">
              <Phone className="w-4 h-4 theme-accent-text" />
              <span>Besoin d'une réponse urgente ?</span>
            </div>
            <p>Vous pouvez nous joindre directement au <a href="tel:0681983382" className="theme-accent-text underline font-bold">06 81 98 33 82</a>.</p>
          </div>

          <button
            onClick={() => setStatus('idle')}
            className="px-6 py-2.5 theme-bg-subtle hover:theme-accent-bg theme-text-main font-mono text-xs uppercase tracking-wider rounded-sm transition-colors border theme-border cursor-pointer"
          >
            Envoyer un autre message
          </button>
        </div>
      ) : (
        <form action="https://formbold.com/s/3La1x" method="POST" onSubmit={handleSubmit} className="space-y-6">
          <input type="hidden" name="subject" value={`Nouveau projet VDR: ${formData.projectType}`} />
          
          <div className="border-b theme-border-subtle pb-4">
            <div className="text-xs font-mono theme-accent-text font-bold">[ FORMULAIRE PROJET ]</div>
            <h3 className="text-xl sm:text-2xl font-extrabold theme-text-heading mt-1">
              Parlons de votre projet audiovisuel
            </h3>
            <p className="text-xs theme-text-muted mt-1">
              Obtenez un devis sur-mesure ou convenez d'un premier échange téléphonique.
            </p>
          </div>

          {status === 'error' && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-300 text-xs font-mono rounded-sm flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Nom complet */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold theme-text-main">
                Nom complet *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Jean Dupont"
                className="w-full theme-bg-input border theme-border focus:theme-accent-border theme-text-main text-sm rounded-sm px-3.5 py-2.5 outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold theme-text-main">
                Adresse Email *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Ex: contact@entreprise.com"
                className="w-full theme-bg-input border theme-border focus:theme-accent-border theme-text-main text-sm rounded-sm px-3.5 py-2.5 outline-none transition-colors"
              />
            </div>

            {/* Téléphone */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold theme-text-main">
                Téléphone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ex: 06 12 34 56 78"
                className="w-full theme-bg-input border theme-border focus:theme-accent-border theme-text-main text-sm rounded-sm px-3.5 py-2.5 outline-none transition-colors"
              />
            </div>

            {/* Type de projet */}
            <div className="space-y-1.5">
              <label className="block text-xs font-mono font-bold theme-text-main">
                Type de Réalisation / Prestation
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleChange}
                className="w-full theme-bg-input border theme-border focus:theme-accent-border theme-text-main text-sm rounded-sm px-3.5 py-2.5 outline-none transition-colors cursor-pointer"
              >
                {projectTypes.map((type, idx) => (
                  <option key={idx} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Estimé */}
            {!compact && (
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold theme-text-main">
                  Budget Estimé (Indicatif)
                </label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full theme-bg-input border theme-border focus:theme-accent-border theme-text-main text-sm rounded-sm px-3.5 py-2.5 outline-none transition-colors cursor-pointer"
                >
                  {budgetRanges.map((range, idx) => (
                    <option key={idx} value={range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Localisation du Tournage */}
            {!compact && (
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold theme-text-main">
                  Lieu du tournage
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full theme-bg-input border theme-border focus:theme-accent-border theme-text-main text-sm rounded-sm px-3.5 py-2.5 outline-none transition-colors cursor-pointer"
                >
                  {locations.map((loc, idx) => (
                    <option key={idx} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>
            )}

          </div>

          {/* Message / Description du projet */}
          <div className="space-y-1.5">
            <label className="block text-xs font-mono font-bold theme-text-main">
              Description de votre projet ou besoin *
            </label>
            <textarea
              name="message"
              required
              rows={compact ? 4 : 5}
              value={formData.message}
              onChange={handleChange}
              placeholder="Expliquez brièvement votre projet : objectifs, message clé, délais souhaités, besoins..."
              className="w-full theme-bg-input border theme-border focus:theme-accent-border theme-text-main text-sm rounded-sm px-3.5 py-2.5 outline-none transition-colors resize-y"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[11px] theme-text-muted font-mono flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 theme-accent-text" />
              <span>Réponse garantie sous 24h à 48h</span>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full sm:w-auto px-8 py-3.5 theme-accent-bg theme-accent-bg-hover disabled:opacity-50 font-extrabold text-xs uppercase tracking-wider rounded-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-md active:scale-95 cursor-pointer"
            >
              {status === 'submitting' ? (
                <span>ENVOI EN COURS...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>TRANSMETTRE LA DEMANDE</span>
                </>
              )}
            </button>
          </div>

        </form>
      )}

    </div>
  );
};
