"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, CheckCircle, ArrowRight } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/lib/redux/store"
import {
  createSubscriber,
  selectSubscriberLoading,
  selectSubscriberError,
} from "@/lib/redux/features/subscriberSlice"

export function NewsletterSection() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const loading = useSelector(selectSubscriberLoading)
  const error = useSelector(selectSubscriberError)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    const data = new FormData()
    data.append("email", email)
    data.append("source", "newsletter-section")
    try {
      await dispatch(createSubscriber(data)).unwrap()
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    } catch (err) {
      // error handled by redux
    }
  }

  return (
    <section className="w-full py-20 bg-gradient-to-r from-navy to-blue-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="mb-8">
            <Mail className="h-16 w-16 text-orange mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Stay Updated with <span className="text-orange">Study Abroad</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Get the latest updates on study abroad opportunities, scholarship alerts, visa updates, and expert tips
              delivered straight to your inbox.
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur border-white/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-gray-300 focus:bg-white/30"
                      required
                    />
                    <Button
                      type="submit"
                      disabled={loading}
                      className="bg-orange hover:bg-orange/90 text-white px-8 py-3 whitespace-nowrap"
                    >
                      {loading ? (
                        "Subscribing..."
                      ) : (
                        <>
                          Subscribe Now
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                  {error && <div className="text-red-400 text-sm text-left">{error}</div>}
                  <p className="text-sm text-gray-300">
                    Join 10,000+ students who trust us for their study abroad journey. Unsubscribe anytime.
                  </p>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-4"
                >
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Successfully Subscribed!</h3>
                  <p className="text-gray-300">Thank you for subscribing. You'll receive our latest updates soon.</p>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
          >
            <div className="text-center">
              <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="h-6 w-6 text-orange" />
              </div>
              <h4 className="font-semibold mb-2">Weekly Updates</h4>
              <p className="text-sm text-gray-300">Latest opportunities and deadlines</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-6 w-6 text-orange" />
              </div>
              <h4 className="font-semibold mb-2">Exclusive Content</h4>
              <p className="text-sm text-gray-300">Insider tips and expert advice</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <ArrowRight className="h-6 w-6 text-orange" />
              </div>
              <h4 className="font-semibold mb-2">Early Access</h4>
              <p className="text-sm text-gray-300">Be first to know about scholarships</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
        className="absolute top-20 left-10 w-20 h-20 bg-orange/20 rounded-full blur-xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
        className="absolute bottom-20 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
      />
    </section>
  )
}
