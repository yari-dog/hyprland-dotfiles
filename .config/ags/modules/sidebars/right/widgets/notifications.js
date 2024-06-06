import notificationService from '../../../../services/notification_service.js';
import NotificationList from '../../../.common/widgets/NotificationList.js';
import MaterialIcon from '../../../.common/widgets/MaterialIcon.js';
const notifications = notificationService.getHandler(false);



export default () => {
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
	class_name: 'notifications-stack',
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
