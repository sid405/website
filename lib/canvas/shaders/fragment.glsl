uniform vec3 bgColor;
uniform vec3 fgColor;

void main() {
	// gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
	gl_FragColor = vec4(bgColor[0] / 256.0, bgColor[1] / 256.0, bgColor[2] / 256.0, 1.0);
}