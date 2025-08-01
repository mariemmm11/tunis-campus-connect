-- Create offers table for internships, jobs, and housing
CREATE TYPE offer_type AS ENUM ('stage', 'job', 'logement');
CREATE TYPE contract_type AS ENUM ('cdi', 'cdd', 'stage', 'freelance', 'temps_partiel', 'temps_plein');
CREATE TYPE housing_type AS ENUM ('appartement', 'studio', 'chambre', 'colocation', 'residence');

CREATE TABLE public.offers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  type offer_type NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  sector_id UUID REFERENCES public.sectors(id),
  company_name TEXT,
  contract_type contract_type,
  duration TEXT, -- Pour stages et jobs
  salary_range TEXT,
  rent_price INTEGER, -- Pour logement
  housing_type housing_type, -- Pour logement
  surface_area INTEGER, -- Pour logement en m²
  furnished BOOLEAN DEFAULT FALSE, -- Pour logement
  requirements TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  deadline DATE,
  posted_by UUID REFERENCES auth.users(id),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;

-- RLS Policies for offers
CREATE POLICY "Anyone can view active offers" 
ON public.offers 
FOR SELECT 
USING (is_active = true);

CREATE POLICY "Users can create offers" 
ON public.offers 
FOR INSERT 
WITH CHECK (auth.uid() = posted_by);

CREATE POLICY "Users can update their own offers" 
ON public.offers 
FOR UPDATE 
USING (auth.uid() = posted_by);

CREATE POLICY "Users can delete their own offers" 
ON public.offers 
FOR DELETE 
USING (auth.uid() = posted_by);

-- Add trigger for updated_at
CREATE TRIGGER update_offers_updated_at
BEFORE UPDATE ON public.offers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample offers data
INSERT INTO public.offers (title, type, location, description, sector_id, company_name, contract_type, duration, salary_range, requirements, contact_email, deadline, posted_by) VALUES
('Stage en Développement Web', 'stage', 'Tunis', 'Stage de 3 mois en développement web front-end avec React et TypeScript. Excellente opportunité d''apprentissage dans une startup innovante.', (SELECT id FROM public.sectors WHERE name = 'Informatique et Tech' LIMIT 1), 'TechStart Tunisia', 'stage', '3 mois', '400-600 DT/mois', 'Étudiant en informatique, bases en JavaScript, motivé', 'stages@techstart.tn', '2024-03-15', (SELECT id FROM auth.users LIMIT 1)),

('Développeur JavaScript Junior', 'job', 'Sfax', 'Poste de développeur JavaScript junior pour rejoindre notre équipe de développement. Formation continue assurée.', (SELECT id FROM public.sectors WHERE name = 'Informatique et Tech' LIMIT 1), 'Digital Solutions', 'cdd', '12 mois', '1200-1500 DT/mois', 'Diplôme en informatique, 6 mois d''expérience minimum', 'recrutement@digitalsolutions.tn', '2024-02-28', (SELECT id FROM auth.users LIMIT 1)),

('Stage Marketing Digital', 'stage', 'Sousse', 'Stage de 4 mois en marketing digital et gestion des réseaux sociaux. Environnement dynamique et créatif.', (SELECT id FROM public.sectors WHERE name = 'Marketing et Communication' LIMIT 1), 'Creative Agency', 'stage', '4 mois', '350-500 DT/mois', 'Étudiant en marketing, maîtrise des réseaux sociaux', 'stages@creative.tn', '2024-03-01', (SELECT id FROM auth.users LIMIT 1));

-- Insert sample housing offers
INSERT INTO public.offers (title, type, location, description, rent_price, housing_type, surface_area, furnished, requirements, contact_email, deadline, posted_by) VALUES
('Studio meublé proche université', 'logement', 'Tunis - Menzah', 'Joli studio meublé de 25m² dans résidence sécurisée, proche du campus universitaire. Cuisine équipée, balcon, parking.', 450, 'studio', 25, true, 'Étudiant sérieux, non fumeur, caution de 2 mois', 'location.menzah@gmail.com', '2024-04-01', (SELECT id FROM auth.users LIMIT 1)),

('Chambre en colocation', 'logement', 'Sfax - Centre ville', 'Chambre dans appartement en colocation avec 2 autres étudiants. Quartier animé, proche des commerces et transports.', 200, 'chambre', 15, true, 'Étudiant uniquement, participation aux charges communes', 'coloc.sfax@gmail.com', '2024-03-20', (SELECT id FROM auth.users LIMIT 1)),

('Appartement 2 pièces', 'logement', 'Sousse - Ville', 'Appartement 2 pièces non meublé, 60m², 2ème étage, balcon, proche centre ville et université.', 350, 'appartement', 60, false, 'Caution de 3 mois, justificatifs de revenus', 'immobilier.sousse@gmail.com', '2024-03-25', (SELECT id FROM auth.users LIMIT 1));