
export enum IconSize {
	s = "16",
	m = "24",
	l = "40",
}
export type IconName = "1" | "2" | "360" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "academy" | "arrowRight" | "bell" | "building" | "buildingYear" | "chevronDown" | "chevronRight" | "chevronLeft" | "chevronUp" | "click" | "delete" | "filter" | "handshake" | "home" | "facebook" | "info" | "landArea" | "list" | "livingSpace" | "instagram" | "location" | "linkedIn" | "logout" | "mail" | "map" | "mapLayers" | "mobileDevice" | "money" | "onboarding" | "person" | "phone" | "phonebook" | "plot" | "plusBox" | "rooms" | "star" | "starFilled" | "tip" | "plus" | "video" | "twitter" | "world" | "xing"
export type IconCollection = {
	[key in IconName]: string;
}
export type Icons = {
	[key in IconSize]: IconCollection;
}
export declare const icons: Icons
export default icons
