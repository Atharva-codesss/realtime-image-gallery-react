import { useEffect, useMemo, useState } from "react";
import { db } from "../../lib/instantdb";
import { id } from "@instantdb/react";
import ReactionBar from "./ReactionBar";
import { useUser } from "../../hooks/useUser";
import CommentSection from "../comments/CommentSection";

type Props = {
  image: any;
  onClose: () => void;
};

export default function ImageModal({ image, onClose }: Props) {
  const userId = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data } = db.useQuery({
    reactions: {},
    feedEvents: {},
  });

  // Handle Esc key to close modal
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const reactions = useMemo(() => {
    return data?.reactions?.filter((r: any) => r.imageId === image.id) || [];
  }, [data?.reactions, image.id]);

  const counts = useMemo(() => {
    return reactions.reduce((acc: any, r: any) => {
      acc[r.emoji] = (acc[r.emoji] || 0) + 1;
      return acc;
    }, {});
  }, [reactions]);

  const myExisting = useMemo(() => {
    return reactions.find((r: any) => r.userId === userId) || null;
  }, [reactions, userId]);

  const handleReact = async (emoji: string) => {
    if (!userId || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // UNREACT if same emoji clicked again
      if (myExisting && myExisting.emoji === emoji) {
        await db.transact([
          db.tx.reactions[myExisting.id].delete(),
        ]);
        return;
      }

      const txs: any[] = [];

      // Remove old reaction if exists
      if (myExisting) {
        txs.push(db.tx.reactions[myExisting.id].delete());
      }

      // Add new reaction
      txs.push(
        db.tx.reactions[id()].update({
          imageId: image.id,
          emoji,
          userId,
          createdAt: Date.now(),
        })
      );

      // Emit feed event ONLY on add
      txs.push(
        db.tx.feedEvents[id()].update({
          type: "reaction",
          emoji,
          imageId: image.id,
          userId,
          createdAt: Date.now(),
        })
      );

      await db.transact(txs);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 modal-backdrop"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-gray-900 rounded-2xl shadow-2xl flex flex-col max-h-[95vh] overflow-hidden modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-10 text-white bg-black/60 hover:bg-black/80 rounded-full w-11 h-11 flex items-center justify-center text-2xl transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus:ring-2 focus:ring-white/50"
        >
          ✕
        </button>

        {/* Image */}
        <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin">
          <div className="flex items-center justify-center p-6 md:p-8">
            <img
              src={image.urls.regular}
              alt={image.alt_description}
              className="max-w-full max-h-[calc(95vh-220px)] object-contain rounded-lg shadow-2xl"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="w-full bg-gradient-to-t from-gray-950 via-gray-900 to-gray-900 border-t border-gray-700/50 p-6 md:p-8">
          <div className="w-full max-w-3xl mx-auto space-y-6">
            <ReactionBar onReact={handleReact} counts={counts} />
            <CommentSection imageId={image.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
