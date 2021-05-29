// global variables are permissible, as a treat

// on click, explore shapes with mouse position
let exploratory_mode = false

let calc_mode = Math.random() < 0.5

// random vars:
let numLines = 10 + Math.floor(Math.random()*15)

// spherical properties
let rd = 5 + Math.random() * 5
let xd = 3 + Math.random() * 7
let yd = 3 + Math.random() * 7

let radius = innerWidth / rd
let xorigin = Math.floor(Math.random() * (innerWidth / xd))
let yorigin = Math.floor(Math.random() * (innerHeight / yd))

// line properties
let wt = 8 + Math.floor(Math.random() * 15)
let a = 125 + Math.floor(Math.random() * 130)

// for changing color
let g = 0
let delta = 1

// hold shapes
let lines = []

function setup() {

    createCanvas(innerWidth, innerHeight, WEBGL)

    // generate lines (and points)
    for (let i = 0; i < numLines; i++) {
        
        // generate random points on a sphere
        let rx = randomGaussian()
        let ry = randomGaussian()
        let rz = randomGaussian()
        let norm = 1 / Math.sqrt(rx*rx + ry*ry + rz*rz)

        let x = rx * norm * radius
        let y = ry * norm * radius
        let z = rz * norm * radius
        
        lines[i] = new Line (x, y, z)
    }
}

function draw() {
    background(0)
    
    // draw lines
    lines.forEach(line => {
        if (exploratory_mode) {
            translate(mouseX-width/2, mouseY-height/2)
        }
        
        line.display()
    })

    // increment/decrement color
    g += delta
    if (g == 0 || g == 200) {delta = -delta}
}

class Line {

    constructor(xin, yin, zin) {
        this.x = xin
        this.y = yin
        this.z = zin
    }

    display() {
        rotateZ(frameCount * 0.01)
        rotateX(frameCount * 0.01)
        rotateY(frameCount * 0.01)

        stroke(color(255, g, 0, a))
        strokeWeight(wt)
        
        line(xorigin, yorigin, 0, this.x, this.y, this.z)
        
        for (let i = 2; i < 4; i++) {
            point(this.x * i, this.y * i, this.z * i)
        }
    }
}

function mouseClicked() {
    exploratory_mode = !exploratory_mode
}


