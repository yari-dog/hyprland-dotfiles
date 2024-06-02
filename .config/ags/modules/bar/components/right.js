import MaterialIcon from '../../.common/widgets/MaterialIcon.js'
import notificationService from '../../../services/notification_service.js'
const notifications = notificationService.getHandler(false);
const network = await Service.import('network');
const { GLib } = imports.gi;

function DateClock() {
    return Widget.Box({
        vpack: 'center',
        class_name: "bar-right-dateclock txt-large",
        children: [
            Widget.Label({
                class_name: 'bar-right-time',
                label: GLib.DateTime.new_now_local().format('%H:%M'),
                setup: (self) => self.poll(5000, label => {
                    label.label = GLib.DateTime.new_now_local().format('%H:%M')
                })
            })
        ]
    })
}
// notification icons:
// no notifications: 'notifications'
// notifications: 'notifications_unread'
// notifications_disabled: 'notifications_off'
// TODO: move to own file once the sidebar is implemented, and a permenant notifications list exists
function NotificationIcon() {
    return MaterialIcon('notifications', 'bar-right-notifications-icon txt-norm', {
	vexpand: true,
	setup: (self) => self.hook(notifications, (self) => {
	    // NOTE: dnd is set by setting the attribute in the notifications manager
	    const dnd = notifications.dnd
	    const has_notifications = notifications.notifications.length > 0
	    if (dnd) {
		self.label = 'notifications_off'
		return
	    } else if (has_notifications) {
		self.label = 'notifications_unread'
		return
	    } else {
		self.label = 'notifications'
		return
	    }
	}),
    })
}

function NetworkIcon() {
    return Widget.Box({
	child: MaterialIcon('network_wifi', 'bar-right-network-icon txt-norm', {
	    vexpand: true,
	    setup: (self) => self.hook(network, (self) => {
		const connected = network.connectivity === "full" ? true : false;
		const ethernet = network.primary === "wired" ? true : false;
		if (!connected) self.label = 'error';
		else if (ethernet) self.label = 'lan';
		else self.label = 'wifi';
	    }),
	}),
    })
}

function SideBarOpener() {
    return Widget.EventBox({
	cursor: 'pointer',
	class_name: 'bar-right-opener-eventbox',
	onPrimaryClick: () => {
	    App.toggleWindow('right-sidebar')
	},
	child: Widget.Box({
	    hpack: 'center', vpack: 'center',
	    children: [
		NotificationIcon(),
		NetworkIcon(),
	    ],
	}),
    })
}

export function Right() {
    const right = Widget.Box({
        class_name: 'bar-right-container',
        children: [DateClock(), SideBarOpener()],
    })
    return Widget.Box({
        hexpand: false,
        hpack: 'end', //vpack: 'start',
        vexpand: true,
        class_name: 'bar-title bar-right bar-group',
        child: right,
    })
}
