// app/components/BeforeAfterSlider.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface BeforeAfterImage {
  beforeImage: string;
  afterImage: string;
  title: string;
  description?: string;
}

const demoImage: BeforeAfterImage = {
  beforeImage:
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?q=80&w=1200&auto=format&fit=crop',
  afterImage:
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
  title: 'Маникюр',
  description:
    'До: ломкие ногти, неравномерная форма. После: укрепление гелем, идеальная форма.',
};

interface BeforeAfterSliderProps {
  image?: BeforeAfterImage;
  className?: string;
}

export default function BeforeAfterSlider({ image = demoImage, className = '' }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeImage = image;

  // Обработка движения слайдера
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    let position = ((clientX - rect.left) / rect.width) * 100;
    position = Math.min(Math.max(position, 0), 100);
    setSliderPosition(position);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (!isDragging) return;

    const onMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX);
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className={`bg-white rounded-2xl shadow-xl overflow-hidden h-full ${className}`}>
      {/* Header */}
      <div className="bg-linear-to-r from-green-600 to-teal-600 px-6 py-4">
        <h2 className="text-2xl font-bold text-white">
          Наши работы
        </h2>
        <p className="text-green-100 text-sm mt-1">
          Реальные примеры до и после
        </p>
      </div>

      <div className="p-6">
        {/* Основной слайдер */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            {activeImage.title}
          </h3>
          
          {activeImage.description && (
            <p className="text-gray-600 text-center mb-6">
              {activeImage.description}
            </p>
          )}

          <div 
            ref={containerRef}
            className="relative max-w-4xl mx-auto select-none"
            style={{ touchAction: 'none' }}
          >
            {/* Контейнер изображений */}
            <div className="relative overflow-hidden rounded-xl shadow-lg">
              {/* Изображение "После" (фон) */}
              <Image
                src={"/portfolio/image_1.avif"}
                alt="После"
                className="block h-full w-full"
                draggable={false}
                width={1200}
                height={800}
              />
              
              {/* Изображение "До" (обрезанное) */}
              <div
                className="pointer-events-none absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <Image
                  src={"/portfolio/image_2.avif"}
                  alt="До"
                  className="block h-full w-full"
                  draggable={false}
                  width={1200}
                  height={800}
                />
              </div>

              {/* Линия разделитель */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
              >
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-white rounded-full p-2 shadow-lg">
                    <svg
                      className="w-6 h-6 text-gray-700"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Подписи */}
            <div className="flex justify-between mt-4 text-sm font-medium">
              <div className="bg-gray-800 text-white px-3 py-1 rounded-lg">
                ДО
              </div>
              <div className="bg-green-600 text-white px-3 py-1 rounded-lg">
                ПОСЛЕ
              </div>
            </div>
          </div>

          {/* Подсказка */}
          <p className="text-center text-sm text-gray-500 mt-4">
            💡 Перетащите ползунок, чтобы сравнить результат
          </p>
        </div>
        

        {/* Демо-информация */}
        <div className="bg-gray-50 rounded-lg p-4 mt-8">
          <div className="flex items-start gap-3">
            <div className="shrink-0">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-1">Демо-версия слайдера &quot;До/После&quot;</p>
              <p>В реальном проекте вы сможете загружать свои фотографии работ. Этот инструмент помогает клиентам визуализировать результат и повышает доверие к вашему мастерству.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}