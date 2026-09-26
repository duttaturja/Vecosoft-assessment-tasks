import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Vecosoft support. We're here to help with your orders, deliveries, and any questions.",
};

const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "Get a response within 24 hours",
    value: "support@vecosoft.com",
    href: "mailto:support@vecosoft.com",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Mon–Fri, 9 AM – 6 PM EST",
    value: "+1 (800) 555-0199",
    href: "tel:+18005550199",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Available 24/7",
    value: "Start a conversation",
    href: "#",
  },
];

export default function ContactPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6 sm:px-6 sm:py-8 space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
          Contact Us
        </h1>
        <p className="text-sm text-muted-foreground max-w-md">
          Have a question about your order or need help? Reach out to our
          support team through any of the channels below.
        </p>
      </div>

      {/* Contact methods */}
      <div className="grid gap-3 sm:grid-cols-3">
        {contactMethods.map((method) => (
          <a
            key={method.title}
            href={method.href}
            className="block group"
          >
            <Card className="h-full transition-all duration-200 hover:ring-2 hover:ring-foreground/10 hover:shadow-md">
              <CardContent className="flex flex-col items-start gap-3 py-5">
                <div className="flex size-10 items-center justify-center rounded-xl bg-muted transition-transform duration-200 group-hover:scale-105">
                  <method.icon className="size-5 text-foreground" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">
                    {method.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {method.description}
                  </p>
                  <p className="text-sm font-medium text-foreground mt-2">
                    {method.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>

      {/* FAQ / Additional info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Frequently Asked Questions</CardTitle>
          <CardDescription>
            Quick answers to common delivery questions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            {
              q: "Where is my package?",
              a: "You can track your package in real-time from the Orders page. Click on any order to see detailed tracking information.",
            },
            {
              q: "My order shows delivered but I haven't received it",
              a: "Check around your delivery location, including with neighbors. If you still can't find it, use our Report Issue page to file a claim.",
            },
            {
              q: "Can I change my delivery address?",
              a: "Address changes are available for orders still in Processing status. Contact our support team for assistance.",
            },
            {
              q: "What are your support hours?",
              a: "Live chat is available 24/7. Phone support is available Monday through Friday, 9 AM to 6 PM EST. Email responses are within 24 hours.",
            },
          ].map((faq) => (
            <div key={faq.q} className="space-y-1">
              <h4 className="text-sm font-medium text-foreground">{faq.q}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Office info */}
      <Card>
        <CardContent className="flex flex-col sm:flex-row gap-4 py-5">
          <div className="flex items-start gap-3">
            <MapPin className="size-4 shrink-0 mt-0.5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Vecosoft HQ
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                123 Commerce Street
                <br />
                San Francisco, CA 94102
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 sm:ml-auto">
            <Clock className="size-4 shrink-0 mt-0.5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Business Hours
              </p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Mon – Fri: 9:00 AM – 6:00 PM EST
                <br />
                Sat – Sun: Closed
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
