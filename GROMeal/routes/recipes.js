var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require("../model/helper");

// GET recipes by plan_id WORKING
router.get("/:planId", async function(req, res, next) {
  let planId = req.params.planId
 //  let programId = req.params.programId;
 
   try {
     let results = await db(`SELECT * FROM recipes WHERE plan_id = ${planId}`);
     let plans = results.data;
     // if (programs.length === 0) {
     
     //   res.status(404).send({ error: "Programs not found" });
     // } else {
     //   res.send(programs);
     // }
     res.send(plans);
   } catch (err) {
     res.status(500).send({ error: err.message });
   }
 });

 //POST A NEW RECIPE
 router.post("/:planId", async (req, res, next) => {
  let { API_id, recipe_title, recipe_image, servings, meal_type, week_day} = req.body;
  let planId = req.params.planId;
  let sql = `
      INSERT INTO recipes (API_id, recipe_title, recipe_image, servings, meal_type, plan_id, week_day)
      VALUES (${API_id},'${recipe_title}', '${recipe_image}', ${servings}, '${meal_type}', ${planId}, '${week_day}')
  `;

  try {
      await db(sql);
      let result = await db(`SELECT * FROM recipes WHERE plan_id = ${planId}`);
      let exercises = result.data;
      res.status(201).send(exercises);
  } catch (err) {
      res.status(500).send({ error: err.message });
  }
});

   
module.exports = router;