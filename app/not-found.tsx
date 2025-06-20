import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { SectionContainer } from "@/components/ui/section-container";
import { AlertTriangle } from "lucide-react";
import Link from 'next/link'    

export default function NotFound() {
  return (
    <SectionContainer background="gray" className="min-h-screen flex items-center justify-center py-16">
      <Card className="w-full max-w-md mx-auto text-center shadow-lg animate-fade-in">
        <CardHeader>
          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center justify-center bg-orange/10 text-orange rounded-full w-16 h-16 mb-2">
              <AlertTriangle className="w-8 h-8" />
            </span>
            <CardTitle className="text-5xl font-bold text-navy">404</CardTitle>
            <CardDescription className="text-lg text-muted-foreground mt-2">
              Oops! The page you're looking for doesn't exist.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-base text-muted-foreground mb-4">
            It might have been moved or deleted. Let's get you back on track!
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Link href="/" className="bg-orange hover:bg-orange/90 text-white w-full rounded-md py-2">Go to Homepage</Link>
        </CardFooter>
      </Card>
    </SectionContainer>
  );
}
