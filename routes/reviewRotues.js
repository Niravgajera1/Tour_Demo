const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(authController.protect);
router.route('/').get(reviewController.getAllReview);
router
  .route('/')
  .post(
    authController.ristrictTo('user'),
    reviewController.setTourUserIds,
    reviewController.createReview,
    (err, req, res, next) => {
      if (err) {
        res.status(err.statusCode || 500).json({
          status: 'error',
          message: err.message,
        });
      } else {
        next();
      }
    }
  );

router
  .route('/:id')
  .get(reviewController.getReview)
  .patch(
    authController.ristrictTo('user', 'admin'),
    reviewController.updateReview
  )
  .delete(
    authController.ristrictTo('user', 'admin'),
    reviewController.deletReview
  );

module.exports = router;
