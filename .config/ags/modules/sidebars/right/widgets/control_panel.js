const audio = await Service.import('audio');
import MaterialIcon from '../../../.common/widgets/MaterialIcon.js';

function Volume(device = 'speaker') {
    const volume_slider = Widget.Slider({
	class_name: 'control-panel-volume-slider volume-slider',
	hexpand: true,
	min: 0, max: 1,
	hpack: 'fill',
	drawValue: false,
	onChange: ({value}) => {
	    audio[device].volume = value;
	},
	setup: (self) => {
	    self.hook(audio, (self) => {
		self.value = audio[device].volume || 0;
	    });
	},
    });

    const volume_mute_button = Widget.Button({
	class_name: 'control-panel-volume-mute-button',
	cursor: 'pointer',
	on_clicked: (self) => {
	    audio[device].is_muted = !audio[device].is_muted;
	},
	setup: (self) => {
	    self.hook(audio, (self) => {
		// do some wiggling for the icon name, mic is mic or mic_off, speaker is volume_up or volume_off
		const muted = audio[device].is_muted;
		let icon;
		if (device === 'microphone') {
		    icon = muted ? 'mic_off' : 'mic';
		} else {
		    icon = muted ? 'volume_off' : 'volume_up';
		}
		self.child.label = icon;
	    });
	},
	child: MaterialIcon('', 'large', {}),
    });
	    
    return Widget.Box({
	class_name: 'control-panel-volume',
	children: [
	    volume_mute_button,
	    volume_slider,
	],
    });
}

export default () => {
    const volume = Widget.Box({
	class_name: 'control-panel-volume control-panel-section',
	spacing: 10,
	children: [
	    Volume('speaker'),
	    Volume('microphone'),
	],
    });

    return Widget.Box({
	class_name: 'control-panel sidebar-section',
	children: [
	    volume,
	],
    });
}
