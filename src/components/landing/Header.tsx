import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="section-container py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="font-serif text-xl font-bold text-primary hover:text-primary/80 transition-colors">
              Stéphane WARTEL
            </Link>
            <span className="text-sm text-muted-foreground hidden sm:inline">| Consultant en immobilier à Chantilly(60)</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link 
              to="/guide-gratuit"
              className="flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent/80 transition-colors hidden sm:flex"
            >
              <BookOpen className="w-4 h-4" />
              Guide Gratuit
            </Link>
            <a 
              href="tel:+33687090937" 
              className="text-sm font-semibold text-link hover:text-link-hover transition-colors hidden md:block"
            >
              06 87 09 09 37
            </a>
            <a 
              href="mailto:contact@immobilier-chantilly.fr"
              className="bg-accent text-accent-foreground px-4 py-2 rounded-md text-sm font-semibold hover:bg-accent/90 transition-colors"
            >
              Contact
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
