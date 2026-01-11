import { useMemo, useState } from "react";
import { db } from "../../lib/instantdb";
import { id } from "@instantdb/react";
import { useUser } from "../../hooks/useUser";
import { formatRelativeTime } from "../../lib/utils";

type Props = {
  imageId: string;
};

export default function CommentSection({ imageId }: Props) {
  const userId = useUser();
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data } = db.useQuery({
    comments: {},
  });

  const comments = useMemo(() => {
    return (
      data?.comments
        ?.filter((c: any) => c.imageId === imageId)
        ?.sort((a: any, b: any) => a.createdAt - b.createdAt) || []
    );
  }, [data?.comments, imageId]);

  const handleSubmit = async () => {
    if (!text.trim() || !userId || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await db.transact([
        db.tx.comments[id()].update({
          imageId,
          userId,
          text: text.trim(),
          createdAt: Date.now(),
        }),
      ]);
      setText("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <h3 className="text-sm font-semibold text-gray-300">Comments</h3>

      {/* Comment List */}
      <div className="max-h-48 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
        {comments.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">Be the first to comment</p>
        )}

        {comments.map((c: any) => (
          <div
            key={c.id}
            className="bg-gray-800/60 rounded-lg px-3 py-2.5 text-sm text-gray-200 space-y-1"
          >
            <p className="text-gray-200">{c.text}</p>
            {c.createdAt && (
              <p className="text-xs text-gray-500">{formatRelativeTime(c.createdAt)}</p>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey && !isSubmitting) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          placeholder="Write a comment..."
          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition"
        />
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg px-4 text-sm font-medium transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
        >
          Send
        </button>
      </div>
    </div>
  );
}
