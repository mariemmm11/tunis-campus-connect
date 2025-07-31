import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, LucideIcon } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: "primary" | "secondary" | "accent" | "success";
  href: string;
}

const ServiceCard = ({ title, description, icon: Icon, color, href }: ServiceCardProps) => {
  const colorClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90",
    success: "bg-success text-success-foreground hover:bg-success/90",
  };

  const iconColorClasses = {
    primary: "bg-primary/10 text-primary",
    secondary: "bg-secondary/10 text-secondary",
    accent: "bg-accent/10 text-accent",
    success: "bg-success/10 text-success",
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className={`w-16 h-16 rounded-xl ${iconColorClasses[color]} flex items-center justify-center mb-4`}>
          <Icon className="w-8 h-8" />
        </div>
        
        <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
        
        <Button 
          variant="outline" 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
        >
          Découvrir
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;