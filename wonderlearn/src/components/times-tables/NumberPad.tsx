import { motion } from "framer-motion";
import { Delete, Check, Lightbulb } from "lucide-react";

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  onHint: () => void;
  disabled?: boolean;
}

export function NumberPad({ value, onChange, onSubmit, onHint, disabled }: Props) {
  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  const press = (k: string) => {
    if (disabled) return;
    if (value.length >= 3) return;
    onChange(value + k);
  };

  return (
    <div className="grid grid-cols-3 gap-3">
      {keys.slice(0, 9).map((k) => (
        <PadKey key={k} label={k} onClick={() => press(k)} disabled={disabled} />
      ))}

      <PadKey
        label={<Lightbulb className="w-6 h-6" />}
        onClick={onHint}
        disabled={disabled}
        variant="hint"
      />
      <PadKey label="0" onClick={() => press("0")} disabled={disabled} />
      <PadKey
        label={<Delete className="w-6 h-6" />}
        onClick={() => onChange(value.slice(0, -1))}
        disabled={disabled || !value}
        variant="del"
      />

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={onSubmit}
        disabled={disabled || !value}
        className="col-span-3 mt-1 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 px-6 py-4 text-lg font-extrabold text-white shadow-lg disabled:opacity-40"
      >
        <Check className="w-6 h-6" />
        Check Answer
      </motion.button>
    </div>
  );
}

function PadKey({
  label,
  onClick,
  disabled,
  variant = "default",
}: {
  label: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: "default" | "hint" | "del";
}) {
  const styles = {
    default:
      "bg-white text-slate-800 hover:bg-slate-50 border-slate-200",
    hint: "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200",
    del: "bg-rose-100 text-rose-700 hover:bg-rose-200 border-rose-200",
  };
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`flex h-16 items-center justify-center rounded-2xl border text-2xl font-extrabold shadow-sm transition disabled:opacity-40 ${styles[variant]}`}
    >
      {label}
    </motion.button>
  );
}