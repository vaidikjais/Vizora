"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function DemoCredentials() {
  const [isVisible, setIsVisible] = useState(false);

  const demoCredentials = {
    username: "demo@vizora.ai",
    password: "demo123456",
    note: "Use these credentials to access the demo account",
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-primary hover:bg-primary/90 text-primary-foreground"
        size="sm"
      >
        {isVisible ? "Hide Demo Info" : "Show Demo Info"}
      </Button>

      {isVisible && (
        <Card className="bg-card/90 border-border/50 backdrop-blur-sm mt-2 w-80">
          <CardHeader className="pb-3">
            <CardTitle className="text-foreground text-lg flex items-center space-x-2">
              <Badge variant="secondary" className="bg-primary/20 text-primary">
                Demo
              </Badge>
              <span>Demo Credentials</span>
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Use these credentials to access the demo account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground">
                Username/Email:
              </label>
              <div className="flex items-center space-x-2 mt-1">
                <code className="bg-background/50 px-2 py-1 rounded text-sm text-foreground">
                  {demoCredentials.username}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    navigator.clipboard.writeText(demoCredentials.username)
                  }
                  className="text-xs"
                >
                  Copy
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">
                Password:
              </label>
              <div className="flex items-center space-x-2 mt-1">
                <code className="bg-background/50 px-2 py-1 rounded text-sm text-foreground">
                  {demoCredentials.password}
                </code>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() =>
                    navigator.clipboard.writeText(demoCredentials.password)
                  }
                  className="text-xs"
                >
                  Copy
                </Button>
              </div>
            </div>

            <div className="pt-2 border-t border-border/50">
              <p className="text-xs text-muted-foreground">
                💡 <strong>Tip:</strong> Click "BOOK A CALL" in the navigation
                to access the login modal
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
