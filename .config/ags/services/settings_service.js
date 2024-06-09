const { Gio } = imports.gi;

class SettingsService extends Service {
    static {
	Service.register(
	    this,
	    {
		// when a setting is modified through ags, string is empty if the settings file was changed directly
		['modified']: ['string'],
		['theme_modified']: [],
	    },
	    {
		'settings': ['object', 'rw']
	    }	
	)
    }
    
    // the proxy object is used to intercept get and set
    // so that we can use dot notation to access the settings,
    // and handle setting transparently
    #proxy = {
	get: (target, prop) => {
	    if (prop in target) {
		if(typeof target[prop] === 'object' && target[prop] !== null) {
		    return new Proxy(target[prop], this.#proxy);
		}
		return target[prop];
	    }
	    return undefined;
	},
	set: (target, prop, value) => {
	    console.log(`Setting ${prop} to ${value}`);
	    target[prop] = value;
	    Utils.writeFile(JSON.stringify(this.#settings, null, 4), this.#file)
		.catch((err) => {
		    console.error(err);
		})
		.then(() => {
		    try {
			this.load();
			this.modified(prop);
		    } catch (err) {
			console.error(err);
		    }
		});
	    return true;
	},
    }

    // i have no idea why but #file will indent weirdly lmao
    #file;
    #settings;
    
    constructor() {
	super();
	this.#file = `${App.configDir}/settings/settings.json`;
	this.load();
	Utils.monitorFile(this.#file, (file, event) => {
	    if (event === Gio.FileMonitorEvent.CHANGED) {
		this.updated();
	    }
	});
    }

    load() {
	this.#settings= new Proxy(JSON.parse(Utils.readFile(this.#file)), this.#proxy);
    }

    get settings() {
	return this.#settings;
    }

    modified(field) {
	this.emit('modified', field);
    }

    updated() {
	this.load();
	this.emit('modified', '');
    }

    get_field(field) { // this is used to get the field from the settings object, using a string with dot notation
	let fields = field.split('.');
	let obj = this.#settings;
	for (let i = 0; i < fields.length; i++) {
	    obj = obj[fields[i]];
	}
	return obj;
    }

    set_field(field, value) { // this is used to set the field from the settings object, using a string with dot notation
	let fields = field.split('.');
	let obj = this.#settings;
	for (let i = 0; i < fields.length - 1; i++) {
	    obj = obj[fields[i]];
	}
	obj[fields[fields.length - 1]] = value;
    }

    is_modified(field, hook_field) {  // field is the field that is being checked, hook_field is the field that was given to the widget by emit
	if (hook_field === '' || field === hook_field) {
	    return true;
	}
	return false;
    }
}

const service = new SettingsService();
export default service;
