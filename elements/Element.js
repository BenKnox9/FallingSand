class Element {
    constructor(hueValue, blnSettled) {
        this.hueValue = hueValue;
        this.blnSettled = blnSettled;
        // Add acid value - determines how quickly selected material is dissolved
        // Add burn value - determines how quickly selected material is burnt
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


