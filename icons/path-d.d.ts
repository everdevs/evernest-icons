
export enum IconSize {
	s = "16",
	m = "24",
	l = "40",
}
export type IconName = "2" | "1" | "360" | "3" | "4" | "7" | "6" | "5" | "8" | "9" | "academy" | "arrowRight" | "bell" | "buildingYear" | "building" | "chevronDown" | "chevronLeft" | "chevronRight" | "chevronUp" | "click" | "delete" | "filter" | "facebook" | "handshake" | "home" | "info" | "instagram" | "landArea" | "linkedIn" | "list" | "livingSpace" | "location" | "logout" | "mail" | "map" | "mapLayers" | "mobileDevice" | "money" | "onboarding" | "person" | "phone" | "phonebook" | "plot" | "plus" | "plusBox" | "rooms" | "star" | "tip" | "twitter" | "video" | "world" | "xing"
export type IconCollection = {
	[key in IconName]: string;
}
export type Icons = {
	[key in IconSize]: IconCollection;
}
export declare const icons: Icons
export default icons
