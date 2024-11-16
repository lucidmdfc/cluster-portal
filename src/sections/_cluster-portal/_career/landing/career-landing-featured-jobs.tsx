'use client';

import { SubmitForm } from 'src/components/form/form';
import * as yup from 'yup';

export default function ExamplePage() {
  const handleSubmit = async (formData: FormData) => {
    try {
      // Appeler une action serveur ou un endpoint
      console.log('FormData soumis:', Array.from(formData.entries()));
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire:', error);
    }
  };

  const fields = [
    {
      name: 'nom',
      label: 'Nom complet',
      validation: yup.string().required('Nom complet est requis'),
    },
    {
      name: 'entreprise',
      label: 'Entreprise partenaire',
      validation: yup.string().required('Entreprise partenaire est requise'),
    },
    {
      name: 'email',
      label: 'Adresse email',
      type: 'email',
      validation: yup.string().email('Format email invalide').required('Adresse email est requise'),
    },
    {
      name: 'projet',
      label: 'Intitulé du projet',
      validation: yup.string().required('Intitulé du projet est requis'),
    },
  ];

  return (
    <div>
      <h1>Formulaire Dynamique</h1>
      <SubmitForm fields={fields} onSubmit={handleSubmit} isSubmitting={false} />
    </div>
  );
}

