-- Create enums for better data consistency
CREATE TYPE public.education_level AS ENUM ('bac', 'licence', 'master', 'doctorat', 'formation_pro');
CREATE TYPE public.test_type AS ENUM ('orientation_metiers', 'personnalite', 'interets', 'competences');
CREATE TYPE public.application_status AS ENUM ('en_cours', 'accepte', 'refuse', 'en_attente');
CREATE TYPE public.event_type AS ENUM ('jpo', 'salon', 'conference', 'atelier');

-- Create sectors table
CREATE TABLE public.sectors (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT NOT NULL DEFAULT '#3B82F6',
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create careers table
CREATE TABLE public.careers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  sector_id UUID REFERENCES public.sectors(id),
  required_education education_level,
  salary_range TEXT,
  skills TEXT[],
  prospects TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create formations table
CREATE TABLE public.formations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  duration TEXT,
  cost DECIMAL,
  location TEXT,
  university TEXT,
  sector_id UUID REFERENCES public.sectors(id),
  level education_level NOT NULL,
  prerequisites TEXT[],
  career_prospects TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  university TEXT,
  education_level education_level,
  interests TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tests table
CREATE TABLE public.tests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type test_type NOT NULL,
  questions JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create test_results table
CREATE TABLE public.test_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  test_id UUID NOT NULL REFERENCES public.tests(id) ON DELETE CASCADE,
  answers JSONB NOT NULL,
  score INTEGER,
  recommendations TEXT[],
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create favorites table
CREATE TABLE public.favorites (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL, -- 'career', 'formation', 'event', etc.
  item_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, item_type, item_id)
);

-- Create applications table
CREATE TABLE public.applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  formation_id UUID REFERENCES public.formations(id),
  status application_status NOT NULL DEFAULT 'en_cours',
  notes TEXT,
  applied_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create events table
CREATE TABLE public.events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  type event_type NOT NULL,
  date_start TIMESTAMP WITH TIME ZONE NOT NULL,
  date_end TIMESTAMP WITH TIME ZONE,
  location TEXT,
  organizer TEXT,
  website_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public read access (sectors, careers, formations, tests, events)
CREATE POLICY "Public read access" ON public.sectors FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.careers FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.formations FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.tests FOR SELECT USING (true);
CREATE POLICY "Public read access" ON public.events FOR SELECT USING (true);

-- Create RLS policies for user-specific data
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view their own test results" ON public.test_results FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own test results" ON public.test_results FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can manage their own favorites" ON public.favorites FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own applications" ON public.applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own applications" ON public.applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own applications" ON public.applications FOR UPDATE USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_sectors_updated_at BEFORE UPDATE ON public.sectors FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_careers_updated_at BEFORE UPDATE ON public.careers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_formations_updated_at BEFORE UPDATE ON public.formations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_tests_updated_at BEFORE UPDATE ON public.tests FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON public.applications FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample data for sectors
INSERT INTO public.sectors (name, description, color, icon) VALUES
('Informatique & Digital', 'Technologies de l''information, développement, cybersécurité', '#3B82F6', 'Code'),
('Santé & Médecine', 'Médecine, pharmacie, soins infirmiers, kinésithérapie', '#EF4444', 'Heart'),
('Ingénierie', 'Génie civil, mécanique, électrique, industriel', '#F59E0B', 'Settings'),
('Commerce & Gestion', 'Marketing, finance, ressources humaines, entrepreneuriat', '#10B981', 'TrendingUp'),
('Éducation', 'Enseignement, formation, pédagogie', '#8B5CF6', 'GraduationCap'),
('Arts & Communication', 'Design, journalisme, audiovisuel, arts appliqués', '#EC4899', 'Palette');

-- Insert sample career data
INSERT INTO public.careers (title, description, sector_id, required_education, salary_range, skills, prospects) 
SELECT 
  'Développeur Web',
  'Création et maintenance d''applications web et sites internet',
  s.id,
  'licence',
  '1200-3000 TND',
  ARRAY['JavaScript', 'React', 'Node.js', 'CSS', 'HTML'],
  'Excellentes perspectives avec la digitalisation croissante'
FROM public.sectors s WHERE s.name = 'Informatique & Digital';

-- Insert sample formation data
INSERT INTO public.formations (title, description, duration, cost, location, university, sector_id, level, prerequisites, career_prospects)
SELECT 
  'Licence en Informatique',
  'Formation complète en informatique couvrant programmation, bases de données, réseaux',
  '3 ans',
  2500.00,
  'Tunis',
  'INSAT',
  s.id,
  'licence',
  ARRAY['Baccalauréat Sciences ou Math'],
  ARRAY['Développeur', 'Analyste système', 'Chef de projet IT']
FROM public.sectors s WHERE s.name = 'Informatique & Digital';

-- Insert sample test data
INSERT INTO public.tests (title, description, type, questions) VALUES
('Test d''Orientation Métiers', 'Découvrez les métiers qui correspondent à votre profil', 'orientation_metiers', 
'[
  {
    "id": 1,
    "question": "Vous préférez travailler :",
    "options": [
      {"text": "Avec des ordinateurs et technologies", "weight": {"informatique": 3, "ingenierie": 1}},
      {"text": "Avec des personnes", "weight": {"education": 3, "sante": 2}},
      {"text": "Avec vos mains", "weight": {"ingenierie": 3, "arts": 2}},
      {"text": "Avec des chiffres et données", "weight": {"commerce": 3, "informatique": 1}}
    ]
  },
  {
    "id": 2,
    "question": "Votre environnement de travail idéal :",
    "options": [
      {"text": "Bureau moderne avec équipements high-tech", "weight": {"informatique": 3, "commerce": 1}},
      {"text": "Hôpital ou clinique", "weight": {"sante": 3}},
      {"text": "Atelier ou laboratoire", "weight": {"ingenierie": 3}},
      {"text": "École ou université", "weight": {"education": 3}}
    ]
  }
]'::jsonb);

-- Insert sample events
INSERT INTO public.events (title, description, type, date_start, date_end, location, organizer) VALUES
('JPO INSAT 2024', 'Journée Portes Ouvertes de l''Institut National des Sciences Appliquées et de Technologie', 'jpo', '2024-03-15 09:00:00+01', '2024-03-15 17:00:00+01', 'INSAT, Tunis', 'INSAT'),
('Salon de l''Étudiant Tunisien', 'Salon annuel des formations et métiers', 'salon', '2024-04-20 10:00:00+01', '2024-04-22 18:00:00+01', 'Palais des Congrès, Tunis', 'Ministère de l''Enseignement Supérieur');