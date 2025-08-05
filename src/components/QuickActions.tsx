import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Shield, 
  MapPin, 
  Phone, 
  FileText, 
  AlertTriangle, 
  Radio,
  Download,
  Users
} from 'lucide-react';

interface QuickActionsProps {
  onEmergencyCall?: () => void;
  onFindShelter?: () => void;
  onViewMap?: () => void;
  onChecklist?: () => void;
  onReportIncident?: () => void;
  onAlerts?: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ 
  onEmergencyCall, 
  onFindShelter, 
  onViewMap, 
  onChecklist,
  onReportIncident,
  onAlerts
}) => {
  const actions = [
    {
      icon: Phone,
      label: 'Emergency Call',
      variant: 'emergency' as const,
      onClick: onEmergencyCall,
      description: 'Call 911 or local emergency services'
    },
    {
      icon: MapPin,
      label: 'Find Shelter',
      variant: 'warning' as const,
      onClick: onFindShelter,
      description: 'Locate nearest emergency shelter'
    },
    {
      icon: Shield,
      label: 'Safety Map',
      variant: 'default' as const,
      onClick: onViewMap,
      description: 'View flood risk and safe zones'
    },
    {
      icon: FileText,
      label: 'Checklist',
      variant: 'secondary' as const,
      onClick: onChecklist,
      description: 'Emergency preparedness guide'
    },
    {
      icon: Radio,
      label: 'Report Incident',
      variant: 'outline' as const,
      onClick: onReportIncident,
      description: 'Share flooding information'
    },
    {
      icon: AlertTriangle,
      label: 'Active Alerts',
      variant: 'outline' as const,
      onClick: onAlerts,
      description: 'View current warnings'
    }
  ];

  return (
    <Card className="shadow-elevation">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="h-auto p-4 flex flex-col items-center gap-2 text-center"
              onClick={action.onClick}
            >
              <action.icon className="w-6 h-6" />
              <div>
                <div className="font-medium">{action.label}</div>
                <div className="text-xs opacity-80 font-normal">
                  {action.description}
                </div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;