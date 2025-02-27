import React from "react";
import {
  Code,
  Shield,
  Zap,
  Database,
  Cloud,
  Globe,
  Laptop,
  Server,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeader from "@/components/ui/section-header";

const technologies = {
  frontend: [
    {
      name: "React",
      description: "Modern UI library for building interactive user interfaces",
      icon: <Code className="h-6 w-6" />,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      name: "Tailwind CSS",
      description: "Utility-first CSS framework for rapid UI development",
      icon: <Laptop className="h-6 w-6" />,
      color: "bg-cyan-500/10 text-cyan-500",
    },
    {
      name: "Next.js",
      description:
        "React framework for production with SSR and static generation",
      icon: <Zap className="h-6 w-6" />,
      color: "bg-slate-500/10 text-slate-500",
    },
    {
      name: "TypeScript",
      description: "Typed superset of JavaScript for improved development",
      icon: <Code className="h-6 w-6" />,
      color: "bg-blue-700/10 text-blue-700",
    },
  ],
  backend: [
    {
      name: "Node.js",
      description: "JavaScript runtime built on Chrome's V8 engine",
      icon: <Server className="h-6 w-6" />,
      color: "bg-green-600/10 text-green-600",
    },
    {
      name: "Express",
      description: "Fast, unopinionated web framework for Node.js",
      icon: <Zap className="h-6 w-6" />,
      color: "bg-gray-500/10 text-gray-500",
    },
    {
      name: "MongoDB",
      description: "NoSQL database for flexible data storage",
      icon: <Database className="h-6 w-6" />,
      color: "bg-green-500/10 text-green-500",
    },
    {
      name: "REST API",
      description: "RESTful architecture for scalable API development",
      icon: <Globe className="h-6 w-6" />,
      color: "bg-indigo-500/10 text-indigo-500",
    },
  ],
};

export default function TechnologyStack() {
  return (
    <section className="py-10 sm:py-16 md:py-20 bg-background px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader
            logo="⚙️"
            title="Technology Stack"
            heading="Built with Modern, Scalable Technologies"
            description="Our school management system is powered by industry-leading technologies to ensure security, performance, and reliability for your institution."
          />
        </div>

        <div className="mt-8 md:mt-12">
          <Tabs defaultValue="frontend" className="mx-auto max-w-6xl">
            <div className="flex justify-center">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="frontend">Frontend</TabsTrigger>
                <TabsTrigger value="backend">Backend</TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(technologies).map(([key, techs]) => (
              <TabsContent key={key} value={key} className="mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {techs.map((tech, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden hover:shadow-md transition-all"
                    >
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div
                            className={`w-12 h-12 rounded-lg flex items-center justify-center ${tech.color}`}
                          >
                            {tech.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-1">
                              {tech.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {tech.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        <div className="mt-16 mx-auto max-w-6xl">
          <div className="bg-card rounded-lg border p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">
                  Why Our Technology Matters
                </h3>
                <ul className="space-y-3">
                  <li className="flex gap-2">
                    <Shield className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      Enterprise-grade security to protect sensitive student
                      data
                    </p>
                  </li>
                  <li className="flex gap-2">
                    <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      Optimized for performance even during peak usage periods
                    </p>
                  </li>
                  <li className="flex gap-2">
                    <Cloud className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      99.9% uptime guarantee with reliable cloud infrastructure
                    </p>
                  </li>
                  <li className="flex gap-2">
                    <Laptop className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-muted-foreground">
                      Responsive design that works across all devices
                    </p>
                  </li>
                </ul>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
                <h4 className="text-lg font-medium mb-3">Technology Support</h4>
                <p className="text-muted-foreground mb-4">
                  Our dedicated technical team ensures your school's system is
                  always running optimally with regular updates and proactive
                  monitoring.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="bg-white dark:bg-slate-700 p-3 rounded text-center flex-1">
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">
                      Technical Support
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-700 p-3 rounded text-center flex-1">
                    <div className="text-2xl font-bold text-primary">
                      Monthly
                    </div>
                    <div className="text-sm text-muted-foreground">
                      System Updates
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
