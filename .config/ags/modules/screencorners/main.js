import Corner from '../.common/widgets/Corner.js'
import enableClickThrough from '../.common/utils/Clickthrough.js'
//import Cairo from 'gi://cairo'

//const dummyRegion = new Cairo.Region()
//const enableClickThrough = (self) => self.input_shape_combine_region(dummyRegion)

export default (monitor = 0, where = 'top-left') => {
    console.log(where.split('-'))
    return Widget.Window({
        monitor,
        name: `corner-${where}-${monitor}`,
        anchor: where.split('-'),
        exclusivity: 'ignore',
        layer: 'overlay',
        visible: true,
        child: Corner(
            where,
            { class_name: 'corner-black' },
        ),
        setup: enableClickThrough,
    });
}
