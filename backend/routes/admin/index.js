// const db = require("../../db");

//This is how you should model your routes

// // Get Restaurants
// app.get("/login", async (req, res) => {
//     try {
//       //const result = await db.query("SELECT * FROM restaurant ORDER BY restaurant_id ASC");
//       const { rows } = await db.query(
//         "SELECT rs.restaurant_id, rs.name, rs.price_range, rs.location, COUNT(rv.restaurant_id) total_reviews, TRUNC(AVG(rv.rating),1) average_rating FROM restaurant rs LEFT JOIN reviews rv ON rv.restaurant_id = rs.restaurant_id GROUP BY rs.restaurant_id ORDER BY restaurant_id ASC"
//       );
//       res.status(200).json({
//         status: "success",
//         results: rows.length,
//         data: {
//           restaurants: rows
//         }
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   });
