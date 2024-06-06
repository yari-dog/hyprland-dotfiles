class SettingsService extends Service {
    static {
	Service.register(
	    this,
	    {
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
	    target[prop] = value;
	    Utils.writeFile(JSON.stringify(this.#settings, null, 4), this.#file)
		.catch((err) => {
		    console.error(err);
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
	this.#settings = new Proxy(this.load(), this.#proxy);
    }

    load() {
	return JSON.parse(Utils.readFile(this.#file));
    }

    get settings() {
	return this.#settings;
    }

}

const service = new SettingsService();
export default service.settings;
