
export enum IconSize {
	s = "16",
	m = "24",
	l = "40",
}
export type IconName = "360" | "academy" | "arrowRight" | "bell" | "building" | "chevronDown" | "chevronLeft" | "chevronRight" | "chevronUp" | "click" | "delete" | "facebook" | "filter" | "handshake" | "home" | "info" | "instagram" | "landArea" | "linkedIn" | "list" | "livingSpace" | "location" | "logout" | "mail" | "map" | "mapLayers" | "money" | "mobileDevice" | "onboarding" | "person" | "phone" | "phonebook" | "plot" | "rooms" | "plusBox" | "star" | "video" | "world" | "xing"
export type IconCollection = {
	[key in IconName]: string;
}
export type Icons = {
	[key in IconSize]: IconCollection;
}
export declare const icons: Icons
export default icons
