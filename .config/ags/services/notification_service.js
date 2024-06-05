// this file creates a service for notification based ui elements
// such as toasts or the sidebar notification list
// to be able to pull their correct respective notifications
// in a post-filter manner

//Service is global
const notifications = await Service.import('notifications')

// all handler really does is make it so that i don't have to pass the is_popup flag around
class Handler extends Service {
    static {
	Service.register(
	    this,
	    {
		['notified']: ['int'],
		['dismissed']: ['int'],
		['closed']: ['int'],
		['notified-init']: [],
	    },
	    {
		['notifications']: ['array', 'r'],
		['popups']: ['array', 'r'],
		['dnd']: ['bool', 'rw'],
	    },
	)
    }
    
    constructor(service, isPopup = false) {
	super();
	this.isPopup = isPopup;
	this.service = service;
	this.#register();
    }


    get notifications() {
	// else return the notifications filtered by the blacklist
	return this.isPopup ? this.service.popups : this.service.notifications;	
    }

    get dnd() {
	return this.service.dnd;
    }

    set dnd(value) {
	this.service.dnd = value;
    }

    get popups() {
	return this.service.popups;
    }
    
    getNotification(id) {
	return this.isPopup ? this.service.getPopup(id) : this.service.getNotification(id);
    }

    clear() {
	return this.service.clear();
    }

    #notify(id) {
	this.emit('notified', id);
    }

    #dismissed(id) {
	this.emit('dismissed', id);
    }

    #closed(id) {
	this.emit('closed', id);
    }
    
    // trickle down the signals
    #register() {
	this.service.connect('notified', (_, id) => this.#notify(id));
	this.service.connect('dismissed', (_, id) => this.#dismissed(id));
	this.service.connect('closed', (_, id) => this.#closed(id));
	this.service.connect('notified-init', () => this.emit('notified-init'));
	this.service.connect('changed', () => this.emit('changed'));
    }
}

class NotificationService extends Service{
    // static is used to register the service
    // 3 arguments, this, an object defining signals, and an object defining its accessible properties
    static {
	Service.register(
	    this,
	    {
		// name, and type
		// these are the signals from the notifications service
		'dismissed': ['int'],
		'closed': ['int'],
		'notified': ['int'],
		'notified-init': [],
	    },
	    {
		// name, type, and permissions (r, w, rw)
		// these are the ones from the notifications service
		'notifications': ['array', 'r'],
		'popups': ['array', 'r'],
		'dnd': ['bool', 'rw'],
	    },
	)
    }

    get notifications() {
	return notifications.notifications.filter(notification => !this.isBlacklistedFromNotifCenter(notification));
    }
    get popups() {
	return notifications.popups;
    }
    get dnd() {
	return notifications.dnd;
    }
    set dnd(value) {
	notifications.dnd = value;
    }

    // the handler is what the notification list interacts with
    // it implements an interface that the notification list can use
    #popupHandler = new Handler(this, true);
    #notificationHandler = new Handler(this, false);
    #init = false; // is service initialised? (has it emitted notified-init yet?)
    
    constructor(){
	super();
	this.#register();
    }

    // mirror logic from notifications service
    // notifications changed
    #notify(id) {
	if (id === undefined) {
	    this.#clearPastBlacklisted();
	    this.emit('notified-init');
	    return;
	}
	this.emit('notified', id);
	return
    }

    #dismissed(id) {
	this.emit('dismissed', id);
	const notification = notifications.getNotification(id);
	// if blacklisted type, there's nothing to .close() it
	// so once dismiss has been called, it needs to be .close()'d
	if (this.isBlacklistedFromNotifCenter(notification)) {
	    notification.close();
	};
	return;
    }

    #closed(id) {
	this.emit('closed', id);
	return
    }

    #changed() {
	// determine if this is initialisation
	if (!this.#init) {
	    this.#clearPastBlacklisted();
	    this.#init = true;
	    this.emit('notified-init');
	    return;
	}
	this.emit('changed');
    }


    
    getHandler(isPopup = false) {
	return isPopup ? this.#popupHandler : this.#notificationHandler;
    }

    isBlacklistedFromNotifCenter(notification) {
	return notification?.appName === 'Spotify';
    }

    getNotification(id) {
	const notification = notifications.getNotification(id);
	return this.isBlacklistedFromNotifCenter(notification) ? null : notification;
    }

    getPopup(id) {
	return notifications.getPopup(id);
    }

    clear() {
	return notifications.clear();
    }

    #clearPastBlacklisted() {
	notifications.notifications.forEach(notification => {
	    if (this.isBlacklistedFromNotifCenter(notification)) {
		notification.close();
	    }
	});
    }

    // widget.hook returns itself
    // internally it takes {service, callback, signal}
    // and called .connect() on the service
    // service.connect(signal, (_, ...args) => callback(...args))
    #register() {
	// bind to the notifications service's signals
	notifications.connect('notified', (_, id) => this.#notify(id));
	notifications.connect('dismissed', (_, id) => this.#dismissed(id));
	notifications.connect('closed', (_, id) => this.#closed(id));
	notifications.connect('changed', () => this.#changed());
    }
}

// export the service
const service = new NotificationService();
export default service;


