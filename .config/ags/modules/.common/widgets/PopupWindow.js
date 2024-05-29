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
		    console.log('here')
		    closeEverything();
		})
	    },
	    child: child
	}),
    })
}
