import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Search, LogOut } from "lucide-react";
import { ModeToggle } from "@/components/ModeToggle";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const navigation = [
    { name: "Accueil", href: "/" },
    { name: "Métiers & Formations", href: "/careers" },
    { name: "Tests d'orientation", href: "/tests" },
    { name: "Offres", href: "/offers" },
    { name: "Vie étudiante", href: "/student-life" },
    { name: "Événements", href: "/events" },
  ];

  return (
    <header className="bg-background/80 backdrop-blur-xl border-b border-border/40 sticky top-0 z-50 transition-smooth">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-elegant group-hover:scale-105 transition-spring">
              <span className="text-primary-foreground font-bold text-xl">TC</span>
            </div>
            <span className="text-2xl font-cal font-bold bg-gradient-primary bg-clip-text text-transparent">
              TunisCampus
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-smooth relative group"
              >
                {item.name}
                <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-full hover:scale-105 transition-spring">
              <Search className="w-4 h-4" />
            </Button>
            
            <ModeToggle />
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2 rounded-full border-border/50 hover:border-primary/50 transition-smooth">
                    <User className="w-4 h-4" />
                    Mon compte
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-background/95 backdrop-blur-xl border-border/50">
                  <DropdownMenuItem>
                    <User className="w-4 h-4 mr-2" />
                    Mon profil
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Tableau de bord</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    Mes favoris
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Déconnexion
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" size="sm" asChild className="rounded-full border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-smooth">
                <Link to="/auth">
                  <User className="w-4 h-4 mr-2" />
                  Connexion
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-smooth"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40 bg-background/95 backdrop-blur-xl">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-smooth mx-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center justify-between px-4 py-2 mx-2">
                <span className="text-sm font-medium text-muted-foreground">Thème</span>
                <ModeToggle />
              </div>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border/40 mx-2">
                {user ? (
                  <>
                    <Button variant="outline" size="sm" className="justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Mon profil
                    </Button>
                    <Button variant="ghost" size="sm" onClick={signOut} className="justify-start text-destructive hover:text-destructive hover:bg-destructive/10">
                      <LogOut className="w-4 h-4 mr-2" />
                      Déconnexion
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" size="sm" asChild className="justify-start">
                    <Link to="/auth">
                      <User className="w-4 h-4 mr-2" />
                      Connexion
                    </Link>
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;