import NotificationList from '../../.common/widgets/NotificationList.js';
import MainBox from './widgets/main_box.js';
import ControlPanel from './widgets/control_panel.js';
import QuickSettings from './widgets/quick_settings.js';

export default () => {
    const main_box = MainBox();
    const control_panel = ControlPanel();
    const quick_settings = QuickSettings();
    
    return Widget.Box({
	class_name: 'sidebar sidebar-right',
	vertical: true,
	vexpand: true, hexpand: false,
	vpack: 'start',
	
	
	homogeneous: false,
	children: [
	    quick_settings,
	    control_panel,
	    main_box,
	],
    });
}
