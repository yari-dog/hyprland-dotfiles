import NotificationList from '../../.common/widgets/NotificationList.js';
import MaterialIcon from '../../.common/widgets/MaterialIcon.js';
import notificationService from '../../../services/notification_service.js';
const notifications = notificationService.getHandler(false);
const hyprland = await Service.import('hyprland');
const { Gdk, Gtk } = imports.gi;


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
	child: Widget.Box({
	    class_name: 'sidebar-notifications',
	    name: 'notifications',
	    vexpand: true,
	    hpack: 'start',
	    vertical: true,children: [
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



function QuickSettingToggle({callback, icon, menu, ...props}) {
    return Widget.Button({
	cursor: 'pointer',
	class_name: 'quick-setting-toggle-button',
	...props,
	attribute: {
	    'menu': menu,
	},
	onClicked: callback,
	child: MaterialIcon(icon, 'medium', {})//{hexpand: true, vexpand: true}),
    })
}


function ToggleDnd(self) {
    notifications.dnd = !notifications.dnd;
    self.child.label = notifications.dnd ? 'notifications_off' : 'notifications';
    self.toggleClassName('active', notifications.dnd)
    return notifications.dnd;
}

function IconMenuItem({icon, label, ...props}) {
    return Widget.MenuItem({
	cursor: 'pointer',
	class_name: 'menu-item',
	child: Widget.Box({
	    spacing: 10,
	    children: [
		MaterialIcon(icon, 'medium', {}),
		Widget.Label({label: label, class_name: 'txt txt-medium'}),
	    ],
	}),
	...props,
    });
}


function QuickSettings() {
    const logout_menu = QuickSettingToggle({
	icon: 'logout',
	menu: Widget.Menu({
	    class_name: 'menu',
	    children: [
		IconMenuItem({
		    icon: 'logout',
		    label: 'logout',
		    onActivate: () => {
			hyprland.messageAsync('dispatch exit');
		    },
		}),
		IconMenuItem({
		    icon: 'power_settings_new',
		    label: 'shutdown',
		    onActivate: () => {
			Utils.exec('systemctl poweroff')
		    },
		}),
		IconMenuItem({
		    icon: 'restart_alt',
		    label: 'restart',
		    onActivate: () => {
			Utils.exec('systemctl reboot')
		    },
		}),

	    ],
	}),
	callback: (self) => {
	    self.attribute.menu.popup_at_widget(self, Gdk.Gravity.SOUTH_EAST, Gdk.Gravity.STATIC, null);
	},
    })
    
    return Widget.Box({
	class_name: 'quick-settings sidebar-section',
	hpack: 'end',
	children: [
	    QuickSettingToggle({icon: 'dark_mode', callback: () => {}}),
	    QuickSettingToggle({icon: 'notifications', callback: (self) => {ToggleDnd(self)}}),
	    QuickSettingToggle({icon: 'settings', callback: () => {}}),
	    logout_menu,
	    //QuickSettingToggle({icon: 'logout', callback: (self) => {}}),
	]
    });
}

export default () => {  
    return Widget.Box({
	class_name: 'sidebar sidebar-right',
	vertical: true,
	vexpand: true, hexpand: false,
	vpack: 'start',
	
	
	homogeneous: false,
	children: [
	    QuickSettings(),
	    Notifications(),
	],
    });
}
