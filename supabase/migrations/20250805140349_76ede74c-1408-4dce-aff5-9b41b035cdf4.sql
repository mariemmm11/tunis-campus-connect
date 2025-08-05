-- Create testimonials table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nom_etudiant TEXT NOT NULL,
  universite TEXT NOT NULL,
  specialite TEXT NOT NULL,
  contenu TEXT NOT NULL,
  note INTEGER NOT NULL CHECK (note >= 1 AND note <= 5),
  photo_url TEXT,
  date_publication TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_approved BOOLEAN NOT NULL DEFAULT true,
  sector_id UUID REFERENCES sectors(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on testimonials
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public read access for approved testimonials" 
ON public.testimonials 
FOR SELECT 
USING (is_approved = true);

-- Insert sample careers data (only if table is empty)
INSERT INTO public.careers (title, description, sector_id, required_education, salary_range, skills, prospects) 
SELECT * FROM (VALUES
-- Informatique & Digital
('Développeur Full Stack', 'Conception et développement d''applications web complètes, front-end et back-end', (SELECT id FROM sectors WHERE name = 'Informatique & Digital'), 'licence', '35000-55000€', ARRAY['JavaScript', 'React', 'Node.js', 'SQL', 'Git'], 'Excellentes perspectives avec la transformation numérique'),
('Data Scientist', 'Analyse de données complexes pour extraire des insights business', (SELECT id FROM sectors WHERE name = 'Informatique & Digital'), 'master', '45000-70000€', ARRAY['Python', 'Machine Learning', 'SQL', 'Statistics', 'Tableau'], 'Forte demande dans tous les secteurs'),
('Cybersécurité Expert', 'Protection des systèmes informatiques contre les menaces', (SELECT id FROM sectors WHERE name = 'Informatique & Digital'), 'master', '50000-80000€', ARRAY['Sécurité réseau', 'Ethical Hacking', 'Cryptographie', 'ISO 27001'], 'Marché en très forte croissance'),

-- Santé & Médecine  
('Médecin Généraliste', 'Diagnostic et traitement des pathologies courantes', (SELECT id FROM sectors WHERE name = 'Santé & Médecine'), 'doctorat', '60000-90000€', ARRAY['Diagnostic médical', 'Relation patient', 'Pharmacologie', 'Urgences'], 'Profession réglementée avec sécurité d''emploi'),
('Infirmier(ère)', 'Soins aux patients et coordination des équipes médicales', (SELECT id FROM sectors WHERE name = 'Santé & Médecine'), 'licence', '28000-35000€', ARRAY['Soins infirmiers', 'Gestion du stress', 'Travail d''équipe', 'Pharmacologie'], 'Forte demande, métier d''avenir'),
('Kinésithérapeute', 'Rééducation et réhabilitation par le mouvement', (SELECT id FROM sectors WHERE name = 'Santé & Médecine'), 'master', '35000-50000€', ARRAY['Anatomie', 'Physiologie', 'Rééducation', 'Relation patient'], 'Secteur en expansion avec le vieillissement'),

-- Commerce & Gestion
('Chef de Projet Marketing', 'Pilotage des stratégies marketing et communication', (SELECT id FROM sectors WHERE name = 'Commerce & Gestion'), 'master', '40000-60000€', ARRAY['Marketing digital', 'Gestion de projet', 'Analytics', 'Communication'], 'Opportunités dans tous les secteurs'),
('Consultant en Management', 'Accompagnement des entreprises dans leur transformation', (SELECT id FROM sectors WHERE name = 'Commerce & Gestion'), 'master', '45000-80000€', ARRAY['Analyse stratégique', 'Conduite du changement', 'Leadership', 'Présentation'], 'Marché international très dynamique'),

-- Arts & Communication
('UX/UI Designer', 'Conception d''interfaces utilisateur innovantes', (SELECT id FROM sectors WHERE name = 'Arts & Communication'), 'licence', '35000-55000€', ARRAY['Design thinking', 'Figma', 'User research', 'Prototypage'], 'Secteur en forte croissance avec le digital'),
('Journaliste Multimédia', 'Production de contenu pour différents médias', (SELECT id FROM sectors WHERE name = 'Arts & Communication'), 'licence', '25000-40000€', ARRAY['Rédaction', 'Investigation', 'Multimédia', 'Réseaux sociaux'], 'Évolution vers le numérique'),

-- Ingénierie
('Ingénieur Logiciel', 'Conception et développement de systèmes complexes', (SELECT id FROM sectors WHERE name = 'Ingénierie'), 'master', '42000-65000€', ARRAY['Programming', 'Architecture logicielle', 'DevOps', 'Agile'], 'Très forte demande sur le marché'),
('Ingénieur Environnement', 'Solutions pour la transition écologique', (SELECT id FROM sectors WHERE name = 'Ingénierie'), 'master', '38000-55000€', ARRAY['Environnement', 'Énergies renouvelables', 'Normes ISO', 'Gestion de projet'], 'Secteur d''avenir avec la transition écologique'),

-- Éducation
('Professeur des Écoles', 'Enseignement et accompagnement des élèves', (SELECT id FROM sectors WHERE name = 'Éducation'), 'master', '28000-35000€', ARRAY['Pédagogie', 'Gestion de classe', 'Numérique éducatif', 'Psychologie enfant'], 'Stabilité d''emploi et impact social fort')
) AS v(title, description, sector_id, required_education, salary_range, skills, prospects)
WHERE NOT EXISTS (SELECT 1 FROM public.careers LIMIT 1);

-- Insert sample formations data (only if table is empty)
INSERT INTO public.formations (title, description, duration, cost, location, university, sector_id, level, prerequisites, career_prospects) 
SELECT * FROM (VALUES
-- Informatique & Digital
('Master Informatique - Spécialité IA', 'Formation approfondie en intelligence artificielle et machine learning', '2 ans', 8000, 'Paris', 'Université Paris-Saclay', (SELECT id FROM sectors WHERE name = 'Informatique & Digital'), 'master', ARRAY['Licence informatique', 'Mathématiques niveau L3'], ARRAY['Data Scientist', 'Ingénieur IA', 'Consultant Tech']),
('Licence Professionnelle Développement Web', 'Formation pratique au développement d''applications web modernes', '1 an', 3500, 'Lyon', 'IUT Lyon 1', (SELECT id FROM sectors WHERE name = 'Informatique & Digital'), 'licence', ARRAY['Bac+2 informatique', 'Bases de programmation'], ARRAY['Développeur Front-end', 'Développeur Full Stack']),
('Formation Cybersécurité', 'Spécialisation en sécurité des systèmes d''information', '18 mois', 12000, 'Toulouse', 'ENSEEIHT', (SELECT id FROM sectors WHERE name = 'Informatique & Digital'), 'master', ARRAY['Licence informatique', 'Réseaux informatiques'], ARRAY['Expert Cybersécurité', 'Consultant Sécurité']),

-- Santé & Médecine
('Études de Médecine', 'Formation complète pour devenir médecin', '9 ans', 15000, 'Bordeaux', 'Université de Bordeaux', (SELECT id FROM sectors WHERE name = 'Santé & Médecine'), 'doctorat', ARRAY['Baccalauréat S', 'PASS ou L.AS validée'], ARRAY['Médecin généraliste', 'Médecin spécialiste']),
('IFSI - Formation Infirmière', 'Diplôme d''État d''infirmier', '3 ans', 5000, 'Marseille', 'IFSI Marseille', (SELECT id FROM sectors WHERE name = 'Santé & Médecine'), 'licence', ARRAY['Baccalauréat', 'Concours d''entrée'], ARRAY['Infirmier(ère)', 'Cadre de santé']),
('École de Kinésithérapie', 'Masseur-kinésithérapeute diplômé d''État', '4 ans', 18000, 'Montpellier', 'IFMK Montpellier', (SELECT id FROM sectors WHERE name = 'Santé & Médecine'), 'master', ARRAY['PASS validée', 'Concours spécifique'], ARRAY['Kinésithérapeute', 'Ostéopathe']),

-- Commerce & Gestion  
('Master Marketing Digital', 'Stratégies marketing à l''ère du numérique', '2 ans', 9000, 'Paris', 'ESSEC Business School', (SELECT id FROM sectors WHERE name = 'Commerce & Gestion'), 'master', ARRAY['Licence en commerce/marketing', 'Score TOEIC 750+'], ARRAY['Chef de projet marketing', 'Growth Hacker']),
('MBA Management', 'Formation de haut niveau en gestion d''entreprise', '2 ans', 25000, 'Lyon', 'EM Lyon', (SELECT id FROM sectors WHERE name = 'Commerce & Gestion'), 'master', ARRAY['Bac+3', '3 ans d''expérience pro'], ARRAY['Consultant en management', 'Directeur général']),

-- Arts & Communication
('Master Design UX/UI', 'Conception d''expériences utilisateur digitales', '2 ans', 7500, 'Nantes', 'École de Design Nantes', (SELECT id FROM sectors WHERE name = 'Arts & Communication'), 'master', ARRAY['Licence design/arts appliqués', 'Portfolio créatif'], ARRAY['UX Designer', 'Product Designer']),
('École de Journalisme', 'Formation aux métiers de l''information', '3 ans', 12000, 'Strasbourg', 'CUEJ Strasbourg', (SELECT id FROM sectors WHERE name = 'Arts & Communication'), 'master', ARRAY['Licence littéraire', 'Concours d''entrée'], ARRAY['Journaliste', 'Rédacteur en chef']),

-- Ingénierie
('École d''Ingénieur Informatique', 'Formation d''ingénieur en sciences du numérique', '3 ans', 15000, 'Grenoble', 'Grenoble INP', (SELECT id FROM sectors WHERE name = 'Ingénierie'), 'master', ARRAY['Prépa scientifique', 'DUT/BTS technique'], ARRAY['Ingénieur logiciel', 'Architecte système']),
('Master Ingénierie Environnementale', 'Solutions techniques pour l''environnement', '2 ans', 6000, 'Nice', 'Polytech Nice', (SELECT id FROM sectors WHERE name = 'Ingénierie'), 'master', ARRAY['Licence scientifique', 'Bases en environnement'], ARRAY['Ingénieur environnement', 'Consultant RSE']),

-- Éducation  
('Master MEEF Professorat', 'Métiers de l''enseignement et de la formation', '2 ans', 4000, 'Rennes', 'INSPE Bretagne', (SELECT id FROM sectors WHERE name = 'Éducation'), 'master', ARRAY['Licence dans la matière enseignée', 'Concours CRPE/CAPES'], ARRAY['Professeur des écoles', 'Professeur collège/lycée'])
) AS v(title, description, duration, cost, location, university, sector_id, level, prerequisites, career_prospects)
WHERE NOT EXISTS (SELECT 1 FROM public.formations LIMIT 1);

-- Insert sample testimonials  
INSERT INTO public.testimonials (nom_etudiant, universite, specialite, contenu, note, sector_id) 
SELECT * FROM (VALUES
('Alice Martin', 'Université Paris-Saclay', 'Master IA', 'Formation excellente qui m''a permis de décrocher un poste de Data Scientist chez une startup innovante. Les projets pratiques sont très formateurs !', 5, (SELECT id FROM sectors WHERE name = 'Informatique & Digital')),
('Thomas Dubois', 'IUT Lyon 1', 'Licence Pro Dev Web', 'Cursus parfait pour une insertion rapide. En 1 an, j''ai acquis toutes les compétences pour être développeur full-stack. Recommandé !', 4, (SELECT id FROM sectors WHERE name = 'Informatique & Digital')),
('Marie Lefevre', 'Université de Bordeaux', 'Médecine', 'Études exigeantes mais passionnantes. L''accompagnement pédagogique est excellent et la formation clinique très complète.', 5, (SELECT id FROM sectors WHERE name = 'Santé & Médecine')),
('Paul Moreau', 'IFSI Marseille', 'Formation Infirmière', 'Formation pratique et humaine. Les stages en hôpital permettent une vraie immersion dans le métier. Métier gratifiant !', 4, (SELECT id FROM sectors WHERE name = 'Santé & Médecine')),
('Sophie Lambert', 'ESSEC Business School', 'Master Marketing Digital', 'Programme très complet qui allie théorie et pratique. Les intervenants professionnels apportent une vraie valeur ajoutée.', 5, (SELECT id FROM sectors WHERE name = 'Commerce & Gestion')),
('Lucas Bernard', 'École de Design Nantes', 'Master UX/UI', 'Formation créative et technique. Les workshops avec de vraies entreprises sont formateurs. Excellente insertion professionnelle !', 5, (SELECT id FROM sectors WHERE name = 'Arts & Communication')),
('Emma Petit', 'Grenoble INP', 'Ingénieur Informatique', 'École d''excellence avec un niveau technique élevé. Les partenariats industriels offrent de belles opportunités de stage.', 4, (SELECT id FROM sectors WHERE name = 'Ingénierie')),
('Hugo Roux', 'INSPE Bretagne', 'Master MEEF', 'Formation complète pour enseigner. L''alternance théorie/pratique en classe est parfaitement équilibrée.', 4, (SELECT id FROM sectors WHERE name = 'Éducation'))
) AS v(nom_etudiant, universite, specialite, contenu, note, sector_id)
WHERE NOT EXISTS (SELECT 1 FROM public.testimonials LIMIT 1);

-- Add foreign key constraints only if they don't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'careers_sector_id_fkey' 
        AND table_name = 'careers'
    ) THEN
        ALTER TABLE public.careers 
        ADD CONSTRAINT careers_sector_id_fkey 
        FOREIGN KEY (sector_id) REFERENCES public.sectors(id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'formations_sector_id_fkey' 
        AND table_name = 'formations'
    ) THEN
        ALTER TABLE public.formations 
        ADD CONSTRAINT formations_sector_id_fkey 
        FOREIGN KEY (sector_id) REFERENCES public.sectors(id);
    END IF;
END $$;

DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'testimonials_sector_id_fkey' 
        AND table_name = 'testimonials'
    ) THEN
        ALTER TABLE public.testimonials 
        ADD CONSTRAINT testimonials_sector_id_fkey 
        FOREIGN KEY (sector_id) REFERENCES public.sectors(id);
    END IF;
END $$;

-- Create trigger for testimonials updated_at only if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.triggers 
        WHERE trigger_name = 'update_testimonials_updated_at'
    ) THEN
        CREATE TRIGGER update_testimonials_updated_at
        BEFORE UPDATE ON public.testimonials
        FOR EACH ROW
        EXECUTE FUNCTION public.update_updated_at_column();
    END IF;
END $$;