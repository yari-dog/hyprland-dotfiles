
import settings from './settings_service.js';


// this is just used for runnign the theme script corectly
// it probably doesn't need to be a service, but it is for now because it's easier to manage, especially with multiple methods
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
    }

    set_theme() {
	let command_arguments = []
	command_arguments.push(settings.settings.theme.light_mode ? '-l' : '') // lightmode theme
	command_arguments.push(settings.settings.theme.backend ? `-b ${settings.settings.theme.backend}` : '') // backend

	Utils.execAsync(`${this.#theme_script} ${command_arguments.join(' ')}`);
    }

    set_wallpaper(wallpaper_path) {
	Utils.exec(`swww img ${wallpaper_path}`)
	this.set_theme();
    }
}

const theme = new ThemeService();
export default theme;
