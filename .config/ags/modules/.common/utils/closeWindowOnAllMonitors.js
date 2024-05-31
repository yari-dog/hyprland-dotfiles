const { Gdk } = imports.gi;

export default (windowName) => {
    range(Gdk.Display.get_default()?.get_n_monitors() || 1, 0).forEach(id => {
	App.closeWindow(`${windowName}-${id}`);
    }) 
}
