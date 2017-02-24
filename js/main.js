function main() {
    // Setup our scene
    var scene = new THREE.Scene()
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 20
    var renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    // Create our parent object
    var parent = new THREE.Object3D()
    scene.add(parent)
    
    // Create lines representing our vectors
    var material = new THREE.LineBasicMaterial({color: 0xBADA55})
    var origin = THREE.Vector3()
    var points = []
    for(i=0; i<2; i++) {
        points.push(new THREE.Vector3(
            Math.random() * 20 - 10,
            Math.random() * 20 - 10,
            Math.random() * 20 - 10
        ))
        var line = new THREE.Line3(origin, points[i])
        var geometry = new THREE.Geometry()
        geometry.vertices.push(line.start, line.end)
        var mesh = new THREE.Line(geometry, material)
        parent.add(mesh)
    }

    // Calculate our angle and update the DOM
    var radians = calculateAngleBetweenVectors(points[0], points[1])
    var degrees = radiansToDegrees(radians)
    document.getElementById("angle").innerHTML = degrees.toFixed(2);

    // Render loop
    function render() {
        requestAnimationFrame(render)
        parent.rotation.y += 0.01
        renderer.render(scene, camera)
    }
    render()
}

function radiansToDegrees(radians) {
    return radians * 180/Math.PI
}

function calculateAngleBetweenVectors(a, b) {
    return Math.acos(a.dot(b) / (a.length() * b.length()))
}

main()