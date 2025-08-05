import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from '@/components/Navigation';
import FloodAlertCard from '@/components/FloodAlertCard';
import QuickActions from '@/components/QuickActions';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  AlertTriangle, 
  MapPin, 
  Thermometer, 
  Wind, 
  Droplets,
  Clock,
  Users,
  Shield,
  TrendingUp
} from 'lucide-react';
import heroImage from '@/assets/hero-flood-safety.jpg';

const Index = () => {
  const isMobile = useIsMobile();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data - in real app, this would come from APIs
  const mockAlerts = [
    {
      id: '1',
      severity: 'high' as const,
      title: 'Flash Flood Warning',
      location: 'Downtown Riverside District',
      description: 'Heavy rainfall expected to cause rapid water level rise. Residents in low-lying areas should prepare to evacuate.',
      timestamp: '10 minutes ago',
      actionRequired: true
    },
    {
      id: '2',
      severity: 'moderate' as const,
      title: 'Flood Watch',
      location: 'Valley Creek Area',
      description: 'Conditions favorable for flooding. Monitor local conditions and stay informed.',
      timestamp: '1 hour ago',
      actionRequired: false
    }
  ];

  const weatherData = {
    temperature: '72°F',
    conditions: 'Heavy Rain',
    windSpeed: '15 mph',
    humidity: '85%',
    rainfall: '2.3"'
  };

  const stats = [
    { label: 'Active Alerts', value: '2', icon: AlertTriangle, color: 'text-warning' },
    { label: 'Safe Shelters', value: '12', icon: Shield, color: 'text-success' },
    { label: 'Community Reports', value: '47', icon: Users, color: 'text-info' },
    { label: 'Risk Level', value: 'Medium', icon: TrendingUp, color: 'text-warning' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation isMobile={isMobile} />
      
      {/* Hero Section */}
      <div 
        className="relative h-64 md:h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/60" />
        <div className="relative max-w-7xl mx-auto px-4 h-full flex items-center">
          <div className="text-white">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Stay Safe, Stay Informed
            </h1>
            <p className="text-lg md:text-xl mb-6 max-w-2xl">
              Your community flood preparedness hub providing real-time alerts, 
              emergency resources, and safety guidance.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="hero" size="lg">
                <AlertTriangle className="w-5 h-5" />
                View Active Alerts
              </Button>
              <Button variant="secondary" size="lg">
                <MapPin className="w-5 h-5" />
                Find Nearest Shelter
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Current Status Bar */}
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Clock className="w-5 h-5" />
                <span className="font-medium">
                  Last Updated: {currentTime.toLocaleTimeString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-white/20 text-white">
                  System Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-elevation">
              <CardContent className="p-4 text-center">
                <stat.icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Alerts */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-warning" />
                Active Flood Alerts
              </h2>
              <div className="space-y-4">
                {mockAlerts.map((alert) => (
                  <FloodAlertCard 
                    key={alert.id} 
                    alert={alert}
                    onViewMap={() => console.log('View map for', alert.id)}
                    onGetDirections={() => console.log('Get directions for', alert.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <QuickActions 
              onEmergencyCall={() => window.open('tel:911')}
              onFindShelter={() => console.log('Find shelter')}
              onViewMap={() => console.log('View map')}
              onChecklist={() => console.log('View checklist')}
              onReportIncident={() => console.log('Report incident')}
              onAlerts={() => console.log('View alerts')}
            />

            {/* Weather Card */}
            <Card className="shadow-elevation">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-info" />
                  Current Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Temperature</span>
                  <span className="font-medium">{weatherData.temperature}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Conditions</span>
                  <span className="font-medium">{weatherData.conditions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Wind className="w-4 h-4" />
                    <span>Wind</span>
                  </div>
                  <span className="font-medium">{weatherData.windSpeed}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Droplets className="w-4 h-4" />
                    <span>Rainfall</span>
                  </div>
                  <span className="font-medium text-warning">{weatherData.rainfall}</span>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Preparedness Tip */}
            <Card className="bg-success/5 border-success shadow-elevation">
              <CardHeader>
                <CardTitle className="text-success flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Today's Safety Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Keep an emergency kit with water, non-perishable food, 
                  flashlight, radio, and important documents in a waterproof container.
                </p>
                <Button variant="outline" size="sm" className="mt-3 w-full">
                  View Full Checklist
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && <Navigation isMobile={true} />}
    </div>
  );
};

export default Index;
