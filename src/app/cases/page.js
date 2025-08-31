import Navigation from "@/components/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Cases() {
  const caseStudies = [
    {
      id: 1,
      title: "Gaming Channel Transformation",
      category: "Gaming",
      description:
        "How a small gaming channel increased their CTR by 300% using Vizora's AI thumbnails.",
      beforeImage: "/api/placeholder/300/200",
      afterImage: "/api/placeholder/300/200",
      stats: {
        ctrIncrease: "300%",
        viewsIncrease: "150%",
        subscribersIncrease: "200%",
      },
    },
    {
      id: 2,
      title: "Educational Content Success",
      category: "Education",
      description:
        "A tech tutorial channel saw dramatic improvements in engagement with AI-optimized thumbnails.",
      beforeImage: "/api/placeholder/300/200",
      afterImage: "/api/placeholder/300/200",
      stats: {
        ctrIncrease: "250%",
        viewsIncrease: "180%",
        subscribersIncrease: "120%",
      },
    },
    {
      id: 3,
      title: "Lifestyle Vlogger Growth",
      category: "Lifestyle",
      description:
        "Personal brand transformation through professional thumbnail design.",
      beforeImage: "/api/placeholder/300/200",
      afterImage: "/api/placeholder/300/200",
      stats: {
        ctrIncrease: "200%",
        viewsIncrease: "140%",
        subscribersIncrease: "160%",
      },
    },
  ];

  const thumbnailExamples = [
    {
      id: 1,
      title: "Gaming Thumbnails",
      category: "Gaming",
      examples: [
        {
          id: 1,
          title: "Epic Battle",
          description: "Action-packed gaming thumbnail",
        },
        {
          id: 2,
          title: "Strategy Guide",
          description: "Educational gaming content",
        },
        { id: 3, title: "Review", description: "Game review thumbnail" },
      ],
    },
    {
      id: 2,
      title: "Educational Thumbnails",
      category: "Education",
      examples: [
        { id: 4, title: "Tutorial", description: "Step-by-step guide" },
        {
          id: 5,
          title: "Tips & Tricks",
          description: "Quick learning content",
        },
        { id: 6, title: "Deep Dive", description: "In-depth analysis" },
      ],
    },
    {
      id: 3,
      title: "Lifestyle Thumbnails",
      category: "Lifestyle",
      examples: [
        {
          id: 7,
          title: "Day in the Life",
          description: "Personal vlog content",
        },
        { id: 8, title: "Travel Vlog", description: "Adventure content" },
        {
          id: 9,
          title: "Product Review",
          description: "Review and recommendation",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-black">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge className="bg-primary/20 text-primary border-primary/30 px-3 py-1 text-sm mb-6">
            Success Stories
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Real Results from{" "}
            <span className="text-primary">Real Creators</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See how content creators are transforming their YouTube channels
            with AI-powered thumbnails from Vizora.
          </p>
        </div>

        {/* Case Studies */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-foreground text-center mb-12">
            Case Studies
          </h2>
          <div className="space-y-12">
            {caseStudies.map((study) => (
              <Card
                key={study.id}
                className="bg-card/50 border-border/50 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="grid lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center space-x-2 mb-4">
                        <Badge
                          variant="secondary"
                          className="bg-primary/20 text-primary"
                        >
                          {study.category}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-4">
                        {study.title}
                      </h3>
                      <p className="text-muted-foreground mb-6">
                        {study.description}
                      </p>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-1">
                            {study.stats.ctrIncrease}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            CTR Increase
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-1">
                            {study.stats.viewsIncrease}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Views Increase
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-primary mb-1">
                            {study.stats.subscribersIncrease}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Subscribers Increase
                          </div>
                        </div>
                      </div>

                      <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                        Read Full Case Study
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">
                          Before
                        </p>
                        <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                          <span className="text-muted-foreground text-sm">
                            Before Image
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-foreground">
                          After
                        </p>
                        <div className="w-full h-32 bg-primary/20 rounded-lg flex items-center justify-center">
                          <span className="text-primary text-sm">
                            After Image
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Thumbnail Examples */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-foreground text-center mb-12">
            Thumbnail Examples
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {thumbnailExamples.map((category) => (
              <Card
                key={category.id}
                className="bg-card/50 border-border/50 backdrop-blur-sm"
              >
                <CardHeader>
                  <div className="flex items-center space-x-2 mb-4">
                    <Badge
                      variant="secondary"
                      className="bg-primary/20 text-primary"
                    >
                      {category.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-foreground">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.examples.map((example) => (
                      <div
                        key={example.id}
                        className="flex items-start space-x-3"
                      >
                        <div className="w-16 h-12 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-muted-foreground text-xs">
                            Thumbnail
                          </span>
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground text-sm">
                            {example.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {example.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-foreground text-center mb-12">
            What Creators Say
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">J</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      John Gaming
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Gaming Creator
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  "Vizora completely transformed my channel. My click-through
                  rate went from 2% to 8% in just one month!"
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">S</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Sarah Tech
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Tech Educator
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  "The AI understands exactly what I need. It's like having a
                  professional designer on demand."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">M</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      Mike Lifestyle
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Lifestyle Vlogger
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  "I used to spend hours on thumbnails. Now I get professional
                  results in minutes. Game changer!"
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Ready to Join These Success Stories?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Start creating thumbnails that convert and grow your YouTube
                channel today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3"
                  >
                    Start Creating
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-border text-foreground hover:bg-accent px-8 py-3"
                  >
                    Get Demo
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
