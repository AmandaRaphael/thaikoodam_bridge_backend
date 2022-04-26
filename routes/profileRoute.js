import express from "express";
import Profiles from "../models/profileSchema.js";
import dotenv from "dotenv"

const router = express.Router()

dotenv.config();


router.post("/career/members", async (req, res) => {
  try {
    const profiles = await Profiles.create({
      name: req.body.name,
      email:req.body.email,
      profile: req.body.profile,
      moreInfo: req.body.moreInfo,
      phone:req.body.phone
    })
  return res.status(200).json(profiles);  
 
  } catch (error) {
   return res.status(500).json(error); 

  }
})


router.get("/members", async (req, res) => {
    try {
        const profiles= await Profiles.find()
        return res.status(200).json(profiles);  
    } catch (error) {
        return res.status(500).json(error); 
    }
  
})
router.get("/:memberId",async (req, res) => {


    try {
        const member = await Profiles.findById(req.params.memberId);
           return res
             .status(200)
             .json( member );
         } catch (error) {
           return res.status(500).json({ message: error });
         }
    })
router.get("/:memberId/:memberInfo", async (req, res) => {
     
       
         try {
           const moreInfo = await Profiles.findById(req.params.memberInfo)
         return res.status(200).json(moreInfo);
       } catch (error) {
         return res.status(500).json({ message: error });
       }
     });
router.get("/:memberId/:memberInfo/:memberContact", async (req, res) => {
            
    try {
               const contact = await Profiles.findById(req.params.memberContact);
            return res
              .status(200)
              .json(contact);
          } catch (error) {
            return res.status(500).json({ message: error });
          }
        });
export default router