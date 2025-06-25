import { IconType } from "react-icons";
import { Plans } from "./dataResponse/user.interface";

interface CustomFile extends File {
    preview: string;
}

type DisplayMode = "mobile" | "desktop" | "edit";

interface OptionsPlans{
    value: Plans;
    name: "Cơ bản" | "Cao Cấp" | "Vip"
} 

interface BaseListMenu{
    name: string;
    icon?: IconType;
    path: string;
}

export type {  CustomFile, DisplayMode, OptionsPlans, BaseListMenu};