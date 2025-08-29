import { Button } from '@/components/ui/button'
import UserLogo from '../assets/profileLogo.png'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

const Profile = () => {
  const dispatch = useDispatch()
  const user = useSelector((store: any) => store.auth.user)

  const [input, setInput] = useState({
    name: '',
    description: '',
    file: null as File | null
  })
  const [preview, setPreview] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (user) {
      setInput({
        name: user.name || '',
        description: user.description || '',
        file: null,
      })
      setPreview(user.photoUrl || "")
    }
  }, [user])

  // Handle text inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  // Handle file input
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setInput({ ...input, file })
      setPreview(URL.createObjectURL(file)) // show preview
    }
  }

  // Submit handler
  const sumbitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log("Submitting: ", input)

    const formData = new FormData()
    formData.append("name", input.name)
    formData.append("description", input.description)
    if (input.file) {
      formData.append("file", input.file) // send actual file
    }

    try {
      setLoading(true)
      const res = await axios.put(
        'http://localhost:3000/api/v1/user/profile/update',
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      )
        console.log("API Response:", res.data)  // 👈 add this

      if (res.data.success) {
        setOpen(false)
        toast.success(res.data.message)
        dispatch(setUser(res.data.user))
      } else {
        toast.error("Something went wrong")
      }
    } catch (error: any) {
      console.error(error)
      toast.error(error.response?.data?.message || "Update failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=" bg-gray-100 py-12 px-4 lg:px-0">
      <div className="flex max-w-6xl mx-auto p-8 bg-white shadow-xl rounded-2xl mt-14">
        <div className="flex flex-col items-center md:flex-row md:items-start space-y-8 md:space-y-0 md:space-x-12">

          {/* profile pic */}
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
            <img
              src={preview || UserLogo}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* user info */}
          <div className='text-center md:text-left ml-10'>
            {user ? (
              <>
                <h1 className='text-4xl font-bold text-blue-500'>
                  Welcome, {user.name}
                </h1>
                <p className=' text-gray-600 mt-3'>
                  <span className='font-bold'>Email: </span>{user.email}
                </p>
                <p className='text-gray-600 my-1 capitalize'>
                  <span className='font-bold'>Role: </span>{user.role}
                </p>
                <p className='text-gray-700 text-base leading-relaxed mb-3'>
                  <span className='font-bold'>Bio: </span>{user.description || "Add your bio"}
                </p>
              </>
            ) : (
              <h1 className='text-2xl font-bold text-gray-600'>Loading profile...</h1>
            )}

            {/* Edit Profile Dialog */}
            <Dialog open={open} onOpenChange={setOpen}>
              <Button onClick={() => setOpen(true)} className='bg-blue-500'>Edit Profile</Button>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className='text-center'>Edit profile</DialogTitle>
                  <DialogDescription className='text-center'>
                    Make changes to your profile here. Click save when you are done.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={input.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      value={input.description}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="file">Picture</Label>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      name="file"
                      onChange={handleFileChange}
                    />
                    {preview && (
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-20 h-20 rounded-full object-cover mt-2"
                      />
                    )}
                  </div>
                </div>

                <DialogFooter>
                  {loading ? (
                    <Button className='bg-blue-400'>
                      <Loader2 className='mr-2 w-4 h-4 animate-spin' /> Please wait...
                    </Button>
                  ) : (
                    <Button onClick={sumbitHandler} className='bg-blue-500'>
                      Save changes
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
