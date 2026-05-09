import React from "react";
import { Mail, MapPin, Send, MessageSquare } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Contact() {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <section className="rounded-3xl bg-gradient-to-br from-[#dce9e3] to-white p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#223e36]">
            <Mail className="h-7 w-7 text-white" />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-slate-900">Contact</h2>
            <p className="max-w-3xl text-base leading-7 text-slate-600">
              If you have questions, suggestions, or collaboration inquiries, please contact the PRMD 2.0 team.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Contact Information */}
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <MapPin className="h-5 w-5 text-[#223e36]" />
              Contact information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl bg-gradient-to-br from-[#edf4f0] to-white p-5">
              <p className="text-sm font-semibold text-slate-800">Address</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                Rice Research Institute, Guangdong Academy of Agricultural Sciences
                <br />
                Guangdong Key Laboratory of New Technology for Rice Breeding
                <br />
                Guangzhou 510640, China
              </p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-[#edf4f0] to-white p-5">
              <p className="text-sm font-semibold text-slate-800">Email</p>
              <p className="mt-2 text-sm leading-7 text-slate-600">
                RNA Bioinformatics Team
                <br />
                <a href="mailto:rnainfor@gmail.com" className="text-[#223e36] hover:underline">
                  rnainfor@gmail.com
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Form */}
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <MessageSquare className="h-5 w-5 text-[#223e36]" />
              Feedback
            </CardTitle>
            <CardDescription className="text-slate-500">
              We welcome your feedback and suggestions. Please fill out the form below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Subject</label>
              <Input placeholder="Subject" className="rounded-2xl" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Name</label>
                <Input placeholder="Your name" className="rounded-2xl" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
                <Input placeholder="Your email" className="rounded-2xl" />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Message</label>
              <textarea
                className="min-h-[160px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#223e36] focus:ring-1 focus:ring-[#223e36]/20"
                placeholder="Your feedback..."
              />
            </div>
            <Button className="w-full rounded-2xl bg-[#223e36] py-5 text-sm hover:bg-[#1b312b] sm:w-auto">
              <Send className="mr-2 h-4 w-4" />
              Submit Feedback
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Contact;
