import closeEverything from '../utils/closeEverything.js';

export default ({
    name, child, ...props
}) => {
    return Widget.Window({
	name,
	visible: false,
	...props,
	child: Widget.Box({
	    setup: (self) => {
		self.keybind('Escape', () => {
		    closeEverything();
		})
	    },
	    child: child
	}),
    })
}
