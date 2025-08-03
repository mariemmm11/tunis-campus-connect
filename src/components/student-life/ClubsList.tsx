import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStudentClubs } from "@/hooks/useStudentClubs";
import { useAuth } from "@/hooks/useAuth";
import { Users, Search, Mail, Calendar } from "lucide-react";

const ClubsList = () => {
  const { clubs, loading, error, joinClub, leaveClub, isMemberOfClub } = useStudentClubs();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("");

  // Filtrer les clubs
  const filteredClubs = clubs.filter(club => {
    const matchesSearch = club.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         club.campus.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = !selectedType || club.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  // Types de clubs uniques
  const clubTypes = [...new Set(clubs.map(club => club.type))];

  const handleJoinLeave = async (clubId: string, isMember: boolean) => {
    if (isMember) {
      await leaveClub(clubId);
    } else {
      await joinClub(clubId);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-48" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Skeleton className="w-12 h-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Clubs Étudiants
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Rejoignez des clubs étudiants et enrichissez votre expérience universitaire !
        </p>
      </div>

      {/* Filtres */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher un club..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 border border-input bg-background rounded-md"
        >
          <option value="">Tous les types</option>
          {clubTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Liste des clubs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClubs.map((club) => {
          const isMember = isMemberOfClub(club.id);
          
          return (
            <Card key={club.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={club.logo_url} alt={club.nom} />
                      <AvatarFallback>
                        {club.nom.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-foreground">{club.nom}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {club.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {club.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{club.nombre_membres} membres</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Campus: {club.campus}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs">{club.email_contact}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    onClick={() => handleJoinLeave(club.id, isMember)}
                    variant={isMember ? "outline" : "default"}
                    className="w-full"
                    disabled={!user}
                  >
                    {!user ? "Connectez-vous pour rejoindre" : 
                     isMember ? "Quitter le club" : "Rejoindre"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredClubs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Aucun club ne correspond à vos critères de recherche.
          </p>
        </div>
      )}
    </div>
  );
};

export default ClubsList;