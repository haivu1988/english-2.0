import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Link as LinkIcon,
  Image as ImageIcon,
  Trash2,
  Check,
  AlertCircle,
} from 'lucide-react';
import { Flashcard } from '../types';

interface AddImageModalProps {
  card: Flashcard;
  isOpen: boolean;
  onClose: () => void;
  onSaveImage: (cardId: string, imageUrl: string | undefined) => void;
}

export const AddImageModal: React.FC<AddImageModalProps> = ({
  card,
  isOpen,
  onClose,
  onSaveImage,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [imageUrlInput, setImageUrlInput] = useState(card.imageUrl || '');
  const [previewUrl, setPreviewUrl] = useState<string | null>(card.imageUrl || null);
  const [previewError, setPreviewError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Compress & resize image to max 800x800 for optimal local & cloud storage
  const processImageFile = (file: File) => {
    setIsProcessing(true);
    setPreviewError(false);

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const MAX_DIM = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_DIM) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          }
        } else {
          if (height > MAX_DIM) {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          setPreviewUrl(compressedDataUrl);
          setImageUrlInput(compressedDataUrl);
        } else {
          const rawResult = e.target?.result as string;
          setPreviewUrl(rawResult);
          setImageUrlInput(rawResult);
        }
        setIsProcessing(false);
      };
      img.onerror = () => {
        setPreviewError(true);
        setIsProcessing(false);
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      setPreviewError(true);
      setIsProcessing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const handleUrlChange = (url: string) => {
    setImageUrlInput(url);
    setPreviewError(false);
    if (url.trim()) {
      setPreviewUrl(url.trim());
    } else {
      setPreviewUrl(null);
    }
  };

  const handleSave = () => {
    const finalUrl = previewUrl?.trim() || undefined;
    onSaveImage(card.id, finalUrl);
    onClose();
  };

  const handleRemove = () => {
    onSaveImage(card.id, undefined);
    setPreviewUrl(null);
    setImageUrlInput('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Thêm hình ảnh cho từ
              </h3>
              <p className="text-xs text-indigo-600 font-semibold">
                &ldquo;{card.word}&rdquo; &ndash; {card.vietnameseMeaning}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Method Tabs */}
          <div className="flex rounded-2xl bg-slate-100 p-1 text-xs font-semibold border border-slate-200/60">
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'upload'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Tải từ máy / điện thoại</span>
            </button>
            <button
              onClick={() => setActiveTab('url')}
              className={`flex-1 py-2 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'url'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Dán liên kết (URL)</span>
            </button>
          </div>

          {/* TAB 1: UPLOAD FILE */}
          {activeTab === 'upload' && (
            <div className="space-y-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isProcessing}
                className="w-full p-6 border-2 border-dashed border-indigo-200 hover:border-indigo-400 bg-indigo-50/30 hover:bg-indigo-50/60 rounded-2xl flex flex-col items-center justify-center text-center gap-2 transition-all group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">
                    {isProcessing ? 'Đang xử lý ảnh...' : 'Nhấn để chọn ảnh từ thiết bị'}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Hỗ trợ JPG, PNG, WEBP, GIF (tự động tối ưu dung lượng)
                  </p>
                </div>
              </button>
            </div>
          )}

          {/* TAB 2: PASTE URL */}
          {activeTab === 'url' && (
            <div className="space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                Đường dẫn hình ảnh trực tiếp (Image URL)
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={imageUrlInput}
                  onChange={(e) => handleUrlChange(e.target.value)}
                  placeholder="https://images.unsplash.com/... hoặc link ảnh bất kỳ"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Bạn có thể sao chép địa chỉ hình ảnh từ Google Images, Unsplash hoặc bất kỳ website nào rồi dán vào đây.
              </p>
            </div>
          )}

          {/* PREVIEW CONTAINER */}
          {previewUrl && (
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">Xem trước ảnh:</span>
                <button
                  type="button"
                  onClick={() => {
                    setPreviewUrl(null);
                    setImageUrlInput('');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                  className="text-[11px] text-slate-400 hover:text-rose-600 transition-colors"
                >
                  Xóa xem trước
                </button>
              </div>

              <div className="w-full h-44 rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 relative flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt={card.word}
                  className="w-full h-full object-cover"
                  onError={() => setPreviewError(true)}
                  onLoad={() => setPreviewError(false)}
                />
                {previewError && (
                  <div className="absolute inset-0 bg-rose-50/90 flex flex-col items-center justify-center p-3 text-center text-rose-700">
                    <AlertCircle className="w-6 h-6 mb-1" />
                    <p className="text-xs font-bold">Không thể tải hình ảnh</p>
                    <p className="text-[11px] text-rose-500 mt-0.5">
                      Đường dẫn không hợp lệ hoặc bị chặn truy cập. Vui lòng thử tải ảnh từ máy!
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-2">
          {card.imageUrl ? (
            <button
              type="button"
              onClick={handleRemove}
              className="py-2.5 px-3.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Gỡ ảnh hiện tại</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="py-2.5 px-3.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-semibold transition-colors"
            >
              Hủy
            </button>
          )}

          <div className="flex items-center gap-2 ml-auto">
            <button
              type="button"
              onClick={handleSave}
              disabled={!previewUrl || previewError || isProcessing}
              className="py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-indigo-500/20 transition-all active:scale-97 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Lưu hình ảnh</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
