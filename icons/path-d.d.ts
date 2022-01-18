
export enum IconSize {
	s = "16",
	m = "24",
	l = "40",
}
export type IconName = "360" | "3" | "2" | "7" | "1" | "5" | "6" | "4" | "academy" | "8" | "9" | "arrowRight" | "bell" | "building" | "chevronDown" | "chevronLeft" | "chevronRight" | "chevronUp" | "delete" | "click" | "filter" | "handshake" | "home" | "facebook" | "info" | "landArea" | "list" | "livingSpace" | "instagram" | "linkedIn" | "location" | "logout" | "mail" | "map" | "mapLayers" | "mobileDevice" | "money" | "onboarding" | "person" | "phone" | "phonebook" | "plot" | "plusBox" | "rooms" | "star" | "twitter" | "video" | "world" | "xing"
export type IconCollection = {
	[key in IconName]: string;
}
export type Icons = {
	[key in IconSize]: IconCollection;
}
export declare const icons: Icons
export default icons
