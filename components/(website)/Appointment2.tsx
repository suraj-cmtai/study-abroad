"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays } from "date-fns";
import { Send, Clock, Calendar as CalendarIcon2, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface TimeSlot {
  time: string;
  endTime: string;
  status: 'available' | 'booked';
  inviteeLink?: string;
}

interface AvailabilityDay {
  date: Date;
  slots: TimeSlot[];
}

interface BookedSlot {
  date: string; // ISO date string
  time: string;
  endTime: string;
  name: string;
  email: string;
  service: string;
}

export default function Appointment2() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    message: ""
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [availabilityData, setAvailabilityData] = useState<AvailabilityDay[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<'date' | 'details'>('date');
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>([]);

  // Load booked slots from localStorage on component mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('bookedSlots');
    if (savedBookings) {
      try {
        setBookedSlots(JSON.parse(savedBookings));
      } catch (error) {
        console.error('Error parsing saved bookings:', error);
        // If there's an error parsing, reset the storage
        localStorage.removeItem('bookedSlots');
      }
    }
  }, []);

  // Fetch real availability data from Calendly
  useEffect(() => {
    if (selectedDate) {
      setIsLoading(true);
      
      // For demo purposes, we'll simulate API call with predefined slots
      // In a real implementation, you would use the Calendly API
      fetchAvailability(selectedDate);
    }
  }, [selectedDate, bookedSlots]);

  // Function to fetch availability from Calendly API
  const fetchAvailability = async (date: Date) => {
    try {
      // In a real implementation, you would make an API call like this:
      /*
      const startTime = startOfDay(date).toISOString();
      const endTime = endOfDay(date).toISOString();
      
      const response = await fetch(
        `${CALENDLY_API_URL}/scheduling_links/${CALENDLY_USER}/availability?start_time=${startTime}&end_time=${endTime}`,
        {
          headers: {
            'Authorization': `Bearer ${CALENDLY_SECRET_KEY}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch availability');
      }
      
      const data = await response.json();
      */
      
      // For now, we'll simulate the API response with all slots available
      // All time slots from 10:30 AM to 8:30 PM are available
      const allAvailableSlots = [
        { start: '10:30', end: '11:30' },
        { start: '11:30', end: '12:30' },
        { start: '12:30', end: '13:30' },
        { start: '13:30', end: '14:30' },
        { start: '14:30', end: '15:30' },
        { start: '15:30', end: '16:30' },
        { start: '16:30', end: '17:30' },
        { start: '17:30', end: '18:30' },
        { start: '18:30', end: '19:30' },
        { start: '19:30', end: '20:30' },
      ];
      
      // Create a complete list of all slots from 10:30 AM to 8:30 PM
      const allSlots: TimeSlot[] = [];
      
      // Start time: 10:30 AM (10.5 hours)
      // End time: 8:30 PM (20.5 hours)
      const startHour = 10.5; 
      const endHour = 20.5;
      
      // Format the selected date to check against booked slots
      const dateStr = format(date, 'yyyy-MM-dd');
      
      for (let hour = startHour; hour < endHour; hour += 1) {
        const startHourWhole = Math.floor(hour);
        const startMinutes = hour % 1 === 0 ? "00" : "30";
        const startTimeStr = `${startHourWhole}:${startMinutes}`;
        
        const endHourValue = hour + 1;
        const endHourWhole = Math.floor(endHourValue);
        const endMinutes = endHourValue % 1 === 0 ? "00" : "30";
        const endTimeStr = `${endHourWhole}:${endMinutes}`;
        
        // Check if this slot is already booked by looking in bookedSlots
        const isBooked = bookedSlots.some(
          booking => booking.date === dateStr && booking.time === startTimeStr
        );
        
        // All slots are available unless they're in the bookedSlots array
        allSlots.push({
          time: startTimeStr,
          endTime: endTimeStr,
          status: isBooked ? 'booked' : 'available'
        });
      }
      
      setAvailabilityData([{
        date,
        slots: allSlots
      }]);
      
    } catch (error) {
      console.error('Error fetching availability:', error);
      toast("Failed to fetch availability. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTimeSlot) {
      setCurrentStep('details');
    } else {
      toast("Please select a date and time', 'You need to select both a date and time slot to continue.");
    }
  };

  const handleBack = () => {
    setCurrentStep('date');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate form
    if (!formData.name || !formData.email || !formData.service) {
      toast("Missing information', 'Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      // In a real implementation, you would use the Calendly API to schedule the event
      // Example API call:
      /*
      const response = await fetch(`${CALENDLY_API_URL}/scheduled_events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${CALENDLY_SECRET_KEY}`,
        },
        body: JSON.stringify({
          start_time: combineDateAndTime(selectedDate!, selectedTimeSlot!),
          end_time: combineDateAndTime(selectedDate!, availabilityData[0]?.slots.find(slot => slot.time === selectedTimeSlot)?.endTime || ""),
          name: formData.name,
          email: formData.email,
          event_type: formData.service,
          location: 'virtual',
          description: formData.message
        })
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to book appointment');
      }
      */
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Find the selected slot to get end time
      const selectedSlot = availabilityData[0]?.slots.find(slot => slot.time === selectedTimeSlot);
      
      if (!selectedSlot) {
        throw new Error('Selected time slot not found');
      }

      // Create a new booking record
      const newBooking: BookedSlot = {
        date: format(selectedDate!, 'yyyy-MM-dd'),
        time: selectedTimeSlot!,
        endTime: selectedSlot.endTime,
        name: formData.name,
        email: formData.email,
        service: formData.service
      };
      
      // Add to booked slots
      const updatedBookedSlots = [...bookedSlots, newBooking];
      setBookedSlots(updatedBookedSlots);
      
      // Save to localStorage
      localStorage.setItem('bookedSlots', JSON.stringify(updatedBookedSlots));

      // Mark the selected slot as booked
      if (selectedDate && selectedTimeSlot && availabilityData.length > 0) {
        const updatedSlots = availabilityData[0].slots.map(slot => {
          if (slot.time === selectedTimeSlot) {
            return { ...slot, status: 'booked' as const };
          }
          return slot;
        });
        
        setAvailabilityData([{
          date: selectedDate,
          slots: updatedSlots
        }]);
      }

      toast(`Your appointment is scheduled for ${format(selectedDate!, 'PPP')} at ${formatTime(selectedTimeSlot!)} - ${formatTime(selectedSlot?.endTime || "")}.`);

      // Reset form but keep the availability data
      setFormData({ name: "", email: "", service: "", message: "" });
      setSelectedTimeSlot(null);
      setCurrentStep('date');
    } catch (error) {
      console.error('Booking error:', error);
      toast("Booking Failed', 'There was an error booking your appointment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to combine date and time strings into a Date object
  const combineDateAndTime = (date: Date, timeStr: string): string => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    const newDate = new Date(date);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    return newDate.toISOString();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Format time for display (e.g., "9:00" to "9:00 AM")
  const formatTime = (time: string) => {
    if (!time) return "";
    const [hour, minute] = time.split(':');
    const hourNum = parseInt(hour, 10);
    const period = hourNum >= 12 ? 'PM' : 'AM';
    const hour12 = hourNum % 12 || 12;
    return `${hour12}:${minute} ${period}`;
  };

  // Get slot status color and style
  const getSlotStyle = (status: TimeSlot['status']) => {
    switch (status) {
      case 'available':
        return 'bg-white border border-blue-200 hover:bg-blue-50';
      case 'booked':
        return 'bg-orange-50 border border-orange-200 text-orange-500 cursor-not-allowed';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-orange-50/20">
      {/* Banner/Hero Section */}
      <section className="w-full bg-navy text-white py-20 mb-12">
        <div className="w-full max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Book Your <span className="text-orange">Appointment</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to bring your creative vision to life? Let&apos;s discuss your project and create something extraordinary together.
          </p>
        </div>
      </section>
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white border border-blue-200 shadow-elegant animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl text-navy text-center">
                {currentStep === 'date' ? 'Select Date & Time' : 'Complete Your Booking'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {currentStep === 'date' ? (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center text-navy">
                        <CalendarIcon2 className="mr-2 h-5 w-5 text-orange" />
                        Select a Date
                      </h3>
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        initialFocus
                        className="rounded-md border border-blue-200"
                        disabled={(date) => date < new Date() || date > addDays(new Date(), 60)}
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4 flex items-center text-navy">
                        <Clock className="mr-2 h-5 w-5 text-orange" />
                        Available Time Slots
                      </h3>
                      {!selectedDate ? (
                        <div className="h-[300px] flex items-center justify-center text-orange">
                          Please select a date to view available slots
                        </div>
                      ) : isLoading ? (
                        <div className="h-[300px] flex items-center justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
                        </div>
                      ) : availabilityData[0]?.slots.length === 0 ? (
                        <div className="h-[300px] flex items-center justify-center text-orange">
                          No available slots for this date
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto p-2">
                            {availabilityData[0]?.slots.map((slot, index) => (
                              <div key={index} className="relative">
                                {slot.status === 'booked' && (
                                  <div className="absolute -top-1 -right-1 bg-orange text-white rounded-full w-5 h-5 flex items-center justify-center z-10 text-xs">
                                    <X className="h-3 w-3" />
                                  </div>
                                )}
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-center border-blue-200",
                                    selectedTimeSlot === slot.time && slot.status === 'available' ? "bg-navy text-white" : "",
                                    getSlotStyle(slot.status)
                                  )}
                                  onClick={() => slot.status === 'available' && handleTimeSlotSelect(slot.time)}
                                  disabled={slot.status !== 'available'}
                                >
                                  <span className="flex-1 text-left">{formatTime(slot.time)} - {formatTime(slot.endTime)}</span>
                                  {slot.status === 'booked' && <span className="ml-2 text-xs">(Booked)</span>}
                                </Button>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2 text-sm">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-white border border-blue-700 mr-1"></div>
                              <span className="text-navy">Available</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-orange-200 mr-1"></div>
                              <span className="text-orange">Booked</span>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="pt-4 flex justify-end">
                    <Button
                      onClick={handleContinue}
                      className="bg-orange hover:bg-orange/90 text-white text-lg px-8 py-2 rounded-full font-bold"
                      disabled={!selectedDate || !selectedTimeSlot}
                    >
                      Continue
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="bg-orange/10 p-4 rounded-md mb-6">
                    <h3 className="text-lg font-bold mb-2 text-navy">Appointment Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center text-navy">
                        <CalendarIcon2 className="mr-2 h-5 w-5 text-orange" />
                        <span>{selectedDate && format(selectedDate, 'PPPP')}</span>
                      </div>
                      <div className="flex items-center text-navy">
                        <Clock className="mr-2 h-5 w-5 text-orange" />
                        {selectedTimeSlot && (
                          <span>
                            {formatTime(selectedTimeSlot)} - {
                              formatTime(availabilityData[0]?.slots.find(slot => slot.time === selectedTimeSlot)?.endTime || "")
                            } (1 hour)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-navy">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-white border border-blue-200 focus:border-orange transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-navy">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="bg-white border border-blue-200 focus:border-orange transition-colors"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-navy">
                      Service of Interest *
                    </Label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)} required>
                      <SelectTrigger className="bg-white border border-blue-200 focus:border-orange">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border border-blue-200">
                        <SelectItem value="video-shoots">Video Shoots</SelectItem>
                        <SelectItem value="product-photography">Product Photography</SelectItem>
                        <SelectItem value="podcast-recording">Podcast Recording</SelectItem>
                        <SelectItem value="creative-media">Creative Media Services</SelectItem>
                        <SelectItem value="consultation">Consultation</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-navy">
                      Project Details
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="Tell us about your project, vision, and any specific requirements..."
                      className="bg-white border border-blue-200 focus:border-orange transition-colors min-h-[120px] resize-none"
                      rows={5}
                    />
                  </div>
                  <div className="flex justify-between pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="px-6 border-blue-200 text-navy hover:bg-blue-50"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="bg-orange hover:bg-orange/90 text-white text-lg px-12 py-4 rounded-full font-bold"
                    >
                      {isSubmitting ? (
                        "Booking..."
                      ) : (
                        <>
                          <Send className="mr-2 h-5 w-5" />
                          Book Appointment
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
} 