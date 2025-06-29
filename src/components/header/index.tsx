import { cn } from "@/utilities/utils";
import Component from "./component";

export default function Header() {
    return (
        <header className={cn(`bg-background sticky top-0 z-50 w-full`)}>
            <Component />
        </header>
    )
}