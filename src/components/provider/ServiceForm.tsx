import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Hammer, Home, Shield, Car } from "lucide-react";

interface ServiceFormProps {
  onServiceCreated: (service: any) => void;
  user: any;
}

const serviceCategories = [
  { id: "construction", label: "Construction Workers", icon: Hammer },
  { id: "domestic", label: "Domestic & Household Workers", icon: Home },
  { id: "security", label: "Security Personnel", icon: Shield },
  { id: "drivers", label: "Drivers", icon: Car }
];

export function ServiceForm({ onServiceCreated, user }: ServiceFormProps) {
  const [formData, setFormData] = useState({
    category: "",
    services: "",
    price: "",
    duration: "",
    description: "",
    experience: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const service = {
        id: Date.now().toString(),
        providerId: user.id,
        providerName: user.name,
        providerPhone: user.phone,
        providerLocation: user.location,
        ...formData,
        price: parseFloat(formData.price),
        duration: parseInt(formData.duration),
        createdAt: new Date().toISOString(),
        status: "active"
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      onServiceCreated(service);
      toast({
        title: "Service Posted!",
        description: "Your service has been successfully posted and is now visible to customers."
      });

      // Reset form
      setFormData({
        category: "",
        services: "",
        price: "",
        duration: "",
        description: "",
        experience: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post service. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Post Your Service</CardTitle>
        <CardDescription>Tell customers about the services you provide</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <Label>Service Category</Label>
            <RadioGroup 
              value={formData.category} 
              onValueChange={(value) => handleInputChange("category", value)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {serviceCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <div key={category.id} className="flex items-center space-x-2 border rounded-lg p-3">
                    <RadioGroupItem value={category.id} id={category.id} />
                    <Label htmlFor={category.id} className="flex items-center space-x-2 cursor-pointer">
                      <Icon className="h-5 w-5" />
                      <span>{category.label}</span>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="services">Services You Offer</Label>
            <Textarea
              id="services"
              placeholder="List all the specific services you provide (e.g., Plumbing, Electrical work, Carpentry)"
              value={formData.services}
              onChange={(e) => handleInputChange("services", e.target.value)}
              required
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹ per day)</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter daily rate"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Available Days</Label>
              <Input
                id="duration"
                type="number"
                placeholder="How many days"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience</Label>
            <Input
              id="experience"
              placeholder="Years of experience"
              value={formData.experience}
              onChange={(e) => handleInputChange("experience", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Additional Details</Label>
            <Textarea
              id="description"
              placeholder="Any additional information about your services, availability, or requirements"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Posting Service..." : "Post Service"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}