# Точка Б — CRM для риэлторов

Платформа для риэлторов России: заявки, сделки, расчёты и наставник в одном кабинете.

## 3D Город на фоне

В проекте добавлен стилизованный 3D-город для главной страницы.

### Файлы

- `public/models/tochka-b-city-light.glb` — 3D-модель города (2.5 МБ)
- `src/components/CityBackground3D.tsx` — React-компонент для фона
- `docs/INTEGRATION.md` — полная инструкция по внедрению

### Быстрый старт

```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

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

### Структура проекта

```
├── public/
│   └── models/
│       └── tochka-b-city-light.glb
├── src/
│   └── components/
│       └── CityBackground3D.tsx
├── docs/
│   └── INTEGRATION.md
└── README.md
```

## Лицензия

Проект разработан для риэлторов России.
