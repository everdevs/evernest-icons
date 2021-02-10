
export enum IconSize {
	s = "16",
	m = "24",
	l = "40",
}
export type IconName = "360" | "academy" | "arrowRight" | "chevronDown" | "chevronLeft" | "chevronRight" | "chevronUp" | "delete" | "info" | "instagram" | "linkedIn" | "facebook" | "list" | "location" | "logout" | "mail" | "map" | "mobileDevice" | "money" | "onboarding" | "phonebook" | "person" | "star" | "world" | "xing"
export type IconCollection = {
	[key in IconName]: string;
}
export type Icons = {
	[key in IconSize]: IconCollection;
}
export declare const icons: Icons
export default icons
