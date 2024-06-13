const greetd = await Service.import ('greetd');
import theme from '../../services/theme_service.js';
import Login from './widgets.js';

await theme.init().catch(print);

export default (monitor) => {
    return Login({
	monitor,
	auth: async (password, username) => {
	    try {
		await greetd.login(username || '', password || '', 'Hyprland')
	    } catch (err) {
		if (err.type === 'error' && err.error_type === 'auth_error') {
		    return 'login failed :()';
		}
		console.log(err);
		return err.auth_message || 'idk wtf happened lmao';
	    }
	    return false;
	}
    })
}
