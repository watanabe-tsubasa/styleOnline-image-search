import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode, SetStateAction } from "react";

interface CommonDialogProps {
  dialogTitle?: string;
  dialogDescription?: string;
  dialogTrigger?: ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  dialogChildren: ReactNode
}

export const CommonDialog: React.FC<CommonDialogProps> = ({
  dialogTitle,
  dialogDescription,
  dialogTrigger,
  isModalOpen,
  setIsModalOpen,
  dialogChildren,
}) => {
  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        {dialogTrigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            {dialogDescription}
          </DialogDescription>
        </DialogHeader>
        <div>
          {dialogChildren}
        </div>
        <Button onClick={() => setIsModalOpen(false)}>閉じる</Button>
      </DialogContent>
    </Dialog>
  )
}
