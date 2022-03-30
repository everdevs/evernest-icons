
export enum IconSize {
	s = "16",
	m = "24",
	l = "40",
}
export type IconName = "1" | "2" | "3" | "360" | "4" | "5" | "6" | "7" | "8" | "9" | "academy" | "arrowRight" | "bell" | "building" | "chevronDown" | "chevronLeft" | "chevronRight" | "chevronUp" | "click" | "delete" | "filter" | "handshake" | "facebook" | "home" | "info" | "landArea" | "list" | "livingSpace" | "instagram" | "linkedIn" | "location" | "logout" | "mail" | "map" | "mapLayers" | "mobileDevice" | "money" | "onboarding" | "person" | "phone" | "phonebook" | "plot" | "plusBox" | "rooms" | "star" | "plus" | "twitter" | "video" | "world" | "xing"
export type IconCollection = {
	[key in IconName]: string;
}
export type Icons = {
	[key in IconSize]: IconCollection;
}
export declare const icons: Icons
export default icons
