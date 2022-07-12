
export enum IconSize {
	s = "16",
	m = "24",
	l = "40",
}
export type IconName = "1" | "2" | "3" | "360" | "4" | "6" | "5" | "7" | "9" | "8" | "academy" | "arrowRight" | "building" | "bell" | "chevronDown" | "chevronLeft" | "chevronRight" | "chevronUp" | "click" | "delete" | "facebook" | "filter" | "handshake" | "home" | "info" | "instagram" | "landArea" | "linkedIn" | "list" | "livingSpace" | "location" | "mail" | "logout" | "map" | "mapLayers" | "mobileDevice" | "money" | "onboarding" | "person" | "phone" | "phonebook" | "plot" | "plus" | "rooms" | "plusBox" | "star" | "tip" | "twitter" | "video" | "world" | "xing"
export type IconCollection = {
	[key in IconName]: string;
}
export type Icons = {
	[key in IconSize]: IconCollection;
}
export declare const icons: Icons
export default icons
