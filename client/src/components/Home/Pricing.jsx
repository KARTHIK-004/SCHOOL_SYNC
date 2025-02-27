import React, { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionHeader from "../ui/section-header";

const features = [
  { title: "Complete Student Management System", included: true },
  { title: "Parent-Teacher Communication Platform", included: true },
  { title: "Attendance Tracking System", included: true },
  { title: "24/7 Customer Support", included: true },
  { title: "Academic & Examination Tools", included: true },
  { title: "Basic Financial Management", included: true },
  { title: "Real-time Notifications", included: true },
  { title: "Regular System Updates", included: true },
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState("annually");

  const price = billingCycle === "monthly" ? 299 : 2990;

  return (
    <section className="py-8 sm:py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeader
            logo="🎯"
            title="Choose Your Plan"
            heading="Transparent, Per-Student Pricing"
            description="Simple, predictable pricing that grows with your institution. All
            features included, no hidden fees. Special discounts available for large institutions."
          />
        </div>
        <div className="mt-6 sm:mt-8 flex justify-center">
          <Tabs
            defaultValue="monthly"
            value={billingCycle}
            onValueChange={setBillingCycle}
            className="w-full max-w-[400px]"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annually">
                Annually{" "}
                <span className="hidden sm:inline">(2 months free)</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="mt-6 sm:mt-10">
          <Card className="max-w-[1200px] mx-auto">
            <CardContent className="p-4 sm:p-6 md:p-10">
              <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
                <div className="space-y-6 sm:space-y-8 lg:flex-grow">
                  <div className="space-y-2">
                    <h2 className="text-2xl sm:text-3xl font-semibold text-primary">
                      {billingCycle === "monthly" ? "Monthly" : "Annual"} School
                      License
                    </h2>
                    <p className="text-base sm:text-lg text-muted-foreground">
                      {billingCycle === "monthly"
                        ? "Flexible month-to-month access to our comprehensive school management system. Ideal for schools that prefer monthly budgeting or want to start with a short-term commitment."
                        : "Get a full year of access at a discounted rate. Perfect for schools looking to secure long-term access and save on their annual education technology budget."}
                    </p>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="text-xl sm:text-2xl font-semibold">
                      Everything you need included
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4">
                      {features.map((feature) => (
                        <div
                          key={feature.title}
                          className="flex items-center gap-2 sm:gap-3"
                        >
                          <Check className="h-4 w-4 sm:h-5 sm:w-5 text-success shrink-0" />
                          <span className="text-sm sm:text-base text-muted-foreground">
                            {feature.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t lg:border-t-0 lg:border-l lg:pl-10 lg:pt-4 lg:mt-0 lg:min-w-[300px]">
                  <div className="text-center space-y-6 sm:space-y-8">
                    <div>
                      <p className="text-base sm:text-lg text-muted-foreground mb-3 sm:mb-4">
                        Simple per-student pricing
                      </p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl sm:text-5xl md:text-6xl font-bold">
                          ₹{price}
                        </span>
                        <span className="text-base sm:text-lg md:text-xl text-muted-foreground">
                          {billingCycle === "monthly"
                            ? "/student/month"
                            : "/student/year"}
                        </span>
                      </div>
                      {billingCycle === "annually" && (
                        <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                          Equivalent to ₹249/student/month
                        </p>
                      )}
                    </div>

                    <div className="space-y-3 sm:space-y-4">
                      <Button
                        size="lg"
                        className="w-full py-4 sm:py-6 text-base sm:text-lg"
                      >
                        Start Free Trial
                      </Button>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        14-day free trial • No credit card required
                        <br className="sm:hidden" />
                        Volume discounts available
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
