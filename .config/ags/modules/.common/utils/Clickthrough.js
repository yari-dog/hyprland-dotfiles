// taken from end-4
// hthis works by telling ags that the drawn region is what can be clicked
// it's meant to be used for rounded cornes/complexly shaped elements but it can be used for anything

import Cairo from 'gi://cairo';

export default (self) => self.input_shape_combine_region(new Cairo.Region());
