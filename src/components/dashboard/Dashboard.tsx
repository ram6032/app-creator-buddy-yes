import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServiceForm } from "@/components/provider/ServiceForm";
import { ServiceBrowser } from "@/components/receiver/ServiceBrowser";
import { LogOut, Plus, Search, User } from "lucide-react";

interface DashboardProps {
  user: any;
  onLogout: () => void;
}

export function Dashboard({ user, onLogout }: DashboardProps) {
  const [services, setServices] = useState<any[]>([]);
  const [showServiceForm, setShowServiceForm] = useState(false);

  const handleServiceCreated = (service: any) => {
    setServices(prev => [service, ...prev]);
    setShowServiceForm(false);
  };

  const isProvider = user.role === "provider";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold">ServiceConnect</h1>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{user.name}</span>
                <span>•</span>
                <span className="capitalize">{user.role}</span>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {isProvider ? (
          // Provider Dashboard
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold">Provider Dashboard</h2>
                <p className="text-muted-foreground">Manage your services and connect with customers</p>
              </div>
              <Button onClick={() => setShowServiceForm(!showServiceForm)}>
                <Plus className="h-4 w-4 mr-2" />
                {showServiceForm ? "Cancel" : "Post Service"}
              </Button>
            </div>

            {showServiceForm && (
              <ServiceForm
                onServiceCreated={handleServiceCreated}
                user={user}
              />
            )}

            {/* Provider's Services */}
            <Card>
              <CardHeader>
                <CardTitle>Your Services</CardTitle>
                <CardDescription>Services you've posted</CardDescription>
              </CardHeader>
              <CardContent>
                {services.filter(s => s.providerId === user.id).length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No services posted yet. Click "Post Service" to get started.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services
                      .filter(s => s.providerId === user.id)
                      .map(service => (
                        <Card key={service.id}>
                          <CardHeader>
                            <CardTitle className="text-lg">{service.category}</CardTitle>
                            <CardDescription>₹{service.price}/day • {service.duration} days</CardDescription>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm">{service.services}</p>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          // Receiver Dashboard
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold">Find Services</h2>
              <p className="text-muted-foreground">Browse and book services from verified providers</p>
            </div>

            <ServiceBrowser services={services} user={user} />
          </div>
        )}
      </main>
    </div>
  );
}