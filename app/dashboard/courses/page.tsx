"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { motion } from "framer-motion"
import {
  MoreHorizontal,
  Plus,
  Pencil,
  Trash2,
  Search,
  Loader2,
  Image as ImageIcon,
} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { 
  fetchCourses, 
  createCourse, 
  updateCourse, 
  deleteCourse,
  selectCourses,
  selectCourseLoading,
  selectCourseError
} from "@/lib/redux/features/courseSlice"
import { AppDispatch } from "@/lib/redux/store"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"

interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  status: 'Active' | 'Draft' | 'Archived';
  description: string;
  instructor: string;
  enrollmentCount: number;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}

interface CourseFormState {
  title: string;
  category: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  status: 'Active' | 'Draft' | 'Archived';
  description: string;
  instructor: string;
  imageFile: File | null;
  removeImage: boolean;
  existingImageUrl: string | null;
}

const initialFormState: CourseFormState = {
  title: "",
  category: "",
  duration: "",
  level: "Beginner",
  price: 0,
  status: "Draft",
  description: "",
  instructor: "",
  imageFile: null,
  removeImage: false,
  existingImageUrl: null,
}

export default function CoursesPage() {
  const dispatch = useDispatch<AppDispatch>()
  const courses = useSelector(selectCourses)
  const isLoading = useSelector(selectCourseLoading)
  const error = useSelector(selectCourseError)

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [newCourseForm, setNewCourseForm] = useState<CourseFormState>(initialFormState)
  const [editCourseForm, setEditCourseForm] = useState<CourseFormState | null>(null)
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null)

  useEffect(() => {
    dispatch(fetchCourses())
  }, [dispatch])

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleCreate = async () => {
    const formData = new FormData()
    formData.append("title", newCourseForm.title)
    formData.append("description", newCourseForm.description)
    formData.append("instructor", newCourseForm.instructor)
    formData.append("category", newCourseForm.category)
    formData.append("duration", newCourseForm.duration)
    formData.append("level", newCourseForm.level)
    formData.append("price", newCourseForm.price.toString())
    formData.append("status", newCourseForm.status)
    if (newCourseForm.imageFile) {
      formData.append("image", newCourseForm.imageFile)
    }

    dispatch(createCourse(formData))
      .unwrap()
      .then(() => {
        setNewCourseForm(initialFormState)
        setIsCreateDialogOpen(false)
        toast.success("Course created successfully!")
      })
      .catch((err) => {
        toast.error(err || "Failed to create course")
      })
  }

  const openEditDialog = (course: Course) => {
    setSelectedCourseId(course.id)
    setEditCourseForm({
      title: course.title,
      category: course.category,
      duration: course.duration,
      level: course.level,
      price: course.price,
      status: course.status,
      description: course.description,
      instructor: course.instructor,
      imageFile: null,
      removeImage: false,
      existingImageUrl: course.image,
    })
    setIsEditDialogOpen(true)
  }

  const handleEdit = async () => {
    if (!editCourseForm || !selectedCourseId) return

    const formData = new FormData()
    formData.append("title", editCourseForm.title)
    formData.append("description", editCourseForm.description)
    formData.append("instructor", editCourseForm.instructor)
    formData.append("category", editCourseForm.category)
    formData.append("duration", editCourseForm.duration)
    formData.append("level", editCourseForm.level)
    formData.append("price", editCourseForm.price.toString())
    formData.append("status", editCourseForm.status)

    if (editCourseForm.imageFile) {
      formData.append("image", editCourseForm.imageFile)
    }
    if (editCourseForm.removeImage) {
      formData.append("removeImage", "true")
    }

    dispatch(updateCourse({ id: selectedCourseId, data: formData }))
      .unwrap()
      .then(() => {
        setIsEditDialogOpen(false)
        setEditCourseForm(null)
        setSelectedCourseId(null)
        toast.success("Course updated successfully!")
      })
      .catch((err) => {
        toast.error(err || "Failed to update course")
      })
  }

  const handleDelete = async () => {
    if (!selectedCourseId) return

    try {
      await dispatch(deleteCourse(selectedCourseId)).unwrap()
      setIsDeleteDialogOpen(false)
      setSelectedCourseId(null)
      toast.success("Course deleted successfully!")
    } catch (error) {
      toast.error("Failed to delete course")
    }
  }

  const renderFormFields = (
    formState: CourseFormState,
    setFormState: React.Dispatch<React.SetStateAction<any>>
  ) => (
    <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title <span className="text-red-500">*</span></Label>
          <Input
            id="title"
            value={formState.title}
            onChange={(e) => setFormState({ ...formState, title: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
          <Input
            id="category"
            value={formState.category}
            onChange={(e) => setFormState({ ...formState, category: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="duration">Duration <span className="text-red-500">*</span></Label>
          <Input
            id="duration"
            value={formState.duration}
            onChange={(e) => setFormState({ ...formState, duration: e.target.value })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="price">Price ($) <span className="text-red-500">*</span></Label>
          <Input
            id="price"
            type="number"
            value={formState.price}
            onChange={(e) => setFormState({ ...formState, price: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="level">Level <span className="text-red-500">*</span></Label>
          <Select
            value={formState.level}
            onValueChange={(value: 'Beginner' | 'Intermediate' | 'Advanced') =>
              setFormState({ ...formState, level: value })
            }
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formState.status}
            onValueChange={(value: 'Active' | 'Draft' | 'Archived') =>
              setFormState({ ...formState, status: value })
            }
          >
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Draft">Draft</SelectItem>
              <SelectItem value="Archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="instructor">Instructor <span className="text-red-500">*</span></Label>
        <Input
          id="instructor"
          value={formState.instructor}
          onChange={(e) => setFormState({ ...formState, instructor: e.target.value })}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
        <Textarea
          id="description"
          value={formState.description}
          onChange={(e) => setFormState({ ...formState, description: e.target.value })}
          rows={4}
        />
      </div>

      <div className="grid gap-2">
        <Label>Featured Image</Label>
        {formState.existingImageUrl && !formState.imageFile && (
          <div className="my-2 space-y-2">
            <p className="text-sm text-muted-foreground">Current image:</p>
            <img
              src={formState.existingImageUrl}
              alt="Current"
              className="w-full h-40 object-cover rounded-md border"
            />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="removeImage"
                checked={formState.removeImage}
                onChange={(e) => setFormState({ ...formState, removeImage: e.target.checked })}
              />
              <Label htmlFor="removeImage" className="text-sm font-medium">
                Remove this image on save
              </Label>
            </div>
          </div>
        )}
        <Input
          id="imageFile"
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormState({ ...formState, imageFile: e.target.files?.[0] || null })
          }
          className="file:text-foreground"
        />
        {formState.imageFile && (
          <p className="text-sm text-muted-foreground mt-1">
            New image selected: {formState.imageFile.name}
          </p>
        )}
      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-6"
    >
      <div className="flex justify-between items-center sm:flex-row flex-col gap-4">
        <h1 className="text-2xl font-bold">Course Management</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />Create Course
          </Button>
          <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
              <DialogTitle>Create New Course</DialogTitle>
              <DialogDescription>
                Fill in the details for your new course. Click create when you're done.
              </DialogDescription>
            </DialogHeader>
            {renderFormFields(newCourseForm, setNewCourseForm)}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={
                  isLoading ||
                  !newCourseForm.title ||
                  !newCourseForm.description ||
                  !newCourseForm.instructor
                }
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <motion.div layout className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Enrollments</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && courses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : filteredCourses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  No courses found
                </TableCell>
              </TableRow>
            ) : (
              filteredCourses.map((course) => (
                <motion.tr
                  key={course.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  layout
                >
                  <TableCell>
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={course.title}
                        className="h-12 w-16 object-cover rounded"
                      />
                    ) : (
                      <div className="h-12 w-16 bg-muted rounded flex items-center justify-center">
                        <ImageIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {course.title}
                  </TableCell>
                  <TableCell>{course.category}</TableCell>
                  <TableCell>{course.level}</TableCell>
                  <TableCell>${course.price}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`${
                        course.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : course.status === 'Draft'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{course.enrollmentCount}</TableCell>
                  <TableCell>{course.createdAt ? format(new Date(course.createdAt), "MMM d, yyyy") : "—"}</TableCell>
                  <TableCell>{course.updatedAt ? format(new Date(course.updatedAt), "MMM d, yyyy") : "—" }</TableCell>
                  
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => openEditDialog(course)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600 focus:bg-red-50"
                          onClick={() => {
                            setSelectedCourseId(course.id)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))
            )}
          </TableBody>
        </Table>
      </motion.div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
            <DialogDescription>
              Make changes to your course. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {editCourseForm && renderFormFields(editCourseForm, setEditCourseForm)}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this course? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
              {isLoading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}