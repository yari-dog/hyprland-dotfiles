export default (icon, size, props = {}) => Widget.Label({
    class_name: `icon-material txt-${size}`,
    label: icon,
    ...props,
})
