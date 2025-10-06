import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface MessageProps {
  message: {
    id: string;
    text: string;
    user_id: string;
    display_name: string | null;
    photo_url: string | null;
    created_at: string;
  };
  isOwn: boolean;
}

export const Message = ({ message, isOwn }: MessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex gap-3 ${isOwn ? "flex-row-reverse" : "flex-row"} mb-4`}
    >
      <Avatar className="h-10 w-10 border-2 border-white/10 shrink-0">
        <AvatarImage src={message.photo_url || undefined} />
        <AvatarFallback className={isOwn ? "bg-primary/20 text-primary" : "bg-secondary text-secondary-foreground"}>
          {message.display_name?.[0]?.toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>

      <div className={`flex flex-col max-w-[70%] ${isOwn ? "items-end" : "items-start"}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-foreground/80">{message.display_name || "Anonymous"}</span>
          <span className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
          </span>
        </div>

        <div
          className={`px-4 py-3 rounded-2xl shadow-glass ${
            isOwn
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-white/10 backdrop-blur-glass border border-white/10 text-foreground rounded-tl-sm"
          }`}
        >
          <p className="text-sm break-words">{message.text}</p>
        </div>
      </div>
    </motion.div>
  );
};
