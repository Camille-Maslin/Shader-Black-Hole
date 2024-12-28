uniform float time;
uniform vec2 resolution;
uniform vec2 mouse;

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec2 normalizedMouse = mouse.xy / resolution.xy;
    
    // Création de plusieurs couches de vagues
    float wave1 = sin(uv.x * 10.0 + time) * 0.5;
    float wave2 = cos(uv.y * 8.0 - time * 0.5) * 0.5;
    float wave3 = sin((uv.x + uv.y) * 5.0 + time * 0.7) * 0.5;
    
    // Interaction avec la souris
    float mouseDist = length(uv - normalizedMouse);
    float mouseWave = sin(mouseDist * 20.0 - time * 2.0) * exp(-mouseDist * 3.0);
    
    // Mélange des vagues
    float finalWave = wave1 + wave2 + wave3 + mouseWave;
    
    // Création des couleurs
    vec3 col1 = vec3(0.5, 0.8, 0.9);
    vec3 col2 = vec3(0.9, 0.4, 0.7);
    vec3 col3 = vec3(0.3, 0.7, 0.5);
    
    vec3 finalColor = mix(col1, col2, finalWave);
    finalColor = mix(finalColor, col3, sin(time * 0.2) * 0.5 + 0.5);
    
    gl_FragColor = vec4(finalColor, 1.0);
} 