import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export interface DialogComponentProps {
  button: string;
  title: string;
  description?: string;
  footerContent?: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function DialogComponent(
  props: DialogComponentProps & { children?: React.ReactNode }
) {
  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogTrigger>
        <span>{props.button}</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription>{props.description}</DialogDescription>
        </DialogHeader>
        <div>{props.children}</div>
        <DialogFooter>{props.footerContent}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
