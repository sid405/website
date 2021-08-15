import { Theme } from "@madebysid/usetheme";
import {
  Clock,
  Color,
  DoubleSide,
  Mesh,
  OrthographicCamera,
  PlaneBufferGeometry,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";
import FS from "./shaders/fragment.glsl";
import VS from "./shaders/vertex.glsl";

const DARK_COLOR = "#FFFFFF"; // white
const LIGHT_COLOR = "#27272A"; // gray-800

export class Canvas {
  private domElement: Element;
  private width: number;
  private height: number;

  private scene: Scene;
  private camera: OrthographicCamera;
  private renderer: WebGLRenderer;

  private clock: Clock;
  private geometry: PlaneBufferGeometry;
  private material: ShaderMaterial;

  static isWebGLAvailable() {
    try {
      const canvas = document.createElement("canvas");
      return !!(window.WebGL2RenderingContext && canvas.getContext("webgl2"));
    } catch (e) {
      return false;
    }
  }

  constructor(domElement: Element) {
    this.domElement = domElement;
    const { width, height } = domElement.getBoundingClientRect();
    this.width = width;
    this.height = height;

    this.scene = new Scene();
    this.camera = new OrthographicCamera(
      0,
      this.width,
      0,
      this.height,
      0.1,
      1000
    );
    this.camera.position.z = 5;
    this.renderer = new WebGLRenderer({ alpha: true });
    this.renderer.setClearColor(0x000000, 0);
    this.setSize(this.width, this.height);

    this.clock = new Clock();
    this.geometry = new PlaneBufferGeometry(this.width, this.height);
    this.geometry.translate(this.width / 2, this.height / 2, 0);
    this.material = new ShaderMaterial({
      uniforms: {
        color: {
          value: new Color(LIGHT_COLOR),
        },
        time: {
          value: 0,
        },
      },
      vertexShader: VS,
      fragmentShader: FS,
      side: DoubleSide,
    });
    this.scene.add(new Mesh(this.geometry, this.material));

    domElement.appendChild(this.renderer.domElement);

    this.eventLoop();
  }

  private eventLoop = () => {
    requestAnimationFrame(this.eventLoop);
    this.material.uniforms.time.value =
      this.clock.startTime + this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);
  };

  public setSize(width: number, height: number) {
    this.renderer.setSize(width, height);
    this.camera.updateProjectionMatrix();
  }

  public setTheme(theme: Theme) {
    if (theme === "light") {
      this.material.uniforms.color.value = new Color(LIGHT_COLOR);
    } else {
      this.material.uniforms.color.value = new Color(DARK_COLOR);
    }
  }

  public dispose = () => {
    while (this.domElement.lastChild) {
      this.domElement.lastChild.remove();
    }

    this.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
  };
}
