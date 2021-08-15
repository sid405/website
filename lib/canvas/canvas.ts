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

const BG_COLOR = "#27272A"; // gray-800
const FG_COLOR = "#FFFFFF"; // white

export class TopoBackground {
  private width: number;
  private height: number;
  private resizeHandler: () => void;

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
    const { width, height } = domElement.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.resizeHandler = this.resize.bind(this, this.width, this.height);
    window.addEventListener("resize", this.resizeHandler);

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
    this.resize(this.width, this.height);

    this.clock = new Clock();
    this.geometry = new PlaneBufferGeometry(this.width, this.height);
    this.geometry.translate(this.width / 2, this.height / 2, 0);
    this.material = new ShaderMaterial({
      uniforms: {
        bgColor: {
          value: new Color(BG_COLOR),
        },
        fgColor: {
          value: new Color(FG_COLOR),
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
  }

  private eventLoop = () => {
    requestAnimationFrame(this.eventLoop);
    this.material.uniforms.time.value = this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);
  };

  private resize(width: number, height: number) {
    this.renderer.setSize(width, height);
  }

  public start = () => {
    this.eventLoop();
  };

  public dispose = () => {
    window.removeEventListener("resize", this.resizeHandler);
    this.geometry.dispose();
    this.material.dispose();
    this.renderer.dispose();
  };
}
