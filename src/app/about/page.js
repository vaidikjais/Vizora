import Navigation from "@/components/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-black">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1 text-sm mb-6">
            About Vizora
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Revolutionizing YouTube Thumbnails with{" "}
            <span className="text-primary">AI</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Vizora is an AI-powered platform that transforms ordinary images
            into stunning YouTube thumbnails designed to maximize clicks and
            engagement.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We believe every creator deserves professional-quality thumbnails
              that drive engagement. Our AI technology analyzes successful
              YouTube thumbnails and applies proven design principles to create
              thumbnails that convert.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you&apos;re a gaming channel, educational content creator, or
              lifestyle vlogger, Vizora helps you stand out in the crowded
              YouTube landscape.
            </p>
          </div>
          <div className="relative">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      95%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Click-through rate improvement
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      10x
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Faster thumbnail creation
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      50k+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Thumbnails generated
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      24/7
                    </div>
                    <div className="text-sm text-muted-foreground">
                      AI availability
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Technology Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Powered by Advanced AI
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-foreground">Gemini AI</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Google&apos;s most advanced AI model for image understanding and
                  generation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-foreground">OpenAI GPT-4</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Advanced language model for understanding and enhancing
                  prompts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
                  <svg
                    className="w-6 h-6 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-foreground">
                  Analytics Engine
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Data-driven insights from millions of successful YouTube
                  thumbnails
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Built for Creators
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Our team consists of AI researchers, designers, and content creators
            who understand the challenges of growing on YouTube.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  AI Engineers
                </h3>
                <p className="text-sm text-muted-foreground">
                  Building the future of content creation
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Designers
                </h3>
                <p className="text-sm text-muted-foreground">
                  Crafting beautiful user experiences
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Content Creators
                </h3>
                <p className="text-sm text-muted-foreground">
                  Understanding creator needs
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  Support Team
                </h3>
                <p className="text-sm text-muted-foreground">
                  Always here to help you succeed
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
