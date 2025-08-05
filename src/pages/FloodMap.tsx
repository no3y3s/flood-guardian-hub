import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Navigation from '@/components/Navigation';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Map, 
  MapPin, 
  Search, 
  Layers, 
  AlertTriangle,
  Shield,
  Home,
  Navigation2,
  ZoomIn,
  ZoomOut,
  Locate,
  Filter
} from 'lucide-react';

const FloodMap = () => {
  const isMobile = useIsMobile();
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedLayer, setSelectedLayer] = useState('flood-risk');

  // Mock map data - in real app this would come from mapping APIs
  const mapLayers = [
    { id: 'flood-risk', name: 'Flood Risk Zones', color: 'bg-gradient-alert', active: true },
    { id: 'elevation', name: 'Elevation', color: 'bg-gradient-safe', active: false },
    { id: 'shelters', name: 'Emergency Shelters', color: 'bg-success', active: true },
    { id: 'evacuation', name: 'Evacuation Routes', color: 'bg-info', active: false },
    { id: 'current-alerts', name: 'Active Alerts', color: 'bg-danger', active: true }
  ];

  const nearbyLocations = [
    {
      name: 'Community Center Shelter',
      type: 'shelter',
      distance: '0.3 miles',
      status: 'Open',
      capacity: '200 people',
      address: '123 Main St'
    },
    {
      name: 'High Risk Zone - River District',
      type: 'warning',
      distance: '0.8 miles',
      status: 'Flash Flood Warning',
      severity: 'High',
      address: 'Downtown Area'
    },
    {
      name: 'Safe Zone - Hillcrest Area',
      type: 'safe',
      distance: '1.2 miles',
      status: 'Low Risk',
      elevation: '450 ft',
      address: 'Hillcrest Neighborhood'
    }
  ];

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'shelter': return Shield;
      case 'warning': return AlertTriangle;
      case 'safe': return Home;
      default: return MapPin;
    }
  };

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'shelter': return 'text-success';
      case 'warning': return 'text-danger';
      case 'safe': return 'text-info';
      default: return 'text-primary';
    }
  };

  const toggleLayer = (layerId: string) => {
    console.log('Toggle layer:', layerId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation isMobile={isMobile} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
            <Map className="w-8 h-8 text-primary" />
            Interactive Flood Risk Map
          </h1>
          <p className="text-muted-foreground">
            View real-time flood conditions, risk zones, and emergency resources in your area
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Map Controls Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Location Search */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Location Search
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Enter address or landmark"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Locate className="w-4 h-4" />
                    Use My Location
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Map Layers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Map Layers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {mapLayers.map((layer) => (
                  <div key={layer.id} className="flex items-center justify-between p-2 rounded border">
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded ${layer.color}`} />
                      <span className="text-sm">{layer.name}</span>
                    </div>
                    <Button
                      variant={layer.active ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleLayer(layer.id)}
                      className="h-6 px-2 text-xs"
                    >
                      {layer.active ? 'ON' : 'OFF'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Nearby Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Nearby Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {nearbyLocations.map((location, index) => {
                  const Icon = getLocationIcon(location.type);
                  return (
                    <div key={index} className="p-3 border rounded hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-start gap-2">
                        <Icon className={`w-4 h-4 mt-1 ${getLocationColor(location.type)}`} />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{location.name}</h4>
                          <p className="text-xs text-muted-foreground">{location.address}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                location.type === 'warning' ? 'border-danger text-danger' :
                                location.type === 'shelter' ? 'border-success text-success' :
                                'border-info text-info'
                              }`}
                            >
                              {location.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{location.distance}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Main Map Area */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] relative overflow-hidden">
              <CardContent className="p-0 h-full">
                {/* Map Placeholder */}
                <div className="w-full h-full bg-gradient-to-br from-primary/5 to-info/10 relative">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMiIgZmlsbD0iIzMzMzMzMzIwIi8+Cjwvc3ZnPgo=')] opacity-30" />
                  
                  {/* Map Mock Elements */}
                  <div className="absolute inset-4 space-y-4">
                    {/* Legend */}
                    <Card className="absolute top-4 left-4 bg-white/95 backdrop-blur">
                      <CardContent className="p-3">
                        <h3 className="font-semibold text-sm mb-2">Risk Levels</h3>
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-danger rounded" />
                            <span>Extreme Risk</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-warning rounded" />
                            <span>High Risk</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-info rounded" />
                            <span>Moderate Risk</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-success rounded" />
                            <span>Low Risk</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Map Controls */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <Button variant="outline" size="sm" className="bg-white/95 backdrop-blur">
                        <ZoomIn className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="bg-white/95 backdrop-blur">
                        <ZoomOut className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="bg-white/95 backdrop-blur">
                        <Layers className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Mock Map Features */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        {/* Current Location */}
                        <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg animate-pulse-glow" />
                        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-white/95 px-2 py-1 rounded shadow">
                          Your Location
                        </span>
                      </div>
                    </div>

                    {/* Risk Zones - Mock */}
                    <div className="absolute bottom-1/3 left-1/4 w-32 h-20 bg-danger/30 rounded-lg border-2 border-danger/50" />
                    <div className="absolute top-1/3 right-1/4 w-24 h-16 bg-warning/30 rounded-lg border-2 border-warning/50" />
                    <div className="absolute bottom-1/4 right-1/3 w-20 h-12 bg-success/30 rounded-lg border-2 border-success/50" />

                    {/* Shelter Markers */}
                    <div className="absolute top-1/4 left-1/3">
                      <div className="w-6 h-6 bg-success rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <Shield className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    {/* Map Placeholder Text */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <Card className="bg-white/95 backdrop-blur">
                        <CardContent className="p-4 text-center">
                          <Map className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-sm text-muted-foreground">
                            Interactive map will display here
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Integration with mapping services required
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Below Map */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              <Button variant="outline" className="h-auto p-3 flex flex-col gap-2">
                <Shield className="w-5 h-5 text-success" />
                <span className="text-sm">Find Shelter</span>
              </Button>
              <Button variant="outline" className="h-auto p-3 flex flex-col gap-2">
                <Navigation2 className="w-5 h-5 text-info" />
                <span className="text-sm">Evacuation Route</span>
              </Button>
              <Button variant="outline" className="h-auto p-3 flex flex-col gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                <span className="text-sm">Report Flooding</span>
              </Button>
              <Button variant="outline" className="h-auto p-3 flex flex-col gap-2">
                <Filter className="w-5 h-5 text-primary" />
                <span className="text-sm">Filter View</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Map Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mt-8">
          <Card className="bg-info/5 border-info/20">
            <CardHeader>
              <CardTitle className="text-info flex items-center gap-2">
                <Map className="w-5 h-5" />
                How to Use the Map
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• Use layers to view different types of information</p>
              <p>• Click on markers to see detailed information</p>
              <p>• Search for specific addresses or landmarks</p>
              <p>• Toggle risk zones to see flood probability areas</p>
            </CardContent>
          </Card>

          <Card className="bg-warning/5 border-warning/20">
            <CardHeader>
              <CardTitle className="text-warning flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Understanding Risk Zones
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• Red zones: Extreme flood risk, evacuate immediately</p>
              <p>• Orange zones: High risk, prepare for evacuation</p>
              <p>• Blue zones: Moderate risk, stay alert</p>
              <p>• Green zones: Low risk, safe areas</p>
            </CardContent>
          </Card>

          <Card className="bg-success/5 border-success/20">
            <CardHeader>
              <CardTitle className="text-success flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Emergency Resources
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• Shield icons: Emergency shelters</p>
              <p>• Cross icons: Medical facilities</p>
              <p>• Route lines: Evacuation paths</p>
              <p>• All resources are verified and updated regularly</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {isMobile && <Navigation isMobile={true} />}
    </div>
  );
};

export default FloodMap;