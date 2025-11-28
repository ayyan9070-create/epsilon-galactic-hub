export const Footer = () => {
  return (
    <footer className="relative mt-20 py-12 border-t border-primary/20">
      {/* Curved glow effect */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-primary mb-3 text-glow">EPSILON VI</h3>
            <p className="text-sm text-muted-foreground">
              Pakistan's premier STEM olympiad bringing together the brightest minds.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/about" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="/modules" className="hover:text-primary transition-colors">Modules</a></li>
              <li><a href="/brand-ambassador" className="hover:text-primary transition-colors">Brand Ambassador</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Event Details</h4>
            <p className="text-sm text-muted-foreground">
              January 16-18, 2026<br />
              Registration Fee: PKR 3000<br />
              Team Size: 1-4 members
            </p>
          </div>
        </div>
        
        <div className="text-center text-sm text-muted-foreground pt-8 border-t border-border">
          <p>© 2026 Epsilon STEM Olympiad. All rights reserved.</p>
          <a href="/auth" className="text-xs opacity-30 hover:opacity-100 transition-opacity mt-2 inline-block">Admin</a>
        </div>
      </div>
    </footer>
  );
};
