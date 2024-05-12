class Element {
    constructor(hueValue) {
        this.hueValue = hueValue;
    }

    static selectMaterial(material) {
        currentMaterial = material;
    }

    updatePosition() {
        // Logic will get overridden by each elements own updatePosition function
    }

    display(x, y, size) {
        // Not currently using this 
        noStroke();
        fill(this.hueValue, 255, 255);
        square(x, y, size);
    }

}


