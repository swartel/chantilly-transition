const Header = () => {
  return (
    <header className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="section-container py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold text-primary">Stéphane WARTEL</span>
            <span className="text-sm text-muted-foreground hidden sm:inline">| Consultant en immobilier à Chantilly(60)</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a 
              href="tel:+33687090937" 
              className="text-sm font-semibold text-link hover:text-link-hover transition-colors hidden sm:block"
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
