import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Users, 
  Shield,
  Hospital,
  PhoneCall,
  Navigation as NavigationIcon
} from 'lucide-react';

const EmergencyContacts = () => {
  const isMobile = useIsMobile();

  const emergencyContacts = [
    {
      name: 'Emergency Services',
      number: '911',
      description: 'Police, Fire, Medical Emergency',
      type: 'emergency',
      available: '24/7'
    },
    {
      name: 'Flood Emergency Hotline',
      number: '1-800-FLOOD-911',
      description: 'Dedicated flood emergency response',
      type: 'flood',
      available: '24/7'
    },
    {
      name: 'Emergency Management',
      number: '(555) 123-4567',
      description: 'Local emergency coordination center',
      type: 'coordination',
      available: '24/7'
    },
    {
      name: 'Red Cross Shelter Info',
      number: '1-800-RED-CROSS',
      description: 'Emergency shelter and relief services',
      type: 'shelter',
      available: '24/7'
    },
    {
      name: 'Poison Control',
      number: '1-800-222-1222',
      description: 'Poisoning emergencies and water contamination',
      type: 'medical',
      available: '24/7'
    },
    {
      name: 'Utility Emergency',
      number: '(555) 987-6543',
      description: 'Power outages and gas leaks',
      type: 'utilities',
      available: '24/7'
    }
  ];

  const shelters = [
    {
      name: 'Central Community Center',
      address: '123 Main Street, Downtown',
      capacity: '200 people',
      amenities: ['Food', 'Medical', 'Pet-friendly'],
      distance: '0.5 miles',
      status: 'Open'
    },
    {
      name: 'Riverside High School',
      address: '456 Oak Avenue, Riverside',
      capacity: '300 people',
      amenities: ['Food', 'Medical', 'Special needs'],
      distance: '1.2 miles',
      status: 'Open'
    },
    {
      name: 'North Side Recreation Center',
      address: '789 Pine Road, North District',
      capacity: '150 people',
      amenities: ['Food', 'Basic medical'],
      distance: '2.1 miles',
      status: 'Available'
    }
  ];

  const getContactIcon = (type: string) => {
    switch (type) {
      case 'emergency': return Phone;
      case 'flood': return Shield;
      case 'medical': return Hospital;
      case 'shelter': return Users;
      default: return PhoneCall;
    }
  };

  const getContactColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'text-danger';
      case 'flood': return 'text-warning';
      case 'medical': return 'text-info';
      case 'shelter': return 'text-success';
      default: return 'text-primary';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isMobile={isMobile} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <Phone className="w-8 h-8 text-danger" />
            Emergency Contacts & Shelters
          </h1>
          <p className="text-muted-foreground">
            Quick access to emergency services and nearby shelter locations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Emergency Contacts */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <PhoneCall className="w-6 h-6 text-danger" />
              Emergency Numbers
            </h2>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => {
                const Icon = getContactIcon(contact.type);
                return (
                  <Card key={index} className="shadow-elevation hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <Icon className={`w-6 h-6 mt-1 ${getContactColor(contact.type)}`} />
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{contact.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {contact.description}
                            </p>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{contact.available}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary mb-2">
                            {contact.number}
                          </div>
                          <Button 
                            variant={contact.type === 'emergency' ? 'emergency' : 'default'}
                            size="sm"
                            onClick={() => window.open(`tel:${contact.number}`)}
                          >
                            <Phone className="w-4 h-4" />
                            Call Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Emergency Shelters */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-success" />
              Nearby Emergency Shelters
            </h2>
            <div className="space-y-4">
              {shelters.map((shelter, index) => (
                <Card key={index} className="shadow-elevation hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-lg">{shelter.name}</h3>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <MapPin className="w-4 h-4" />
                          <span>{shelter.address}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          shelter.status === 'Open' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {shelter.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Capacity:</span>
                        <span className="font-medium">{shelter.capacity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Distance:</span>
                        <span className="font-medium">{shelter.distance}</span>
                      </div>
                      <div>
                        <span>Amenities: </span>
                        <span className="font-medium">{shelter.amenities.join(', ')}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <NavigationIcon className="w-4 h-4" />
                        Get Directions
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Phone className="w-4 h-4" />
                        Call Shelter
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Action Banner */}
        <Card className="mt-8 bg-danger/5 border-danger">
          <CardContent className="p-6 text-center">
            <h3 className="text-xl font-bold text-danger mb-2">
              In Case of Immediate Danger
            </h3>
            <p className="text-muted-foreground mb-4">
              If you're in immediate danger from flooding, call 911 immediately
            </p>
            <Button variant="emergency" size="lg" onClick={() => window.open('tel:911')}>
              <Phone className="w-5 h-5" />
              Call 911 Now
            </Button>
          </CardContent>
        </Card>
      </div>

      {isMobile && <Navigation isMobile={true} />}
    </div>
  );
};

export default EmergencyContacts;