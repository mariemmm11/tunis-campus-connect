import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClubsList from "@/components/student-life/ClubsList";
import ResidencesList from "@/components/student-life/ResidencesList";
import RestaurantsList from "@/components/student-life/RestaurantsList";
import StudentTestimonials from "@/components/student-life/StudentTestimonials";
import HealthWellness from "@/components/student-life/HealthWellness";
import StudentTransport from "@/components/student-life/StudentTransport";
import { Users, Home, Utensils, MessageSquare, Heart, Bus } from "lucide-react";

const StudentLife = () => {
  const [activeTab, setActiveTab] = useState("clubs");

  const sections = [
    {
      id: "clubs",
      label: "Clubs Étudiants",
      icon: Users,
      component: <ClubsList />
    },
    {
      id: "residences", 
      label: "Résidences",
      icon: Home,
      component: <ResidencesList />
    },
    {
      id: "restaurants",
      label: "Restaurants",
      icon: Utensils,
      component: <RestaurantsList />
    },
    {
      id: "temoignages",
      label: "Témoignages", 
      icon: MessageSquare,
      component: <StudentTestimonials />
    },
    {
      id: "sante",
      label: "Santé & Bien-être",
      icon: Heart,
      component: <HealthWellness />
    },
    {
      id: "transport",
      label: "Transport",
      icon: Bus,
      component: <StudentTransport />
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-glow py-16">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Vie Étudiante
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Découvrez tout ce qu'il faut savoir pour vivre pleinement votre expérience étudiante en Tunisie
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-8">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <TabsTrigger 
                  key={section.id} 
                  value={section.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{section.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {sections.map((section) => (
            <TabsContent key={section.id} value={section.id}>
              {section.component}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default StudentLife;