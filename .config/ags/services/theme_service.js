import GLib from 'gi://GLib';
import settings from './settings_service.js';


// this is just used for runnign the theme script corectly
// it probably doesn't need to be a service, but it is for now because it's easier to manage, especially with multiple methods
// it's nice to have the apply_theme method centralised and not just floating around in the global scope
class ThemeService extends Service {
    static {
	Service.register(
	    this,
	    {
		
	    },
	    {
		
	    }
	)
    }

    #theme_script = `${App.configDir}/scripts/theme_gen/theme.sh`
    
    constructor() {
	super();
	settings.connect('modified', (_, key) => {
	    if (key === '') { // if there was a file update outside of ags, run set theme
		this.set_theme();
	    }

	    // find location of key that was modified
	    // if it's in theme, run set_theme
	    // check recursively
	    const theme = settings.settings.theme;
	    const check = (obj, modified_key) => {
		for (const key in obj) {
		    if (key === modified_key) {
			this.set_theme();
			return;
		    }
		    if (typeof obj[key] === 'object') {
			check(obj[key]);
		    }
		}
	    }
	    check(theme, key);
	    
	})
    }

    async run_theme_script(args) {
	return Utils.execAsync(`${this.#theme_script} ${args}`);
    }

    set_theme() {
	let command_arguments = []
	command_arguments.push(settings.settings.theme.light_mode ? '-l' : '') // lightmode theme
	command_arguments.push(settings.settings.theme.backend ? `-b ${settings.settings.theme.backend}` : '') // backend

	console.log(`[LOG] Running theme script with arguments: ${command_arguments.join(' ')}`)
	Utils.execAsync(`${this.#theme_script} ${command_arguments.join(' ')}`)
	    .catch((error) => {
		console.error(`[ERROR] Failed to run theme script: ${error}`)
	    })
	    .then((output) => {
		console.log(`[LOG] Theme script output: ${output}`)
	    })
    }

    
    set_wallpaper(wallpaper_path) {
	Utils.exec(`swww img ${wallpaper_path}`)
	this.set_theme();
    }

    async init() { // to be run by config.js
	const COMPILED_STYLE_DIR = `${GLib.get_user_cache_dir()}/ags/user/generated`;
	Utils.exec(`mkdir -p "${GLib.get_user_state_dir()}/ags/scss"`);
	Utils.exec(`bash -c 'echo "" > ${GLib.get_user_state_dir()}/ags/scss/_musicwal.scss'`); // reset music styles
	Utils.exec(`bash -c 'echo "" > ${GLib.get_user_state_dir()}/ags/scss/_musicmaterial.scss'`); // reset music styles
	Utils.exec(`mkdir -p ${COMPILED_STYLE_DIR}`);
	Utils.exec(`sass -I "${GLib.get_user_state_dir()}/ags/scss" -I "${App.configDir}/scss/fallback" "${App.configDir}/scss/main.scss" "${COMPILED_STYLE_DIR}/style.css"`);
	await this.apply_theme();
    }

    async apply_theme() {
	console.log('[LOG] Applying theme')
	App.resetCss();
	App.applyCss(`${GLib.get_user_cache_dir()}/ags/user/generated/style.css`)
	console.log('[LOG] Theme applied')
    }
	
}

const theme = new ThemeService();
export default theme;


// TODO: make it so i can import theme within the ags.sh script instead of needing to use globalThis
globalThis.apply_theme = theme.apply_theme;
