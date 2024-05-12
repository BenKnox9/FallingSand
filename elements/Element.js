class Element {
    constructor(hueValue) {
        this.hueValue = hueValue;
    }

    static selectMaterial(material) {
        currentMaterial = material;
    }

    updatePosition() {
        // Logic to update the elements position or behaviour
    }

    display(x, y, size) {
        // Display the element at the given position with the specified size
        noStroke();
        fill(this.hueValue, 255, 255);
        square(x, y, size);
    }

}


