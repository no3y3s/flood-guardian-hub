import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Package,
  Home,
  Phone,
  FileText,
  Download,
  Users
} from 'lucide-react';

const Preparedness = () => {
  const isMobile = useIsMobile();
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (itemId: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const beforeFloodChecklist = [
    {
      id: 'emergency-kit',
      title: 'Emergency Kit Prepared',
      description: '3-day supply of water, food, medications, flashlight, radio, batteries',
      priority: 'high'
    },
    {
      id: 'important-docs',
      title: 'Important Documents Secured',
      description: 'Insurance papers, ID, medical records in waterproof container',
      priority: 'high'
    },
    {
      id: 'evacuation-plan',
      title: 'Evacuation Route Planned',
      description: 'Know multiple routes to safety and nearest shelter locations',
      priority: 'high'
    },
    {
      id: 'communication-plan',
      title: 'Family Communication Plan',
      description: 'Emergency contacts and meeting points established',
      priority: 'medium'
    },
    {
      id: 'home-protection',
      title: 'Home Protection Measures',
      description: 'Sandbags, waterproofing, elevated valuables',
      priority: 'medium'
    },
    {
      id: 'utilities-knowledge',
      title: 'Utility Shutoffs Known',
      description: 'Location of gas, water, and electrical shutoffs',
      priority: 'low'
    }
  ];

  const duringFloodChecklist = [
    {
      id: 'monitor-alerts',
      title: 'Monitor Emergency Alerts',
      description: 'Stay tuned to weather radio and official announcements',
      priority: 'high'
    },
    {
      id: 'avoid-water',
      title: 'Avoid Walking/Driving in Flood Water',
      description: 'Turn around, don\'t drown - 6 inches can knock you down',
      priority: 'high'
    },
    {
      id: 'evacuate-if-told',
      title: 'Evacuate if Instructed',
      description: 'Leave immediately when authorities recommend evacuation',
      priority: 'high'
    },
    {
      id: 'higher-ground',
      title: 'Move to Higher Ground',
      description: 'Get to the highest level of your building',
      priority: 'medium'
    },
    {
      id: 'signal-help',
      title: 'Signal for Help if Trapped',
      description: 'Use bright cloth, flashlight, or call for help loudly',
      priority: 'medium'
    },
    {
      id: 'stay-informed',
      title: 'Stay Connected',
      description: 'Keep phone charged and preserve battery when possible',
      priority: 'low'
    }
  ];

  const afterFloodChecklist = [
    {
      id: 'safety-first',
      title: 'Ensure Personal Safety',
      description: 'Check for injuries and hazards before anything else',
      priority: 'high'
    },
    {
      id: 'avoid-contaminated-water',
      title: 'Avoid Contaminated Water',
      description: 'Don\'t drink or use floodwater for cleaning',
      priority: 'high'
    },
    {
      id: 'check-utilities',
      title: 'Check Utilities Safely',
      description: 'Inspect gas, water, electrical systems for damage',
      priority: 'high'
    },
    {
      id: 'document-damage',
      title: 'Document Property Damage',
      description: 'Take photos for insurance claims before cleanup',
      priority: 'medium'
    },
    {
      id: 'contact-insurance',
      title: 'Contact Insurance Company',
      description: 'Report flood damage as soon as possible',
      priority: 'medium'
    },
    {
      id: 'professional-help',
      title: 'Get Professional Assessment',
      description: 'Have utilities and structure inspected before use',
      priority: 'low'
    }
  ];

  const emergencyKit = [
    '1 gallon of water per person per day (3-day supply)',
    '3-day supply of non-perishable food',
    'Battery-powered or hand crank radio',
    'Flashlight and extra batteries',
    'First aid kit and medications',
    'Cell phone chargers (solar/battery)',
    'Cash in small bills',
    'Copies of important documents',
    'Emergency contact information',
    'Matches in waterproof container',
    'Personal hygiene items',
    'Blankets and extra clothing'
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-danger';
      case 'medium': return 'text-warning';
      case 'low': return 'text-info';
      default: return 'text-muted-foreground';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-danger/10 text-danger border-danger/20';
      case 'medium': return 'bg-warning/10 text-warning border-warning/20';
      case 'low': return 'bg-info/10 text-info border-info/20';
      default: return 'bg-muted/10 text-muted-foreground';
    }
  };

  const renderChecklist = (items: typeof beforeFloodChecklist, prefix: string) => (
    <div className="space-y-4">
      {items.map((item) => {
        const itemId = `${prefix}-${item.id}`;
        const isChecked = checkedItems[itemId] || false;
        
        return (
          <Card key={itemId} className={`transition-all ${isChecked ? 'bg-success/5 border-success/20' : 'hover:shadow-md'}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={() => toggleItem(itemId)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className={`font-medium ${isChecked ? 'line-through text-muted-foreground' : ''}`}>
                      {item.title}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs border ${getPriorityBadge(item.priority)}`}>
                      {item.priority} priority
                    </span>
                  </div>
                  <p className={`text-sm ${isChecked ? 'line-through text-muted-foreground' : 'text-muted-foreground'}`}>
                    {item.description}
                  </p>
                </div>
                {isChecked && (
                  <CheckCircle className="w-5 h-5 text-success mt-1" />
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation isMobile={isMobile} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <Shield className="w-8 h-8 text-primary" />
            Flood Preparedness Guide
          </h1>
          <p className="text-muted-foreground">
            Complete checklists and resources to help you prepare for, survive, and recover from flooding
          </p>
        </div>

        <Tabs defaultValue="before" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="before">Before</TabsTrigger>
            <TabsTrigger value="during">During</TabsTrigger>
            <TabsTrigger value="after">After</TabsTrigger>
            <TabsTrigger value="kit">Emergency Kit</TabsTrigger>
          </TabsList>

          <TabsContent value="before" className="space-y-6">
            <Card className="bg-info/5 border-info/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-info">
                  <Clock className="w-5 h-5" />
                  Before a Flood - Preparation Phase
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  The best time to prepare for a flood is before one happens. Use this checklist to ensure you and your family are ready.
                </p>
              </CardContent>
            </Card>
            
            {renderChecklist(beforeFloodChecklist, 'before')}
          </TabsContent>

          <TabsContent value="during" className="space-y-6">
            <Card className="bg-warning/5 border-warning/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <AlertTriangle className="w-5 h-5" />
                  During a Flood - Safety Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  When flooding occurs, your safety is the top priority. Follow these essential safety steps.
                </p>
              </CardContent>
            </Card>
            
            {renderChecklist(duringFloodChecklist, 'during')}
          </TabsContent>

          <TabsContent value="after" className="space-y-6">
            <Card className="bg-success/5 border-success/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-success">
                  <Home className="w-5 h-5" />
                  After a Flood - Recovery Steps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Once the immediate danger has passed, follow these steps to safely assess and begin recovery.
                </p>
              </CardContent>
            </Card>
            
            {renderChecklist(afterFloodChecklist, 'after')}
          </TabsContent>

          <TabsContent value="kit" className="space-y-6">
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Package className="w-5 h-5" />
                  Emergency Kit Essentials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  A well-stocked emergency kit can make the difference in a flood situation. Keep these items in a waterproof container.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {emergencyKit.map((item, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-background rounded border">
                      <Checkbox />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Family Emergency Plan
                </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">Create a plan that includes:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Emergency contact information</li>
                    <li>Meeting locations (local and out-of-area)</li>
                    <li>Evacuation routes and destinations</li>
                    <li>Communication plan for separated family</li>
                    <li>Special needs considerations</li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4">
                    <FileText className="w-4 h-4" />
                    Download Family Plan Template
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5" />
                    Downloadable Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">Get offline copies for emergency use:</p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <FileText className="w-4 h-4" />
                      Emergency Checklist PDF
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <FileText className="w-4 h-4" />
                      Family Emergency Plan
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <FileText className="w-4 h-4" />
                      Emergency Kit Checklist
                    </Button>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <FileText className="w-4 h-4" />
                      First Aid Quick Reference
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {isMobile && <Navigation isMobile={true} />}
    </div>
  );
};

export default Preparedness;