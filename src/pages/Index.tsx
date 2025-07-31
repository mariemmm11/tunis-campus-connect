import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import QuickTests from "@/components/QuickTests";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Services />
      <QuickTests />
      <Footer />
    </div>
  );
};

export default Index;
