import MaterialIcon from '../../.common/widgets/MaterialIcon.js'
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
    const icon_name = 'notifications'
    return MaterialIcon(icon_name, 'bar-right-notifications-icon txt-large', { vexpand: true })
}
    
function SideBarOpener() {
    return Widget.EventBox({
	class_name: 'bar-right-opener-eventbox',
	onPrimaryClick: () => {
	    App.toggleWindow('right-sidebar')
	},
	child: Widget.Box({
	    hpack: 'center', vpack: 'center',
	    child: NotificationIcon(),
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
