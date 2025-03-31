import { Accordion } from "@/components/ui/accordion";

type AccordionWrapperProps = {
    children: React.ReactNode;
};
export default function AccordionWrapper({ children }: AccordionWrapperProps) {
    return (
        <div className="border-muted rounded-xl border px-4">
            <Accordion type="single" collapsible>
                {children}
            </Accordion>
        </div>
    );
}
