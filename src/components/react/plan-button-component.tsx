import { Button } from "../ui/button";

export default function PlanButton({ label , plan }: { label: string , plan: { featured: boolean; cta: string } }) {
  return (
    <Button
      className="mt-2 h-10 w-full"
      onClick={() => alert(`Plan seleccionado: ${label} esto solamente es una demostración.`)}
      variant={plan.featured ? "default" : "secondary"}
    >
      {plan.cta}
    </Button>
  );
}
