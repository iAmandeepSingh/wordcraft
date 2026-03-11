import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function Controls({
  tone,
  setTone,
  onRewrite,
}: {
  tone: string;
  setTone: (value: string) => void;
  onRewrite: () => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Select
        // label="Tone"
        value={tone}
        onChange={setTone}
        options={[
          { label: "Professional", value: "professional" },
          { label: "Casual", value: "casual" },
          { label: "Friendly", value: "friendly" },
          { label: "Persuasive", value: "persuasive" },
        ]}
      />

      <Button variant="primary" onClick={onRewrite}>
        Rewrite
      </Button>
    </div>
  );
}
