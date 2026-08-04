use <stem_mx.scad>

module stem_mx_0(
    outer_diameter = 5.5,
    stem_height = 4.5,
    hole_diameter = 4.4,
    base_clearance = 0,
    quality = "export"
) {
    outer_steps = stem_curve_steps(outer_diameter, quality);
    hole_steps = stem_curve_steps(hole_diameter, quality);
    safe_height = max(stem_height, 0.2);

    difference() {
        translate([0, 0, base_clearance])
            cylinder(d = outer_diameter, h = safe_height, $fn = outer_steps);

        translate([0, 0, base_clearance - 0.5])
            cylinder(d = max(hole_diameter, 0.1), h = safe_height + 1.0, $fn = hole_steps);
    }
}
