
export enum IconSize {
	s = "16",
	m = "24",
	l = "40",
}
export type IconName = "2" | "1" | "3" | "360" | "4" | "5" | "6" | "7" | "8" | "9" | "academy" | "arrowRight" | "bell" | "building" | "chevronDown" | "buildingYear" | "chevronLeft" | "chevronRight" | "chevronUp" | "click" | "delete" | "filter" | "handshake" | "facebook" | "home" | "info" | "landArea" | "instagram" | "list" | "linkedIn" | "livingSpace" | "location" | "logout" | "mail" | "map" | "mapLayers" | "mobileDevice" | "money" | "onboarding" | "person" | "phone" | "phonebook" | "plot" | "plusBox" | "rooms" | "star" | "plus" | "tip" | "starFilled" | "twitter" | "video" | "world" | "xing"
export type IconCollection = {
	[key in IconName]: string;
}
export type Icons = {
	[key in IconSize]: IconCollection;
}
export declare const icons: Icons
export default icons
