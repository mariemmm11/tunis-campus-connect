import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/components/ThemeProvider";
import Layout from "./layouts/Layout";
import Index from "./pages/Index";
import Careers from "./pages/Careers";
import Tests from "./pages/Tests";
import Offers from "./pages/Offers";
import Events from "./pages/Events";
import StudentLife from "./pages/StudentLife";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="tuniscampus-ui-theme">
      <TooltipProvider>
        <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Routes avec layout global (Header + Footer) */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="careers" element={<Careers />} />
              <Route path="tests" element={<Tests />} />
              <Route path="offers" element={<Offers />} />
              <Route path="events" element={<Events />} />
              <Route path="student-life" element={<StudentLife />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            
            {/* Routes sans layout (pages d'authentification) */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Route 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
