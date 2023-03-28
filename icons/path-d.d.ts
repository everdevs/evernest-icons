
export enum IconSize {
	s = "16",
	m = "24",
	l = "40",
}
export type IconName = "2" | "3" | "360" | "4" | "1" | "5" | "6" | "7" | "8" | "9" | "academy" | "arrowRight" | "bell" | "building" | "buildingYear" | "chevronDown" | "chevronLeft" | "chevronRight" | "chevronUp" | "click" | "delete" | "filter" | "handshake" | "euro" | "home" | "facebook" | "info" | "instagram" | "landArea" | "list" | "linkedIn" | "livingSpace" | "location" | "logout" | "mail" | "map" | "mapLayers" | "mobileDevice" | "money" | "onboarding" | "person" | "phone" | "phonebook" | "plot" | "plusBox" | "plus" | "star" | "rooms" | "starFilled" | "tip" | "twitter" | "video" | "world" | "xing"
export type IconCollection = {
	[key in IconName]: string;
}
export type Icons = {
	[key in IconSize]: IconCollection;
}
export declare const icons: Icons
export default icons
