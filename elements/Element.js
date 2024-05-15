class Element {
    constructor(hueValue, blnSettled) {
        this.hueValue = hueValue;
        this.blnSettled = blnSettled;
        // Add acid value - determines how quickly selected material is dissolved
        // Add burn value - determines how quickly selected material is burnt
    }

    static elements = [];

    /**
     * Adds all elements to an array 
     * @param {Element} element the material being added to the elements array
     */
    static registerElement(element) {
        this.elements.push(element);
    }

    /**
     * Checks whether the hue value passed in is of a solid element
     * @param {string} hueValue The hue value of the element being passed in
     * @returns true if solid 
     */
    static isSolidHue(hueValue) {
        const element = this.elements.find(el => el.hueValue === hueValue);
        return element ? element.isSolid() : false;
    }

    /**
     * Getter to check if a material is solid
     * @returns true if solid
     */
    isSolid() {
        return true; // Default to solid
    }

    /**
     * Setter for the current material
     * @param {string} material the material being selected
     */
    static selectMaterial(material) {
        currentMaterial = material;
    }

    /**
     * Updates the position of a given grain of material
     * @param {2D Array} grid The current grid
     * @param {2D Array} nextGrid The new grid
     * @param {int} i the column number being updated
     * @param {int} j the row number being updated
     * @returns the updated grid
     */
    updatePosition(grid, nextGrid, i, j) {
        // Logic will get overridden by each elements own updatePosition function
        nextGrid[i][j] = grid[i][j];
        return nextGrid;
    }

}


