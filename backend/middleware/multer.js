import multer from 'nulter'

const storage= multer.memoryStorage()
export const singleUpload= multer((storage)).single('file')