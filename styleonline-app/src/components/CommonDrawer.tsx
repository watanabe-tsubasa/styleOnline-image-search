import { ReactNode, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

interface CommonDrawerProps {
  drawerTitle: string;
  drawerDescription: string;
  drawerTrigger?: ReactNode;
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<SetStateAction<boolean>>;
  drawerChildren: ReactNode;
  statusMessage?: string;
}

export const CommonDrawer: React.FC<CommonDrawerProps> = ({
  drawerTitle,
  drawerDescription,
  drawerTrigger,
  isDrawerOpen,
  setIsDrawerOpen,
  drawerChildren,
  statusMessage,
}) => {
  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerTrigger asChild>{drawerTrigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{drawerTitle}</DrawerTitle>
          <DrawerDescription>{drawerDescription}</DrawerDescription>
        </DrawerHeader>
        {statusMessage && (
          <div className="mx-4">
            <p className="text-red-800">{statusMessage}</p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 p-4">{drawerChildren}</div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">閉じる</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
