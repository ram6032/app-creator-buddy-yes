import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Hammer, Home, Shield, Car, Phone, MapPin, Calendar, DollarSign, User } from "lucide-react";

interface ServiceBrowserProps {
  services: any[];
  user: any;
}

const serviceCategories = [
  { id: "all", label: "All Categories" },
  { id: "construction", label: "Construction Workers", icon: Hammer },
  { id: "domestic", label: "Domestic & Household Workers", icon: Home },
  { id: "security", label: "Security Personnel", icon: Shield },
  { id: "drivers", label: "Drivers", icon: Car }
];

export function ServiceBrowser({ services, user }: ServiceBrowserProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const { toast } = useToast();

  const filteredServices = services.filter(service => {
    const categoryMatch = selectedCategory === "all" || service.category === selectedCategory;
    const priceMatch = !maxPrice || service.price <= parseFloat(maxPrice);
    const locationMatch = !searchLocation || 
      service.providerLocation.toLowerCase().includes(searchLocation.toLowerCase());
    
    return categoryMatch && priceMatch && locationMatch && service.status === "active";
  });

  const handleBookService = (service: any) => {
    toast({
      title: "Service Booked!",
      description: `You have successfully booked ${service.providerName}'s service. They will contact you soon.`
    });
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = serviceCategories.find(c => c.id === categoryId);
    return category?.icon || User;
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Find Services</CardTitle>
          <CardDescription>Filter services based on your requirements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Max Price (₹ per day)</label>
              <Input
                type="number"
                placeholder="Enter max budget"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                placeholder="Search by location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Service Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-muted-foreground">No services found matching your criteria.</p>
          </div>
        ) : (
          filteredServices.map(service => {
            const CategoryIcon = getCategoryIcon(service.category);
            return (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-2">
                      <CategoryIcon className="h-5 w-5 text-primary" />
                      <Badge variant="secondary">
                        {serviceCategories.find(c => c.id === service.category)?.label}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-green-600 font-semibold">
                        <DollarSign className="h-4 w-4" />
                        ₹{service.price}/day
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg">{service.providerName}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {service.providerLocation}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      Available for {service.duration} days
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <User className="h-4 w-4 mr-1" />
                      {service.experience} years experience
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm mb-1">Services:</h4>
                    <p className="text-sm text-muted-foreground">{service.services}</p>
                  </div>

                  {service.description && (
                    <div>
                      <h4 className="font-medium text-sm mb-1">Details:</h4>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  )}

                  <div className="flex space-x-2 pt-2">
                    <Button 
                      onClick={() => handleBookService(service)}
                      className="flex-1"
                    >
                      Book Service
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={() => window.open(`tel:${service.providerPhone}`)}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}