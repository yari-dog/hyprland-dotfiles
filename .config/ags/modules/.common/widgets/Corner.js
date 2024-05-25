// some code taken from end-4
// I moved most of it to the style used in the ags docs as Lang is deprecated
const { Gtk } = imports.gi;
import Clickthrough from '../utils/Clickthrough.js';

export default (place, props) => Widget.DrawingArea({
    ...props,
    hpack: place.includes('left') ? 'start' : 'end',
    vpack: place.includes('top') ? 'start' : 'end',
    setup: (self) => {
        // get r from the border-radius property
        const r = self.get_style_context().get_property('border-radius', Gtk.StateFlags.NORMAL);
        self.set_size_request(r * 2, r * 2);
    },
    drawFn: (self, cr, w, h) => {
        // c is the background color, r is the border radius
        const c = self.get_style_context().get_property('background-color', Gtk.StateFlags.NORMAL);
        const r = Math.min(w, h) / 2;


        // arc(x, y, radius, startAngle, endAngle)
        // lineTo(x, y)
        // the x and y of lineTo is relative to the top left corner of the widget
        // the x and y of arc are the center of the circle
        // which should be the center of the widget
        switch (place) {
            case 'top-left':
                cr.arc(r, r, r, Math.PI, 1.5 * Math.PI);
                cr.lineTo(0, 0);
                break;
            case 'top-right':
                cr.arc(r, r, r, 1.5 * Math.PI, 2 * Math.PI);
                cr.lineTo(w, 0);
                break;
            case 'bottom-left':
                cr.arc(r, r, r, 0.5 * Math.PI, Math.PI);
                cr.lineTo(0, h);
                break;
            case 'bottom-right':
                cr.arc(r, r, r, 0, 0.5 * Math.PI);
                cr.lineTo(w, h);
                break;
        }

        cr.closePath();
        cr.setSourceRGBA(c.red, c.green, c.blue, c.alpha);
        cr.fill();
    },
})
