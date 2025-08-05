import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, MapPin, Clock, Phone } from 'lucide-react';

interface FloodAlert {
  id: string;
  severity: 'low' | 'moderate' | 'high' | 'extreme';
  title: string;
  location: string;
  description: string;
  timestamp: string;
  actionRequired: boolean;
}

interface FloodAlertCardProps {
  alert: FloodAlert;
  onViewMap?: () => void;
  onGetDirections?: () => void;
}

const FloodAlertCard: React.FC<FloodAlertCardProps> = ({ alert, onViewMap, onGetDirections }) => {
  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'extreme':
        return 'border-danger bg-danger/5 shadow-danger';
      case 'high':
        return 'border-warning bg-warning/5 shadow-alert';
      case 'moderate':
        return 'border-info bg-info/5';
      default:
        return 'border-success bg-success/5';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'extreme':
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-danger" />;
      case 'moderate':
        return <AlertTriangle className="w-5 h-5 text-warning" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-info" />;
    }
  };

  const getActionButtonVariant = (severity: string) => {
    switch (severity) {
      case 'extreme':
        return 'emergency';
      case 'high':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Card className={`${getSeverityStyles(alert.severity)} animate-fade-in`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getSeverityIcon(alert.severity)}
          <span className="capitalize">{alert.severity} Flood Alert</span>
          <span className="ml-auto text-sm text-muted-foreground">{alert.timestamp}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg">{alert.title}</h3>
          <div className="flex items-center gap-1 text-muted-foreground mt-1">
            <MapPin className="w-4 h-4" />
            <span>{alert.location}</span>
          </div>
        </div>
        
        <p className="text-foreground">{alert.description}</p>
        
        {alert.actionRequired && (
          <div className="bg-muted/50 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-sm font-medium mb-2">
              <Clock className="w-4 h-4" />
              Immediate Action Required
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant={getActionButtonVariant(alert.severity)} size="sm" onClick={onGetDirections}>
                <MapPin className="w-4 h-4" />
                Find Shelter
              </Button>
              <Button variant="outline" size="sm" onClick={onViewMap}>
                View on Map
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4" />
                Emergency Contacts
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FloodAlertCard;