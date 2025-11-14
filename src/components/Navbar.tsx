import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { AuthModal } from "./AuthModal";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const openAuth = (login: boolean) => {
    setIsLogin(login);
    setShowAuth(true);
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/modules", label: "Modules" },
    { to: "/brand-ambassador", label: "Brand Ambassador" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary text-glow">
              EPSILON VI
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-all hover:text-primary hover:text-glow ${
                    location.pathname === link.to
                      ? "text-primary text-glow"
                      : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons / User Info */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-primary border border-primary/30 px-3 py-1.5 rounded-full bg-primary/10">
                    {user.id}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="border-primary/30 hover:bg-primary/20"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openAuth(true)}
                    className="hover:text-primary hover:bg-primary/10"
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => openAuth(false)}
                    className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-glow"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-3">
              {links.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={`block py-2 text-sm font-medium transition-all ${
                    location.pathname === link.to
                      ? "text-primary text-glow"
                      : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-border space-y-2">
                {user ? (
                  <>
                    <div className="text-xs font-mono text-primary border border-primary/30 px-3 py-2 rounded-full bg-primary/10 text-center">
                      {user.id}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleSignOut}
                      className="w-full border-primary/30 hover:bg-primary/20"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        openAuth(true);
                        setIsOpen(false);
                      }}
                      className="w-full hover:text-primary hover:bg-primary/10"
                    >
                      Login
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        openAuth(false);
                        setIsOpen(false);
                      }}
                      className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      <AuthModal
        open={showAuth}
        onOpenChange={setShowAuth}
        isLogin={isLogin}
        setIsLogin={setIsLogin}
      />
    </>
  );
};
