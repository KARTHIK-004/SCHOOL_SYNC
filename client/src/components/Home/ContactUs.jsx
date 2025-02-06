import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import SectionHeader from "@/components/ui/section-header";
import ContactUsForm from "../Forms/ContactUs/ContactUsForm";

const ContactUs = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mx-auto max-w-3xl text-center mb-8">
          <SectionHeader
            logo="👋"
            title="Get In Touch"
            heading="Get Your School Management System"
            description="Ready to transform your school's digital infrastructure? 
            Fill out the form below and we'll help you get started with a customized
            solution tailored to your institution's needs."
          />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-4">
            <Card className="bg-primary text-primary-foreground">
              <CardHeader>
                <CardTitle>Speak to someone in sales</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  To create a more value-added solution, it is essential to
                  analyze the possibilities for improvement.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="secondary">Book Appointment</Button>
              </CardFooter>
            </Card>
            <Card className="bg-secondary text-secondary-foreground">
              <CardHeader>
                <CardTitle>Contact our team</CardTitle>
                <CardDescription className="text-secondary-foreground/80">
                  To create a more value-added solution, it is essential to
                  analyze the possibilities for improvement.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="default">Send an Email</Button>
              </CardFooter>
            </Card>
          </div>

          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Our team will reach out within 24 hours to schedule a
                personalized demo and discuss your specific needs.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactUsForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
