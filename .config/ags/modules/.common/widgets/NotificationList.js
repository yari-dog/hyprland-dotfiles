import Notification from './Notification.js';
const notifications = await Service.import('notifications');

function isNotificationCenterBlacklist(notification) {
	return notification.app_name === 'Spotify';
}

export default (is_popup = false) => {
    return Widget.Box({
	hpack: 'center',
	vertical: true,
	class_name: 'notification-list',
	name: 'notification-list',
	children: (is_popup ?
		   notifications.popups.map(Notification) :
		   notifications.notifications.map(Notification)
		  ),
	attribute: {
	    'initialised': false,
	    // function to dismiss a notification
	    'dismissed': (self, id, force = false) => {
		// make sure we have an id, and then make sure the child exists
		if (id === undefined) return;
		const child = self.children.find((child) => child.attribute.id === id);
		if (!child) return;

		// check if the call is 'dismissed' or 'closed'
		// if it's 'dismissed' but we aren't a popup list, don't run destroy.
		if (!force && !is_popup) return;
		child.attribute.destroy(child);
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
		    // make sure notification isn't spotify if it's not a popup
		    if (!is_popup && isNotificationCenterBlacklist(notification)) return;
		    // append to start of list
		    const notification_widget = Notification({
			notification: notification,
			is_popup: is_popup
		    });
		    self.children = [notification_widget, ...self.children];
		    notification_widget.attribute.open(notification_widget);
		    
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
