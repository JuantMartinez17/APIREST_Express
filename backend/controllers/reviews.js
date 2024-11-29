import { ReviewsModel } from "../models/reviews.js"
import p from 'picocolors'
export class ReviewsController {
    static async getAll(req, res) {
        try{
            const reviews = await ReviewsModel.getAll()
            if (!reviews || reviews.length === 0){
                return { error: 'No reviews found' }
            }
            res.status(200).json(reviews)
        }catch (error){
            console.error(p.red(`Error fetching reviews: ${error.message}`))
            res.status(500).json({ message: 'Internal server error' })
        }
    }

    static async getById(req, res) {

    }

    static async getByMovieId(req, res) {
        const { movieId } = req.params;
        try {
          const reviews = await ReviewsModel.getByMovieId(movieId);
    
          if (!reviews || reviews.length === 0) {
            return res.status(404).json({ error: 'No reviews found for this movie' });
          }
    
          res.status(200).json(reviews);
        } catch (error) {
          console.error(`Error fetching reviews by movie: ${error.message}`);
          res.status(500).json({ message: 'Internal server error' });
        }
      }

    static async getByUserId(req, res) {
        const { userId } = req.params;
        try {
          const reviews = await ReviewsModel.getByUserId(userId);
    
          if (!reviews || reviews.length === 0) {
            return res.status(404).json({ error: 'No reviews found for this user' });
          }
    
          res.status(200).json(reviews);
        } catch (error) {
          console.error(`Error fetching reviews by user: ${error.message}`);
          res.status(500).json({ message: 'Internal server error' });
        }
    }

    static async create(req, res) {

    }

    static async update(req, res) {

    }

    static async delete(req, res) {

    }
    
}