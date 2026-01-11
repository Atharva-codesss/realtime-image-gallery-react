const EMOJIS = ["❤️", "🔥", "😂", "😍","👍"];

type Props = {
  onReact: (emoji: string) => void;
  counts: Record<string, number>;
};

export default function ReactionBar({ onReact, counts }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
      {EMOJIS.map((emoji) => {
        const count = counts[emoji] || 0;
        return (
          <button
            key={emoji}
            onClick={() => onReact(emoji)}
            aria-label={`React with ${emoji}`}
            className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-gray-600 px-4 py-2.5 rounded-full transition-all duration-200 hover:scale-110 active:scale-95 active:shadow-[0_0_20px_rgba(255,255,255,0.3)] shadow-md hover:shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            <span className="text-2xl">{emoji}</span>
            <span className="text-base font-semibold text-gray-200 min-w-[1.5rem] text-center">
              {count > 0 ? count : '0'}
            </span>
          </button>
        );
      })}
    </div>
  );
}
