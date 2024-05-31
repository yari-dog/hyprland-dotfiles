import NotificationList from '../../.common/widgets/NotificationList.js';
import MaterialIcon from '../../.common/widgets/MaterialIcon.js';
import notificationService from '../../../services/notification_service.js';
const notifications = notificationService.getHandler(false);


function Notifications() {
    const clear_button = Widget.Button({
	class_name: 'notifications-clear-button',
	label: 'Clear all',
	on_clicked: () => {
	    notifications.clear();
	},
    });
    
    const notifications_box =  Widget.Scrollable({
	class_name: 'sidebar-notifications-scroll',
	name: 'notifications-scroll',
	hexpand: true,
	hscroll: 'never', vscroll: 'automatic',
	propagate_natural_height: true,
	attribute: {
	    'get_notifications': (self) => {
		// child.child because scrollables are weird and their children are wrapped in a viewport
		return self.child.child.attribute.get_notifications(self.child.child);
	    }
	},
	child: Widget.Box({
	    class_name: 'sidebar-notifications',
	    name: 'notifications',
	    vexpand: true,
	    hpack: 'start',
	    vertical: true,
	    attribute: {
		'get_notifications': (self) => {
		    return self.children[0].attribute.notifications;
		},
	    },
	    children: [
		NotificationList(false),
		clear_button,
	    ],
	}),
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
		self.shown = notifications.notifications.length > 0 ? 'notifications' : 'no-notifications';
	    }),
	}),
    });
}


function QuickSettingToggle({callback, icon, ...props}) {
    return Widget.Button({
	class_name: 'quick-setting-toggle-button',
	...props,
	onClicked: (self) => {
	    callback(self);
	},
	child: MaterialIcon(icon, 'larger', {hexpand: true, vexpand: true}),
    })
}

function ToggleDnd(self) {
    notifications.dnd = !notifications.dnd;
    self.child.label = notifications.dnd ? 'notifications_off' : 'notifications';
    self.toggleClassName('active', notifications.dnd)
    return notifications.dnd;
}

function QuickSettings() {
    return Widget.Box({
	class_name: 'quick-settings sidebar-section',
	hpack: 'end',
	children: [
	    QuickSettingToggle({icon: 'dark_mode', callback: () => {}}),
	    QuickSettingToggle({icon: 'notifications', callback: (self) => {ToggleDnd(self)}}),
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
