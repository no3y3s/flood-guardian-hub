import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Map, 
  Shield, 
  BookOpen, 
  Phone, 
  Radio,
  Settings,
  Menu
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

interface NavigationProps {
  isMobile?: boolean;
  onMenuToggle?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ isMobile, onMenuToggle }) => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/map', icon: Map, label: 'Risk Map' },
    { path: '/preparedness', icon: Shield, label: 'Preparedness' },
    { path: '/resources', icon: BookOpen, label: 'Resources' },
    { path: '/emergency', icon: Phone, label: 'Emergency' },
    { path: '/report', icon: Radio, label: 'Report' }
  ];

  const isActive = (path: string) => location.pathname === path;

  if (isMobile) {
    return (
      <nav className="bg-card border-t border-border px-4 py-2">
        <div className="flex justify-around">
          {navItems.slice(0, 5).map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
                isActive(item.path) 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <header className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-primary">Flood Guardian</h1>
                <p className="text-xs text-muted-foreground">Community Safety Hub</p>
              </div>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={isActive(item.path) ? 'secondary' : 'ghost'}
                size="sm"
                asChild
                className={isActive(item.path) ? 'bg-primary/10 text-primary' : ''}
              >
                <Link to={item.path} className="flex items-center gap-2">
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              </Button>
            ))}
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </nav>

          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={onMenuToggle}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navigation;