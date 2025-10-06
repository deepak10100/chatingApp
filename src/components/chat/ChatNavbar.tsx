import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChatNavbarProps {
  user: any;
}

export const ChatNavbar = ({ user }: ChatNavbarProps) => {
  const { toast } = useToast();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/5 backdrop-blur-glass border-b border-white/10 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-primary/20 p-2 rounded-lg">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold">RealtimeChat</h1>
              <p className="text-xs text-muted-foreground">Chat in realtime</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border-2 border-primary/20">
              <AvatarImage src={user?.user_metadata?.photo_url} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {user?.user_metadata?.display_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">{user?.user_metadata?.display_name || user?.email}</p>
              <p className="text-xs text-muted-foreground">Online</p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleSignOut}
              className="border-white/10 hover:bg-destructive/20 hover:text-destructive hover:border-destructive/50"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};
