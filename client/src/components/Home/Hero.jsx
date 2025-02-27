import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import SmallTitle from "../ui/small-title";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-0 left-0 right-0 h-[70vh] bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 -z-20 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(var(--primary) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center mb-12 md:mb-20">
          <SmallTitle logo="🎓" title="Revolutionizing School Management" />

          <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight md:leading-tight mb-6 animate-fade-in animate-delay-100">
            Simplify School Management with{" "}
            <span className="text-primary">School Sync</span>
          </h1>

          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 animate-fade-in animate-delay-200">
            A comprehensive platform that streamlines administration, enhances
            communication, and improves learning outcomes for modern educational
            institutions.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-fade-in animate-delay-300">
            <Link to="/contact-us">
              <Button size="lg" className="group">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/contact-us">
              <Button variant="outline" size="lg">
                Book a Demo
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-8 text-sm text-secondary-foreground animate-fade-in animate-delay-400">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-success" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-success" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-success" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="relative max-w-5xl mx-auto animate-fade-in animate-delay-500">
          <div className="aspect-[16/9] mx-auto overflow-hidden rounded-lg shadow-2xl ring-1 ring-primary/10">
            <div className="glass-card w-full h-full bg-primary/5 p-2 rounded-lg">
              <div className="w-full h-full bg-primary/10 rounded-md overflow-hidden relative">
                {/* App UI mockup */}
                <div className="flex h-full">
                  {/* Sidebar mockup */}
                  <div className="w-56 bg-primary/5 border-r border-primary/10 h-full hidden md:block">
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-6 h-6 rounded-md bg-primary"></div>
                        <div className="h-4 w-24 bg-primary/20 rounded"></div>
                      </div>
                      <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-4 h-4 rounded-sm bg-primary/20"></div>
                            <div className="h-3 bg-primary/20 rounded w-20"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Main content mockup */}
                  <div className="flex-1 p-6">
                    <div className="mb-6">
                      <div className="h-8 w-48 bg-primary/20 rounded-md mb-4"></div>
                      <div className="flex gap-4">
                        <div className="h-10 w-32 bg-primary/40 rounded-md"></div>
                        <div className="h-10 w-32 bg-primary/20 rounded-md"></div>
                        <div className="h-10 w-32 bg-primary/20 rounded-md"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="bg-primary/5 p-4 rounded-lg shadow-sm border border-primary/10"
                        >
                          <div className="flex justify-between items-center mb-4">
                            <div className="h-5 w-20 bg-primary/20 rounded"></div>
                            <div className="w-10 h-10 rounded-full bg-primary/15"></div>
                          </div>
                          <div className="h-6 w-16 bg-primary/20 rounded mb-2"></div>
                          <div className="h-3 w-full bg-primary/10 rounded"></div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-primary/5 rounded-lg shadow-sm border border-primary/10 p-4">
                      <div className="flex justify-between items-center mb-4">
                        <div className="h-5 w-32 bg-primary/20 rounded"></div>
                        <div className="h-8 w-24 bg-primary/30 rounded-md"></div>
                      </div>
                      <div className="space-y-3">
                        {[1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between py-2 border-b border-primary/10"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-primary/15"></div>
                              <div>
                                <div className="h-3 w-24 bg-primary/20 rounded mb-1"></div>
                                <div className="h-2 w-32 bg-primary/10 rounded"></div>
                              </div>
                            </div>
                            <div className="h-6 w-16 bg-primary/15 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shadow effect */}
          <div className="absolute -bottom-6 inset-x-0 h-[70px] bg-gradient-to-t from-background pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
