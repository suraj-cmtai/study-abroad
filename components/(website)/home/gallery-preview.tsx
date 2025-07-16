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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  }

  const headingVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

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
    <section className="w-full py-20 bg-gray-50 overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4">
        <motion.div
          variants={headingVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Student{" "}
            <span className="relative inline-block text-orange">
              Gallery
              <motion.div
                className="absolute -bottom-1 left-0 h-1 w-full bg-orange/50 rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ transformOrigin: "left" }}
              />
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take a glimpse into the vibrant student life and memorable moments
            from our study abroad programs.
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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
          {featuredImages.map((image, index) => (
            <motion.div
              key={image.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
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
                    <h3 className="hidden text-white font-semibold text-lg">
                      {image.title}
                    </h3>
                </div>
              </div>
            </motion.div>
          ))}
          </motion.div>
        )}

        {/* No Images State */}
        {hasFetched && !isLoading && !error && featuredImages.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p className="text-lg font-semibold">
              No gallery images available at the moment.
            </p>
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
            <Button
              size="lg"
              className="bg-orange hover:bg-orange/90 text-white px-8 group"
            >
              View Full Gallery
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <Dialog
        open={!!selectedImage}
        onOpenChange={() => setSelectedImage(null)}
      >
        <DialogContent className="max-w-5xl w-full p-0 bg-black/95 border-0" showCloseButton={false}>
          <DialogTitle className="hidden">
            {selectedImage?.title || "Gallery Image Preview"}
          </DialogTitle>
          <AnimatePresence>
            {selectedImage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="relative h-[90vh]"
              >
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-4 z-10 text-white hover:bg-white/20 rounded-full"
                  onClick={() => setSelectedImage(false)}
                >
                  <X className="h-6 w-6" />
                </Button>

                {/* Navigation Buttons */}
                {featuredImages.length > 1 && (
                  <>
                    <div className="absolute top-1/2 -translate-y-1/2 left-4 z-20">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigateImage("prev")}
                        className="text-white rounded-full hover:bg-white/20 hover:text-white h-12 w-12"
                      >
                        <ChevronLeft className="h-8 w-8" />
                      </Button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigateImage("next")}
                        className="text-white rounded-full hover:bg-white/20 hover:text-white h-12 w-12"
                      >
                        <ChevronRight className="h-8 w-8" />
                      </Button>
                    </div>
                  </>
                )}

                {/* Image */}
                <div
                  className="relative h-full w-full flex items-center justify-center"
                  style={{
                    backgroundImage: `url('/placeholder.svg')`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  <Image
                    src={selectedImage.image || "/placeholder.svg"}
                    alt={selectedImage.title}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                  />
                </div>

                {/* Image Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent text-center text-white">
                  <h3 className="hidden text-xl font-medium">{selectedImage.title}</h3>
                  {selectedImage.category && (
                    <p className="hidden text-sm text-gray-300 mt-1">
                      {selectedImage.category}
                    </p>
                  )}
                  {featuredImages.length > 1 && (
                    <p className="text-xs text-gray-400 mt-2">
                      {currentImageIndex + 1} of {featuredImages.length}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>
    </section>
  );
}
