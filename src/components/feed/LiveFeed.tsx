import { db } from "../../lib/instantdb";
import { useMemo } from "react";
import { formatRelativeTime } from "../../lib/utils";

const getReactionText = (emoji: string): string => {
  switch (emoji) {
    case "❤️":
      return "liked an image";
    case "🔥":
      return "reacted to an image";
    case "😂":
      return "laughed at an image";
    case "😍":
      return "loved an image";
    case "👍":
      return "liked an image";
    default:
      return "reacted to an image";
  }
};

export default function LiveFeed() {
  const { data } = db.useQuery({
    reactions: {},
  });

  const feedItems = useMemo(() => {
    if (!data?.reactions) return [];

    return (
      data.reactions
        // sort newest first
        .sort((a: any, b: any) => b.createdAt - a.createdAt)
        // limit feed length
        .slice(0, 20)
    );
  }, [data?.reactions]);

  return (
    <>
      <h2 className="text-xl font-semibold mb-4 text-gray-100">
        Live Feed
      </h2>

      {feedItems.length === 0 ? (
        <p className="text-sm text-gray-500 text-center py-8">
          No activity yet — react to an image to see updates here
        </p>
      ) : (
        <ul className="space-y-3">
          {feedItems.map((reaction: any) => (
            <li
              key={reaction.id}
              className="bg-gray-800/60 rounded-lg px-4 py-3 text-sm text-gray-200 space-y-1"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{reaction.emoji}</span>
                <span className="flex-1">{getReactionText(reaction.emoji)}</span>
              </div>
              {reaction.createdAt && (
                <p className="text-xs text-gray-500 pl-8">{formatRelativeTime(reaction.createdAt)}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
