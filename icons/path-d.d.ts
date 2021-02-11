
export enum IconSize {
	s = "16",
	m = "24",
	l = "40",
}
export type IconName = "360" | "academy" | "arrowRight" | "bell" | "chevronDown" | "chevronLeft" | "chevronRight" | "chevronUp" | "delete" | "filter" | "info" | "facebook" | "instagram" | "linkedIn" | "list" | "location" | "logout" | "mail" | "mapLayers" | "map" | "mobileDevice" | "money" | "onboarding" | "person" | "phonebook" | "star" | "plusBox" | "world" | "xing"
export type IconCollection = {
	[key in IconName]: string;
}
export type Icons = {
	[key in IconSize]: IconCollection;
}
export declare const icons: Icons
export default icons
