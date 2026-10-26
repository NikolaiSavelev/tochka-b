# 3D-город для фона Точка Б

## Файлы

- `public/models/tochka-b-city-light.glb` — основная модель (2.5 МБ, рекомендуется)
- `public/models/tochka-b-city-background.glb` — детальная модель (3.7 МБ)

## Установка зависимостей

```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

## Использование

### 1. Поместите модель в public

```
public/models/tochka-b-city-light.glb
```

### 2. Импортируйте компонент

```tsx
import CityBackground3D from './components/CityBackground3D';

function App() {
  return (
    <>
      <CityBackground3D />
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* ваш контент */}
      </div>
    </>
  );
}
```

### 3. Настройка для мобильных

Если нужно отключить на слабых устройствах:

```tsx
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

{!isMobile && <CityBackground3D />}
```

## Оптимизация загрузки

Для снижения веса до ~500 КБ можно прогнать через:
- https://gltf.report/ — авто-оптимизация
- `gltfpack -i model.glb -o model-opt.glb -cc` — командная утилита

## Альтернатива: чистый Three.js (без React)

Если не используете React Three Fiber:

```html
<script type="module">
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 2, 8);

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.getElementById('city-bg').appendChild(renderer.domElement);

// Свет
scene.add(new THREE.AmbientLight(0x404040, 0.5));
const sun = new THREE.DirectionalLight(0xff9f43, 0.8);
sun.position.set(5, 5, 5);
scene.add(sun);

// Загрузка
const loader = new GLTFLoader();
loader.load('/models/tochka-b-city-light.glb', (gltf) => {
  const city = gltf.scene;
  city.scale.set(1.2, 1.2, 1.2);
  city.position.y = -0.5;
  scene.add(city);

  // Анимация
  function animate() {
    requestAnimationFrame(animate);
    city.rotation.y = Math.sin(Date.now() * 0.0005) * 0.15;
    city.position.y = -0.5 + Math.sin(Date.now() * 0.002) * 0.1;
    renderer.render(scene, camera);
  }
  animate();
});

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
</script>
```
