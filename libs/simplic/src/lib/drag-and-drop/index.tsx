import { CloudArrowUpIcon } from '@heroicons/react/24/outline';
import cn from 'classnames';
import { useEffect, useId, useRef, useState } from 'react';
import { preventDefaults } from '../utils/prevent-defaults';

type DragAndDropImageShape = 'circle';

interface DragAndDropProps {
  onImageSelect: (file: File) => void;
  shape?: DragAndDropImageShape;
}

export const DragAndDrop = ({ onImageSelect, shape }: DragAndDropProps) => {
  const id = useId();
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const [shouldHighlight, setShouldHighlight] = useState(false);
  const [preview, setPreview] = useState<
    string | ArrayBuffer | null | undefined
  >();

  const handleAvatarImageSelectionChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setPreview(e.target?.result);
        onImageSelect(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarImageDrop = (e: DragEvent) => {
    const dt = e.dataTransfer;
    const file = dt?.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setPreview(e.target?.result);
        onImageSelect(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const highlight = () => setShouldHighlight(true);
  const unhighlight = () => setShouldHighlight(false);

  // add event listeners for drag and drop
  useEffect(() => {
    const el = dropAreaRef.current;

    if (el) {
      // Prevent default drag behaviors
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
        el.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
      });

      // Highlight drop area when item is dragged over it
      ['dragenter', 'dragover'].forEach((eventName) =>
        el.addEventListener(eventName, highlight, false)
      );

      ['dragleave', 'drop'].forEach((eventName) =>
        el.addEventListener(eventName, unhighlight, false)
      );

      el.addEventListener('drop', handleAvatarImageDrop);

      return () => {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
          el.removeEventListener(eventName, preventDefaults);
          document.body.removeEventListener(eventName, preventDefaults);
        });

        ['dragenter', 'dragover'].forEach((eventName) =>
          el.removeEventListener(eventName, highlight)
        );

        ['dragleave', 'drop'].forEach((eventName) =>
          el.removeEventListener(eventName, unhighlight)
        );

        el.removeEventListener('drop', handleAvatarImageDrop);
      };
    }
  }, [dropAreaRef.current]);

  return (
    <div
      ref={dropAreaRef}
      className="flex items-center justify-center w-full h-60 bg-gray-50"
    >
      <label
        htmlFor={id}
        className={cn(
          'flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 p-5',
          {
            'bg-gray-100': shouldHighlight,
          }
        )}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-1">
          {preview ? (
            <img
              src={preview as string}
              alt="image preview"
              className={cn('h-full', {
                'w-48 h-48 rounded-full object-cover': shape === 'circle',
              })}
            />
          ) : (
            <>
              <CloudArrowUpIcon className="w-8" />
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">PNG or JPG</p>
            </>
          )}
        </div>
        <input
          id={id}
          type="file"
          className="hidden"
          onChange={handleAvatarImageSelectionChange}
          accept="image/jpeg, image/png"
        />
      </label>
    </div>
  );
};
