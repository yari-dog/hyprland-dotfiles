const notifications = await Service.import('notifications');
import isNotificationCenterBlacklist from '../../.common/utils/isNotificationCenterBlacklist.js';
import NotificationList from '../../.common/widgets/NotificationList.js';
import MaterialIcon from '../../.common/widgets/MaterialIcon.js';

function cleanNotifications(notifications) {
    // convert map to array of [key, value] pairs
    notifications = Array.from(notifications);
    // filter out blacklisted notifications
    notifications = notifications.filter(([key, notification]) => {
	return !isNotificationCenterBlacklist(notification);
    });
    // convert back to map
    return new Map(notifications);
}

function Notifications() {
    const notifications_box =  Widget.Scrollable({
	class_name: 'sidebar-notifications-scroll',
	name: 'notifications-scroll',
	hexpand: true,
	hscroll: 'never', vscroll: 'automatic',
	propagate_natural_height: true,
	child: Widget.Box({
	    class_name: 'sidebar-notifications',
	    name: 'notifications',
	    vexpand: true,
	    children: [NotificationList(false)],
	})
    });
    const no_notifications_box = Widget.Box({
	class_name: 'notifications-no-notifications',
	hpack: 'center',
	children: [
	    MaterialIcon('notifications_off', 'larger', {hexpand: true, vexpand: true}),
	    Widget.Label({
		class_name: 'notifications-no-notifications-label',
		label: 'No notifications',
	    }),
	]
    });
	    
    return Widget.Box({
	class_name: 'notifications-stack sidebar-section',
	child: Widget.Stack({
	    hexpand: true,
	    vexpand: true,
	    transition: 'crossfade',
	    children: {
		'notifications': notifications_box,
		'no-notifications': no_notifications_box,
	    },
	    setup: (self) => self.hook(notifications, (self) => {
		// check if there are notifications
		const notifications = self.children.notifications.child.child.child.attribute.notifications;
		self.shown = cleanNotifications(notifications).size > 0 ? 'notifications' : 'no-notifications';
	    }),
	}),
    });
}

function QuickSettingToggle({callback, icon, ...props}) {
    return Widget.Button({
	class_name: 'quick-setting-toggle-button',
	...props,
	child: MaterialIcon(icon, 'larger', {hexpand: true, vexpand: true}),
    })
}

function QuickSettings() {
    return Widget.Box({
	class_name: 'quick-settings sidebar-section',
	hpack: 'end',
	children: [
	    QuickSettingToggle({icon: 'dark_mode', callback: () => {}}),
	    QuickSettingToggle({icon: 'notifications', callback: () => {}}),
	    QuickSettingToggle({icon: 'settings', callback: () => {}}),
	    QuickSettingToggle({icon: 'logout', callback: () => {}}), 
	]
    });
}

export default () => {
    return Widget.Box({
	class_name: 'sidebar sidebar-right',
	vertical: true,
	vexpand: true, hexpand: true,
	vpack: 'start',
	children: [
	    QuickSettings(),
	    Notifications(),
	],
    });
}
