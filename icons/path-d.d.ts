
export enum IconSize {
	s = "16",
	m = "24",
	l = "40",
}
export type IconName = "360" | "academy" | "arrowRight" | "chevronDown" | "delete" | "info" | "list" | "location" | "logout" | "mail" | "map" | "mobileDevice" | "money" | "onboarding" | "person" | "star" | "facebook" | "instagram" | "linkedIn" | "xing"
export type IconCollection = {
	[key in IconName]: string;
}
export type Icons = {
	[key in IconSize]: IconCollection;
}
export declare const icons: Icons
export default icons
