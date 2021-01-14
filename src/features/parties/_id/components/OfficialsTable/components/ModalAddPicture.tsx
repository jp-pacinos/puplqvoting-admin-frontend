import React, { useRef, useState, useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineCamera } from 'react-icons/ai'
import { HiOutlineTrash } from 'react-icons/hi'
import ReactCrop, { Crop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

import { Input } from 'common/components/Core'
import { Modal, ModalBody, ModalFooter, sizes } from 'common/components/Modal'
import {
  newOfficialPicture,
  deleteOfficialPicture,
  selectOfficialModalAddPicture,
  selectOfficialById,
  officialPictureModalClose,
} from 'features/parties/_id'

interface Props {
  //
}

const ModalAddPicture: React.FC<Props> = () => {
  const [modalSize, setModalSize] = useState<sizes>('lg')

  const { open, officialId, status } = useSelector(selectOfficialModalAddPicture)
  const official = useSelector((state) => selectOfficialById(state, officialId as number))
  const dispatch = useDispatch()

  const [allowPictureEdit, setAllowPictureEdit] = useState(true)
  const [pendingPicture, setPendingPicture] = useState(false)
  const hasPicture = official && official.display_picture ? true : false

  const [crop, setCrop] = useState<Crop>({ aspect: 52 / 63, x: 0, y: 0 })
  const [upImg, setUpImg] = useState('')
  const imgRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (official && official.display_picture) {
      setUpImg(official.display_picture + `?t=${Math.random()}`)
      setAllowPictureEdit(false)
      setPendingPicture(true)
      return
    }

    imgRef.current = null

    setUpImg('')
    setAllowPictureEdit(true)
    setPendingPicture(false)
    setModalSize(() => 'lg')
  }, [official])

  const handleModalClose = () => {
    dispatch(officialPictureModalClose())
  }

  const handleImageLoaded = useCallback(
    (img: HTMLImageElement) => {
      let defaultCrop = !allowPictureEdit ? { width: 0, height: 0 } : { width: 260, height: 315 }

      imgRef.current = img
      setCrop((prev) => ({ ...prev, ...defaultCrop }))
      setPendingPicture(false)
      setModalSize(() => '4xl')

      return false // Return false when setting crop state in here.
    },
    [allowPictureEdit]
  )

  const handleCropChange = (newCrop: Crop) => {
    setCrop(newCrop)
    return false
  }

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => setUpImg(reader.result as string))
      reader.readAsDataURL(e.target.files[0])

      setAllowPictureEdit(true)
    }
  }

  const handleRemovePicture = () => {
    imgRef.current = null
    setUpImg('')
    setModalSize(() => 'lg')

    dispatch(deleteOfficialPicture({ officialId: officialId as number }))
  }

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const croppedImageBlob = await getCroppedImg(imgRef.current as any, crop)
    if (!croppedImageBlob) return null

    dispatch(newOfficialPicture({ newImage: croppedImageBlob, officialId: officialId as number }))
  }

  return (
    <Modal
      open={open}
      name="official-picture-modal"
      position="center"
      size={modalSize}
      onClose={handleModalClose}
    >
      <form onSubmit={handleFormSubmit} method="post" encType="multipart/form-data">
        <ModalBody>
          <div className="flex items-center">
            <div className="mr-3 flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:h-10 sm:w-10">
              <AiOutlineCamera className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              Upload a photo
            </h3>
          </div>

          {pendingPicture ? (
            <div className="my-5">
              <p className="font-semibold text-lg text-gray-400">Loading photo...</p>
            </div>
          ) : (
            <div className="flex items-center justify-between my-5">
              <Input
                onChange={handleSelectFile}
                type="file"
                name="display_picture"
                className="border-none p-0 w-auto mr-5"
                accept="image/*"
              />

              {hasPicture && (
                <button onClick={handleRemovePicture} type="reset" className="btn btn-gray">
                  <HiOutlineTrash className="inline mb-1 mr-2" />
                  Remove Photo
                </button>
              )}
            </div>
          )}

          <div className="flex justify-center">
            <ReactCrop
              src={upImg}
              crop={crop}
              onImageLoaded={handleImageLoaded}
              onChange={handleCropChange}
              disabled={status === 'pending' || !allowPictureEdit}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <span className="flex w-full sm:ml-3 sm:w-auto">
            <button
              className="btn btn-blue w-full py-2 sm:w-32"
              type="submit"
              disabled={
                status === 'pending' || pendingPicture || !allowPictureEdit || !Boolean(upImg)
              }
            >
              {status === 'pending' ? 'Please wait...' : 'Update'}
            </button>
          </span>
          <span className="mt-3 flex w-full sm:mt-0 sm:w-auto">
            <button
              type="button"
              onClick={handleModalClose}
              className="btn btn-white w-full py-2 sm:w-24"
            >
              Cancel
            </button>
          </span>
        </ModalFooter>
      </form>
    </Modal>
  )
}

export default ModalAddPicture

//

/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} crop - crop Object
 */
export function getCroppedImg(image: HTMLImageElement, crop: any) {
  const canvas = document.createElement('canvas')
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  canvas.width = crop.width
  canvas.height = crop.height
  const ctx = canvas.getContext('2d')!

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  )

  // console.log(canvas.toDataURL('image/jpeg', 1))

  // As Base64 string
  // const base64Image = canvas.toDataURL('image/jpeg', 1)

  // return base64Image

  // As a blob
  return new Promise<Blob | null>((resolve, reject) => {
    canvas.toBlob(
      (blob: Blob | null) => {
        resolve(blob)
      },
      'image/jpeg',
      1
    )
  })
}
