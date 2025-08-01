import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { 
  Heart, 
  BookOpen, 
  Calendar, 
  TrendingUp, 
  User, 
  Bell,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Profile {
  first_name: string | null;
  last_name: string | null;
  university: string | null;
  education_level: string | null;
  interests: string[] | null;
}

interface TestResult {
  id: string;
  test_id: string;
  score: number | null;
  recommendations: string[] | null;
  completed_at: string;
  tests: {
    title: string;
    type: string;
  };
}

interface Favorite {
  id: string;
  item_type: string;
  item_id: string;
  created_at: string;
}

interface Application {
  id: string;
  status: string;
  applied_at: string;
  formations: {
    title: string;
    university: string;
  } | null;
}

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    if (!user) return;

    try {
      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      if (profileData) setProfile(profileData);

      // Fetch test results
      const { data: testData } = await supabase
        .from("test_results")
        .select(`
          *,
          tests (title, type)
        `)
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false })
        .limit(5);
      
      if (testData) setTestResults(testData);

      // Fetch favorites
      const { data: favoritesData } = await supabase
        .from("favorites")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);
      
      if (favoritesData) setFavorites(favoritesData);

      // Fetch applications
      const { data: applicationsData } = await supabase
        .from("applications")
        .select(`
          *,
          formations (title, university)
        `)
        .eq("user_id", user.id)
        .order("applied_at", { ascending: false });
      
      if (applicationsData) setApplications(applicationsData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepte":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "refuse":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "en_attente":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "accepte":
        return "Acceptée";
      case "refuse":
        return "Refusée";
      case "en_attente":
        return "En attente";
      default:
        return "En cours";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bonjour {profile?.first_name || "Étudiant"} !
          </h1>
          <p className="text-muted-foreground">
            Bienvenue sur votre tableau de bord personnel
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tests réalisés</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{testResults.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Favoris</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{favorites.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Candidatures</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applications.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Alertes</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="tests">Mes tests</TabsTrigger>
            <TabsTrigger value="favorites">Favoris</TabsTrigger>
            <TabsTrigger value="applications">Candidatures</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Profile Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Mon profil
                </CardTitle>
                <CardDescription>
                  Complétez votre profil pour obtenir des recommandations personnalisées
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Nom complet</p>
                    <p className="text-base">
                      {profile?.first_name && profile?.last_name 
                        ? `${profile.first_name} ${profile.last_name}`
                        : "Non renseigné"
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Université</p>
                    <p className="text-base">{profile?.university || "Non renseigné"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Niveau d'étude</p>
                    <p className="text-base">{profile?.education_level || "Non renseigné"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Centres d'intérêt</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile?.interests?.length ? (
                        profile.interests.map((interest, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {interest}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-base">Non renseigné</span>
                      )}
                    </div>
                  </div>
                </div>
                <Button className="mt-4" variant="outline">
                  Modifier mon profil
                </Button>
              </CardContent>
            </Card>

            {/* Recent Tests */}
            <Card>
              <CardHeader>
                <CardTitle>Tests récents</CardTitle>
                <CardDescription>Vos derniers tests d'orientation</CardDescription>
              </CardHeader>
              <CardContent>
                {testResults.length > 0 ? (
                  <div className="space-y-4">
                    {testResults.slice(0, 3).map((result) => (
                      <div key={result.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div>
                          <h4 className="font-medium">{result.tests.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Complété le {new Date(result.completed_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {result.score && (
                            <Badge variant="secondary">
                              Score: {result.score}%
                            </Badge>
                          )}
                          <Button variant="ghost" size="sm">
                            Voir les résultats
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Vous n'avez pas encore réalisé de test d'orientation.
                    </p>
                    <Button>
                      Faire un test
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tests">
            <Card>
              <CardHeader>
                <CardTitle>Historique des tests</CardTitle>
                <CardDescription>Tous vos tests d'orientation réalisés</CardDescription>
              </CardHeader>
              <CardContent>
                {testResults.length > 0 ? (
                  <div className="space-y-4">
                    {testResults.map((result) => (
                      <div key={result.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{result.tests.title}</h4>
                          <p className="text-sm text-muted-foreground mb-2">
                            Complété le {new Date(result.completed_at).toLocaleDateString('fr-FR')}
                          </p>
                          {result.recommendations && result.recommendations.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {result.recommendations.slice(0, 3).map((rec, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {rec}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {result.score && (
                            <Badge variant="secondary">
                              {result.score}%
                            </Badge>
                          )}
                          <Button variant="outline" size="sm">
                            Détails
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Aucun test réalisé pour le moment.
                    </p>
                    <Button>
                      Commencer un test
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites">
            <Card>
              <CardHeader>
                <CardTitle>Mes favoris</CardTitle>
                <CardDescription>Formations, métiers et événements sauvegardés</CardDescription>
              </CardHeader>
              <CardContent>
                {favorites.length > 0 ? (
                  <div className="space-y-4">
                    {favorites.map((favorite) => (
                      <div key={favorite.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <div>
                            <p className="font-medium">{favorite.item_type}</p>
                            <p className="text-sm text-muted-foreground">
                              Ajouté le {new Date(favorite.created_at).toLocaleDateString('fr-FR')}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Voir
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Aucun favori pour le moment.
                    </p>
                    <Button>
                      Explorer les formations
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications">
            <Card>
              <CardHeader>
                <CardTitle>Mes candidatures</CardTitle>
                <CardDescription>Suivi de vos candidatures aux formations</CardDescription>
              </CardHeader>
              <CardContent>
                {applications.length > 0 ? (
                  <div className="space-y-4">
                    {applications.map((application) => (
                      <div key={application.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">
                            {application.formations?.title || "Formation supprimée"}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {application.formations?.university} • 
                            Candidature du {new Date(application.applied_at).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(application.status)}
                          <Badge 
                            variant={
                              application.status === "accepte" ? "default" :
                              application.status === "refuse" ? "destructive" :
                              "secondary"
                            }
                          >
                            {getStatusText(application.status)}
                          </Badge>
                          <Button variant="outline" size="sm">
                            Détails
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">
                      Aucune candidature pour le moment.
                    </p>
                    <Button>
                      Parcourir les formations
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;