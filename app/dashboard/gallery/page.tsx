"use client";

import React, { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Loader2, Plus, Edit, Trash2, Search, Image as ImageIcon, ZoomIn } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSelector, useDispatch } from "react-redux";
import { fetchGallery, selectGallery, selectError, selectIsLoading, GalleryItem, deleteGallery, addGallery, updateGallery } from "@/lib/redux/features/gallerySlice";
import { AppDispatch } from "@/lib/redux/store";

export default function GalleryPage() {

  const dispatch = useDispatch<AppDispatch>();
  const galleryImages = useSelector(selectGallery);
  const error = useSelector(selectError);
  const isLoading = useSelector(selectIsLoading);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editImage, setEditImage] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState({ title: "", image: "" });
  const [deleteImage, setDeleteImage] = useState<GalleryItem | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filtered images
  const filteredImages = useMemo(
    () =>
      (Array.isArray(galleryImages) ? galleryImages : []).filter(
        (img) =>
          img.title.toLowerCase().includes(search.toLowerCase())
      ),
    [galleryImages, search]
  );

  // Handlers
  const openAddModal = () => {
    setEditImage(null);
    setForm({ title: "", image: "" });
    setImageFile(null);
    setImagePreview(null);
    setModalOpen(true);
  };

  const openEditModal = (img: GalleryItem) => {
    setEditImage(img);
    setForm({ title: img.title, image: img.image });
    setImageFile(null);
    setImagePreview(img.image || null);
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (!deleteImage) return;
  
    setLoading(true);
    setTimeout(() => {
      dispatch(deleteGallery(deleteImage.id));
      setLoading(false);
      setDeleteImage(null);
      toast.success("Image deleted!");
    }, 800);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const formData = new FormData();
      formData.append("title", form.title);
      if (imageFile) {
        formData.append("image", imageFile);
      } else if (form.image) {
        formData.append("image", form.image);
      }
      formData.append("createdOn", new Date().toISOString());
      formData.append("updatedOn", new Date().toISOString());
      if (editImage) {
        dispatch(updateGallery(formData, editImage.id));
        toast.success("Image updated!");
      } else {
        dispatch(addGallery(formData));
        toast.success("Image added!");
      }
      setModalOpen(false);
      setLoading(false);
      setImageFile(null);
      setImagePreview(null);
    }, 1000);
  };

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-8">
      {/* Header Section */}      <motion.div 
        layout
        className="relative rounded-xl bg-gradient-to-r from-black/10 to-transparent p-6 border shadow-sm"
      >
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-1">
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-main)' }}>
              Gallery Management
            </h2>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-[300px]">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Input
                  placeholder="Search images..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 h-10 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md"
                />
              </motion.div>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >              <Button 
                onClick={openAddModal} 
                size="lg"
                className="gap-2 bg-black/90 hover:bg-black text-white shadow-sm transition-all duration-200 hover:shadow-md w-full sm:w-auto"
              >
                <Plus className="w-4 h-4" /> Add Image
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Gallery Grid with Loading State */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {loading ? (
            // Loading skeleton
            [...Array(8)].map((_, i) => (
              <motion.div
                key={`skeleton-${i}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-gray-100 rounded-xl overflow-hidden"
              >
                <div className="aspect-[4/3] bg-gray-200 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="flex gap-2">
                    <div className="h-9 flex-1 bg-gray-200 rounded animate-pulse" />
                    <div className="h-9 flex-1 bg-gray-200 rounded animate-pulse" />
                  </div>
                </div>
              </motion.div>
            ))
          ) : filteredImages.length === 0 ? (
            // Empty state
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="col-span-full flex flex-col items-center justify-center py-16 px-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", duration: 0.5 }}
              >
                <ImageIcon className="w-16 h-16 text-gray-300 mb-4" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No images found</h3>
              <p className="text-gray-500 text-center max-w-md">
                {search ? "Try adjusting your search query" : "Add some images to get started"}
              </p>
            </motion.div>
          ) : (
            // Image grid with staggered animations
            filteredImages.map((img, index) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  delay: index * 0.05
                }}
                className="group relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* Image container with hover effects */}
                <motion.div 
                  className="relative aspect-[4/3] bg-gray-50"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {img.image ? (
                    <>
                      <Image 
                        src={img.image} 
                        alt={img.title} 
                        fill 
                        className="object-cover transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-white" />
                      </div>
                    </>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <ImageIcon className="w-16 h-16 text-gray-300" />
                    </div>
                  )}
                </motion.div>

                {/* Card content */}
                <motion.div 
                  className="p-4"
                  initial={false}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                >
                  <h3 className="font-semibold text-lg mb-2 truncate">
                    {img.title}
                  </h3>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openEditModal(img)}
                      className="flex-1 hover:bg-gray-50"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setDeleteImage(img)}
                      disabled={loading}
                      className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </motion.div>

      {/* Add/Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {editImage ? "Edit Image" : "Add New Image"}
              </DialogTitle>
            </DialogHeader>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="Enter image title"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  required
                  className="w-full transition-all duration-200 focus:ring-2 focus:ring-black/20"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Image</label>
                <AnimatePresence mode="wait">
                  {imagePreview && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="relative rounded-lg overflow-hidden group"
                    >
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <ZoomIn className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4                           file:rounded-full file:border-0 file:text-sm file:font-semibold
                           file:bg-black/10 file:text-black hover:file:bg-black/20 
                           focus:outline-none focus:ring-2 focus:ring-black/20 rounded-lg"
                />
              </div>
            </motion.div>

            <DialogFooter>
              <Button 
                type="submit" 
                disabled={loading}
                className="bg-black/90 hover:bg-black text-white gap-2"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                {editImage ? "Update Image" : "Add Image"}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </motion.form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={!!deleteImage} onOpenChange={(open) => !open && setDeleteImage(null)}>
        <DialogContent className="sm:max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="space-y-6"
          >
            <DialogHeader>
              <DialogTitle className="text-2xl">Delete Image</DialogTitle>
            </DialogHeader>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="py-4 text-center"
            >
              <p className="text-gray-600">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-black">
                  {deleteImage?.title}
                </span>
                ?
              </p>
              <p className="text-sm text-gray-500 mt-2">
                This action cannot be undone.
              </p>
            </motion.div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={loading}
                className="w-full sm:w-auto gap-2 bg-red-600 hover:bg-red-700"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
                Delete Image
              </Button>
              <DialogClose asChild>
                <Button 
                  type="button" 
                  variant="ghost" 
                  disabled={loading}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
