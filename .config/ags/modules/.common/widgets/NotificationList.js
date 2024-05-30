import Notification from './Notification.js';
import isNotificationCenterBlacklist from '../../.common/utils/isNotificationCenterBlacklist.js';
const notifications = await Service.import('notifications');

export function cleanNotifications(notifications) {
    // convert map to array of [key, value] pairs
    notifications = Array.from(notifications);
    // filter out blacklisted notifications
    notifications = notifications.filter(([key, notification]) => {
	return !isNotificationCenterBlacklist(notification);
    });
    // convert back to map
    return new Map(notifications);
}


export default (is_popup = false) => {
    return Widget.Box({
	hpack: 'center',
	vpack: 'start',
	vertical: true,
	class_name: 'notification-list',
	name: 'notification-list',
	children: [],
	attribute: {
	    'initialised': false,
	    'notifications': new Map(),
	    // function to dismiss a notification
	    'dismissed': (self, id, force = false) => {
		// make sure we have an id, and then make sure the child exists
		if (id === undefined) return;
		const child = self.attribute.notifications.get(id);
		if (!child) return;

		// TODO: make hover exist
		if (child == null || child.attribute.hovered && !force) return;

		// if the notification is a blacklisted notification, it's in
		// the map, but not a child of the notification list box
		// it needs to have 'closed' called on it
		if (isNotificationCenterBlacklist(child.attribute.notification) && !force && !is_popup) {
		    // destroy the widget
		    child.attribute.close(child);
		    // remove from map
		    self.attribute.notifications.delete(id);
		    return;
		}
		
		// check if the call is 'dismissed' or 'closed'
		// if it's 'dismissed' but we aren't a popup list, don't run destroy.
		if (!force && !is_popup) return;

		// actually destroy the child
		child.reveal_child = false;
		child.attribute.destroy(child);
		self.attribute.notifications.delete(id);
	    },
	    'notified': (self, id, is_init = false) => {
		// init refers to initialising single pre-existing notifications
		// and is called from the load_past method
		// this is to build the past notifications without endlessly recursing
		// id is undefined on service initialisation
		if (!id && !is_init && !is_popup && !self.attribute.initialised) {
		    self.attribute.load_past(self);
		}

		if (id === undefined) return;

		// actually do notification shit
		const notification = notifications.getNotification(id);
		if (notification && !notifications.dnd) {
		    // create notification widget
		    const notification_widget = Notification({
			notification: notification,
			is_popup: is_popup
		    });

		    const map = self.attribute.notifications
		    
		    // add to map
		    map.set(id, notification_widget);

		    // make sure notification isn't spotify if it's not a popup
		    // it should still be added to the map, as it allows it to be destroyed once it expires
		    // from the popup timer
		    if (!is_popup && isNotificationCenterBlacklist(notification)) return;

		    self.pack_end(map.get(id), false, false, 0)
		    self.show_all();
		    map.get(id).attribute.open(map.get(id));
		}
	    },
	    'load_past': (self) => {
		const count_pre_sanitized = notifications.notifications.length;
		if (count_pre_sanitized === 0) {
		    self.attribute.initialised = true;
		    return;
		};
		// load past notifications
		console.log('[NOTIFICATIONS] there are ', notifications.notifications.length, ' notifications in the queue');
		notifications.notifications.forEach(
		    (notification) => {
			console.log('[NOTIFICATIONS] ', notification.app_name);
			if (isNotificationCenterBlacklist(notification)) {
			    console.log('[NOTIFICATIONS] blacklisted notification, skipping');
			    notification.close();
			    return;
			}
			self.attribute.notified(self, notification.id, true);
		    }
		);
		console.log('[NOTIFICATIONS] done initialising past notifications, removed ', count_pre_sanitized - notifications.notifications.length, ' notifications from the queue');
		self.attribute.initialised = true;
	    }
	},
	setup: (self) => { // "element" is "self"
	    self 
		.hook(notifications, (element, id) => element.attribute.notified(element, id), 'notified')
		.hook(notifications, (element, id) => element.attribute.dismissed(element, id), 'dismissed')
		.hook(notifications, (element, id) => element.attribute.dismissed(element, id, true), 'closed');
	},
    });
}
