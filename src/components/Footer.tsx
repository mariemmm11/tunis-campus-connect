import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Orientation",
      links: [
        { name: "Tests d'orientation", href: "/tests" },
        { name: "Métiers par secteur", href: "/careers" },
        { name: "Formations", href: "/formations" },
        { name: "Salons d'orientation", href: "/events" },
      ]
    },
    {
      title: "Études",
      links: [
        { name: "Universités", href: "/universities" },
        { name: "Écoles privées", href: "/private-schools" },
        { name: "JPO", href: "/open-days" },
        { name: "Admissions", href: "/admissions" },
      ]
    },
    {
      title: "Vie étudiante",
      links: [
        { name: "Logement étudiant", href: "/housing" },
        { name: "Bourses d'études", href: "/scholarships" },
        { name: "Restaurants universitaires", href: "/restaurants" },
        { name: "Transport étudiant", href: "/transport" },
      ]
    },
    {
      title: "Emploi",
      links: [
        { name: "Jobs étudiants", href: "/jobs" },
        { name: "Stages", href: "/internships" },
        { name: "Premier emploi", href: "/first-job" },
        { name: "CV & Lettres", href: "/cv-help" },
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">TC</span>
              </div>
              <span className="text-xl font-bold">TunisCampus</span>
            </div>
            <p className="text-gray-400 mb-6">
              La plateforme de référence pour l'orientation et la réussite des étudiants tunisiens.
            </p>
            
            {/* Contact info */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+216 71 XXX XXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@tuniscampus.tn</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Tunis, Tunisie</span>
              </div>
            </div>
          </div>

          {/* Footer sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-bold text-white mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link 
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social media and bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <span>© 2024 TunisCampus. Tous droits réservés.</span>
              <div className="flex space-x-4">
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Conditions d'utilisation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;