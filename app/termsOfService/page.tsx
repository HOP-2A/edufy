import React from "react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  Info,
  Mail,
  Scale,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function TermsOfService() {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="container mx-auto max-w-5xl py-12 px-4 md:px-6">
        <div className="flex flex-col justify-center gap-10">
          <header className="space-y-4">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground mb-2">
              Legal Document
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
              Terms of Service
            </h1>
            <div className="flex items-center text-sm text-muted-foreground">
              <span className="font-medium">Effective Date:</span>
              <span className="ml-2 bg-secondary px-2 py-0.5 rounded">
                February 2, 2026
              </span>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              These Terms of Service govern your access to and use of the
              **Edufy** platform. By accessing our Service, you agree to be
              legally bound by these Terms.
            </p>
          </header>

          <Separator />

          <Alert className="bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertTitle className="text-blue-800 dark:text-blue-300">
              AI Disclosure
            </AlertTitle>
            <AlertDescription className="text-blue-700 dark:text-blue-400">
              Our Service utilizes artificial intelligence to generate
              educational content. Outputs may occasionally be inaccurate or
              incomplete. Use with professional discretion.
            </AlertDescription>
          </Alert>

          <div className="grid gap-12 text-base leading-7 text-foreground/90">
            <section id="eligibility" className="scroll-mt-20">
              <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight text-foreground">
                <UserCheck className="h-5 w-5 text-primary" /> 1. Eligibility
              </h2>
              <p className="mt-4">
                You must be at least **13 years old** to use the Service. If you
                are under the age of majority in your jurisdiction, you may use
                the Service only with the consent of a parent or legal guardian.
              </p>
            </section>

            <section id="registration" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight">
                2. Account Registration
              </h2>
              <p className="mt-4">
                To access certain features, you may be required to create an
                account. You agree to provide accurate and complete information
                and to keep your account credentials secure. You are responsible
                for all activity that occurs under your account.
              </p>
            </section>

            <section id="description" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight">
                3. Description of Service
              </h2>
              <p className="mt-4">
                The Service uses artificial intelligence to generate educational
                materials, including but not limited to courses, lessons,
                quizzes, and summaries. The Service also includes community
                features such as forums, comments, or discussion boards
                (Community).
              </p>
              <div className="mt-4 border-l-4 border-primary/20 pl-4 italic text-muted-foreground">
                <p>
                  You acknowledge that AI-generated content may contain errors
                  and is provided for informational purposes only.
                </p>
              </div>
            </section>

            <section id="license" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight">
                4. License to Use the Service
              </h2>
              <p className="mt-4">
                Subject to your compliance with these Terms, we grant you a
                limited, non-exclusive, non-transferable, revocable license to
                access and use the Service for personal or internal business
                purposes.
              </p>
            </section>

            <section id="user-content" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight">
                5. User Content
              </h2>
              <div className="mt-4 space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground">
                    5.1 Your Content
                  </h3>
                  <p>
                    You retain ownership of your User Content. By submitting it,
                    you grant us a worldwide, royalty-free license to host,
                    store, and distribute your content to operate the Service.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    5.2 Responsibility
                  </h3>
                  <p>
                    You are solely responsible for your User Content and
                    represent that you have all necessary rights to submit it.
                  </p>
                </div>
              </div>
            </section>

            <section id="community" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight">
                6. Community Guidelines
              </h2>
              <p className="mt-4">You agree not to post content that is:</p>
              <ul className="mt-4 list-disc pl-6 space-y-2 marker:text-primary">
                <li>Unlawful, abusive, harassing, or defamatory.</li>
                <li>Infringing on intellectual property or privacy rights.</li>
                <li>Spam, malware, or misleading information.</li>
                <li>Attempting to reverse engineer the AI systems.</li>
              </ul>
            </section>

            <section
              id="ai-specific"
              className="scroll-mt-20 bg-muted/30 p-6 rounded-xl border"
            >
              <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                <AlertCircle className="h-5 w-5 text-primary" /> 7. AI-Generated
                Content
              </h2>
              <ul className="mt-4 list-disc pl-6 space-y-3">
                <li>
                  Generated content may be similar to content generated for
                  other users.
                </li>
                <li>
                  We do not guarantee originality, accuracy, or suitability for
                  any purpose.
                </li>
                <li>
                  <strong>
                    You are responsible for reviewing and validating
                    AI-generated content before use.
                  </strong>
                </li>
              </ul>
            </section>

            <section id="ip" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight">
                8. Intellectual Property
              </h2>
              <p className="mt-4">
                All rights, title, and interest in the Service, including
                software, models, and branding, are owned by us or our
                licensors. No rights are transferred to you except the limited
                license granted herein.
              </p>
            </section>

            <section id="termination" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight text-destructive">
                10. Termination
              </h2>
              <p className="mt-4">
                We may suspend or terminate your access at any time if we
                believe you have violated these Terms. Upon termination, your
                license to use the Service immediately ceases.
              </p>
            </section>

            <section id="disclaimer" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight">
                11. Disclaimer of Warranties
              </h2>
              <Card className="mt-4 bg-muted/50 border-none">
                <CardContent className="pt-6 font-mono text-xs md:text-sm uppercase tracking-tight">
                  THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS
                  AVAILABLE.&quot; TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE
                  DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING
                  MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
                </CardContent>
              </Card>
            </section>

            <section id="liability" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight">
                12. Limitation of Liability
              </h2>
              <Card className="mt-4 bg-muted/50 border-none">
                <CardContent className="pt-6 font-mono text-xs md:text-sm uppercase tracking-tight">
                  OUR TOTAL LIABILITY FOR ANY CLAIM SHALL NOT EXCEED THE AMOUNT
                  YOU PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM. WE
                  SHALL NOT BE LIABLE FOR INDIRECT OR CONSEQUENTIAL DAMAGES.
                </CardContent>
              </Card>
            </section>

            <section id="indemnity" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight">
                13. Indemnification
              </h2>
              <p className="mt-4">
                You agree to indemnify Edufy and its affiliates from any claims
                arising from your use of the Service or violation of these
                Terms.
              </p>
            </section>

            <section id="privacy" className="scroll-mt-20">
              <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                <ShieldCheck className="h-5 w-5 text-primary" /> 14. Privacy
              </h2>
              <p className="mt-4">
                Your use of the Service is also governed by our Privacy Policy,
                which explains our data collection and usage practices.
              </p>
            </section>

            <section id="law" className="scroll-mt-20">
              <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
                <Scale className="h-5 w-5 text-primary" /> 15. Governing Law
              </h2>
              <p className="mt-4">
                These Terms shall be governed by the laws of the **Federal
                Republic of Mongolia**, and any disputes shall be resolved
                exclusively in the courts located in **Mongolia**.
              </p>
            </section>

            <section id="changes" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight">
                16. Changes to These Terms
              </h2>
              <p className="mt-4 text-muted-foreground">
                We may update these Terms from time to time. Continued use of
                the Service after changes become effective constitutes
                acceptance of the revised Terms.
              </p>
            </section>

            <section id="contact" className="scroll-mt-20 border-t pt-10">
              <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" /> 17. Contact
                Information
              </h2>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:items-center">
                <p className="text-muted-foreground font-medium">
                  Have questions?
                </p>
                <a
                  href="https://pinecone.mn/"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                  PineconeAcademy
                </a>
              </div>
            </section>
          </div>

          <footer className="mt-12 text-center text-sm text-muted-foreground border-t pt-8 pb-12">
            <p>
              By using the Service, you acknowledge that you have read,
              understood, and agreed to these Terms of Service.
            </p>
            <p className="mt-2">
              © {new Date().getFullYear()} Edufy. All rights reserved.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
