import React from "react";
import { Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Contact() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-gradient-to-br from-[#dce9e3] to-white p-8 text-center shadow-sm">
        <h2 className="text-3xl font-bold text-slate-900">Contact</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">If you have questions, suggestions, or collaboration inquiries, please contact the PRMD 2.0 team.</p>
      </section>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5 text-[#223e36]" /> Contact information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm leading-7 text-slate-600">
            <div className="rounded-2xl bg-slate-50 p-4">
              Rice Research Institute, Guangdong Academy of Agricultural Sciences<br />
              Guangdong Key Laboratory of New Technology for Rice Breeding<br />
              Guangzhou 510640, China
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              RNA Bioinformatics Team<br />
              rnainfor@gmail.com
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-3xl border-0 shadow-sm">
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
            <CardDescription>表单前端样式先搭好，后续可接发信或保存接口</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Subject" className="rounded-2xl" />
            <Input placeholder="Name" className="rounded-2xl" />
            <Input placeholder="Email" className="rounded-2xl" />
            <textarea className="min-h-[160px] w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#223e36]" placeholder="Feedback..." />
            <Button className="rounded-2xl bg-[#223e36] hover:bg-[#1b312b]">Submit</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Contact;
