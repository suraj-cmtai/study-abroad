"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ArrowRight, X, ChevronLeft, ChevronRight, Calendar } from "lucide-react"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/lib/redux/store"
import { fetchActiveGallery, selectActiveGalleryList, selectIsLoading, selectHasFetched, selectError } from "@/lib/redux/features/gallerySlice"
import { Skeleton } from "@/components/ui/skeleton"

function LoadingPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className={`relative overflow-hidden rounded-2xl shadow-lg ${
            i === 1 ? "md:row-span-2" : ""
          }`}
        >
          <Skeleton className="w-full h-full min-h-[250px] rounded-2xl" />
        </div>
      ))}
    </div>
  )
}

export function GalleryPreview() {
  const dispatch = useDispatch<AppDispatch>()
  const galleryItems = useSelector(selectActiveGalleryList)
  const isLoading = useSelector(selectIsLoading)
  const hasFetched = useSelector(selectHasFetched)
  const error = useSelector(selectError)

  // Lightbox state
  const [selectedImage, setSelectedImage] = useState<any>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    dispatch(fetchActiveGallery())
  }, [dispatch])

  // Sort by createdOn desc, take top 4
  const featuredImages = [...galleryItems]
    .sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime())
    .slice(0, 4)

  const openLightbox = (image: any) => {
    setSelectedImage(image)
    setCurrentImageIndex(featuredImages.findIndex((i) => i.id === image.id))
  }

  const navigateImage = (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev"
        ? (currentImageIndex - 1 + featuredImages.length) % featuredImages.length
        : (currentImageIndex + 1) % featuredImages.length

    setCurrentImageIndex(newIndex)
    setSelectedImage(featuredImages[newIndex])
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      "Campus Life": "bg-blue-100 text-blue-800",
      Graduation: "bg-purple-100 text-purple-800",
      Events: "bg-green-100 text-green-800",
      Academic: "bg-orange-100 text-orange-800",
      Sports: "bg-red-100 text-red-800",
    }
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <section className="w-full py-20 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Student <span className="text-orange">Gallery</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a glimpse into the vibrant student life and memorable moments from our study abroad programs.
          </p>
        </motion.div>

        {/* Loading State */}
        {(!hasFetched || isLoading) && <LoadingPreview />}

        {/* Error State */}
        {hasFetched && error && (
          <div className="text-center py-8 text-destructive">
            <p className="text-lg font-semibold">{error}</p>
          </div>
        )}

        {/* Gallery Grid */}
        {hasFetched && !isLoading && !error && featuredImages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative overflow-hidden rounded-2xl shadow-lg card-hover cursor-pointer h-64 ${
                  index === 1 ? "md:row-span-2 md:h-full" : ""
                }`}
                style={{
                  backgroundImage: `url('/placeholder.svg')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
                onClick={() => openLightbox(image)}
              >
                <Image
                  src={image.image || "/placeholder.svg"}
                  alt={image.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg">{image.title}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* No Images State */}
        {hasFetched && !isLoading && !error && featuredImages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg font-semibold">No gallery images available at the moment.</p>
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/gallery">
            <Button size="lg" className="bg-orange hover:bg-orange/90 text-white px-8">
              View Full Gallery
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent showCloseButton={false} className="max-w-4xl w-full p-0 bg-black">
          <DialogTitle hidden>Gallery Image Preview</DialogTitle>
          <AnimatePresence mode="wait">
            {selectedImage && (
              <motion.div
                key={selectedImage.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                  onClick={() => setSelectedImage(null)}
                >
                  <X className="h-6 w-6" />
                </Button>

                {/* Navigation Buttons */}
                {featuredImages.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
                      onClick={() => navigateImage("prev")}
                    >
                      <ChevronLeft className="h-8 w-8" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
                      onClick={() => navigateImage("next")}
                    >
                      <ChevronRight className="h-8 w-8" />
                    </Button>
                  </>
                )}

                {/* Image */}
                <img
                  src={selectedImage.image || "/placeholder.svg"}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{selectedImage.title}</h3>
                      <p className="text-gray-300 mb-2">{selectedImage.description}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <Badge className={getCategoryColor(selectedImage.category)}>{selectedImage.category}</Badge>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(selectedImage.createdOn).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    {featuredImages.length > 1 && (
                      <div className="text-sm text-gray-300">
                        {currentImageIndex + 1} / {featuredImages.length}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  )
}
