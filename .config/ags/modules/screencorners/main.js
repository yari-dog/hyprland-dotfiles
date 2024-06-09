import Corner from '../.common/widgets/Corner.js'
import enableClickThrough from '../.common/utils/Clickthrough.js'
import settings from '../../services/settings_service.js'
//import Cairo from 'gi://cairo'

//const dummyRegion = new Cairo.Region()
//const enableClickThrough = (self) => self.input_shape_combine_region(dummyRegion)

export default (monitor = 0, where = 'top-left') => {
    return Widget.Window({
        monitor,
        name: `corner-${where}-${monitor}`,
        anchor: where.split('-'),
        exclusivity: 'ignore',
        layer: 'overlay',
        visible: settings.settings.theme.screen_corners,
        child: Corner(
            where,
            { class_name: 'corner-black' },
        ),
        setup: (self) => {
	    enableClickThrough(self);
	    self.hook(settings, (self, setting) => {
		if (setting === 'screen_corners') {
		    self.visible = settings.settings.theme.screen_corners;
		}
	    }, 'modified');
	},
    });
}
