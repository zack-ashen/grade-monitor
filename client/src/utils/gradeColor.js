export default function gradeColor (grade) {
    // starting with green
    let color = {
        r: 54,
        g: 222,
        b: 54
    };

    const dist = 100-grade;
    if (grade < 99) {
        if (color.r + (dist * 14) <= 222) {
            color.r += (dist * 14);
        } else {
            color.r = 222;
            const diff = (dist * 14) - 168;
            color.g -= diff / 2.5;
        }
    }

    return ('rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', 1.0)');
}