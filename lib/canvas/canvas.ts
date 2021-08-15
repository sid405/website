import {
  DoubleSide,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from "three"
import FS from "./shaders/fragment.glsl"
import VS from "./shaders/vertex.glsl"

const BG_COLOR = [39, 39, 42] // gray-800
const FG_COLOR = [255, 255, 255] // white

export class TopoBackground {
  private width: number
  private height: number
  private resizeHandler: () => void

  private scene: Scene
  private camera: OrthographicCamera
  private renderer: WebGLRenderer
  private resources: Set<{ dispose: () => void }>

  static isWebGLAvailable() {
    try {
      const canvas = document.createElement("canvas")
      return !!(window.WebGL2RenderingContext && canvas.getContext("webgl2"))
    } catch (e) {
      return false
    }
  }

  constructor(domElement: Element) {
    const { width, height } = domElement.getBoundingClientRect()
    this.width = width
    this.height = height
    this.resizeHandler = this.resize.bind(this, this.width, this.height)
    window.addEventListener("resize", this.resizeHandler)

    this.scene = new Scene()
    this.camera = new OrthographicCamera(
      0,
      this.width,
      0,
      this.height,
      0.1,
      1000
    )
    this.renderer = new WebGLRenderer({ alpha: true })
    this.renderer.setClearColor(0x000000, 0)
    this.resize(this.width, this.height)
    this.resources = new Set()

    domElement.appendChild(this.renderer.domElement)
  }

  private buildScene() {
    const geometry = new PlaneGeometry(this.width, this.height).translate(
      this.width / 2,
      this.height / 2,
      0
    )
    const material = new ShaderMaterial({
      uniforms: {
        bgColor: {
          value: new Vector3(...BG_COLOR),
        },
        fgColor: {
          value: new Vector3(...FG_COLOR),
        },
      },
      vertexShader: VS,
      fragmentShader: FS,
      side: DoubleSide,
    })
    const mesh = new Mesh(geometry, material)

    this.scene.add(mesh)
    this.camera.position.z = 5

    this.resources.add(geometry)
    this.resources.add(material)
  }

  private eventLoop = () => {
    requestAnimationFrame(this.eventLoop)
    this.renderer.render(this.scene, this.camera)
  }

  private resize(width: number, height: number) {
    this.renderer.setSize(width, height)
  }

  public start = () => {
    this.buildScene()
    this.eventLoop()
  }

  public dispose = () => {
    window.removeEventListener("resize", this.resizeHandler)
    this.renderer.dispose()
    this.resources.forEach((r) => r.dispose())
  }
}
