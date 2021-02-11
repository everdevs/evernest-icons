
export enum IconSize {
	s = "16",
	m = "24",
	l = "40",
}
export type IconName = "360" | "academy" | "bell" | "arrowRight" | "chevronDown" | "chevronLeft" | "chevronRight" | "chevronUp" | "delete" | "info" | "instagram" | "list" | "location" | "facebook" | "logout" | "linkedIn" | "mail" | "map" | "money" | "mobileDevice" | "onboarding" | "person" | "phonebook" | "plusBox" | "star" | "world" | "xing"
export type IconCollection = {
	[key in IconName]: string;
}
export type Icons = {
	[key in IconSize]: IconCollection;
}
export declare const icons: Icons
export default icons
