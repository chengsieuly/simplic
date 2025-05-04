import {
  ArrowUturnLeftIcon,
  CloudArrowUpIcon,
  SparklesIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Config, preload, removeBackground } from '@imgly/background-removal';
import cn from 'classnames';
import { MouseEventHandler, useEffect, useId, useRef, useState } from 'react';
import { IconButton } from '../button';
import { LoadingAnimation } from '../loading-animation';
import { toast } from '../toasts';
import { blobToDataURL } from '../utils';
import { preventDefaults } from '../utils/prevent-defaults';

type DragAndDropImageShape = 'circle';

interface DragAndDropProps {
  onImageSelect: (file: File | null) => void;
  shape?: DragAndDropImageShape;
  file?: File | null;
}

export const DragAndDrop = ({
  onImageSelect,
  shape,
  file,
}: DragAndDropProps) => {
  const id = useId();
  const dropAreaRef = useRef<HTMLDivElement>(null);
  const [shouldHighlight, setShouldHighlight] = useState(false);
  const [beforeRemovingBgPreview, setBeforeRemovingBgPreview] = useState<
    string | ArrayBuffer | null | undefined
  >();
  const [preview, setPreview] = useState<
    string | ArrayBuffer | null | undefined
  >();
  const [isRemovingBg, setIsRemovingBg] = useState(false);

  const bgRemovalConfig: Config = {
    debug: false,
    rescale: true,
    device: 'gpu',
    output: {
      quality: 0.8,
      format: 'image/png',
    },
  };

  const handleAvatarImageSelectionChange: React.ChangeEventHandler<
    HTMLInputElement
  > = (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setPreview(e.target?.result);
        onImageSelect(file);
        setBeforeRemovingBgPreview(null);
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
        setBeforeRemovingBgPreview(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlRemoveImage: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setPreview(null);
    onImageSelect(null);
    setBeforeRemovingBgPreview(null);
  };

  const handleRemoveBackground = async () => {
    if (preview) {
      setBeforeRemovingBgPreview(preview);
      setIsRemovingBg(true);
      try {
        const imageBlob = await removeBackground(preview, bgRemovalConfig);
        const dataUrl = await blobToDataURL(imageBlob);
        setPreview(dataUrl);
      } catch (error) {
        console.error('Processing failed:', error);
        toast.critical(
          'Sorry, we were unable to remove your background image.'
        );
      } finally {
        setIsRemovingBg(false);
      }
    }
  };

  const handleRevertBgRemoval = () => {
    setPreview(beforeRemovingBgPreview);
    setBeforeRemovingBgPreview(null);
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

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setPreview(e.target?.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [file]);

  // handle bg removal
  useEffect(() => {
    const preloadAssets = async () => {
      try {
        await preload(bgRemovalConfig);
        console.log('Asset preloading succeeded');
      } catch (error) {
        console.error('Asset preloading failed:', error);
      }
    };

    preloadAssets();
  }, []);

  return (
    <div
      ref={dropAreaRef}
      className="relative group flex items-center justify-center w-full h-60 bg-gray-50"
    >
      <label
        htmlFor={id}
        className={cn(
          'relative flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-100 p-5',
          {
            'bg-gray-100': shouldHighlight,
          }
        )}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-1">
          {preview ? (
            <div className="relative flex justify-center items-center w-48 h-48">
              <img
                src={preview as string}
                alt="image preview"
                className={cn('h-full object-cover', {
                  'rounded-full w-full': shape === 'circle',
                  'opacity-30': isRemovingBg,
                })}
              />
              {isRemovingBg && (
                <div className="absolute">
                  <LoadingAnimation />
                </div>
              )}
            </div>
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
      {preview && (
        <div className="flex flex-col gap-1 absolute top-3 right-3">
          {!!beforeRemovingBgPreview ? (
            <IconButton
              icon={<ArrowUturnLeftIcon />}
              onClick={handleRevertBgRemoval}
            />
          ) : (
            <IconButton
              icon={<SparklesIcon />}
              onClick={handleRemoveBackground}
            />
          )}
          <IconButton icon={<XMarkIcon />} onClick={handlRemoveImage} />
        </div>
      )}
    </div>
  );
};
