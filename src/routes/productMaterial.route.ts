import express from 'express'
import productMaterialController from '../controllers/productMaterial.controller'

const router = express.Router()

router.get('/', productMaterialController.getProductMaterials)
router.get('/:id', productMaterialController.getProductMaterialById)
router.post('/', productMaterialController.createProductMaterial)
router.put('/:id', productMaterialController.updateProductMaterial)
router.delete('/:id', productMaterialController.deleteProductMaterial)

export default router
