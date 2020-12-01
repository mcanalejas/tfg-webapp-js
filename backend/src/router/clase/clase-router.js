const { getClaseInfo } = require('../../controller/clase/clase')
const router = require('express').Router()

router.get('/:claseID', getClaseInfo)

module.exports = router