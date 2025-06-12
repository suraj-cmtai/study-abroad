"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch } from "@/lib/redux/store"
import {
  selectContacts,
  selectContactLoading,
  selectContactError,
  fetchContacts,
  createContact,
  updateContact,
  deleteContact,
  Contact
} from "@/lib/redux/features/contactSlice"
import { format } from "date-fns"
import { toast } from "sonner"
import { motion } from "framer-motion"
import {
  ChevronDown,
  MoreHorizontal,
  Plus,
  Pencil,
  Trash2,
  Search,
  Mail,
  Phone,
  Loader2
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const dispatch = useDispatch<AppDispatch>()
  const contacts = useSelector(selectContacts)
  const isLoading = useSelector(selectContactLoading)
  const error = useSelector(selectContactError)
  
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newContact, setNewContact] = useState<{
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    status: 'New' | 'In Progress' | 'Completed';
    priority: 'Low' | 'Medium' | 'High';
  }>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    status: "New",
    priority: "Medium"
  })

  useEffect(() => {
    dispatch(fetchContacts())
  }, [dispatch])

  // Filter contacts based on search query and filters
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === "all" || contact.status === statusFilter
    const matchesPriority = priorityFilter === "all" || contact.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  // Get color based on status
  const getStatusColor = (status: Contact['status']) => {
    switch (status) {
      case "New":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get color based on priority
  const getPriorityColor = (priority: Contact['priority']) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800"
      case "Medium":
        return "bg-orange-100 text-orange-800"
      case "Low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Handle adding new contact
  const handleAdd = async () => {
    const formData = new FormData()
    formData.append("name", newContact.name)
    formData.append("email", newContact.email)
    formData.append("phone", newContact.phone)
    formData.append("subject", newContact.subject)
    formData.append("message", newContact.message)
    formData.append("status", newContact.status)
    formData.append("priority", newContact.priority)

    try {
      await dispatch(createContact(formData)).unwrap()
      setIsAddDialogOpen(false)
      setNewContact({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        status: "New",
        priority: "Medium"
      })
      toast.success("Contact added successfully!")
    } catch (error) {
      toast.error("Failed to add contact")
    }
  }

  // Handle updating contact
  const handleUpdate = async () => {
    if (!selectedContact) return

    const formData = new FormData()
    formData.append("name", selectedContact.name)
    formData.append("email", selectedContact.email)
    formData.append("phone", selectedContact.phone)
    formData.append("subject", selectedContact.subject)
    formData.append("message", selectedContact.message)
    formData.append("status", selectedContact.status)
    formData.append("priority", selectedContact.priority)

    try {
      await dispatch(updateContact({ 
        id: selectedContact.id, 
        data: formData 
      })).unwrap()
      setIsEditDialogOpen(false)
      toast.success("Contact updated successfully!")
    } catch (error) {
      toast.error("Failed to update contact")
    }
  }

  // Handle deleting contact
  const handleDelete = async () => {
    if (!selectedContact) return

    try {
      await dispatch(deleteContact(selectedContact.id)).unwrap()
      setIsDeleteDialogOpen(false)
      toast.success("Contact deleted successfully!")
    } catch (error) {
      toast.error("Failed to delete contact")
    }
  }

  if (error) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">Error: {error}</p>
        <Button 
          onClick={() => dispatch(fetchContacts())}
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Add Contact
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="New">New</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <motion.div
        layout
        className="rounded-md border"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : filteredContacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8">
                  No contacts found
                </TableCell>
              </TableRow>
            ) : (
              filteredContacts.map((contact) => (
                <motion.tr
                  key={contact.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  layout
                >
                  <TableCell>
                    <div className="font-medium">{contact.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        {contact.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        {contact.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{contact.subject}</TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate" title={contact.message}>
                      {contact.message}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(contact.status)}>
                      {contact.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(contact.priority)}>
                      {contact.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(new Date(contact.createdAt), "MMM d, yyyy")}</TableCell>
                  <TableCell>{format(new Date(contact.updatedAt), "MMM d, yyyy")}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedContact(contact)
                            setIsEditDialogOpen(true)
                          }}
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={() => {
                            setSelectedContact(contact)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
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

      {/* Add Contact Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
            <DialogDescription>
              Add a new contact to your list.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newContact.name}
                onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newContact.email}
                onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={newContact.phone}
                onChange={(e) => setNewContact({ ...newContact, phone: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                value={newContact.subject}
                onChange={(e) => setNewContact({ ...newContact, subject: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Input
                id="message"
                value={newContact.message}
                onChange={(e) => setNewContact({ ...newContact, message: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newContact.status}
                  onValueChange={(value: Contact['status']) =>
                    setNewContact({ ...newContact, status: value })
                  }
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newContact.priority}
                  onValueChange={(value: Contact['priority']) =>
                    setNewContact({ ...newContact, priority: value })
                  }
                >
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAdd} disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Contact"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Contact Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Contact</DialogTitle>
            <DialogDescription>
              Make changes to the contact information.
            </DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Name</Label>
                <Input
                  id="edit-name"
                  value={selectedContact.name}
                  onChange={(e) =>
                    setSelectedContact({
                      ...selectedContact,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={selectedContact.email}
                  onChange={(e) =>
                    setSelectedContact({
                      ...selectedContact,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                  id="edit-phone"
                  value={selectedContact.phone}
                  onChange={(e) =>
                    setSelectedContact({
                      ...selectedContact,
                      phone: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-subject">Subject</Label>
                <Input
                  id="edit-subject"
                  value={selectedContact.subject}
                  onChange={(e) =>
                    setSelectedContact({
                      ...selectedContact,
                      subject: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-message">Message</Label>
                <Input
                  id="edit-message"
                  value={selectedContact.message}
                  onChange={(e) =>
                    setSelectedContact({
                      ...selectedContact,
                      message: e.target.value,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={selectedContact.status}
                    onValueChange={(value: Contact['status']) =>
                      setSelectedContact({
                        ...selectedContact,
                        status: value,
                      })
                    }
                  >
                    <SelectTrigger id="edit-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="New">New</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="edit-priority">Priority</Label>
                  <Select
                    value={selectedContact.priority}
                    onValueChange={(value: Contact['priority']) =>
                      setSelectedContact({
                        ...selectedContact,
                        priority: value,
                      })
                    }
                  >
                    <SelectTrigger id="edit-priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Contact Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Contact</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this contact? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}