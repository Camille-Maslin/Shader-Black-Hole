// Three.js scene components
let camera, scene, renderer;
let uniforms;

// Initialize and start animation
init();
animate();

/**
 * Initializes the WebGL scene, camera, and shader setup
 */
function init() {
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Create shader geometry
    const geometry = new THREE.PlaneGeometry(2, 2);
    
    // Initialize uniform variables for shader
    uniforms = {
        time: { value: 0 },          // Time variable for animation
        resolution: { value: new THREE.Vector2() },  // Screen resolution
        mouse: { value: new THREE.Vector2() }       // Mouse position
    };

    // Create shader material
    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        fragmentShader: document.getElementById('fragmentShader').textContent
    });

    // Create and add mesh to scene
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Setup renderer and append to DOM
    renderer = new THREE.WebGLRenderer();
    document.body.appendChild(renderer.domElement);

    // Initialize window size and event listeners
    onWindowResize();
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', onMouseMove, false);
}

/**
 * Handles window resize events
 * Updates renderer size and shader resolution uniforms
 */
function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    renderer.setSize(width, height);
    uniforms.resolution.value.x = width;
    uniforms.resolution.value.y = height;
}

/**
 * Handles mouse movement events
 * Updates shader mouse position uniform
 */
function onMouseMove(event) {
    uniforms.mouse.value.x = event.clientX;
    uniforms.mouse.value.y = window.innerHeight - event.clientY;
}

/**
 * Animation loop
 * Updates time uniform and renders the scene
 */
function animate() {
    requestAnimationFrame(animate);
    uniforms.time.value += 0.01;
    renderer.render(scene, camera);
} 