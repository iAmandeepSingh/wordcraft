import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function Controls({
  tone,
  setTone,
  onRewrite,
  isLoading,
}: {
  tone: string;
  setTone: (value: string) => void;
  onRewrite: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select
        // label="Tone"
        value={tone}
        onChange={setTone}
        options={[
          { label: "Professional", value: "professional" },
          { label: "Balanced", value: "balanced" },
          { label: "Casual", value: "casual" },
          { label: "Friendly", value: "friendly" },
          { label: "Persuasive", value: "persuasive" },
        ]}
      />

      <Button variant="primary" onClick={onRewrite} disabled={isLoading}>
        {isLoading ? "Rewriting..." : "Rewrite"}
      </Button>
    </div>
  );
}
