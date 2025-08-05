import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SectorCardProps {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon: LucideIcon;
  jobCount: string;
  popularJobs: string[];
  index: number;
}

export const SectorCard = ({ 
  id, 
  name, 
  description, 
  color, 
  icon: Icon, 
  jobCount, 
  popularJobs, 
  index 
}: SectorCardProps) => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate(`/metiers-et-formations/secteur/${id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1]
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      className="group"
    >
      <Card className="relative overflow-hidden bg-gradient-card border-0 shadow-card hover:shadow-premium transition-all duration-500 backdrop-blur-sm">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-subtle opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        <CardContent className="relative p-8">
          {/* Icon with gradient background */}
          <motion.div
            whileHover={{ 
              scale: 1.1,
              rotate: [0, -5, 5, 0],
              transition: { duration: 0.6 }
            }}
            className="mb-6"
          >
            <div 
              className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative overflow-hidden`}
              style={{ backgroundColor: color }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />
              <Icon className="w-8 h-8 text-white relative z-10" />
            </div>
          </motion.div>

          {/* Content */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2 font-cal">
                {name}
              </h3>
              <p className="text-sm font-medium text-primary mb-3">
                {jobCount}
              </p>
            </div>

            {description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            )}

            {/* Popular jobs */}
            <div className="space-y-2">
              {popularJobs.slice(0, 4).map((job, jobIndex) => (
                <motion.div
                  key={job}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: (index * 0.1) + (jobIndex * 0.05) 
                  }}
                  className="flex items-center text-sm text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mr-3" />
                  {job}
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="pt-2"
            >
              <Button 
                onClick={handleExplore}
                variant="outline" 
                className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300 font-medium"
              >
                Explorer ce secteur
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </CardContent>

        {/* Hover glow effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div 
            className="absolute inset-0 blur-xl"
            style={{ 
              background: `radial-gradient(circle at 50% 50%, ${color}15 0%, transparent 70%)` 
            }}
          />
        </div>
      </Card>
    </motion.div>
  );
};