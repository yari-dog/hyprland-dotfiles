import MaterialIcon from '../../../.common/widgets/MaterialIcon.js';
import notificationService from '../../../../services/notification_service.js';
const notifications = notificationService.getHandler(false);

const { Gdk } = imports.gi;

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
		Widget.Label({label: label, class_name: 'txt txt-small'}),
	    ],
	}),
	...props,
    });
}


export default () => {
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
	    self.attribute.menu.popup_at_widget(self, Gdk.Gravity.SOUTH_EAST, Gdk.Gravity.NORTH_EAST, null);
	},
    })
    
    return Widget.Box({
	class_name: 'quick-settings sidebar-section',
	hpack: 'end',
	children: [
	    QuickSettingToggle({icon: 'dark_mode', callback: () => {}}),
	    QuickSettingToggle({icon: 'notifications', callback: (self) => {ToggleDnd(self)}}),
	    QuickSettingToggle({icon: 'settings', callback: () => {
		settings.bar.corners = !settings.bar.corners;
	    }}),
	    logout_menu,
	    //QuickSettingToggle({icon: 'logout', callback: (self) => {}}),
	]
    });
}
